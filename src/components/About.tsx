import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { personalInfo } from "../data/portfolio";
import {
  FiCode, FiGitBranch, FiCloud, FiDatabase, FiCpu,
  FiShield, FiLayers, FiActivity, FiPackage, FiZap,
} from "react-icons/fi";

function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let cur = 0;
          const steps = Math.ceil(duration / 16);
          const inc = target / steps;
          const t = setInterval(() => {
            cur += inc;
            if (cur >= target) { setCount(target); clearInterval(t); }
            else setCount(Math.floor(cur));
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
  return { count, ref };
}

function StatCard({ value, label, sub, color, icon, num, isNumeric, suffix, delay }: {
  value: string; label: string; sub: string; color: string; icon: string;
  num: number; isNumeric: boolean; suffix: string; delay: number;
}) {
  const { count, ref } = useCountUp(num);
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }} transition={{ delay }}
      className="glass-card p-5 text-center relative overflow-hidden group"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at center, ${color}0a, transparent)` }} />
      <div className="text-xl mb-1">{icon}</div>
      <div className="text-3xl font-bold mb-0.5 leading-none" style={{ color }}>
        {isNumeric ? `${count}${suffix}` : value}
      </div>
      <div className="text-white text-xs font-semibold mt-1">{label}</div>
      <div className="text-slate-500 text-[10px] mt-0.5">{sub}</div>
    </motion.div>
  );
}

function StripStatCard({ value, label, sub, color, icon, num, isNumeric, suffix, delay }: {
  value: string; label: string; sub: string; color: string; icon: string;
  num: number; isNumeric: boolean; suffix: string; delay: number;
}) {
  const { count, ref } = useCountUp(num);
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay }}
      className="glass-card px-5 py-4 flex items-center gap-4 relative overflow-hidden group"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${color}06, transparent)` }} />
      <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
        style={{ background: `linear-gradient(180deg, ${color}, transparent)` }} />
      <div className="text-2xl flex-shrink-0 relative">{icon}</div>
      <div className="relative min-w-0">
        <div className="text-2xl font-bold leading-none" style={{ color }}>
          {isNumeric ? `${count}${suffix}` : value}
        </div>
        <div className="text-white text-xs font-semibold mt-0.5 leading-tight">{label}</div>
        <div className="text-slate-500 text-[10px] mt-0.5 truncate">{sub}</div>
      </div>
    </motion.div>
  );
}

const pillars = [
  // ── Row 1 – Core automation strengths ──────────────────
  {
    icon: FiCode,
    title: "API & Contract Testing",
    desc: "End-to-end validation of microservices via REST Assured, Postman, Cucumber BDD — covering OAuth 2.0, JWT, schema contracts, and fault tolerance at scale.",
    tags: ["REST Assured", "OAuth 2.0", "Schema Validation"],
    metric: "Zero schema breaks in production",
    metricColor: "#00d4ff",
    color: "#00d4ff",
  },
  {
    icon: FiGitBranch,
    title: "CI/CD Pipeline Engineer",
    desc: "Automated regression gates on every PR using Jenkins + GitHub Actions. Docker-based parallel execution environments reduce pipeline runtime significantly.",
    tags: ["Jenkins", "GitHub Actions", "Docker"],
    metric: "~40% faster CI execution",
    metricColor: "#7b2fff",
    color: "#7b2fff",
  },
  {
    icon: FiCloud,
    title: "Cloud & Cross-Platform QA",
    desc: "Integrating test execution into AWS environments, running cross-browser and cross-device coverage via BrowserStack across 20+ real device configurations.",
    tags: ["AWS", "BrowserStack", "Kubernetes"],
    metric: "20+ device configurations",
    metricColor: "#00ffea",
    color: "#00ffea",
  },
  {
    icon: FiDatabase,
    title: "Payment & Data Validation",
    desc: "Comprehensive payment gateway testing — transaction lifecycle, refunds, retries, idempotency, timeouts. ETL validation for large-scale data migration testing.",
    tags: ["Payment Gateway", "ETL Validation", "Idempotency"],
    metric: "Zero payment defects shipped",
    metricColor: "#ff6b6b",
    color: "#ff6b6b",
  },
  {
    icon: FiCpu,
    title: "Parallel Execution & Scale",
    desc: "Thread-safe parallel test execution via ThreadLocal, Selenium Grid (Docker), and Kubernetes job orchestration — built for enterprise-scale distributed QA.",
    tags: ["Selenium Grid", "ThreadLocal", "K8s Jobs"],
    metric: "Enterprise-grade throughput",
    metricColor: "#ffd93d",
    color: "#ffd93d",
  },

  // ── Row 2 – Differentiating advanced competencies ──────
  {
    icon: FiShield,
    title: "Security & Auth Testing",
    desc: "Validating OAuth 2.0 flows, JWT token integrity, session hijacking vectors, RBAC enforcement, and injection vulnerabilities across API and UI surfaces.",
    tags: ["OAuth 2.0", "JWT", "RBAC Testing"],
    metric: "Auth layer fully test-covered",
    metricColor: "#00d4ff",
    color: "#00d4ff",
  },
  {
    icon: FiLayers,
    title: "BDD & Living Documentation",
    desc: "Writing executable specs in Gherkin with Cucumber, enabling non-technical stakeholders to read, own, and validate test scenarios directly from business requirements.",
    tags: ["Cucumber", "Gherkin", "Executable Specs"],
    metric: "Business-readable test suite",
    metricColor: "#7b2fff",
    color: "#7b2fff",
  },
  {
    icon: FiActivity,
    title: "Performance & Observability",
    desc: "Profiling Core Web Vitals, analyzing response time SLA breaches, monitoring CI pipeline dashboards, and surfacing quality signals via Allure & Extent Reports.",
    tags: ["Core Web Vitals", "Allure", "SLA Monitoring"],
    metric: "Performance regressions caught early",
    metricColor: "#00ffea",
    color: "#00ffea",
  },
  {
    icon: FiPackage,
    title: "Test Data Engineering",
    desc: "Building dynamic test data factories using Faker, JSON fixtures, and Excel-driven datasets with full isolation strategies — eliminating flaky data-dependent tests.",
    tags: ["Faker", "Data Factories", "JSON Fixtures"],
    metric: "Flaky tests eliminated",
    metricColor: "#ff6b6b",
    color: "#ff6b6b",
  },
  {
    icon: FiZap,
    title: "AI-Driven Test Intelligence",
    desc: "Leveraging ML background (YOLOv3 @ DRDO, NASA satellite data @ ISRO) to apply AI-assisted failure analysis, smart test prioritization, and predictive defect detection.",
    tags: ["ML-Powered QA", "Smart Prioritization", "Failure Analysis"],
    metric: "91.55% mAP — DRDO AI system",
    metricColor: "#ffd93d",
    color: "#ffd93d",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55 },
  }),
};

export default function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div
        className="orb"
        style={{
          width: 350,
          height: 350,
          background: "radial-gradient(circle, #7b2fff, transparent)",
          top: "20%",
          right: -150,
          opacity: 0.08,
        }}
      />

      <div className="section-wrap">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-[#00d4ff] text-sm font-semibold uppercase tracking-widest mb-2">
            Who I Am
          </p>
          <h2 className="section-title text-white mb-1">About Me</h2>
          <div className="w-14 h-0.5 bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] rounded-full" />
        </motion.div>

        {/* Bio row */}
        <div className="grid lg:grid-cols-2 gap-14 items-start mb-10">
          {/* Left – bio paragraphs */}
          <div className="space-y-5">
            {personalInfo.about.map((para, i) => (
              <motion.p
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-slate-400 leading-relaxed text-[0.95rem]"
              >
                {para}
              </motion.p>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2 pt-2"
            >
              {personalInfo.badges.map((b) => (
                <span key={b} className="tag-badge">{b}</span>
              ))}
            </motion.div>
          </div>

          {/* Right – top 4 highlight stats (animated) */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "AWS", label: "AI Practitioner", sub: "Cloud Certified · 2025", color: "#FF9900", icon: "☁️" },
              { value: "10+", label: "AI & ML Tools", sub: "LLMs · SageMaker · TensorFlow", color: "#ffd93d", icon: "🤖" },
              { value: "2", label: "Enterprise Frameworks", sub: "Built from scratch", color: "#00ffea", icon: "🏗️" },
              { value: "CMU", label: "MS Computer Science", sub: "GPA ~3.9 / 4.0", color: "#ffd93d", icon: "🎓" },
            ].map((s, i) => {
              const num = parseFloat(s.value.replace(/[^0-9.]/g, ""));
              const isNumeric = !isNaN(num) && s.value !== "CMU";
              const suffix = isNumeric ? s.value.replace(/[0-9.]/g, "") : "";
              return (
                <StatCard key={s.label} {...s} num={isNumeric ? num : 0} isNumeric={isNumeric} suffix={suffix} delay={i * 0.1} />
              );
            })}
          </div>
        </div>

        {/* Extended stats strip – 4 more tiles (animated) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {[
            { value: "5", label: "Orgs & Companies", sub: "Cognizant · ISRO · DRDO · Ridecell · CMU", color: "#00d4ff", icon: "🏢" },
            { value: "40%", label: "CI Execution Faster", sub: "Docker parallel execution", color: "#7b2fff", icon: "⚡" },
            { value: "91.5%", label: "AI Model mAP", sub: "YOLOv3 @ DRDO defense system", color: "#00ffea", icon: "🤖" },
            { value: "Zero", label: "Payment Defects", sub: "Shipped to production", color: "#ff6b6b", icon: "✅" },
          ].map((s, i) => {
            const num = parseFloat(s.value.replace(/[^0-9.]/g, ""));
            const isNumeric = !isNaN(num);
            const suffix = isNumeric ? s.value.replace(/[0-9.]/g, "") : "";
            return (
              <StripStatCard key={s.label} {...s} num={isNumeric ? num : 0} isNumeric={isNumeric} suffix={suffix} delay={i * 0.08} />
            );
          })}
        </div>

        {/* ── 5 Competency Pillars ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-5"
        >
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest">
            Core Competencies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card p-5 flex flex-col gap-3 group relative overflow-hidden"
            >
              {/* Subtle bg glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{
                  background: `radial-gradient(ellipse at top left, ${p.color}0a, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `${p.color}15`,
                  border: `1px solid ${p.color}30`,
                }}
              >
                <p.icon size={18} style={{ color: p.color }} />
              </div>

              {/* Title */}
              <h4 className="text-white font-semibold text-sm leading-tight">
                {p.title}
              </h4>

              {/* Description */}
              <p className="text-slate-400 text-xs leading-relaxed flex-1">
                {p.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: `${p.color}12`,
                      border: `1px solid ${p.color}25`,
                      color: p.color,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Metric bar */}
              <div
                className="mt-auto pt-3 border-t flex items-center gap-2"
                style={{ borderColor: `${p.color}18` }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    background: p.metricColor,
                    boxShadow: `0 0 6px ${p.metricColor}`,
                  }}
                />
                <span
                  className="text-[10px] font-semibold"
                  style={{ color: p.metricColor }}
                >
                  {p.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
