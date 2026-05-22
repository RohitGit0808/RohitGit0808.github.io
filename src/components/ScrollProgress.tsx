import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-[2.5px] bg-transparent pointer-events-none">
      <div
        className="h-full rounded-full"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #00d4ff, #7b2fff, #00ffea)",
          boxShadow: "0 0 8px rgba(0,212,255,0.8)",
          transition: "width 0.05s linear",
        }}
      />
    </div>
  );
}
