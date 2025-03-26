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
  StyledPasswordForm,
  StyledPasswordFormGroup,
  StyledPasswordInput,
} from "./profile.styles";
import { useEffect, useState } from "react";
import { Roles } from "../../types/staff.types";
import { useAppSelector } from "../../app/hooks";
import { selectRole, selectID } from "../../features/auth/auth.slice";
import Modal from "../../components/modal/modal.component";
import { useChangePasswrodMutation } from "../../services/auth.services";

type ProfileFormData = {
  name: string;
  phoneNumber: string;
  email: string;
};

type PasswordFormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userRole = useAppSelector(selectRole);
  const userId = useAppSelector(selectID);
  const isAdmin = userRole === Roles.Admin;

  const [triggerGetProfileData, { data: profileData, isLoading }] =
    useLazyGetProfileDataQuery();
  const [
    triggerGetAdminProfileData,
    { data: adminProfileData, isLoading: isAdminLoading },
  ] = useLazyGetAdminProfileDataQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [updateAdminProfile] = useUpdateAdminProgileMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswrodMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormData>();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isValid: isPasswordValid },
    reset: resetPassword,
    watch,
  } = useForm<PasswordFormData>({
    mode: "onChange",
  });

  const newPassword = watch("newPassword");

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

  const onSubmitPassword = async (data: PasswordFormData) => {
    try {
      if (!userId) {
        toast.error("User ID not found");
        return;
      }

      const response = await changePassword({
        id: userId,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();

      if (response.success) {
        toast.success(response.message || "Password changed successfully");
        setIsModalOpen(false);
        resetPassword();
      } else {
        toast.error(response.error || "Failed to change password");
      }
    } catch (error) {
      console.error("Password change error:", error);
      if ((error as { data: { message: string } }).data) {
        toast.error(
          (error as { data: { message: string } }).data.message ||
            "Failed to change password"
        );
      } else if ((error as { message: string }).message) {
        toast.error((error as { message: string }).message);
      } else {
        toast.error("An unknown error occurred while changing password");
      }
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

          <div style={{ display: "flex", gap: "1rem" }}>
            <Button type="submit" disabled={!isDirty}>
              Save Changes
            </Button>
            <Button type="button" onClick={() => setIsModalOpen(true)}>
              Change Password
            </Button>
          </div>
        </StyledProfileForm>
      </StyledProfileCard>

      <Modal closeModal={() => setIsModalOpen(false)} open={isModalOpen}>
        <StyledPasswordForm onSubmit={handleSubmitPassword(onSubmitPassword)}>
          <h2>Change Password</h2>
          <StyledPasswordFormGroup>
            <StyledProfileLabel htmlFor="oldPassword">
              Current Password
            </StyledProfileLabel>
            <StyledPasswordInput
              id="oldPassword"
              type="password"
              {...registerPassword("oldPassword", {
                required: "Current password is required",
              })}
            />
            {passwordErrors.oldPassword && (
              <span style={{ color: "red" }}>
                {passwordErrors.oldPassword.message}
              </span>
            )}
          </StyledPasswordFormGroup>

          <StyledPasswordFormGroup>
            <StyledProfileLabel htmlFor="newPassword">
              New Password
            </StyledProfileLabel>
            <StyledPasswordInput
              id="newPassword"
              type="password"
              {...registerPassword("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {passwordErrors.newPassword && (
              <span style={{ color: "red" }}>
                {passwordErrors.newPassword.message}
              </span>
            )}
          </StyledPasswordFormGroup>

          <StyledPasswordFormGroup>
            <StyledProfileLabel htmlFor="confirmPassword">
              Confirm Password
            </StyledProfileLabel>
            <StyledPasswordInput
              id="confirmPassword"
              type="password"
              {...registerPassword("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
            />
            {passwordErrors.confirmPassword && (
              <span style={{ color: "red" }}>
                {passwordErrors.confirmPassword.message}
              </span>
            )}
          </StyledPasswordFormGroup>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <Button
              type="submit"
              disabled={!isPasswordValid || isChangingPassword}
              isLoading={isChangingPassword}
            >
              {isChangingPassword ? "Updating..." : "Update Password"}
            </Button>
            <Button
              type="button"
              onClick={() => setIsModalOpen(false)}
              disabled={isChangingPassword}
            >
              Cancel
            </Button>
          </div>
        </StyledPasswordForm>
      </Modal>
    </StyledProfileContainer>
  );
};

export default Profile;
