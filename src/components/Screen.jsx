import { useEffect, useState } from "react";
import TypedText from "./TypedText.jsx";
import NavButton from "./NavButton.jsx";
<<<<<<< HEAD
import SkillIcon from "./SkillIcon.jsx";
=======
>>>>>>> 5a35a8112dcc4dff2f1779499838c205fa230680

// One section. Parent remounts it (via key) on every screen/project change.
export default function Screen({ model, index, total, projIdx, projCount, onOk, onBack, onProj, onRestart }) {
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(false);
  const [showTech, setShowTech] = useState(false);
  const first = index === 0;
  const last = index === total - 1;
  const isProjects = model.id === "projects";
  const isSkills = model.id === "skills";

  useEffect(() => {
    const h = (e) => {
      const onCtl = e.target.closest && e.target.closest("a,button");
      if (!done) {
        if (e.key === " " || e.key === "Enter") { e.preventDefault(); setSkip(true); }
        return;
      }
      if ((e.key === "Escape" || e.key === "Backspace") && !first) { e.preventDefault(); onBack(); }
      else if (onCtl) return;
      else if (e.key === "Enter" && !last) onOk();
      else if (isProjects && e.key === "ArrowRight") onProj(1);
      else if (isProjects && e.key === "ArrowLeft") onProj(-1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

<<<<<<< HEAD
  const title = `> ${model.title}`;
  return (
    <div className="screen">
      <div className="title-row">
        <h2 className="screen-title" data-text={title}>{title}</h2>
        {isProjects && (
          <span className="pager" aria-hidden="true">
            {Array.from({ length: projCount }, (_, i) => <i key={i} className={i === projIdx ? "on" : ""} />)}
          </span>
        )}
      </div>
      <TypedText text={model.text} skip={skip} onDone={() => setDone(true)} lead={model.id === "intro" || isProjects} />
      {done && isSkills && (
        <div className="skills-grid">
          {model.skills.map((skill, i) => (
            <div className="skill-card" key={skill} style={{ "--i": i }}>
              <SkillIcon name={skill} />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      )}
=======
  return (
    <div className="screen">
      <h2 className="screen-title">{"> "}{model.title}</h2>
      <TypedText text={model.text} skip={skip} onDone={() => setDone(true)} />
        {done && isSkills && (
  <div className="skills-grid">
    {model.skills.map((skill) => (
      <div className="skill-card" key={skill}>
        <div className="skill-icon">
          {({
            "HTML5": "🌐",
            "JavaScript (JS)": "🟨",
            "Tailwind CSS": "💨",
            "React / Next.js": "⚛️",
            "Node.js": "🟢",
            "Python": "🐍",
            "Data Science": "📊",
            "MongoDB": "🍃",
          })[skill]}
        </div>
        <span>{skill}</span>
      </div>
    ))}
  </div>
)}
>>>>>>> 5a35a8112dcc4dff2f1779499838c205fa230680
      {!done && <button className="skip" onClick={() => setSkip(true)}>SKIP [SPACE]</button>}
      {done && model.links.length > 0 && (
        <nav className="links fade" aria-label="Links">
          {model.links.map((l, i) => <NavButton key={i} {...l} />)}
        </nav>
      )}
      {done && isProjects && (
        <div className="project-tech-panel fade">
<<<<<<< HEAD
          <NavButton label={showTech ? "HIDE TECH ▲" : "VIEW TECH STACK"} expanded={showTech}
            onClick={() => setShowTech((prev) => !prev)} />
          {showTech && (
            <div className="project-tech-details">
              <strong>TECH STACK //</strong>
              <div className="chips">
                {(model.techText || "Technologies not configured.").split(/,\s*/).map((t, i) => (
                  <span className="chip" key={t} style={{ "--i": i }}>{t}</span>
                ))}
              </div>
=======
          <button
            className="btn"
            type="button"
            onClick={() => setShowTech((prev) => !prev)}
            aria-expanded={showTech}
          >
            {showTech ? "HIDE TECH ▲" : "VIEW TECH STACK"}
          </button>
          {showTech && (
            <div className="project-tech-details">
              <strong>TECH STACK //</strong>
              <p>{model.techText || "Technologies not configured."}</p>
>>>>>>> 5a35a8112dcc4dff2f1779499838c205fa230680
            </div>
          )}
        </div>
      )}
      {done && (
        <div className="actions fade">
          {model.downloads.map((l, i) => <NavButton key={i} {...l} download />)}
<<<<<<< HEAD
          {isProjects && <NavButton label="PREVIOUS PROJECT" hint="←" onClick={() => onProj(-1)} disabled={projIdx === 0} />}
          {isProjects && <NavButton label="NEXT PROJECT" hint="→" onClick={() => onProj(1)} disabled={projIdx >= projCount - 1} />}
          {!first && <NavButton label="BACK" hint="esc" onClick={onBack} />}
          {!last && <NavButton label={first ? "OK / INITIALIZE" : "OK"} hint="↵" onClick={onOk} primary />}
=======
          {isProjects && <NavButton label="PREVIOUS PROJECT" onClick={() => onProj(-1)} disabled={projIdx === 0} />}
          {isProjects && <NavButton label="NEXT PROJECT" onClick={() => onProj(1)} disabled={projIdx >= projCount - 1} />}
          {!first && <NavButton label="BACK" onClick={onBack} />}
          {!last && <NavButton label={first ? "OK / INITIALIZE" : "OK"} onClick={onOk} primary />}
>>>>>>> 5a35a8112dcc4dff2f1779499838c205fa230680
          {last && <NavButton label="RESTART EXPERIENCE" onClick={onRestart} primary />}
        </div>
      )}
    </div>
  );
}
