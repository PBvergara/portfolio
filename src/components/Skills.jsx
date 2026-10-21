import { skillGroups, skillsNote } from "../data/site";
import Icon from "./Icon";

export default function Skills() {
  return (
    <section id="skills" className="skills-section" aria-labelledby="skills-heading">
      <div className="section-label">
        <h2 id="skills-heading">Skills</h2>
        <p>{skillsNote}</p>
      </div>
      <div className="skill-grid">
        {skillGroups.map((group) => (
          <article className="skill-card" key={group.id}>
            <h3>
              <Icon name={group.icon} size={14} />
              {group.title}
            </h3>
            <ul className="tech-list" aria-label={group.title}>
              {group.items.map((item) => (
                <li key={item.name}>
                  <Icon name={item.icon} size={14} />
                  {item.name}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
