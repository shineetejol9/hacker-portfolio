// Reusable button. Pass href to render a link styled as a button.
export default function NavButton({ label, onClick, href, download, disabled, primary }) {
  const cls = `btn${primary ? " primary" : ""}`;
  if (href) {
    const ext = /^https?:/.test(href);
    return (
      <a className={cls} href={href} download={download ? "" : undefined}
         target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined}>{label}</a>
    );
  }
  return <button className={cls} onClick={onClick} disabled={disabled} aria-label={label}>{label}</button>;
}
