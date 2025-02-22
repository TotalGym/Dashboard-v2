import styled from "styled-components";

export const ProductDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

export const ProductImage = styled.img`
  width: 500px;
  height: 500px;
  object-fit: contain;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ProductInfo = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 500;

  p {
    margin: 5px 0;
  }
`;

export const ProductDescription = styled.p`
  font-size: 16px;
  text-align: center;
  max-width: 600px;
  color: #555;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const DeleteModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;
