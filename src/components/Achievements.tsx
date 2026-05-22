import { motion } from "framer-motion";
import { achievements } from "../data/portfolio";

const ORG_META: Record<string, { logo: string; color: string }> = {
  "Amazon Web Services": {
    logo: "https://cdn.worldvectorlogo.com/logos/amazon-web-services-2.svg",
    color: "#FF9900",
  },
  Cognizant: {
    logo: "https://cdn.worldvectorlogo.com/logos/cognizant-2.svg",
    color: "#00d4ff",
  },
  Udemy: {
    logo: "https://cdn.worldvectorlogo.com/logos/udemy-1.svg",
    color: "#a435f0",
  },
  Anthropic: {
    logo: "https://github.com/anthropics.png?size=48",
    color: "#cc785c",
  },
};

const CERT_ORDER = ["Amazon Web Services", "Cognizant", "Udemy", "Anthropic"];

export default function Achievements() {
  const certifications = achievements.filter((a) => a.type === "certification");
  const awards = achievements.filter((a) => a.type === "achievement");

  // Group certs by org
  const grouped = CERT_ORDER.reduce<Record<string, typeof certifications>>(
    (acc, org) => {
      const items = certifications.filter((c) => c.org === org);
      if (items.length) acc[org] = items;
      return acc;
    },
    {}
  );

  return (
    <section id="achievements" className="relative py-24 overflow-hidden">
      <div
        className="orb"
        style={{
          width: 380,
          height: 380,
          background: "radial-gradient(circle, #ffd93d, transparent)",
          top: "20%",
          right: -150,
          opacity: 0.05,
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
            Recognition & Credentials
          </p>
          <h2 className="section-title text-white mb-1">Achievements</h2>
          <div className="w-14 h-0.5 bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] rounded-full" />
        </motion.div>

        {/* ── Certifications ─────────────────────── */}
        <div className="mb-14">
          <h3 className="text-slate-300 font-semibold text-sm uppercase tracking-widest mb-8 flex items-center gap-2">
            <span className="text-[#00d4ff]">◈</span> Certifications &amp; Licences
            <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00d4ff15] text-[#00d4ff] border border-[#00d4ff30]">
              {certifications.length}
            </span>
          </h3>

          <div className="space-y-8">
            {Object.entries(grouped).map(([org, certs], gi) => {
              const meta = ORG_META[org] ?? { logo: "", color: "#00d4ff" };
              return (
                <div key={org}>
                  {/* Org header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
                      style={{
                        background: `${meta.color}15`,
                        border: `1px solid ${meta.color}30`,
                      }}
                    >
                      {meta.logo ? (
                        <img
                          src={meta.logo}
                          alt={org}
                          className="w-5 h-5 object-contain"
                        />
                      ) : (
                        <span style={{ color: meta.color, fontSize: 12, fontWeight: 700 }}>
                          {org.slice(0, 2)}
                        </span>
                      )}
                    </div>
                    <span
                      className="text-sm font-bold tracking-wide"
                      style={{ color: meta.color }}
                    >
                      {org}
                    </span>
                    <div
                      className="flex-1 h-px"
                      style={{
                        background: `linear-gradient(90deg, ${meta.color}30, transparent)`,
                      }}
                    />
                  </div>

                  {/* Cert cards grid */}
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3 pl-11">
                    {certs.map((c, i) => (
                      <motion.div
                        key={c.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: gi * 0.05 + i * 0.06 }}
                        className="glass-card p-4 flex gap-3 items-start relative overflow-hidden group"
                      >
                        {/* Left accent */}
                        <div
                          className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                          style={{
                            background: `linear-gradient(180deg, ${meta.color}, transparent)`,
                          }}
                        />
                        {/* Icon */}
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0 mt-0.5"
                          style={{
                            background: `${meta.color}12`,
                            border: `1px solid ${meta.color}25`,
                          }}
                        >
                          {c.icon}
                        </div>
                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-xs font-semibold leading-snug mb-1">
                            {c.title}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                              style={{
                                background: `${meta.color}12`,
                                color: meta.color,
                                border: `1px solid ${meta.color}25`,
                              }}
                            >
                              {c.year}
                            </span>
                            {c.credentialId && (
                              <span className="text-[10px] text-slate-600 font-mono truncate max-w-[120px]">
                                #{c.credentialId}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Awards & Milestones ─────────────────── */}
        <div>
          <h3 className="text-slate-300 font-semibold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="text-[#ffd93d]">◈</span> Awards &amp; Milestones
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {awards.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5 flex items-center gap-4 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden"
                  style={{
                    background: `${a.color}15`,
                    border: `1.5px solid ${a.color}30`,
                  }}
                >
                  {(a as any).logo ? (
                    <img src={(a as any).logo} alt={a.org} className="w-8 h-8 object-contain" />
                  ) : (
                    a.icon
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-sm leading-snug">
                    {a.title}
                  </h4>
                  <p className="text-slate-400 text-xs mt-0.5">{a.org}</p>
                  {(a as any).sub && (
                    <p className="text-slate-500 text-[11px] mt-1.5 leading-relaxed">{(a as any).sub}</p>
                  )}
                </div>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{
                    background: `${a.color}15`,
                    color: a.color,
                    border: `1px solid ${a.color}30`,
                  }}
                >
                  {a.year}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
