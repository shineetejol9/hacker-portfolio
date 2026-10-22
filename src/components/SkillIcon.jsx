const art = {
  "HTML5": <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
  "JavaScript (JS)": <><rect x="3" y="3" width="18" height="18" rx="2" /><text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="700" fill="currentColor" stroke="none">JS</text></>,
  "Tailwind CSS": <path d="M3 9c2-4 5-5 8-3s5 1 7-3M3 17c2-4 5-5 8-3s5 1 7-3" />,
  "React / Next.js": <><circle cx="12" cy="12" r="1.6" /><ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /></>,
  "Node.js": <><path d="M12 2l8.5 5v10L12 22l-8.5-5V7z" /><circle cx="12" cy="12" r="2.5" /></>,
  "Python": <path d="M5 7l5 5-5 5M12 18h8" />,
  "Data Science": <path d="M3 21h18M6 21v-7M11 21V5M16 21v-10M21 21v-4" />,
  "MongoDB": <><path d="M12 2c4.5 4.5 6 9 0 20C6 11 7.5 6.5 12 2z" /><path d="M12 9v13" /></>,
};
export default function SkillIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {art[name] || <rect x="4" y="4" width="16" height="16" />}
    </svg>
  );
}
