import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
  ChevronDown,
  Search,
  LifeBuoy,
  X,
} from "lucide-react";

// --- Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const faqs = [
  {
    q: "How do I send money?",
    a: "Go to Transfer from the side navigation, enter the recipient's phone number or account, set the amount, and confirm with your PIN.",
  },
  {
    q: "Is my money safe with PakSwift?",
    a: "Yes. PakSwift uses bank-grade encryption and is regulated by the State Bank of Pakistan.",
  },
  {
    q: "How do I reset my PIN?",
    a: "Go to Profile → Security → Change PIN. You'll need to verify your identity via OTP.",
  },
  {
    q: "What are the transfer limits?",
    a: "Daily transfer limit is PKR 500,000 for verified accounts.",
  },
];

const contactOptions = [
  {
    icon: MessageCircle,
    label: "Live Chat",
    desc: "Available 24/7",
    type: "chat",
  },
  {
    icon: Phone,
    label: "Call Us",
    desc: "0800-PAKSWIFT",
    type: "tel",
    value: "080072579438",
  },
  {
    icon: Mail,
    label: "Email",
    desc: "support@pakswift.pk",
    type: "mail",
    value: "support@pakswift.pk",
  },
];

function UserHelpSupportComponent() {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const filteredFaqs = useMemo(() => {
    return faqs.filter(
      (faq) =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8F8F8] p-8 flex justify-center text-[#1D242D]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl space-y-12"
      >
        {/* HEADER & SEARCH */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black tracking-tighter">
              Support Center
            </h1>
            <p className="text-sm opacity-60">How can we assist you today?</p>
          </div>

          <div className="relative max-w-md mx-auto">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help articles..."
              className="w-full bg-[#F8F8F8] border border-black/5 rounded-2xl py-4 pl-12 pr-4 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),inset_-2px_-2px_5px_rgba(255,255,255,0.8)] focus:outline-none transition-all"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CONTACT CARDS */}
          {contactOptions.map((opt, i) => (
            <motion.button
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 bg-[#F8F8F8] rounded-3xl border border-black/5 shadow-[8px_8px_16px_rgba(0,0,0,0.03),-8px_-8px_16px_rgba(255,255,255,0.8)] flex flex-col items-center text-center space-y-3"
              onClick={() => (opt.type === "chat" ? setIsChatOpen(true) : null)}
            >
              <div className="p-3 bg-[#F8F8F8] rounded-xl shadow-[inner_2px_2px_4px_rgba(0,0,0,0.05)]">
                <opt.icon size={24} strokeWidth={1.5} />
              </div>
              <p className="font-bold text-sm">{opt.label}</p>
              <p className="text-[11px] opacity-50">{opt.desc}</p>
            </motion.button>
          ))}
        </div>

        {/* FAQS */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest opacity-40 px-2">
            Common Questions
          </h2>
          <div className="space-y-3">
            {filteredFaqs.map((faq, i) => (
              <motion.div
                key={i}
                layout
                className="bg-[#F8F8F8] rounded-2xl border border-black/5 overflow-hidden shadow-[4px_4px_10px_rgba(0,0,0,0.02)]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <span className="text-sm font-semibold">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}>
                    <ChevronDown size={18} className="opacity-30" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 text-sm opacity-60 leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* MINIMAL CHAT OVERLAY */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-8 right-8 w-72 bg-[#F8F8F8] rounded-3xl border border-black/10 shadow-[20px_20px_60px_rgba(0,0,0,0.05)] overflow-hidden"
          >
            <div className="p-4 border-b border-black/5 flex justify-between items-center bg-[#F8F8F8]">
              <span className="text-xs font-bold">Support Chat</span>
              <button onClick={() => setIsChatOpen(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="h-48 p-4 overflow-y-auto">
              <div className="bg-white/50 p-3 rounded-2xl rounded-bl-none text-[11px] max-w-[80%] border border-black/5">
                Hello! How can we help?
              </div>
            </div>
            <div className="p-3">
              <input
                className="w-full bg-black/5 rounded-xl p-2 text-xs focus:outline-none"
                placeholder="Type..."
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserHelpSupportComponent;
