import { useEffect, useState } from "react";
import TypedText from "./TypedText.jsx";
import NavButton from "./NavButton.jsx";
import SkillIcon from "./SkillIcon.jsx";

export default function Screen({
  model,
  index,
  total,
  projIdx,
  projCount,
  onOk,
  onBack,
  onProj,
  onRestart,
}) {
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(false);
  const [showTech, setShowTech] = useState(false);

  const first = index === 0;
  const last = index === total - 1;
  const isProjects = model.id === "projects";
  const isSkills = model.id === "skills";

  useEffect(() => {
    const handleKeyDown = (e) => {
      const target = e.target;
      const onControl =
        target instanceof Element &&
        target.closest("a, button, input, textarea, select");

      if (!done) {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          setSkip(true);
        }
        return;
      }

      if ((e.key === "Escape" || e.key === "Backspace") && !first) {
        e.preventDefault();
        onBack();
      } else if (onControl) {
        return;
      } else if (e.key === "Enter" && !last) {
        onOk();
      } else if (isProjects && e.key === "ArrowRight") {
        onProj(1);
      } else if (isProjects && e.key === "ArrowLeft") {
        onProj(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [done, first, last, isProjects, onBack, onOk, onProj]);

  const title = `> ${model.title}`;

  return (
    <div className="screen">
      <div className="title-row">
        <h2 className="screen-title" data-text={title}>
          {title}
        </h2>

        {isProjects && (
          <span className="pager" aria-hidden="true">
            {Array.from({ length: projCount }, (_, i) => (
              <i
                key={i}
                className={i === projIdx ? "on" : ""}
              />
            ))}
          </span>
        )}
      </div>

      <TypedText
        text={model.text}
        skip={skip}
        onDone={() => setDone(true)}
        lead={model.id === "intro" || isProjects}
      />

      {!done && (
        <button
          className="skip"
          type="button"
          onClick={() => setSkip(true)}
        >
          SKIP [SPACE]
        </button>
      )}

      {done && isSkills && (
        <div className="skills-grid">
          {model.skills.map((skill, i) => (
            <div
              className="skill-card"
              key={skill}
              style={{ "--i": i }}
            >
              <SkillIcon name={skill} />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      )}

      {done && model.links.length > 0 && (
        <nav className="links fade" aria-label="Links">
          {model.links.map((link, i) => (
            <NavButton key={i} {...link} />
          ))}
        </nav>
      )}

      {done && isProjects && (
        <div className="project-tech-panel fade">
          <NavButton
            label={showTech ? "HIDE TECH ▲" : "VIEW TECH STACK"}
            expanded={showTech}
            onClick={() => setShowTech((prev) => !prev)}
          />

          {showTech && (
            <div className="project-tech-details">
              <strong>TECH STACK //</strong>
              <div className="chips">
                {(model.techText || "Technologies not configured.")
                  .split(/,\s*/)
                  .map((tech, i) => (
                    <span
                      className="chip"
                      key={`${tech}-${i}`}
                      style={{ "--i": i }}
                    >
                      {tech}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {done && (
        <div className="actions fade">
          {model.downloads.map((link, i) => (
            <NavButton key={i} {...link} download />
          ))}

          {isProjects && (
            <>
              <NavButton
                label="PREVIOUS PROJECT"
                hint="←"
                onClick={() => onProj(-1)}
                disabled={projIdx === 0}
              />
              <NavButton
                label="NEXT PROJECT"
                hint="→"
                onClick={() => onProj(1)}
                disabled={projIdx >= projCount - 1}
              />
            </>
          )}

          {!first && (
            <NavButton
              label="BACK"
              hint="esc"
              onClick={onBack}
            />
          )}

          {!last && (
            <NavButton
              label={first ? "OK / INITIALIZE" : "OK"}
              hint="↵"
              onClick={onOk}
              primary
            />
          )}

          {last && (
            <NavButton
              label="RESTART EXPERIENCE"
              onClick={onRestart}
              primary
            />
          )}
        </div>
      )}
    </div>
  );
}
