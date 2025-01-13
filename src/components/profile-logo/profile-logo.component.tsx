import WeightsIcon from "../../assets/gym-weights-icon.svg?react";

import { ProfileLogoContainer, StyledArrow } from "./profile-logo.styles";

const ProfileLogo = () => {
  return (
    <ProfileLogoContainer>
      <WeightsIcon width="50px" height="50px" fill="white" />
      <StyledArrow>
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
    </ProfileLogoContainer>
  );
};
export default ProfileLogo;
