import { FooterContainer } from "./footer.styles";

const Footer = () => {
  return (
    <FooterContainer>
      &#169; {new Date().getFullYear()} <span>Gym System.</span> All Rights Reserved
    </FooterContainer>
  );
};
export default Footer;
