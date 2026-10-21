import { useEffect, useRef, useState } from "react";

function shownOnLoad() {
  if (typeof window === "undefined") return false;
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  return motion.matches || typeof IntersectionObserver === "undefined";
}

export default function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(shownOnLoad);

  useEffect(() => {
    if (visible) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  const classes = `reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`;

  return (
    <Tag ref={ref} className={classes} style={{ "--delay": `${delay}ms` }}>
      {children}
    </Tag>
  );
}
