import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiArrowUp, FiMail } from "react-icons/fi";
import { personalInfo } from "../data/portfolio";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed right-5 bottom-8 z-50 flex flex-col items-end gap-2.5"
        >
          {/* Download CV */}
          <motion.a
            href={personalInfo.resume}
            target="_blank"
            rel="noreferrer"
            title="Download / View Resume"
            whileHover={{ scale: 1.06, x: -2 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #00d4ff 0%, #7b2fff 100%)",
              boxShadow: "0 4px 24px rgba(0,212,255,0.35)",
            }}
          >
            <FiDownload size={13} />
            Download CV
          </motion.a>

          {/* Hire Me */}
          <motion.a
            href={`mailto:${personalInfo.email}`}
            title="Send Email"
            whileHover={{ scale: 1.06, x: -2 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold"
            style={{
              background: "rgba(10,15,30,0.85)",
              border: "1px solid rgba(0,212,255,0.3)",
              backdropFilter: "blur(16px)",
              color: "#00d4ff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <FiMail size={13} />
            Hire Me
          </motion.a>

          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            title="Back to top"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(10,15,30,0.7)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              color: "#475569",
            }}
          >
            <FiArrowUp size={14} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
