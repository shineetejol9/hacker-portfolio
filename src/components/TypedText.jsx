import { useEffect, useMemo, useState } from "react";

const HL = /^(CGPA|Average|Percentage):/;

// Split text into reveal tokens and assign style classes.
function tokenize(text, lead) {
  const out = [];

  const push = (s, c = "") =>
    (s.match(/\s*\S+\s*|\s+/g) || []).forEach((t) =>
      out.push({ t, c })
    );

  const pipes = (s) =>
    s.split(/(\|)/).forEach((q) => {
      if (q) push(q, q === "|" ? "t-sep" : "");
    });

  const lines = text.split("\n");
  let pos = -1;

  lines.forEach((line, i) => {
    if (!line.trim()) {
      pos = -1;
      if (out.length) out[out.length - 1].t += "\n";
      return;
    }

    const idx = line.match(/^\[\d+\]\s*/);
    pos = idx ? 0 : pos >= 0 ? pos + 1 : -1;

    if (idx) {
      push(idx[0], "t-idx");
      push(line.slice(idx[0].length), "t-h");
    } else if (lead && i === 0) {
      push(line, "t-lead");
    } else if (HL.test(line)) {
      push(line, "t-hl");
    } else if (pos === 1) {
      push(line, "t-sub");
    } else if (pos > 1) {
      push(line, "t-dim");
    } else {
      const k = line.match(/^[A-Z][A-Z ]{2,}:/);

      if (k) {
        push(k[0], "t-key");
        pipes(line.slice(k[0].length));
      } else {
        pipes(line);
      }
    }

    if (i < lines.length - 1 && out.length) {
      out[out.length - 1].t += "\n";
    }
  });

  return out;
}

// Reveals text one word at a time. Skip completes instantly.
export default function TypedText({
  text,
  skip,
  onDone,
  lead = false,
  speed = 55,
}) {
  const toks = useMemo(() => tokenize(text, lead), [text, lead]);
  const [n, setN] = useState(0);

  const done = n >= toks.length;

  useEffect(() => {
    setN(0);
  }, [text, lead]);

  useEffect(() => {
    if (skip) {
      setN(toks.length);
      return;
    }

    if (done) return;

    const timer = setTimeout(() => {
      setN((v) => Math.min(v + 1, toks.length));
    }, speed);

    return () => clearTimeout(timer);
  }, [n, done, skip, toks.length, speed]);

  useEffect(() => {
    if (done) onDone();
  }, [done, onDone]);

  return (
    <>
      <span className="sr-only">{text}</span>

      <pre className="typed" aria-hidden="true">
        {toks.slice(0, n).map((token, i) => (
          <span key={i} className={token.c}>
            {token.t}
          </span>
        ))}
        <span className="cursor" />
      </pre>
    </>
  );
}
