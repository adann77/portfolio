import { useInView } from "../hooks";

export default function Reveal({ children, delay = 0, className = "", as: Tag = "div", ...rest }) {
  const [ref, inView] = useInView(0.12);
  return (
    <Tag ref={ref} style={{ "--d": `${delay}ms` }} className={`reveal ${inView ? "visible" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
