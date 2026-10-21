import { Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { site } from "../data/site";

const LINKS = [
  { href: "#home", id: "home", label: "Portfolio" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#about", id: "about", label: "About" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export default function Navbar() {
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      const line = 160;
      let current = "home";
      for (const id of ["home", "projects", "skills", "contact"]) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= line) current = id;
      }
      const hash = window.location.hash.replace("#", "");
      if (hash === "about" && current === "home") {
        const target = document.getElementById(hash);
        if (target && target.getBoundingClientRect().top < window.innerHeight * 0.6) current = hash;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 861px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="topbar">
      <a className="brand" href="#home">
        <span className="brand-mark" aria-hidden="true" />
        <span className="brand-name">{site.brand}</span>
      </a>
      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>
      <nav id={menuId} className={`nav-links${open ? " is-open" : ""}`} aria-label="Primary">
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={link.href}
            aria-current={active === link.id ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
