import { useEffect, useMemo, useState } from "react";
<<<<<<< HEAD

const HL = /^(CGPA|Average|Percentage):/;
// Splits text into reveal-tokens (word + trailing space) and tags each with a style class.
function tokenize(text, lead) {
  const out = [];
  const push = (s, c = "") => (s.match(/\s*\S+\s*|\s+/g) || []).forEach((t) => out.push({ t, c }));
  const pipes = (s) => s.split(/(\|)/).forEach((q) => q && push(q, q === "|" ? "t-sep" : ""));
  const lines = text.split("\n");
  let pos = -1; // line position inside a "[01]" block
  lines.forEach((line, i) => {
    if (!line.trim()) { pos = -1; if (out.length) out[out.length - 1].t += "\n"; return; }
    const idx = line.match(/^\[\d+\]\s*/);
    pos = idx ? 0 : pos >= 0 ? pos + 1 : -1;
    if (idx) { push(idx[0], "t-idx"); push(line.slice(idx[0].length), "t-h"); }
    else if (lead && i === 0) push(line, "t-lead");
    else if (HL.test(line)) push(line, "t-hl");
    else if (pos === 1) push(line, "t-sub");
    else if (pos > 1) push(line, "t-dim");
    else {
      const k = line.match(/^[A-Z][A-Z ]{2,}:/);
      if (k) { push(k[0], "t-key"); pipes(line.slice(k[0].length)); } else pipes(line);
    }
    if (i < lines.length - 1) out[out.length - 1].t += "\n";
  });
  return out;
}

// Reveals text one word at a time. `skip` completes instantly. Calls onDone once finished.
export default function TypedText({ text, skip, onDone, lead = false, speed = 55 }) {
  const toks = useMemo(() => tokenize(text, lead), [text, lead]);
  const [n, setN] = useState(0);
  const done = n >= toks.length;

  useEffect(() => { if (skip) setN(toks.length); }, [skip, toks.length]);
=======
// Reveals text one word at a time. `skip` completes instantly. Calls onDone once finished.
export default function TypedText({ text, skip, onDone, speed = 55 }) {
  const words = useMemo(() => text.match(/\S+\s*|\s+/g) || [], [text]);
  const [n, setN] = useState(0);
  const done = n >= words.length;

  useEffect(() => { if (skip) setN(words.length); }, [skip, words.length]);
>>>>>>> 5a35a8112dcc4dff2f1779499838c205fa230680
  useEffect(() => {
    if (done) { onDone(); return; }
    const t = setTimeout(() => setN((v) => v + 1), speed);
    return () => clearTimeout(t);
  }, [n, done]); // eslint-disable-line

  return (
    <>
      <span className="sr-only">{text}</span>
<<<<<<< HEAD
      <pre className="typed" aria-hidden="true">
        {toks.slice(0, n).map((k, i) => <span key={i} className={k.c}>{k.t}</span>)}<span className="cursor" />
      </pre>
=======
      <pre className="typed" aria-hidden="true">{words.slice(0, n).join("")}<span className="cursor" /></pre>
>>>>>>> 5a35a8112dcc4dff2f1779499838c205fa230680
    </>
  );
}
