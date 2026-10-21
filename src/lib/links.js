const BLOCKED = [
  "example.com",
  "example.org",
  "your-username",
  "your-profile",
  "yourname",
  "your-name",
  "placeholder",
];

function isBlocked(value) {
  const haystack = value.toLowerCase();
  return BLOCKED.some((token) => haystack.includes(token));
}

export function isLiveHref(href) {
  if (typeof href !== "string") return false;
  const value = href.trim();
  if (!value || isBlocked(value)) return false;

  if (value.startsWith("mailto:")) {
    const address = value.slice("mailto:".length).split("?")[0];
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address);
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function toHref(kind, value) {
  const raw = typeof value === "string" ? value.trim() : "";
  if (!raw) return "";

  if (kind === "email") {
    const href = raw.startsWith("mailto:") ? raw : `mailto:${raw}`;
    return isLiveHref(href) ? href : "";
  }

  const href = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return isLiveHref(href) ? href : "";
}
