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
    </section>
  );
}
