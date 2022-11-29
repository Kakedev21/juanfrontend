import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer>
      <div className="media">
        <FontAwesomeIcon icon={faEnvelope} className="fa" />
        <FontAwesomeIcon icon={faPhone} className="fa" />
        <FontAwesomeIcon icon={faFacebook} className="fa" />
      </div>
      <div className="footernav">
        <a href="/">Home</a>
        <a href="/">Services</a>
        <a href="/">About</a>
        <a href="/">Terms</a>
      </div>
      <p>All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
