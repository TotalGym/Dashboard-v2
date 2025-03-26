import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/button/button.component";
import {
  useLazyGetProfileDataQuery,
  useLazyGetAdminProfileDataQuery,
  useUpdateProfileMutation,
  useUpdateAdminProgileMutation,
} from "../../services/profile.services";
import {
  StyledProfileContainer,
  StyledProfileHeader,
  StyledProfileTitle,
  StyledProfileSubtitle,
  StyledProfileCard,
  StyledProfileCardHeader,
  StyledProfileForm,
  StyledProfileFormGroup,
  StyledProfileLabel,
  StyledProfileInput,
  StyledProfileSection,
  StyledProfileStatus,
  StyledProfileRoleTag,
} from "./profile.styles";
import { useEffect } from "react";
import { Roles } from "../../types/staff.types";
import { useAppSelector } from "../../app/hooks";
import { selectRole } from "../../features/auth/auth.slice";

type ProfileFormData = {
  name: string;
  phoneNumber: string;
  email: string;
};

const Profile = () => {
  const userRole = useAppSelector(selectRole);
  const isAdmin = userRole === Roles.Admin;

  const [triggerGetProfileData, { data: profileData, isLoading }] =
    useLazyGetProfileDataQuery();
  const [
    triggerGetAdminProfileData,
    { data: adminProfileData, isLoading: isAdminLoading },
  ] = useLazyGetAdminProfileDataQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [updateAdminProfile] = useUpdateAdminProgileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormData>();

  useEffect(() => {
    const fetchData = async () => {
      if (isAdmin) {
        await triggerGetAdminProfileData();
      } else {
        await triggerGetProfileData();
      }
    };
    fetchData();
  }, [isAdmin, triggerGetProfileData, triggerGetAdminProfileData]);

  useEffect(() => {
    if (isAdmin && adminProfileData?.data) {
      reset({
        name: adminProfileData.data.name,
        email: adminProfileData.data.email,
        phoneNumber: "",
      });
    } else if (profileData?.data) {
      reset({
        name: profileData.data.name,
        phoneNumber: profileData.data.contact.phoneNumber,
        email: profileData.data.contact.email,
      });
    }
  }, [profileData, adminProfileData, reset, isAdmin]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const response = isAdmin
        ? await updateAdminProfile({
            name: data.name,
            email: data.email,
          }).unwrap()
        : await updateProfile({
            name: data.name,
            contact: {
              phoneNumber: data.phoneNumber,
              email: data.email,
            },
          }).unwrap();

      if (response.success) {
        toast.success(response.message || "Profile updated successfully");
        if (isAdmin) {
          await triggerGetAdminProfileData();
        } else {
          await triggerGetProfileData();
        }
      } else {
        toast.error(response.error || "Failed to update profile");
      }
    } catch (error) {
      toast.error(
        (error as { data: { message: string } }).data?.message ||
          (error as { message: string }).message ||
          "An error occurred while updating profile"
      );
    }
  };

  if (isLoading || isAdminLoading) return <div>Loading...</div>;

  const currentData = isAdmin ? adminProfileData?.data : profileData?.data;
  const isStaffProfile = !isAdmin && currentData && "status" in currentData;

  return (
    <StyledProfileContainer>
      <StyledProfileHeader>
        <StyledProfileTitle>Profile Settings</StyledProfileTitle>
        <StyledProfileSubtitle>
          Manage your account information and settings
        </StyledProfileSubtitle>
      </StyledProfileHeader>

      <StyledProfileCard>
        <StyledProfileCardHeader>Personal Information</StyledProfileCardHeader>
        <StyledProfileForm onSubmit={handleSubmit(onSubmit)}>
          <StyledProfileFormGroup>
            <StyledProfileLabel htmlFor="name">Name</StyledProfileLabel>
            <StyledProfileInput
              id="name"
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <span style={{ color: "red" }}>{errors.name.message}</span>
            )}
          </StyledProfileFormGroup>

          <StyledProfileFormGroup>
            <StyledProfileLabel htmlFor="email">Email</StyledProfileLabel>
            <StyledProfileInput
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email.message}</span>
            )}
          </StyledProfileFormGroup>

          {!isAdmin && (
            <StyledProfileFormGroup>
              <StyledProfileLabel htmlFor="phoneNumber">
                Phone Number
              </StyledProfileLabel>
              <StyledProfileInput
                id="phoneNumber"
                type="tel"
                {...register("phoneNumber", {
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Please enter a valid phone number",
                  },
                })}
              />
              {errors.phoneNumber && (
                <span style={{ color: "red" }}>
                  {errors.phoneNumber.message}
                </span>
              )}
            </StyledProfileFormGroup>
          )}

          <StyledProfileSection>
            {isStaffProfile && (
              <StyledProfileFormGroup>
                <StyledProfileLabel>Status</StyledProfileLabel>
                <StyledProfileStatus>
                  {currentData.status || "N/A"}
                </StyledProfileStatus>
              </StyledProfileFormGroup>
            )}

            <StyledProfileFormGroup>
              <StyledProfileLabel>Role</StyledProfileLabel>
              <StyledProfileRoleTag>{currentData?.role}</StyledProfileRoleTag>
            </StyledProfileFormGroup>
          </StyledProfileSection>

          <Button type="submit" disable={!isDirty}>
            Save Changes
          </Button>
        </StyledProfileForm>
      </StyledProfileCard>
    </StyledProfileContainer>
  );
};

export default Profile;
