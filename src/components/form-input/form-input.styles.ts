import styled from "styled-components";

export const AuthInput = styled.input`
  width: 400px;
  height: 60px;
  border: none;
  border-bottom: 1px solid #e9e9f0;
  margin-top: 2em;
 
  @media(max-width: ${({theme})=>theme.breakpoints.sm}){
    width: 250px;
  }
`;

export const CheckboxInput = styled.input.attrs({ type: "checkbox" })``;

export const StyledLable = styled.label`
  margin-right: 0.5em;
`;

export const SearchInput = styled.input`
  height: 60px;
  width: 60vw;
  padding: 2em;
`;

export const ModalInput = styled.input`
  border: 1px solid black;
  padding: 0.5em;
  border-radius: 3px;
`;
