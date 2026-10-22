<<<<<<< HEAD
import { useRef, useState } from "react";
=======
import { useState } from "react";
>>>>>>> 5a35a8112dcc4dff2f1779499838c205fa230680
import { portfolio } from "./data/portfolio.js";
import { SCREENS, buildScreen } from "./screens.js";
import CharacterSlot from "./components/CharacterSlot.jsx";
import Terminal from "./components/Terminal.jsx";
import Screen from "./components/Screen.jsx";
<<<<<<< HEAD
import Boot from "./components/Boot.jsx";
import DataRain from "./components/DataRain.jsx";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [index, setIndex] = useState(0);
  const [proj, setProj] = useState(0);
  const stage = useRef(null);
=======

export default function App() {
  const [index, setIndex] = useState(0);
  const [proj, setProj] = useState(0);
>>>>>>> 5a35a8112dcc4dff2f1779499838c205fa230680
  const id = SCREENS[index];
  const count = portfolio.projects.length;
  const model = { id, ...buildScreen(id, portfolio, proj) };

<<<<<<< HEAD
  // Cursor position drives the lit-up grid (no React re-render).
  const onMove = (e) => {
    const s = stage.current;
    if (!s) return;
    s.style.setProperty("--mx", e.clientX + "px");
    s.style.setProperty("--my", e.clientY + "px");
  };

  return (
    <>
      <DataRain />
      {!booted ? (
        <Boot name={portfolio.intro.name} onDone={() => setBooted(true)} />
      ) : (
        <main className="stage" ref={stage} onPointerMove={onMove}>
          <CharacterSlot src={portfolio.characterSvg} name={portfolio.intro.name} section={id} />
          <Terminal step={index} total={SCREENS.length} id={id}>
            <Screen key={`${id}-${proj}`} model={model} index={index} total={SCREENS.length}
              projIdx={proj} projCount={count}
              onOk={() => setIndex((i) => Math.min(i + 1, SCREENS.length - 1))}
              onBack={() => setIndex((i) => Math.max(i - 1, 0))}
              onProj={(d) => setProj((p) => Math.min(Math.max(p + d, 0), count - 1))}
              onRestart={() => { setProj(0); setIndex(0); }} />
          </Terminal>
        </main>
      )}
    </>
=======
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
>>>>>>> 5a35a8112dcc4dff2f1779499838c205fa230680
  );
}
