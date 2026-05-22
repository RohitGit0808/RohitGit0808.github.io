import { motion } from "framer-motion";
import { projects } from "../data/portfolio";
import { FiGithub, FiExternalLink, FiCalendar, FiMapPin } from "react-icons/fi";

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div
        className="orb"
        style={{
          width: 420,
          height: 420,
          background: "radial-gradient(circle, #7b2fff, transparent)",
          bottom: "10%",
          left: -150,
          opacity: 0.08,
        }}
      />

      <div className="section-wrap">
        {/* ── Header ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-[#00d4ff] text-sm font-semibold uppercase tracking-widest mb-2">
            What I've Built
          </p>
          <h2 className="section-title text-white mb-1">Projects</h2>
          <div className="w-14 h-0.5 bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] rounded-full" />
          <p className="text-slate-400 mt-4 max-w-xl text-sm leading-relaxed">
            Production-grade frameworks and tools that reflect my engineering approach to quality —
            not just code that passes tests, but systems that scale.
          </p>
        </motion.div>

        {/* ── Featured Projects ────────────────────────── */}
        <div className="space-y-6 mb-12">
          {featured.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-7 relative overflow-hidden group"
            >
              {/* Background glow */}
              <div
                className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-[0.06] group-hover:opacity-[0.1] transition-opacity duration-500"
                style={{ background: project.color }}
              />
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
                style={{
                  background: `linear-gradient(180deg, ${project.color}, ${project.color}40, transparent)`,
                }}
              />

              <div className="relative z-10">
                {/* ── Top row: index + name + meta + links ── */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Index badge */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5"
                      style={{
                        background: `${project.color}18`,
                        border: `1.5px solid ${project.color}35`,
                        color: project.color,
                      }}
                    >
                      {i + 1 < 10 ? `0${i + 1}` : i + 1}
                    </div>

                    {/* Name + badge + association */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-white font-bold text-lg leading-tight">
                          {project.name}
                        </h3>
                        <span
                          className="text-xs font-semibold px-2.5 py-0.5 rounded-full flex-shrink-0"
                          style={{
                            background: `${project.color}18`,
                            color: project.color,
                            border: `1px solid ${project.color}30`,
                          }}
                        >
                          {project.badge}
                        </span>
                      </div>

                      {/* Association + duration metadata */}
                      {(project.association || project.duration) && (
                        <div className="flex flex-wrap items-center gap-3 mt-1">
                          {project.association && (
                            <span className="flex items-center gap-1.5 text-xs text-slate-400">
                              <FiMapPin size={11} style={{ color: project.color, flexShrink: 0 }} />
                              {project.association}
                            </span>
                          )}
                          {project.duration && (
                            <span className="flex items-center gap-1.5 text-xs text-slate-500">
                              <FiCalendar size={11} style={{ flexShrink: 0 }} />
                              {project.duration}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action links */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors glass px-3 py-1.5 rounded-lg"
                      >
                        <FiExternalLink size={12} /> Live
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#00d4ff] transition-colors glass px-3 py-1.5 rounded-lg"
                    >
                      <FiGithub size={12} /> GitHub
                    </a>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  {project.longDescription}
                </p>

                {/* Highlights bullet list */}
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="space-y-2 mb-5">
                    {project.highlights.map((h, hi) => (
                      <li key={hi} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <span
                          className="mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{
                            background: project.color,
                            boxShadow: `0 0 6px ${project.color}80`,
                          }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Metrics strip */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="glass px-3 py-2.5 rounded-xl text-center"
                      style={{ borderColor: `${project.color}20` }}
                    >
                      <div className="text-xs font-bold" style={{ color: project.color }}>
                        {m.value}
                      </div>
                      <div className="text-slate-500 text-[10px] mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs text-slate-400 glass px-2.5 py-1 rounded-lg font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Section divider ─────────────────────────── */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.15)] to-transparent" />
          <span className="text-slate-500 text-xs font-semibold uppercase tracking-widest px-2">
            More Projects
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.15)] to-transparent" />
        </div>

        {/* ── Non-featured grid ────────────────────────── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {others.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-6 relative overflow-hidden group flex flex-col"
            >
              {/* bg glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-[0.07] group-hover:opacity-[0.12] transition-opacity"
                style={{ background: project.color }}
              />
              {/* left accent */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
                style={{
                  background: `linear-gradient(180deg, ${project.color}60, transparent)`,
                }}
              />

              <div className="relative z-10 flex flex-col flex-1">
                {/* Top: badge + github */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: `${project.color}18`,
                      color: project.color,
                      border: `1px solid ${project.color}30`,
                    }}
                  >
                    {project.badge}
                  </span>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-500 hover:text-[#00d4ff] transition-colors"
                  >
                    <FiGithub size={15} />
                  </a>
                </div>

                {/* Name */}
                <h3 className="text-white font-semibold text-base mb-1 leading-snug">
                  {project.name}
                </h3>

                {/* Association + duration */}
                {(project.association || project.duration) && (
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    {project.association && (
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <FiMapPin size={9} style={{ color: project.color }} />
                        {project.association}
                      </span>
                    )}
                    {project.duration && (
                      <span className="text-[10px] text-slate-600">{project.duration}</span>
                    )}
                  </div>
                )}

                {/* Description */}
                <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {/* Tech */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] text-slate-500 glass px-2 py-1 rounded-md font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
