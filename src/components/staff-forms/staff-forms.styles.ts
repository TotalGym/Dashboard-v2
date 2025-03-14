import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  width: 400px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  input {
    width: 100%;
  }
`;

export const FormInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

export const FormSelect = styled.select`
  padding: 10px;
  border: 1px solid black;
  border-radius: 4px;
  font-size: 16px;
`;

export const FormLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;


export const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;
