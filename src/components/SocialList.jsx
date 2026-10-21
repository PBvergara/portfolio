import { Mail } from "lucide-react";
import { site } from "../data/site";
import { toHref } from "../lib/links";
import BrandIcon from "./BrandIcon";

const LINKS = [
  { id: "email", label: "Email", kind: "email", value: site.email },
  { id: "github", label: "GitHub", kind: "github", value: site.github },
  { id: "linkedin", label: "LinkedIn", kind: "linkedin", value: site.linkedin },
  { id: "facebook", label: "Facebook", kind: "facebook", value: site.facebook },
];

function rawValue(item) {
  return typeof item.value === "string" ? item.value.trim() : "";
}

function displayValue(item, raw) {
  if (raw) return raw.replace(/^mailto:/i, "");
  if (item.kind === "email") return "Add your email";
  if (item.kind === "github") return "Add your GitHub URL";
  if (item.kind === "facebook") return "Add your Facebook URL";
  return "Add your LinkedIn URL";
}

export default function SocialList({ variant = "panel" }) {
  return (
    <ul className={`social-list social-${variant}`}>
      {LINKS.map((item) => {
        const raw = rawValue(item);
        const href = toHref(item.kind, raw);
        const content = (
          <>
            <span className="social-icon">
              {item.kind === "email" ? <Mail size={18} aria-hidden="true" /> : <BrandIcon name={item.id} />}
            </span>
            <span className="social-copy">
              <span className="social-label">{item.label}</span>
              <span className="social-value">{displayValue(item, raw)}</span>
            </span>
            {!href && raw ? <span className="placeholder-tag">Add link</span> : null}
          </>
        );

        return (
          <li key={item.id}>
            {href ? (
              <a className="social-link" href={href}
                {...(href.startsWith("mailto:")
                  ? {}
                  : { target: "_blank", rel: "noreferrer noopener" })}
              >
                {content}
                {href.startsWith("mailto:") ? null : (
                  <span className="sr-only"> (opens in a new tab)</span>
                )}
              </a>
            ) : (
              <div className="social-link is-static">{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
