import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../data/portfolio";
import { FiGithub, FiLinkedin, FiArrowDown, FiMail } from "react-icons/fi";
import { SiGooglescholar, SiLeetcode, SiStackoverflow } from "react-icons/si";
import TechMarquee from "./TechMarquee";

const taglines = personalInfo.taglines;

function TypeWriter({ texts }: { texts: string[] }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      }, 55);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      }, 28);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx((idx + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts]);

  return (
    <span className="neon-text font-semibold">
      {displayed}
      <span className="cursor ml-0.5">|</span>
    </span>
  );
}

// Simple particle canvas
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.3,
        a: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.a})`;
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.04 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

export default function Hero() {
  const scrollDown = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      <ParticleCanvas />

      {/* Orbs */}
      <div className="orb" style={{ width: 560, height: 560, background: "radial-gradient(circle, #00d4ff, transparent)", top: -120, right: -120 }} />
      <div className="orb" style={{ width: 440, height: 440, background: "radial-gradient(circle, #7b2fff, transparent)", bottom: 60, left: -120, animationDelay: "-5s" }} />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-8 md:px-14" style={{ paddingTop: "6rem", paddingBottom: "4rem" }}>
        <div className="flex flex-col md:flex-row items-center gap-14 md:gap-20">

          {/* LEFT – Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="flex-shrink-0 flex justify-center"
          >
            <div className="relative">
              {/* Outer glow */}
              <div
                className="absolute rounded-full blur-3xl opacity-40"
                style={{
                  inset: -24,
                  background: "conic-gradient(from 0deg, #00d4ff, #7b2fff, #00ffea, #00d4ff)",
                }}
              />
              {/* Spinning gradient ring */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: -4,
                  background: "conic-gradient(from var(--angle, 0deg), #00d4ff, #7b2fff, #00ffea, #00d4ff)",
                  animation: "spin-border 4s linear infinite",
                  borderRadius: "50%",
                }}
              />
              {/* Photo */}
              <div
                className="relative rounded-full overflow-hidden"
                style={{ width: 360, height: 360, border: "5px solid #050810", borderRadius: "50%" }}
              >
                <img
                  src="/profile.jpg"
                  alt="Rohit Saxena"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Online indicator */}
              <div
                className="absolute bottom-5 right-5 w-6 h-6 rounded-full border-2 flex items-center justify-center"
                style={{ background: "#050810", borderColor: "#050810" }}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-green-400" style={{ boxShadow: "0 0 10px #4ade80" }} />
              </div>
            </div>
          </motion.div>

          {/* RIGHT – Content */}
          <div className="flex-1 min-w-0">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex mb-6"
              style={{ position: "relative" }}
            >
              <span style={{ position: "absolute", inset: -1.5, borderRadius: 9999, background: "conic-gradient(from var(--angle, 0deg), #00d4ff, #7b2fff, #00ffea, #00d4ff)", animation: "spin-border 3s linear infinite", zIndex: 0 }} />
              <span style={{ position: "relative", zIndex: 1, background: "rgba(5,8,16,0.95)", borderRadius: 9999, display: "inline-flex", alignItems: "center", gap: "10px", padding: "8px 18px", overflow: "hidden" }}>
                <span style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, transparent 40%, rgba(0,212,255,0.12) 50%, transparent 60%)", backgroundSize: "200% 100%", animation: "shine-sweep 3s ease-in-out infinite", borderRadius: 9999 }} />
                <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 13, height: 13, flexShrink: 0 }}>
                  <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(74,222,128,0.25)", animation: "radar-ping 1.6s ease-out infinite" }} />
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", flexShrink: 0, position: "relative" }} />
                </span>
                <span style={{ color: "#94a3b8", fontSize: "0.82rem", fontWeight: 500, whiteSpace: "nowrap", position: "relative" }}>Open to New Opportunities</span>
                <span style={{ width: 1, height: 13, background: "rgba(0,212,255,0.2)", flexShrink: 0, position: "relative" }} />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", color: "#00d4ff", textShadow: "0 0 10px rgba(0,212,255,0.5)", position: "relative", whiteSpace: "nowrap" }}>@ {personalInfo.currentCompany}</span>
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-extrabold tracking-tight leading-[1.05] mb-2"
              style={{ fontSize: "clamp(2.6rem, 4.5vw, 4.2rem)" }}
            >
              <span className="text-white">{personalInfo.name.split(" ")[0]} </span>
              <span className="gradient-text">{personalInfo.name.split(" ")[1]}</span>
            </motion.h1>

            {/* Accent line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.42, duration: 0.5 }}
              className="origin-left h-[3px] rounded-full mb-5"
              style={{ width: 60, background: "linear-gradient(90deg, #00d4ff, #7b2fff)" }}
            />

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48 }}
              className="text-white/90 font-semibold mb-1"
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", letterSpacing: "0.02em" }}
            >
              {personalInfo.title}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.53 }}
              className="text-slate-500 text-sm mb-6 tracking-wide"
            >
              {personalInfo.subtitle}
            </motion.p>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.62 }}
              className="mb-7"
              style={{ fontSize: "clamp(1rem, 1.6vw, 1.2rem)", minHeight: "2rem" }}
            >
              <TypeWriter texts={taglines} />
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {personalInfo.badges.map((b) => (
                <span key={b} className="tag-badge">{b}</span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.82 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <button
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary"
                style={{ fontSize: "0.92rem", padding: "0.65rem 1.6rem" }}
              >
                View Projects
              </button>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
                style={{ fontSize: "0.92rem", padding: "0.65rem 1.6rem" }}
              >
                LinkedIn Profile
              </a>
              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
                style={{ fontSize: "0.92rem", padding: "0.65rem 1.6rem", borderColor: "rgba(123,47,255,0.5)", color: "#7b2fff" }}
              >
                Download Resume
              </a>
            </motion.div>

            {/* LeetCode Stats */}
            <motion.a
              href={personalInfo.leetcode}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.87 }}
              className="group flex items-center gap-0 mb-8 w-fit overflow-hidden rounded-xl"
              style={{
                background: "rgba(255,161,22,0.06)",
                border: "1px solid rgba(255,161,22,0.2)",
              }}
            >
              {/* LeetCode brand tab */}
              <div
                className="flex items-center gap-2 px-4 py-2.5 border-r"
                style={{ borderColor: "rgba(255,161,22,0.2)" }}
              >
                <SiLeetcode size={15} style={{ color: "#FFA116", flexShrink: 0 }} />
                <span className="text-xs font-bold tracking-wide" style={{ color: "#FFA116" }}>
                  LeetCode
                </span>
              </div>
              {/* Solved count */}
              <div
                className="flex items-baseline gap-1 px-4 py-2.5 border-r"
                style={{ borderColor: "rgba(255,161,22,0.15)" }}
              >
                <span className="text-white font-bold text-sm">307</span>
                <span className="text-slate-500 text-[10px]">solved</span>
              </div>
              {/* Difficulty breakdown */}
              <div className="flex items-center gap-3 px-4 py-2.5">
                <span className="text-[11px] font-semibold" style={{ color: "#00b8a3" }}>
                  52 <span className="text-slate-600 font-normal">Easy</span>
                </span>
                <span className="text-slate-700 text-[10px]">·</span>
                <span className="text-[11px] font-semibold" style={{ color: "#ffc01e" }}>
                  130 <span className="text-slate-600 font-normal">Med</span>
                </span>
                <span className="text-slate-700 text-[10px]">·</span>
                <span className="text-[11px] font-semibold" style={{ color: "#ef4743" }}>
                  125 <span className="text-slate-600 font-normal">Hard</span>
                </span>
              </div>
              {/* Arrow */}
              <div
                className="px-3 py-2.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "#FFA116" }}
              >
                <FiArrowDown size={12} style={{ transform: "rotate(-45deg)" }} />
              </div>
            </motion.a>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="w-full h-px mb-6"
              style={{ background: "linear-gradient(90deg, rgba(0,212,255,0.15), rgba(123,47,255,0.15), transparent)" }}
            />

            {/* Tech stack marquee */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <TechMarquee />
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05 }}
              className="flex gap-3 mt-4"
            >
              {[
                { icon: FiGithub, href: personalInfo.github, label: "GitHub" },
                { icon: FiLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
                { icon: FiMail, href: `mailto:${personalInfo.email}`, label: "Email" },
                { icon: SiGooglescholar, href: personalInfo.scholar, label: "Google Scholar" },
                { icon: SiLeetcode, href: personalInfo.leetcode, label: "LeetCode" },
                { icon: SiStackoverflow, href: personalInfo.stackoverflow, label: "Stack Overflow" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center text-slate-400 hover:text-[#00d4ff] hover:border-[rgba(0,212,255,0.4)] transition-all duration-300 hover:scale-110"
                >
                  <Icon size={17} />
                </a>
              ))}
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-[#00d4ff] transition-colors animate-bounce"
        >
          <FiArrowDown size={22} />
        </motion.button>
      </div>
    </section>
  );
}
