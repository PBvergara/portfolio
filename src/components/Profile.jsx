import { User, X, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { about, site } from "../data/site";
import SocialList from "./SocialList";

function TechIcon({ children }) {
  return (
    <svg className="tech-ico" viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  );
}

function ReactIcon() {
  return (
    <TechIcon>
      <circle cx="12" cy="12" r="2.05" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" fill="none" stroke="currentColor" strokeWidth="1.35" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" fill="none" stroke="currentColor" strokeWidth="1.35" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.8" fill="none" stroke="currentColor" strokeWidth="1.35" transform="rotate(120 12 12)" />
    </TechIcon>
  );
}

function BadgeIcon({ color, label, ink = "#1a1a1a" }) {
  return (
    <svg className="tech-ico" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill={color} />
      <text x="12" y="16.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={label.length > 2 ? "7" : "11"} fontWeight="700" fill={ink}>
        {label}
      </text>
    </svg>
  );
}

function JavaScriptIcon() {
  return <BadgeIcon color="#f7df1e" label="JS" />;
}

function PythonIcon() {
  return (
    <TechIcon>
      <path fill="#3776ab" d="M11.8 2.2c-2.7 0-2.6 1.2-2.6 1.2v1.8h2.7v.6H6.6S3.4 5.5 3.4 9.6s2.6 3.8 2.6 3.8h1.5V11.6s0-2.2 2.2-2.2h3.8s2.1 0 2.1-2V4.6s-.2-2.4-3.8-2.4zm-1.5 1.4a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z" />
      <path fill="#ffd343" d="M12.2 21.8c2.7 0 2.6-1.2 2.6-1.2v-1.8h-2.7v-.6h5.3s3.2.3 3.2-3.8-2.6-3.8-2.6-3.8h-1.5v1.8s0 2.2-2.2 2.2H10.5s-2.1 0-2.1 2v2.8s.2 2.4 3.8 2.4zm1.5-1.4a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z" />
    </TechIcon>
  );
}

function HtmlIcon() {
  return <BadgeIcon color="#e44d26" label="H5" ink="#fff" />;
}

function GodotIcon() {
  return <BadgeIcon color="#478cbf" label="Gd" ink="#fff" />;
}

function GeminiIcon() {
  return (
    <TechIcon>
      <path fill="#7c8cff" d="M12 1.4 13.7 8 20.4 9.6 13.7 11.2 12 17.8 10.3 11.2 3.6 9.6 10.3 8z" />
      <path fill="#c084fc" d="M17.4 14.2 18.2 16.6 20.6 17.4 18.2 18.2 17.4 20.6 16.6 18.2 14.2 17.4 16.6 16.6z" />
    </TechIcon>
  );
}

function GroqIcon() {
  return <BadgeIcon color="#f55036" label="AI" ink="#fff" />;
}

function Orbit({ name, children }) {
  return (
    <span className={`orbit ${name}`} aria-hidden="true">
      <span className="orbit-spin">
        <span className="code-bit">{children}</span>
      </span>
    </span>
  );
}

function PhotoLightbox({ src, name, onClose }) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label={`${name} profile photo`} onClick={onClose}>
      <button type="button" className="showcase-close" aria-label="Close photo" onClick={onClose}>
        <X size={18} aria-hidden="true" />
      </button>
      <img src={src} alt={`${name} profile`} onClick={(event) => event.stopPropagation()} />
    </div>,
    document.body,
  );
}

export default function Profile() {
  const [photoOpen, setPhotoOpen] = useState(false);

  return (
    <section id="home" className="profile-wrap">
      <article id="about" className="profile">
        <button
          type="button"
          className="avatar"
          aria-label={`View ${site.brand} profile photo`}
          onClick={() => setPhotoOpen(true)}
        >
          {site.avatar ? (
            <img src={site.avatar} alt="" />
          ) : (
            <User size={34} aria-hidden="true" />
          )}
        </button>
        <div className="profile-copy">
          <div className="name-block">
          <p className="status">
            <span className="status-dot" aria-hidden="true" />
            {site.status}
          </p>
          <h1 className="name-lockup">
            <span className="name-text">{site.brand}</span>
            <Orbit name="orbit-a">&lt;/&gt;</Orbit>
            <Orbit name="orbit-react"><ReactIcon /></Orbit>
            <Orbit name="orbit-b">{"{ }"}</Orbit>
            <Orbit name="orbit-js"><JavaScriptIcon /></Orbit>
            <Orbit name="orbit-c">;</Orbit>
            <Orbit name="orbit-py"><PythonIcon /></Orbit>
            <Orbit name="orbit-d">{"( )"}</Orbit>
            <Orbit name="orbit-html"><HtmlIcon /></Orbit>
            <Orbit name="orbit-godot"><GodotIcon /></Orbit>
            <Orbit name="orbit-gemini"><GeminiIcon /></Orbit>
            <Orbit name="orbit-groq"><GroqIcon /></Orbit>
          </h1>
          <p className="role-label">{site.role}</p>
          </div>
          <p className="lede">{site.heroIntro}</p>
          <p className="about-line">{about.intro}</p>
          <div className="profile-actions">
            <a className="btn btn-primary" href="#projects">
              View Projects
            </a>
            <a className="btn btn-ghost" href="#contact">
              Contact Me
            </a>
            <a className="btn btn-primary" href="/Paul-Bryan-B-Vergara-Resume.pdf?v=20261027" download="Paul-Bryan-B-Vergara-Resume.pdf">
              Download my resume
              <Download size={15} aria-hidden="true" />
            </a>
          </div>
          <SocialList variant="links" />
        </div>
      </article>
      {photoOpen && site.avatar ? (
        <PhotoLightbox src={site.avatar} name={site.brand} onClose={() => setPhotoOpen(false)} />
      ) : null}
    </section>
  );
}
