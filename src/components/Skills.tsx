import { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "../data/portfolio";

function SkillLogo({ logo, name }: { logo: string; name: string }) {
  const [err, setErr] = useState(false);

  if (!logo || err) {
    return (
      <div className="w-7 h-7 rounded-md flex items-center justify-center text-[9px] font-bold"
        style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)", color: "#00d4ff" }}>
        {name.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <img src={logo} alt={name} className="w-7 h-7 object-contain"
      onError={() => setErr(true)} />
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const displayed = activeCategory
    ? skills.filter((c) => c.category === activeCategory)
    : skills;

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      <div className="orb" style={{ width: 400, height: 400, background: "radial-gradient(circle, #00d4ff, transparent)", top: "10%", left: -150, opacity: 0.06 }} />

      <div className="section-wrap">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-[#00d4ff] text-sm font-semibold uppercase tracking-widest mb-2">What I Work With</p>
          <h2 className="section-title text-white mb-1">Tech Stack</h2>
          <div className="w-14 h-0.5 bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] rounded-full" />
          <p className="text-slate-400 mt-4 max-w-2xl text-sm leading-relaxed">
            A full-spectrum SDET toolkit — from language fundamentals and automation frameworks to cloud infrastructure, AI tooling, and performance engineering. Built to operate as a software engineer, not just a test script writer.
          </p>
        </motion.div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              activeCategory === null ? "gradient-bg text-white shadow-lg" : "glass text-slate-400 hover:text-white"
            }`}
          >
            All ({skills.length})
          </button>
          {skills.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category === activeCategory ? null : cat.category)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                activeCategory === cat.category
                  ? "text-white shadow-lg"
                  : "glass text-slate-400 hover:text-white"
              }`}
              style={activeCategory === cat.category ? { background: `${cat.color}25`, border: `1px solid ${cat.color}60`, color: cat.color } : {}}
            >
              <span>{cat.icon}</span>
              <span>{cat.category}</span>
            </button>
          ))}
        </div>

        {/* Skill cards */}
        <div className="space-y-4">
          {displayed.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.05 }}
              className="glass-card overflow-hidden"
              style={{ borderColor: activeCategory === cat.category ? `${cat.color}25` : undefined }}
            >
              {/* Card header */}
              <div className="px-6 pt-5 pb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}30` }}>
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-white text-sm">{cat.category}</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-[rgba(255,255,255,0.06)] to-transparent" />
                <span className="text-slate-600 text-[10px] font-medium">
                  {cat.tools.length} tools · {cat.concepts.length} concepts
                </span>
              </div>

              <div className="px-6 pb-5 space-y-4">
                {/* Tools row — logo badges */}
                <div className="flex flex-wrap gap-2.5">
                  {cat.tools.map((tool, ti) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, scale: 0.88 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.04 + ti * 0.03 }}
                      className="skill-badge flex items-center gap-2 glass px-3 py-1.5 rounded-xl cursor-default"
                      style={{ border: `1px solid ${cat.color}18` }}
                    >
                      <SkillLogo logo={tool.logo} name={tool.name} />
                      <span className="text-slate-300 text-xs font-medium whitespace-nowrap">{tool.name}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Concepts row — text pills */}
                {cat.concepts.length > 0 && (
                  <div className="pt-1 border-t" style={{ borderColor: `${cat.color}12` }}>
                    <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-600 mb-2.5">Concepts & Methodologies</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.concepts.map((concept) => (
                        <span
                          key={concept}
                          className="text-[10px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap"
                          style={{
                            background: `${cat.color}0c`,
                            border: `1px solid ${cat.color}20`,
                            color: `${cat.color}cc`,
                          }}
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
