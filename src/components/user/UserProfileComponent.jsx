import {
  Bell,
  ChevronRight,
  CircleQuestionMark,
  CreditCard,
  LogOut,
  Settings,
  Shield,
  UserIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function UserProfileComponent() {
  const links = [
    {
      icon: CreditCard,
      link: "/u/cards",
      text: "My Cards",
      details: "Manage your cards",
    },
    {
      icon: Shield,
      link: "/u/security",
      text: "Security",
      details: "PIN, Password",
    },
    {
      icon: Bell,
      link: "/u/notifications",
      text: "Notifications",
      details: "Manage Alerts",
    },
    {
      icon: Settings,
      link: "/u/settings",
      text: "Settings",
      details: "App Preferences",
    },
    {
      icon: CircleQuestionMark,
      link: "/u/help",
      text: "Help & Support",
      details: "FAQs & Contact",
    },
  ];
  return (
    <div className="py-6">
      {/* ==================== HEADING ==================== */}
      <div className="bg-linear-to-r from-[#1c69dc] to-[#0f57c3] p-6 rounded-xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-13 h-13 bg-[#4986e1] rounded-full grid place-items-center">
            <UserIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="sm:text-[22px] text-lg text-white font-semibold">
              Muhammad Ahad
            </h1>
            <h1 className="text-white/70 text-sm leading-2.25 mb-2">
              0312-3456789
            </h1>
            <span className="text-xs bg-white/20 rounded-full px-2 py-0.5 text-white/50">
              Verified Account ✓
            </span>
          </div>
        </motion.div>
      </div>
      {/* ==================== LINKS ==================== */}
      <div className="mt-5">
        {links.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              to={item.link}
              key={i}
              className={`block ${i !== links.length - 1 ? "mb-4" : ""}`}
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between bg-white shadow-md p-3 rounded-lg hover:shadow-lg transition-shadow duration-200 ease-in-out"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#e6f1fe] text-[#1856b4] w-10 h-10 grid place-items-center rounded-lg">
                    <Icon size={20} strokeWidth={2.25} />
                  </div>
                  <div className="mt-2">
                    <h1 className="text-sm leading-1 font-medium">
                      {item.text}
                    </h1>
                    <span className="text-xs text-gray-400">
                      {item.details}
                    </span>
                  </div>
                </div>
                <ChevronRight size={20} color="#737B8C" />
              </motion.div>
            </Link>
          );
        })}
      </div>
      {/* ==================== LOG OUT ==================== */}
      <div className="mt-5">
        <Link
          to={"/auth"}
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("id");
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 6 * 0.1 }}
            className="flex items-center justify-between bg-white shadow-md p-3 rounded-lg hover:shadow-lg transition-shadow duration-200 ease-in-out"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#fbebeb] text-red-600 w-10 h-10 grid place-items-center rounded-lg">
                <LogOut size={20} strokeWidth={2.25} />
              </div>
              <div>
                <h1 className="text-sm font-medium text-red-600">Log Out</h1>
              </div>
            </div>
            <ChevronRight size={20} color="#737B8C" />
          </motion.div>
        </Link>
      </div>
    </div>
  );
}

export default UserProfileComponent;
