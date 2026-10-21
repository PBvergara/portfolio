import { site } from "../data/site";
import SocialList from "./SocialList";

const year = new Date().getFullYear();

export default function Footer() {

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a className="brand" href="#home">
          <span className="brand-mark" aria-hidden="true" />
          <span>
            <span className="brand-name">{site.brand}</span>
            <span className="footer-role">{site.role}</span>
          </span>
        </a>
        <SocialList variant="footer" />
        <p className="copyright">
          © {year} {site.brand}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
