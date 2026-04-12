import { easeOut, motion } from "framer-motion";
import { Zap } from "lucide-react";

function LoadingPage() {
  return (
    <div className="bg-[linear-gradient(160deg,#3078E6,#1A53A0)] fixed w-full h-full flex items-center justify-center flex-col">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center gap-4"
      >
        <motion.div
          className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-[0_8px_30px_-8px_#2563EB26]"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <Zap className="w-10 h-10 text-[#2563EB]" fill="currentColor" />
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-extrabold text-white tracking-tight"
        >
          PakSwift
        </motion.h1>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/70 text-sm font-medium"
        >
          Fast. Secure. Simple.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-16"
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white/60"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default LoadingPage;
