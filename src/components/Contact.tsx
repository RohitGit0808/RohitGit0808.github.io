import { motion } from "framer-motion";
import { personalInfo } from "../data/portfolio";
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from "react-icons/fi";
import { SiGooglescholar, SiLeetcode, SiStackoverflow } from "react-icons/si";

const links = [
  {
    icon: FiMail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: "#00d4ff",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    value: "rohit-saxena-948b741b8",
    href: personalInfo.linkedin,
    color: "#0A66C2",
  },
  {
    icon: FiGithub,
    label: "GitHub",
    value: "RohitGit0808",
    href: personalInfo.github,
    color: "#e2e8f0",
  },
  {
    icon: SiGooglescholar,
    label: "Google Scholar",
    value: "Research Publications",
    href: personalInfo.scholar,
    color: "#4285F4",
  },
  {
    icon: SiLeetcode,
    label: "LeetCode",
    value: "307 Problems · Rank 443K",
    href: personalInfo.leetcode,
    color: "#FFA116",
  },
  {
    icon: SiStackoverflow,
    label: "Stack Overflow",
    value: "rohit-saxena",
    href: personalInfo.stackoverflow,
    color: "#F58025",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Full gradient bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(0,212,255,0.03)] pointer-events-none" />
      <div className="orb" style={{ width: 500, height: 500, background: "radial-gradient(circle, #00d4ff, transparent)", bottom: -200, left: "50%", transform: "translateX(-50%)", opacity: 0.07 }} />

      <div className="section-wrap">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#00d4ff] text-sm font-semibold uppercase tracking-widest mb-2">Get In Touch</p>
          <h2 className="section-title text-white mb-4">Let's Work Together</h2>
          <div className="w-14 h-0.5 bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] rounded-full mx-auto mb-6" />
          <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
            I'm actively exploring opportunities with high-growth product teams, fintech ecosystems, and cloud-native platforms.
            If you're building something ambitious and need a quality engineer who thinks like a software engineer — let's talk.
          </p>
        </motion.div>

        {/* Central CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-10 max-w-2xl mx-auto text-center mb-10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,212,255,0.04)] to-[rgba(123,47,255,0.04)]" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-5 text-2xl">
              🚀
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Open to New Opportunities</h3>
            <p className="text-slate-400 text-sm mb-7 leading-relaxed">
              SDET roles, QA Lead positions, and automation consulting projects. Remote-friendly and open to relocation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`mailto:${personalInfo.email}`} className="btn-primary text-sm inline-flex items-center gap-2 justify-center">
                <FiMail size={14} /> Send Email
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="btn-outline text-sm inline-flex items-center gap-2 justify-center">
                <FiLinkedin size={14} /> Connect on LinkedIn
              </a>
            </div>
          </div>
        </motion.div>

        {/* Link cards */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card px-6 py-4 flex items-center gap-3 group hover:border-[rgba(0,212,255,0.3)] min-w-[200px]"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${l.color}15`, border: `1px solid ${l.color}30` }}
              >
                <l.icon size={16} style={{ color: l.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-slate-500 text-[10px] uppercase tracking-wider">{l.label}</div>
                <div className="text-slate-300 text-xs font-medium truncate">{l.value}</div>
              </div>
              <FiArrowUpRight size={14} className="text-slate-600 group-hover:text-[#00d4ff] transition-colors" />
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center border-t border-white/5 pt-8"
        >
          <p className="text-slate-600 text-xs">
            Designed & Built by{" "}
            <span className="gradient-text font-semibold">Rohit Saxena</span>
            {" "}· SDET | Quality Engineering Specialist
          </p>
          <p className="text-slate-700 text-xs mt-1">
            Built with React · TypeScript · Framer Motion · Tailwind CSS
          </p>
        </motion.div>
      </div>
    </section>
  );
}
