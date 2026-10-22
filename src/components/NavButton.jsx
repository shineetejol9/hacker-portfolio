// Reusable button. Pass href to render a link styled as a button. `hint` shows the keyboard shortcut.
export default function NavButton({ label, onClick, href, download, disabled, primary, hint, expanded }) {
  const cls = `btn${primary ? " primary" : ""}`;
  const inner = <span className="btn-in">{label}{hint && <kbd>{hint}</kbd>}</span>;
  if (href) {
    const ext = /^https?:/.test(href);
    return (
      <a className={cls} href={href} download={download ? "" : undefined}
         target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined}>{inner}</a>
    );
  }
  return <button className={cls} type="button" onClick={onClick} disabled={disabled} aria-label={label} aria-expanded={expanded}>{inner}</button>;
}
