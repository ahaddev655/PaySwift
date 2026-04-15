import React, { useState, useEffect } from "react";
import {
  Sun,
  Globe,
  Smartphone,
  Eye,
  Lock,
  Bell,
  ChevronDown,
  Check,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const UserSettingsComponent = () => {
  // --- State Management ---
  const [settings, setSettings] = useState({
    darkMode: false,
    biometric: true,
    showBalance: true,
    notifications: true,
    language: "English",
  });

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  // --- Handlers ---
  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

    // Side effect for Dark Mode
    if (key === "darkMode") {
      document.documentElement.classList.toggle("dark");
    }
  };

  const selectLanguage = (lang) => {
    setSettings((prev) => ({ ...prev, language: lang }));
    setIsLangOpen(false);
  };

  return (
    <div className="py-6">
      <div className="space-y-8">
        {/* --- APPEARANCE SECTION --- */}
        <section>
          <h2 className="text-[11px] font-bold text-[#737F8F] uppercase tracking-[2px] mb-4 ml-1">
            Appearance
          </h2>
          <div className="bg-white rounded-2xl border border-[#E1E4E8] shadow-sm">
            <SettingsRow
              icon={<Sun size={18} />}
              title="Dark Mode"
              desc="Switch theme appearance"
              action={
                <Toggle
                  checked={settings.darkMode}
                  onChange={() => handleToggle("darkMode")}
                />
              }
            />
            <SettingsRow
              icon={<Globe size={18} />}
              title="Language"
              desc={settings.language}
              action={
                <div className="relative">
                  <button
                    onClick={() => setIsLangOpen(!isLangOpen)}
                    className="flex items-center gap-2 px-4 py-1.5 bg-[#F1F6FF] text-[#1E69E3] rounded-lg text-sm font-semibold border border-transparent hover:border-[#1E69E3]/20 transition-all"
                  >
                    {settings.language}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isLangOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 shadow-xl rounded-xl z-50 overflow-hidden"
                      >
                        {["English", "Urdu", "Arabic", "French"].map((lang) => (
                          <button
                            key={lang}
                            onClick={() => selectLanguage(lang)}
                            className="w-full flex items-center justify-between px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors"
                          >
                            {lang}
                            {settings.language === lang && (
                              <Check size={14} className="text-[#1E69E3]" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              }
              last
            />
          </div>
        </section>

        {/* --- SECURITY SECTION --- */}
        <section>
          <h2 className="text-[11px] font-bold text-[#737F8F] uppercase tracking-[2px] mb-4 ml-1">
            Security
          </h2>
          <div className="bg-white rounded-2xl border border-[#E1E4E8] shadow-sm overflow-hidden">
            <SettingsRow
              icon={<Smartphone size={18} />}
              title="Biometric Login"
              desc="Fingerprint or Face ID"
              action={
                <Toggle
                  checked={settings.biometric}
                  onChange={() => handleToggle("biometric")}
                />
              }
            />
            <SettingsRow
              icon={<Eye size={18} />}
              title="Show Balance"
              desc="Display balance on home"
              action={
                <Toggle
                  checked={settings.showBalance}
                  onChange={() => handleToggle("showBalance")}
                />
              }
            />
            <SettingsRow
              icon={<Lock size={18} />}
              title="Change PIN"
              desc="Update your 4-digit PIN"
              action={
                <button
                  onClick={() => setShowPinModal(true)}
                  className="text-[#1E69E3] font-bold text-sm hover:underline"
                >
                  Change
                </button>
              }
              last
            />
          </div>
        </section>

        {/* --- NOTIFICATIONS SECTION --- */}
        <section>
          <h2 className="text-[11px] font-bold text-[#737F8F] uppercase tracking-[2px] mb-4 ml-1">
            Notifications
          </h2>
          <div className="bg-white rounded-2xl border border-[#E1E4E8] shadow-sm overflow-hidden">
            <SettingsRow
              icon={<Bell size={18} />}
              title="Push Notifications"
              desc="Transaction & promo alerts"
              action={
                <Toggle
                  checked={settings.notifications}
                  onChange={() => handleToggle("notifications")}
                />
              }
              last
            />
          </div>
        </section>
      </div>

      {/* --- PIN MODAL --- */}
      <AnimatePresence>
        {showPinModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative"
            >
              <button
                onClick={() => setShowPinModal(false)}
                className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Change Secure PIN
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Enter your current PIN to set a new one.
                </p>
                <div className="flex justify-center gap-3 mb-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-14 border-2 border-gray-100 rounded-xl focus-within:border-blue-500 flex items-center justify-center"
                    >
                      <div className="w-2 h-2 bg-gray-300 rounded-full" />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowPinModal(false)}
                  className="w-full bg-[#1E69E3] text-white py-3.5 rounded-xl font-bold hover:bg-[#0A43B8] transition-all"
                >
                  Verify & Continue
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* --- REUSABLE ROW COMPONENT --- */
const SettingsRow = ({ icon, title, desc, action, last = false }) => (
  <div
    className={`flex items-center justify-between p-6 ${!last ? "border-b border-[#F8F8F8]" : ""}`}
  >
    <div className="flex items-center gap-5 text-left">
      <div className="p-3 bg-[#F1F6FF] text-[#1E69E3] rounded-xl shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-[15px] font-bold text-[#1D242D] leading-tight">
          {title}
        </h3>
        <p className="text-sm text-[#737F8F] mt-0.5">{desc}</p>
      </div>
    </div>
    <div className="shrink-0">{action}</div>
  </div>
);

/* --- CONTROLLED TOGGLE SWITCH --- */
const Toggle = ({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={checked}
      onChange={onChange}
    />
    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E69E3]"></div>
  </label>
);

export default UserSettingsComponent;
