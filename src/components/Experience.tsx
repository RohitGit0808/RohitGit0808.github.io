import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experience } from "../data/portfolio";
import { FiChevronDown, FiMapPin, FiCalendar, FiBriefcase } from "react-icons/fi";

function CompanyLogo({ logo, company, color }: { logo: string; company: string; color: string }) {
  const [err, setErr] = useState(false);
  useEffect(() => { setErr(false); }, [logo]);
  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden text-lg font-bold"
      style={{ background: `${color}15`, border: `1.5px solid ${color}30`, color }}
    >
      {logo && !err ? (
        <img src={logo} alt={company} className="w-full h-full object-contain p-1.5" onError={() => setErr(true)} />
      ) : (
        company.slice(0, 2).toUpperCase()
      )}
    </div>
  );
}

export default function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      <div className="orb" style={{ width: 380, height: 380, background: "radial-gradient(circle, #7b2fff, transparent)", bottom: "5%", right: -150, opacity: 0.08 }} />

      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-[#00d4ff] text-sm font-semibold uppercase tracking-widest mb-2">Career Journey</p>
          <h2 className="section-title text-white mb-1">Work Experience</h2>
          <div className="w-14 h-0.5 bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] rounded-full" />
          <p className="text-slate-400 mt-4 max-w-xl text-sm leading-relaxed">
            ISRO · DRDO · Ridecell · Cognizant — quality engineering across space systems, defense AI, fleet tech, and enterprise SDET pipelines.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#00d4ff] via-[#7b2fff] to-transparent opacity-30 hidden md:block" />

          <div className="space-y-4">
            {experience.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${exp.role}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative md:pl-16"
              >
                {/* Timeline dot */}
                <div
                  className="timeline-dot absolute left-3.5 top-6 -translate-x-1/2 hidden md:block"
                  style={{ boxShadow: `0 0 16px ${exp.color}80` }}
                />

                <div
                  className={`glass-card cursor-pointer overflow-hidden transition-all duration-300 ${
                    expanded === i ? "border-[rgba(0,212,255,0.25)]" : ""
                  }`}
                  style={expanded === i ? { borderColor: `${exp.color}30` } : {}}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  {/* Header */}
                  <div className="p-6 flex items-start gap-4">
                    {/* Company icon */}
                    <CompanyLogo logo={exp.logo} company={exp.company} color={exp.color} />

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="text-white font-semibold text-base leading-snug">{exp.role}</h3>
                          <p className="text-slate-300 text-sm mt-0.5 font-medium">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span
                            className="text-xs font-semibold px-3 py-1 rounded-full"
                            style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}
                          >
                            {exp.type}
                          </span>
                          <FiChevronDown
                            className="text-slate-400 transition-transform duration-300"
                            style={{ transform: expanded === i ? "rotate(180deg)" : "rotate(0deg)" }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <FiCalendar size={11} />
                          {exp.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FiMapPin size={11} />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FiBriefcase size={11} />
                          {exp.type}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {exp.tags.map((t) => (
                          <span key={t} className="tag-badge text-[10px]">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Expanded highlights */}
                  <AnimatePresence>
                    {expanded === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div
                          className="mx-6 mb-6 pt-4 border-t"
                          style={{ borderColor: `${exp.color}20` }}
                        >
                          <ul className="space-y-3">
                            {exp.highlights.map((h, hi) => (
                              <li key={hi} className="flex items-start gap-3">
                                <div
                                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                  style={{ background: exp.color, boxShadow: `0 0 6px ${exp.color}` }}
                                />
                                <span className="text-slate-400 text-sm leading-relaxed">{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
