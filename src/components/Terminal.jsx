<<<<<<< HEAD
import { useEffect, useState } from "react";
const p2 = (n) => String(n).padStart(2, "0");

// Terminal window frame: chamfered edge, progress rail, live status footer.
export default function Terminal({ step, total, id, children }) {
  const [up, setUp] = useState(0);
  useEffect(() => { const t = setInterval(() => setUp((s) => s + 1), 1000); return () => clearInterval(t); }, []);
  const keys = [["space", "skip"], ["enter", "next"], ["esc", "back"], ...(id === "projects" ? [["← →", "project"]] : [])];
  return (
    <section className="terminal" aria-label="Information terminal">
      <i className="corner tl" /><i className="corner br" />
      <div className="frame"><div className="frame-in">
        <header className="term-bar">
          <span className="dots"><b /><b /><b /></span>
          <span className="prompt"><em>root@portfolio</em>:<u>~/{id}</u>$</span>
          <span className="step">{p2(step + 1)}/{p2(total)}</span>
        </header>
        <div className="rail" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => <i key={i} className={i < step ? "on" : i === step ? "now" : ""} />)}
        </div>
        <div className="term-body">{children}</div>
        <footer className="term-foot">
          <span className="link"><b />link secure</span>
          <span className="keys">{keys.map(([k, v]) => <span key={k}><kbd>{k}</kbd> {v}</span>)}</span>
          <span>uptime {p2(Math.floor(up / 60))}:{p2(up % 60)}</span>
        </footer>
      </div></div>
=======
// Terminal window frame with HUD decorations.
export default function Terminal({ step, total, children }) {
  return (
    <section className="terminal" aria-label="Information terminal">
      <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
      <header className="term-bar">
        <span className="dots"><b /><b /><b /></span>
        <span>root@portfolio:~$</span>
        <span className="step">{String(step + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}</span>
      </header>
      <div className="term-body">{children}</div>
>>>>>>> 5a35a8112dcc4dff2f1779499838c205fa230680
    </section>
  );
}
