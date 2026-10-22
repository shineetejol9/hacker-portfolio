import { useState } from "react";
<<<<<<< HEAD
/* Put your character art at the path set in src/data/portfolio.js (characterSvg).
   If it fails to load, an outline silhouette is shown instead. */
export default function CharacterSlot({ src, name, section }) {
  const [failed, setFailed] = useState(false);
  return (
    <aside className="character" aria-label="Character area">
      <div className="holo-beam" />
      <div className="hud-tag" key={section} aria-hidden="true">
        <span>operator</span><b>{name}</b><span className="mod">module/{section}</span>
      </div>
=======
/* CHARACTER PLACEHOLDER. Replace by putting your SVG at public/character.svg
   (path set in src/data/portfolio.js). No code change needed here.
   Until the file exists, a subtle outline silhouette is shown. */
export default function CharacterSlot({ src }) {
  const [failed, setFailed] = useState(false);
  return (
    <aside className="character" aria-label="Character area">
>>>>>>> 5a35a8112dcc4dff2f1779499838c205fa230680
      <div className="character-float">
        {!failed ? (
          <img src={src} alt="Hacker character" onError={() => setFailed(true)} />
        ) : (
          <svg className="silhouette" viewBox="0 0 120 300" role="img" aria-label="Character placeholder">
            <circle cx="60" cy="40" r="26" />
            <path d="M60 66 C20 70 24 150 30 170 L36 280 H56 V200 H64 V280 H84 L90 170 C96 150 100 70 60 66Z" />
          </svg>
        )}
<<<<<<< HEAD
      </div>
      <svg className="pad" viewBox="0 0 300 90" aria-hidden="true">
        <defs>
          <radialGradient id="padg"><stop offset="0" stopColor="#22e6ff" stopOpacity=".5" /><stop offset="1" stopColor="#22e6ff" stopOpacity="0" /></radialGradient>
        </defs>
        <ellipse cx="150" cy="45" rx="140" ry="38" fill="url(#padg)" />
        <ellipse className="r1" cx="150" cy="45" rx="140" ry="38" />
        <ellipse className="r2" cx="150" cy="45" rx="108" ry="29" />
        <ellipse className="r3" cx="150" cy="45" rx="70" ry="18" />
      </svg>
=======

      </div>
      <div className="character-glow" />
>>>>>>> 5a35a8112dcc4dff2f1779499838c205fa230680
    </aside>
  );
}
