import { useEffect, useState } from "react";

// Short power-on log. Any key or click skips it.
export default function Boot({ name, onDone }) {
  const operator = name.toLowerCase().replace(/\s+/g, "_");
  const lines = ["mounting /portfolio", `loading operator ${operator}`, "linking hologram", "opening secure channel"];
  const [n, setN] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) onDone(); }, []); // eslint-disable-line
  useEffect(() => {
    const t = setTimeout(() => (n < lines.length ? setN(n + 1) : setOut(true)), n < lines.length ? 320 : 450);
    return () => clearTimeout(t);
  }, [n]); // eslint-disable-line
  useEffect(() => {
    if (!out) return;
    const t = setTimeout(onDone, 350);
    return () => clearTimeout(t);
  }, [out]); // eslint-disable-line
  useEffect(() => {
    const skip = () => setOut(true);
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => { window.removeEventListener("keydown", skip); window.removeEventListener("pointerdown", skip); };
  }, []);

  return (
    <div className={`boot${out ? " out" : ""}`} role="status" aria-label="Starting portfolio">
      <pre>
        {lines.slice(0, n).map((l) => <div key={l}><b>[ ok ]</b> {l}</div>)}
        <div>{n >= lines.length ? <span className="ready">system online</span> : "..."}<span className="cursor" /></div>
      </pre>
      <small>press any key to skip</small>
    </div>
  );
}
