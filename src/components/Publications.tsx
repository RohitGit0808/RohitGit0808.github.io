import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { publications } from "../data/portfolio";
import { FiExternalLink, FiBookOpen, FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function Publications() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="publications" className="relative py-24 overflow-hidden">
      {/* Background orb */}
      <div
        className="orb"
        style={{
          width: 360,
          height: 360,
          background: "radial-gradient(circle, #00d4ff, transparent)",
          top: "15%",
          left: -140,
          opacity: 0.06,
        }}
      />

      <div className="section-wrap">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-[#00d4ff] text-sm font-semibold uppercase tracking-widest mb-2">
            Research & Publications
          </p>
          <h2 className="section-title text-white mb-1">Publications</h2>
          <div className="w-14 h-0.5 bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] rounded-full mb-4" />
          <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
            Peer-reviewed research published in international journals and conference proceedings.
          </p>
        </motion.div>

        {/* Publication Cards */}
        <div className="space-y-5">
          {publications.map((pub, i) => {
            const isOpen = expanded === i;
            return (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="glass-card relative overflow-hidden group"
              >
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
                  style={{
                    background: `linear-gradient(180deg, ${pub.color}, ${pub.color}40, transparent)`,
                  }}
                />

                {/* Hover bg glow */}
                <div
                  className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500"
                  style={{ background: pub.color }}
                />

                <div className="relative z-10 p-7">
                  {/* Top row: icon + type | date + link */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{
                          background: `${pub.color}14`,
                          border: `1.5px solid ${pub.color}30`,
                        }}
                      >
                        {pub.icon}
                      </div>
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{
                          background: `${pub.color}14`,
                          color: pub.color,
                          border: `1px solid ${pub.color}28`,
                        }}
                      >
                        {pub.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 font-mono">{pub.date}</span>
                      {pub.url && (
                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#00d4ff] transition-colors glass px-3 py-1.5 rounded-lg"
                        >
                          <FiExternalLink size={11} /> View
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-base leading-snug mb-3">
                    {pub.title}
                  </h3>

                  {/* Journal */}
                  <div className="flex items-center gap-2 mb-4">
                    <FiBookOpen size={12} style={{ color: pub.color, flexShrink: 0 }} />
                    <span className="text-sm font-semibold" style={{ color: pub.color }}>
                      {pub.journal}
                    </span>
                  </div>

                  {/* Abstract */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {pub.abstract}
                  </p>

                  {/* Expandable key contributions */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="highlights"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-2.5 mb-5 pt-1">
                          {pub.highlights.map((h, hi) => (
                            <li key={hi} className="flex items-start gap-2.5 text-sm text-slate-300">
                              <span
                                className="mt-[6px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{
                                  background: pub.color,
                                  boxShadow: `0 0 6px ${pub.color}80`,
                                }}
                              />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Footer: tags + toggle */}
                  <div
                    className="flex flex-wrap items-center justify-between gap-3 pt-3"
                    style={{ borderTop: `1px solid ${pub.color}18` }}
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {pub.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-full font-mono"
                          style={{
                            background: `${pub.color}10`,
                            color: `${pub.color}cc`,
                            border: `1px solid ${pub.color}20`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setExpanded(isOpen ? null : i)}
                      className="flex items-center gap-1.5 text-xs font-semibold transition-colors flex-shrink-0 hover:opacity-80"
                      style={{ color: pub.color }}
                    >
                      {isOpen ? (
                        <>Hide Details <FiChevronUp size={13} /></>
                      ) : (
                        <>Key Contributions <FiChevronDown size={13} /></>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 grid grid-cols-3 gap-4"
        >
          {[
            { value: "2", label: "Published Papers", color: "#00d4ff" },
            { value: "2021", label: "Publication Year", color: "#7b2fff" },
            { value: "ECS · IJAEM", label: "Journals", color: "#00ffea" },
          ].map((s) => (
            <div
              key={s.label}
              className="glass-card px-5 py-4 text-center relative overflow-hidden group"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle at center, ${s.color}08, transparent)` }}
              />
              <div className="relative text-xl font-bold mb-0.5" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="relative text-slate-500 text-[10px] uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
