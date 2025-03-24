import styled from "styled-components";

export const AdminFormContainer = styled.div`
  padding: 1.5rem;
  width: 100%;
  max-width: 500px;
`;

export const StyledAdminForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  select {
    padding: 0.8rem;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 1rem;
    background-color: white;
  }

  @media (max-width: 768px) {
    gap: 0.75rem;

    select {
      padding: 0.7rem;
    }
  }
`;
