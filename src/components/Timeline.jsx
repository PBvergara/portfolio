import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { timeline } from "../data/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function CertificateModal({ certificates, onClose }) {
  const [index, setIndex] = useState(0);
  const [showPost, setShowPost] = useState(false);
  const closeRef = useRef(null);
  const count = certificates.length;
  const current = certificates[index];

  useEffect(() => {
    setShowPost(false);
  }, [index]);

  useEffect(() => {
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setIndex((value) => (value + 1) % count);
      if (event.key === "ArrowLeft") setIndex((value) => (value - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [count, onClose]);

  const show = (step) => setIndex((value) => (value + step + count) % count);

  return createPortal(
    <div className="showcase cert-modal" role="dialog" aria-modal="true" aria-label="Certificates" onClick={onClose}>
      <div className="showcase-panel" onClick={(event) => event.stopPropagation()}>
        <div className="showcase-top">
          <p>
            {current.title}
            <span>{index + 1} / {count}</span>
          </p>
          <button ref={closeRef} type="button" className="showcase-close" aria-label="Close certificates" onClick={onClose}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="showcase-stage">
          <button type="button" className="showcase-arrow" aria-label="Previous certificate" onClick={() => show(-1)}>
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          {showPost && current.post ? (
            <div className="fb-frame">
              <iframe
                title="PSITE Region 3 Facebook post"
                src={current.post.embed}
                scrolling="yes"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            <img className="is-doc" src={current.src} alt={current.alt} />
          )}
          <button type="button" className="showcase-arrow" aria-label="Next certificate" onClick={() => show(1)}>
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
        {current.verifyUrl ? (
          <div className="cert-verify-row">
            <a className="btn btn-primary cert-verify" href={current.verifyUrl} target="_blank" rel="noreferrer noopener">
              Verify on Credly
              <ArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        ) : null}
        {current.post ? (
          <div className="cert-verify-row">
            <button type="button" className="btn btn-primary cert-verify" onClick={() => setShowPost((value) => !value)}>
              {showPost ? "View contents page" : "View Facebook post"}
            </button>
            {showPost ? (
              <p className="fb-note">
                {current.post.note}{" "}
                <a href={current.post.href} target="_blank" rel="noreferrer noopener">
                  Open on Facebook
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            ) : null}
          </div>
        ) : null}
        <div className="showcase-thumbs" role="tablist" aria-label="Certificates">
          {certificates.map((item, imageIndex) => (
            <button
              key={item.src}
              type="button"
              className={imageIndex === index ? "is-on" : undefined}
              aria-label={item.title}
              aria-selected={imageIndex === index}
              onClick={() => setIndex(imageIndex)}
            >
              <img src={item.src} alt="" />
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function Timeline() {
  const [open, setOpen] = useState(false);
  const certificates = timeline.find((item) => item.certificates)?.certificates ?? [];

  return (
    <section id="experience" className="section section-path">
      <div className="container">
        <Reveal>
          <SectionHeading index="04" code="PATH LOG" eyebrow="Records" title="Experience and Education">
            School, the systems I have built, and the records that go with them.
          </SectionHeading>
        </Reveal>
        <ol className="timeline">
          {timeline.map((item, index) => (
            <Reveal key={item.id} as="li" className="timeline-item" delay={index * 50}>
              <article className="log-card">
                <p className="kind">{item.kind}</p>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                {item.certificates ? (
                  <button type="button" className="btn btn-primary cert-btn" onClick={() => setOpen(true)}>
                    View Certificates
                  </button>
                ) : null}
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
      {open ? <CertificateModal certificates={certificates} onClose={() => setOpen(false)} /> : null}
    </section>
  );
}
