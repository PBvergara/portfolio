import { about, stats } from "../data/site";
import SocialList from "./SocialList";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <section className="side-card" aria-labelledby="stats-title">
        <h2 id="stats-title">Overview</h2>
        <ul className="stat-list">
          {stats.map((item) => (
            <li key={item.label} className={/^\d+$/.test(item.value) ? undefined : "is-text"}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </li>
          ))}
        </ul>
      </section>

      <section className="side-card" aria-labelledby="social-title">
        <h2 id="social-title">Connect</h2>
        <SocialList />
      </section>

      <section className="side-card" aria-labelledby="notes-title">
        <h2 id="notes-title">Notes</h2>
        <ul className="note-list">
          {about.cards.map((card) => (
            <li key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
