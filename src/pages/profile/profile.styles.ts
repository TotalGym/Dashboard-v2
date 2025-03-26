import styled from "styled-components";
import { MainBgColor } from "../../styles/general.styles";

export const StyledProfileContainer = styled.div`
  ${MainBgColor}
  border-radius: 30px;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 160px);
`;

export const StyledProfileHeader = styled.header`
  margin-bottom: 2.5rem;
`;

export const StyledProfileTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const StyledProfileSubtitle = styled.p`
  font-size: 1rem;
`;

export const StyledProfileCard = styled.section`
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid lightgreen;
`;

export const StyledProfileCardHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
`;

export const StyledProfileForm = styled.form`
  display: grid;
  gap: 1.5rem;
`;

export const StyledProfileFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StyledProfileLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
`;

export const StyledProfileInput = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const StyledProfileStatus = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const StyledProfileRoleTag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const StyledProfileSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

export const StyledPasswordForm = styled.form`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledPasswordFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StyledPasswordInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;
