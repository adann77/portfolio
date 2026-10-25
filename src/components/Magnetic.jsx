import { useRef } from "react";

// Wraps a button/link so it leans toward the pointer.
export default function Magnetic({ children, strength = 0.22 }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const onLeave = () => { ref.current.style.transform = ""; };
  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block transition-transform duration-200 ease-out">
      {children}
    </span>
  );
}
