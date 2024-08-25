
import './index.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h2>Contact Us</h2>
        <p>Email: info@example.com</p>
        <p>Phone: +123 456 7890</p>
        <p>Address: 123 Main Street, City, Country</p>
      </div>
      <div className="footer-section">
        <h2>Services</h2>
        <ul>
          <li>Web Development</li>
          <li>Mobile Development</li>
          <li>SEO Optimization</li>
          <li>Cloud Services</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
