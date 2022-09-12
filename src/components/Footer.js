import { Container, Row, Col } from "react-bootstrap";
import navIcon1 from "../assets/img/nav-icon1.png";
import navIcon2 from "../assets/img/nav-icon2.png";
import navIcon3 from "../assets/img/nav-icon3.png";
import Typography from "@mui/material/Typography";

export const Footer = () => {
  return (
    <section className="footer">
      <Container>
        <Row className="align-items-center">
          <Col className="align-items-center text-center mt-4">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/crypto-nita-03753124a/">
                <img src={navIcon1} alt="Icon" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100084786747314">
                <img src={navIcon2} alt="Icon" />
              </a>
              <a href="https://www.instagram.com/">
                <img src={navIcon3} alt="Icon" />
              </a>
            </div>
            <p>Copyright 2022. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Footer;
