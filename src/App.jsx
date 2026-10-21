import { useState } from "react";
import { portfolio } from "./data/portfolio.js";
import { SCREENS, buildScreen } from "./screens.js";
import CharacterSlot from "./components/CharacterSlot.jsx";
import Terminal from "./components/Terminal.jsx";
import Screen from "./components/Screen.jsx";

export default function App() {
  const [index, setIndex] = useState(0);
  const [proj, setProj] = useState(0);
  const id = SCREENS[index];
  const count = portfolio.projects.length;
  const model = { id, ...buildScreen(id, portfolio, proj) };

  return (
    <main className="stage">
      <CharacterSlot src={portfolio.characterSvg} />
      <Terminal step={index} total={SCREENS.length}>
        <Screen key={`${id}-${proj}`} model={model} index={index} total={SCREENS.length}
          projIdx={proj} projCount={count}
          onOk={() => setIndex((i) => Math.min(i + 1, SCREENS.length - 1))}
          onBack={() => setIndex((i) => Math.max(i - 1, 0))}
          onProj={(d) => setProj((p) => Math.min(Math.max(p + d, 0), count - 1))}
          onRestart={() => { setProj(0); setIndex(0); }} />
      </Terminal>
    </main>
  );
}
