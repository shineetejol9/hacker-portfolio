import { useEffect, useRef } from "react";

const CH = "0123456789ABCDEF{}<>/;=#";
// Faint hex data-rain behind everything. Static when reduced motion is on.
export default function DataRain() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, x = c.getContext("2d"), S = 18;
    let w, h, cols, drops, raf, last = 0;
    const size = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      c.width = w * d; c.height = h * d; x.setTransform(d, 0, 0, d, 0, 0);
      x.font = `${S - 4}px "JetBrains Mono", monospace`;
      cols = Math.ceil(w / S);
      drops = Array.from({ length: cols }, () => Math.random() * (h / S));
    };
    const draw = () => {
      x.fillStyle = "rgba(2,5,11,.14)"; x.fillRect(0, 0, w, h);
      for (let i = 0; i < cols; i++) {
        const y = drops[i] * S;
        x.fillStyle = Math.random() < 0.03 ? "#e6fbff" : "rgba(34,230,255,.75)";
        x.fillText(CH[(Math.random() * CH.length) | 0], i * S, y);
        drops[i] = y > h && Math.random() > 0.975 ? 0 : drops[i] + 1;
      }
    };
    const loop = (t) => { raf = requestAnimationFrame(loop); if (t - last > 60 && !document.hidden) { last = t; draw(); } };
    size();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { for (let k = 0; k < 90; k++) draw(); }
    else raf = requestAnimationFrame(loop);
    window.addEventListener("resize", size);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); };
  }, []);
  return <canvas ref={ref} className="rain" aria-hidden="true" />;
}
