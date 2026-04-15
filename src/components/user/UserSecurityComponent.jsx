import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Smartphone,
  ShieldCheck,
  AlertTriangle,
  Clock,
  KeyRound,
  X,
} from "lucide-react";

// Initial Mock Data for Login History
const initialHistory = [
  {
    id: 1,
    device: "Samsung Galaxy S24",
    location: "Lahore, PK",
    time: "Today, 9:15 AM",
    current: true,
  },
  {
    id: 2,
    device: "Chrome — Windows",
    location: "Islamabad, PK",
    time: "Yesterday, 6:30 PM",
    current: false,
  },
  {
    id: 3,
    device: "iPhone 15 Pro",
    location: "Karachi, PK",
    time: "Apr 8, 2026",
    current: false,
  },
];

function UserSecurityComponent() {
  // --- State Management ---
  const [history, setHistory] = useState(initialHistory);
  const [securitySettings, setSecuritySettings] = useState({
    biometric: true,
    twoFactor: false,
  });

  // Helper for simple notifications/modals
  const [activeModal, setActiveModal] = useState(null);

  // --- Handlers ---
  const toggleSetting = (key) => {
    setSecuritySettings((prev) => ({ ...prev, [key]: !prev[key] }));
    // Logic: In a real app, this would trigger an API call or an OTP verification
    console.log(`${key} updated to:`, !securitySettings[key]);
  };

  const revokeSession = (id) => {
    if (window.confirm("Are you sure you want to log out of this device?")) {
      setHistory(history.filter((item) => item.id !== id));
    }
  };

  const handleSensitiveAction = (actionName) => {
    setActiveModal(actionName);
  };

  return (
    <div className="py-6 relative">
      <div className="w-full max-w-5xl space-y-6">
        {/* --- AUTHENTICATION SECTION --- */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Authentication
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {/* Change PIN */}
            <SecurityRow
              icon={<Lock size={20} />}
              title="Change PIN"
              desc="Update your 4-digit PIN"
              action={
                <button
                  onClick={() => handleSensitiveAction("PIN")}
                  className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Change
                </button>
              }
            />

            {/* Biometric Login */}
            <SecurityRow
              icon={<Smartphone size={20} />}
              title="Biometric Login"
              desc="Fingerprint or Face ID"
              action={
                <Toggle
                  checked={securitySettings.biometric}
                  onChange={() => toggleSetting("biometric")}
                />
              }
            />

            {/* Two-Factor Auth */}
            <SecurityRow
              icon={<ShieldCheck size={20} />}
              title="Two-Factor Auth"
              desc="Extra security via SMS OTP"
              action={
                <Toggle
                  checked={securitySettings.twoFactor}
                  onChange={() => toggleSetting("twoFactor")}
                />
              }
            />
          </div>
        </section>

        {/* --- CREDENTIALS SECTION --- */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Credentials
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            <SecurityRow
              icon={<KeyRound size={20} />}
              title="Change Password"
              desc="Update account password"
              action={
                <button
                  onClick={() => handleSensitiveAction("Password")}
                  className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Update
                </button>
              }
            />

            <SecurityRow
              icon={<AlertTriangle size={20} />}
              title="Deactivate Account"
              desc="Temporarily disable your account"
              colorClass="bg-red-50 text-red-500"
              action={
                <button
                  onClick={() => handleSensitiveAction("Deactivation")}
                  className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors"
                >
                  Deactivate
                </button>
              }
            />
          </div>
        </section>

        {/* --- LOGIN HISTORY SECTION --- */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
            <Clock size={14} className="text-gray-400" />
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Login History
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            <AnimatePresence initial={false}>
              {history.map((session) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center justify-between p-6"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-gray-800">
                        {session.device}
                      </h3>
                      {session.current && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold rounded uppercase">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {session.location} · {session.time}
                    </p>
                  </div>
                  {!session.current && (
                    <button
                      onClick={() => revokeSession(session.id)}
                      className="text-sm font-bold text-red-500 hover:underline"
                    >
                      Revoke
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </div>

      {/* --- Action Modal Overlay --- */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">Verify Identity</h3>
                <button onClick={() => setActiveModal(null)}>
                  <X size={18} />
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                To change your <strong>{activeModal}</strong>, we'll send a
                verification code to your registered mobile number.
              </p>
              <button
                onClick={() => setActiveModal(null)}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700"
              >
                Send Code
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* --- REUSABLE SUB-COMPONENTS --- */

const SecurityRow = ({
  icon,
  title,
  desc,
  action,
  colorClass = "bg-blue-50 text-blue-600",
}) => (
  <div className="flex items-center justify-between p-6">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-lg ${colorClass}`}>{icon}</div>
      <div>
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
    {action}
  </div>
);

const Toggle = ({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={checked}
      onChange={onChange}
    />
    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
  </label>
);

export default UserSecurityComponent;
