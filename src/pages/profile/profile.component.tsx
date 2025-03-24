import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/button/button.component";
import {
  useGetProfileDataQuery,
  useUpdateProfileMutation,
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

type ProfileFormData = {
  name: string;
  phoneNumber: string;
};

const Profile = () => {
  const { data: profileData, isLoading, refetch } = useGetProfileDataQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormData>();

  useEffect(() => {
    if (profileData?.data) {
      reset({
        name: profileData.data.name,
        phoneNumber: profileData.data.contact.phoneNumber,
      });
    }
  }, [profileData, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const response = await updateProfile({
        name: data.name,
        contact: {
          phoneNumber: data.phoneNumber,
          email: profileData?.data.contact.email || "",
        },
      }).unwrap();

      if (response.success) {
        toast.success(response.message || "Profile updated successfully");
        refetch(); //! test if it is needed becasue I am using tags it automtically refetches
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

  if (isLoading) return <div>Loading...</div>;

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
              defaultValue={profileData?.data.email}
            />
          </StyledProfileFormGroup>

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
              <span style={{ color: "red" }}>{errors.phoneNumber.message}</span>
            )}
          </StyledProfileFormGroup>

          <StyledProfileSection>
            <StyledProfileFormGroup>
              <StyledProfileLabel>Status</StyledProfileLabel>
              <StyledProfileStatus>
                {profileData?.data.status ? profileData?.data.status : "N/A"}
              </StyledProfileStatus>
            </StyledProfileFormGroup>

            <StyledProfileFormGroup>
              <StyledProfileLabel>Role</StyledProfileLabel>
              <StyledProfileRoleTag>
                {profileData?.data.role}
              </StyledProfileRoleTag>
            </StyledProfileFormGroup>
          </StyledProfileSection>

          <Button type="submit" disable={!isDirty || isUpdating}>
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </StyledProfileForm>
      </StyledProfileCard>
    </StyledProfileContainer>
  );
};

export default Profile;
