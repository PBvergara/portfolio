import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { projects } from "../data/site";
import { isLiveHref } from "../lib/links";
import ProjectPreview from "./ProjectPreview";

function shortest(from, to, count) {
  let delta = to - from;
  delta = ((delta % count) + count) % count;
  if (delta > count / 2) delta -= count;
  return delta;
}

function ProjectLink({ href, children }) {
  const noteId = useId();
  const [open, setOpen] = useState(false);

  if (isLiveHref(href)) {
    return (
      <a className="btn btn-ghost" href={href} target="_blank" rel="noreferrer noopener">
        {children}
        <ArrowUpRight size={14} aria-hidden="true" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <div className="action-slot">
      <button
        type="button"
        className="btn btn-ghost"
        aria-expanded={open}
        aria-controls={noteId}
        onClick={() => setOpen((value) => !value)}
      >
        {children}
      </button>
      <p id={noteId} className="pending-note" hidden={!open}>
        Add this URL in src/data/site.js. This placeholder does not open a page.
      </p>
    </div>
  );
}

function ProjectShowcase({ title, images, onClose }) {
  const [index, setIndex] = useState(0);
  const closeRef = useRef(null);
  const count = images.length;

  useEffect(() => {
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setIndex((current) => (current + 1) % count);
      if (event.key === "ArrowLeft") setIndex((current) => (current - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [count, onClose]);

  const show = (step) => setIndex((current) => (current + step + count) % count);

  return createPortal(
    <div className="showcase" role="dialog" aria-modal="true" aria-label={`${title} showcase`} onClick={onClose}>
      <div className="showcase-panel" onClick={(event) => event.stopPropagation()}>
        <div className="showcase-top">
          <p>
            {title}
            <span>{index + 1} / {count}</span>
          </p>
          <button ref={closeRef} type="button" className="showcase-close" aria-label="Close showcase" onClick={onClose}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="showcase-stage">
          <button type="button" className="showcase-arrow" aria-label="Previous image" onClick={() => show(-1)}>
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <img src={images[index]} alt={`${title} screen ${index + 1}`} />
          <button type="button" className="showcase-arrow" aria-label="Next image" onClick={() => show(1)}>
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="showcase-thumbs" role="tablist" aria-label="Showcase images">
          {images.map((src, imageIndex) => (
            <button
              key={src}
              type="button"
              className={imageIndex === index ? "is-on" : undefined}
              aria-label={`Show image ${imageIndex + 1}`}
              aria-selected={imageIndex === index}
              onClick={() => setIndex(imageIndex)}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function ProjectDetails({ project }) {
  const stackId = useId();
  const [open, setOpen] = useState(false);
  const [showcase, setShowcase] = useState(false);
  const gallery = project.gallery ?? [];

  useEffect(() => {
    setOpen(false);
    setShowcase(false);
  }, [project.id]);

  return (
    <article className="shot reel-detail" aria-live="polite">
      <div className="shot-body">
        <p className="shot-cat">{project.category || "Project"}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="detail-actions">
          <button
            type="button"
            className="btn btn-ghost stack-toggle"
            aria-expanded={open}
            aria-controls={stackId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Hide Tech Stack" : "View Tech Stack"}
          </button>
          {gallery.length > 0 && !isLiveHref(project.liveUrl) ? (
            <button type="button" className="btn btn-ghost" onClick={() => setShowcase(true)}>
              View Project
            </button>
          ) : (
            <ProjectLink href={project.liveUrl}>View Project</ProjectLink>
          )}
        </div>
        <div id={stackId} hidden={!open}>
          {project.stack.length > 0 ? (
            <div className="stack-groups">
              {project.stack.map((group) => (
                <div className="stack-group" key={group.name}>
                  <p className="stack-label">{group.name}</p>
                  <ul className="stack" aria-label={`${project.title} ${group.name}`}>
                    {group.items.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="stack-empty">Technology stack not added yet.</p>
          )}
        </div>
      </div>
      {showcase ? (
        <ProjectShowcase title={project.title} images={gallery} onClose={() => setShowcase(false)} />
      ) : null}
    </article>
  );
}

export default function Projects() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeRef = useRef(0);
  const visualRef = useRef(0);
  const stageRef = useRef(null);
  const cardsRef = useRef([]);
  const dragRef = useRef(null);
  const suppressClick = useRef(false);
  const manualRef = useRef(false);
  const count = projects.length;

  const choose = (index) => {
    const next = (index + count) % count;
    activeRef.current = next;
    setActive(next);
  };

  const chooseManual = (index) => {
    manualRef.current = true;
    setPaused(true);
    choose(index);
  };

  useEffect(() => {
    let frame = 0;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!dragRef.current) {
        const delta = shortest(visualRef.current, activeRef.current, count);
        const step = delta * Math.min(1, dt * 3.4);
        visualRef.current += Math.abs(delta) < 0.004 ? delta : step;
      }

      const stage = stageRef.current;
      const narrow = stage ? stage.clientWidth < 640 : false;
      const radius = stage ? Math.min(narrow ? 118 : 348, stage.clientWidth * (narrow ? 0.3 : 0.37)) : 260;
      const platform = stage?.querySelector(".reel-platform");
      const rim = stage?.querySelector(".plat-outer");
      const surface = platform && rim
        ? platform.offsetTop + rim.offsetTop + rim.offsetHeight * 0.66
        : 250;
      let frontIndex = 0;
      let frontFacing = -Infinity;
      cardsRef.current.forEach((node, index) => {
        if (!node) return;
        const facing = Math.cos(((index - visualRef.current) / count) * Math.PI * 2);
        if (facing > frontFacing) {
          frontFacing = facing;
          frontIndex = index;
        }
      });
      cardsRef.current.forEach((node, index) => {
        if (!node) return;
        const angle = ((index - visualRef.current) / count) * Math.PI * 2;
        const facing = Math.cos(angle);
        const behind = Math.max(0, -facing);
        const scale = 0.6 + Math.max(0, facing) ** 2 * 0.52 - behind * 0.08;
        const floor = surface - node.offsetTop - node.offsetHeight;
        const backFade = Math.min(1, Math.max(0, (0.15 - facing) / 0.28));
        node.style.transform = `translate(-50%, 0) translateX(${Math.sin(angle) * radius}px) translateY(${floor}px) scale(${scale})`;
        node.style.zIndex = String(Math.round(30 + facing * 24));
        node.style.opacity = String(1 - backFade);
        node.style.visibility = backFade > 0.98 ? "hidden" : "visible";
        node.classList.toggle("is-front", index === frontIndex);
      });
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [count]);

  useEffect(() => {
    if (paused || manualRef.current) return undefined;
    const timer = window.setInterval(() => choose((activeRef.current + 1) % count), 4800);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  const beginDrag = (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    const card = event.target.closest?.(".reel-card");
    dragRef.current = {
      x: event.clientX,
      start: visualRef.current,
      moved: false,
      index: card ? Number(card.dataset.index) : null,
    };
    setPaused(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const moveDrag = (event) => {
    const drag = dragRef.current;
    const stage = stageRef.current;
    if (!drag || !stage) return;
    const dx = event.clientX - drag.x;
    if (Math.abs(dx) > 8) drag.moved = true;
    const narrow = stage.clientWidth < 640;
    const radius = Math.min(narrow ? 118 : 348, stage.clientWidth * (narrow ? 0.3 : 0.37)) || 260;
    visualRef.current = drag.start - dx / radius;
  };

  const endDrag = (event) => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    if (drag.moved) {
      suppressClick.current = true;
      const dx = event.clientX - drag.x;
      const steps = Math.abs(dx) > 36 ? Math.round(Math.abs(dx) / 140) || 1 : 0;
      if (steps > 0) chooseManual(activeRef.current + (dx < 0 ? steps : -steps));
      else chooseManual(Math.round(visualRef.current));
      return;
    }
    if (Number.isInteger(drag.index)) {
      suppressClick.current = true;
      chooseManual(drag.index);
      return;
    }
    if (!manualRef.current) setPaused(false);
  };

  const current = projects[active];

  return (
    <section id="projects" className="gallery-section" aria-labelledby="projects-title">
      <div className="section-label">
        <h2 id="projects-title">Projects</h2>
      </div>
      <div className="reel">
        <div
          className="reel-stage"
          ref={stageRef}
          aria-roledescription="carousel"
          onPointerDown={beginDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div className="reel-platform" aria-hidden="true">
            <span className="plat-glow" />
            <span className="plat-ring plat-outer" />
            <span className="plat-ring plat-track" />
            <span className="plat-ring plat-inner" />
          </div>
          <button
            type="button"
            className="reel-arrow reel-arrow-prev"
            aria-label="Previous project"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => chooseManual(active - 1)}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="reel-arrow reel-arrow-next"
            aria-label="Next project"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => chooseManual(active + 1)}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              className="reel-card"
              data-index={index}
              ref={(node) => {
                cardsRef.current[index] = node;
              }}
              aria-label={`Show ${project.title}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => {
                if (suppressClick.current) {
                  suppressClick.current = false;
                  return;
                }
                chooseManual(index);
              }}
            >
              <ProjectPreview variant={project.preview} image={project.image} title={project.title} plate={project.imagePlate} />
              <span className="reel-copy">
                <span className="reel-name">{project.title}</span>
                <span className="reel-kind">{project.category}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="reel-dots">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              className={index === active ? "is-on" : undefined}
              aria-label={`Show ${project.title}`}
              onClick={() => chooseManual(index)}
            />
          ))}
        </div>
      </div>
      <div
        onMouseEnter={() => {
          if (!manualRef.current) setPaused(true);
        }}
        onMouseLeave={() => {
          if (!manualRef.current) setPaused(false);
        }}
        onFocus={() => {
          if (!manualRef.current) setPaused(true);
        }}
        onBlur={(event) => {
          if (!manualRef.current && !event.currentTarget.contains(event.relatedTarget)) setPaused(false);
        }}
      >
        <ProjectDetails project={current} />
      </div>
    </section>
  );
}
