import { useState } from "react";
import WeightsIcon from "../../assets/gym-weights-icon.svg?react";
import Button from "../button/button.component";

import {
  ProfileLogoContainer,
  StyledArrow,
  StyledLogOutContainer,
} from "./profile-logo.styles";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/auth.slice";

const ProfileLogo = () => {
  const [shown, setShown] = useState(false);
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <ProfileLogoContainer
      onClick={() => {
        setShown((prev) => !prev);
      }}
    >
      <WeightsIcon width="50px" height="50px" fill="white" />
      <StyledArrow $shown={shown}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11.886"
          height="6.844"
          viewBox="0 0 11.886 6.844"
        >
          <path
            id="Path_762"
            data-name="Path 762"
            d="M-10.7-3.937l-5.943-6,.84-.84,5.1,5.1,5.1-5.1.84.84Z"
            transform="translate(16.641 10.781)"
            fill="#646d82"
          />
        </svg>
      </StyledArrow>
      <StyledLogOutContainer $shown={shown}>
        <Button onClick={handleLogOut}>LogOut</Button>
      </StyledLogOutContainer>
    </ProfileLogoContainer>
  );
};
export default ProfileLogo;
