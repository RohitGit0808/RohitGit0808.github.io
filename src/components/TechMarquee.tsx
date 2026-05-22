const TECHS = [
  { label: "Playwright", color: "#00d4ff" },
  { label: "Selenium 4", color: "#7b2fff" },
  { label: "Java", color: "#f89820" },
  { label: "TypeScript", color: "#3178c6" },
  { label: "Python", color: "#ffd93d" },
  { label: "REST Assured", color: "#00ffea" },
  { label: "Cucumber BDD", color: "#23d96c" },
  { label: "Docker", color: "#2496ed" },
  { label: "Kubernetes", color: "#326ce5" },
  { label: "Jenkins", color: "#f0d6b7" },
  { label: "GitHub Actions", color: "#e2e8f0" },
  { label: "AWS", color: "#ff9900" },
  { label: "BrowserStack", color: "#ff6c37" },
  { label: "Allure Reports", color: "#00d4ff" },
  { label: "TestNG", color: "#ea4c89" },
  { label: "PostgreSQL", color: "#4169e1" },
  { label: "OAuth 2.0", color: "#7b2fff" },
  { label: "Selenium Grid", color: "#00ffea" },
  { label: "YOLOv3", color: "#ffd93d" },
  { label: "TensorFlow", color: "#ff6f00" },
];

export default function TechMarquee() {
  const items = [...TECHS, ...TECHS]; // duplicate for seamless loop

  return (
    <div className="relative w-full overflow-hidden py-3 mt-6" style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}>
      <div className="flex gap-3 marquee-track">
        {items.map((t, i) => (
          <span
            key={i}
            className="flex-shrink-0 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{
              background: `${t.color}12`,
              border: `1px solid ${t.color}28`,
              color: `${t.color}bb`,
            }}
          >
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}
