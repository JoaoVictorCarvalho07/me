import type { ExperienceItem } from "@/content/experience";

export function GitLog({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="gitlog">
      {items.map((item) => (
        <li
          key={item.title}
          className={`commit${item.head ? " head" : ""}${item.init ? " init" : ""}`}
          data-reveal
        >
          <div className="c-meta">
            {item.ref ? <span className="ref">{item.ref}</span> : null}
            <span className="ty">{item.type}</span>
            <span>{item.when}</span>
          </div>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          {item.badges ? (
            <div className="badges">
              {item.badges.map((badge) => (
                <span key={badge} className="badge">
                  {badge}
                </span>
              ))}
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
