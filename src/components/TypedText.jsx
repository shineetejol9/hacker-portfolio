import { useEffect, useMemo, useState } from "react";
// Reveals text one word at a time. `skip` completes instantly. Calls onDone once finished.
export default function TypedText({ text, skip, onDone, speed = 55 }) {
  const words = useMemo(() => text.match(/\S+\s*|\s+/g) || [], [text]);
  const [n, setN] = useState(0);
  const done = n >= words.length;

  useEffect(() => { if (skip) setN(words.length); }, [skip, words.length]);
  useEffect(() => {
    if (done) { onDone(); return; }
    const t = setTimeout(() => setN((v) => v + 1), speed);
    return () => clearTimeout(t);
  }, [n, done]); // eslint-disable-line

  return (
    <>
      <span className="sr-only">{text}</span>
      <pre className="typed" aria-hidden="true">{words.slice(0, n).join("")}<span className="cursor" /></pre>
    </>
  );
}
