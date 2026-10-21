import { useState } from "react";
/* CHARACTER PLACEHOLDER. Replace by putting your SVG at public/character.svg
   (path set in src/data/portfolio.js). No code change needed here.
   Until the file exists, a subtle outline silhouette is shown. */
export default function CharacterSlot({ src }) {
  const [failed, setFailed] = useState(false);
  return (
    <aside className="character" aria-label="Character area">
      <div className="character-float">
        {!failed ? (
          <img src={src} alt="Hacker character" onError={() => setFailed(true)} />
        ) : (
          <svg className="silhouette" viewBox="0 0 120 300" role="img" aria-label="Character placeholder">
            <circle cx="60" cy="40" r="26" />
            <path d="M60 66 C20 70 24 150 30 170 L36 280 H56 V200 H64 V280 H84 L90 170 C96 150 100 70 60 66Z" />
          </svg>
        )}

      </div>
      <div className="character-glow" />
    </aside>
  );
}
