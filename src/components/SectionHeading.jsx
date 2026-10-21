export default function SectionHeading({ index, code, eyebrow, title, children }) {
  return (
    <header className="section-head">
      <div className="section-kicker">
        <span className="section-index">{index}</span>
        <span className="section-code">{code}</span>
        <span className="section-rule" aria-hidden="true" />
        <span className="section-eye">{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      {children ? <p className="section-lead">{children}</p> : null}
    </header>
  );
}
