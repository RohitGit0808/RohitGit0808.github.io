import { useState } from "react";
import { motion } from "framer-motion";
import { education } from "../data/portfolio";
import { FiAward, FiCalendar } from "react-icons/fi";

function EduLogo({ logo, institution, color, abbr }: { logo: string; institution: string; color: string; abbr: string }) {
  const [err, setErr] = useState(false);
  return (
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden text-sm font-bold"
      style={{ background: `${color}18`, border: `1.5px solid ${color}35`, color }}
    >
      {logo && !err ? (
        <img src={logo} alt={institution} className="w-full h-full object-contain p-1.5" onError={() => setErr(true)} />
      ) : (
        abbr
      )}
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" className="relative py-24 overflow-hidden">
      <div className="orb" style={{ width: 320, height: 320, background: "radial-gradient(circle, #00d4ff, transparent)", top: "20%", right: -100, opacity: 0.07 }} />

      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-[#00d4ff] text-sm font-semibold uppercase tracking-widest mb-2">Academic Background</p>
          <h2 className="section-title text-white mb-1">Education</h2>
          <div className="w-14 h-0.5 bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-7 relative overflow-hidden"
            >
              {/* Background accent */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10"
                style={{ background: edu.color }}
              />

              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                <EduLogo
                  logo={edu.logo}
                  institution={edu.institution}
                  color={edu.color}
                  abbr={edu.institution.includes("Carnegie") ? "CMU" : "SPPU"}
                />
                <div>
                  <h3 className="text-white font-bold text-base leading-snug">{edu.institution}</h3>
                  <p className="text-slate-400 text-sm mt-1">{edu.degree}</p>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 mb-5 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <FiCalendar size={11} />
                  {edu.duration}
                </span>
                <span
                  className="flex items-center gap-1.5 font-semibold"
                  style={{ color: edu.color }}
                >
                  <FiAward size={11} />
                  {edu.gpa}
                </span>
              </div>

              {/* Highlights */}
              <div className="space-y-2.5">
                {edu.highlights.map((h, hi) => (
                  <div key={hi} className="flex items-start gap-2.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ background: edu.color }}
                    />
                    <span className="text-slate-400 text-sm leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>

              {/* Bottom accent bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, ${edu.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
