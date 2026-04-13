import { motion } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  Droplets,
  QrCode,
  Send,
  Smartphone,
  Wifi,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function UserDashboardComponent() {
  // ==================== USESTATES ====================
  const [userBalance, setUserBalance] = useState("45000");
  // ==================== ARRAYS ====================
  const links = [
    {
      link: "/u/transfer",
      text: "Send Money",
      icon: Send,
    },
    {
      link: "/u/qr-pay",
      text: "QR Pay",
      icon: QrCode,
    },
    {
      link: "/u/topup",
      text: "Mobile Top-up",
      icon: Smartphone,
    },
    {
      link: "/u/internet",
      text: "Internet",
      icon: Wifi,
    },
    {
      link: "/u/utilities",
      text: "Utilities",
      icon: Droplets,
    },
  ];

  const mockData = [
    { name: "Ahmed Khan", type: "sent", amount: 2500, time: "Today, 2:30 PM" },
    {
      name: "Sara Ali",
      type: "received",
      amount: 5000,
      time: "Today, 11:15 AM",
    },
    { name: "Jazz Mobile", type: "sent", amount: 500, time: "Yesterday" },
    { name: "Fatima Noor", type: "received", amount: 12000, time: "Yesterday" },
  ];
  return (
    <div className="space-y-5 py-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-linear-to-r from-[#1c69dc] to-[#0f57c3] p-6 rounded-xl"
      >
        {/* ==================== HEADING ==================== */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-13 h-13 bg-[#4986e1] rounded-full grid place-items-center">
              <Zap className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-white/70 text-sm leading-2.25">
                Good Morning
              </h1>
              <h1 className="sm:text-[22px] text-lg text-white font-semibold">
                Muhammad Ahad
              </h1>
            </div>
          </div>
          {/* ==================== NOTIFICATION BUTTON ==================== */}
          <Link to={"/notifications"}>
            <button className="w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center relative">
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#df3a3a]" />
            </button>
          </Link>
        </div>

        {/* ==================== BALANCE AND ACCOUNT ==================== */}
        <div className="bg-linear-to-r from-[#3b7bdb] to-[#316dc8] rounded-xl p-4">
          <span className="text-xs text-white/50 font-medium">
            Available Balance
          </span>
          <h1 className="mt-3 text-3xl font-bold text-white">
            PKR {Number(userBalance)?.toLocaleString()}
            <span className="text-lg tracking-wider">.00</span>
          </h1>
          <div className="h-5 w-34.75 grid place-items-center rounded-4xl bg-[#FFFFFF33] mt-2">
            <span className="text-[10px] text-[#FFFFFFCC] leading-2.25 font-medium">
              Account: 0312-XXXXXXX
            </span>
          </div>
        </div>
      </motion.div>

      {/* ==================== QUICK LINKS ==================== */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-3.5"
      >
        {links.map((item, i) => {
          const Icon = item.icon;
          return (
            <div className="flex items-center justify-center flex-col" key={i}>
              <NavLink
                to={item.link}
                end
                className={({ isActive }) =>
                  `w-12 h-12 grid place-items-center rounded-xl transition-colors ease-in-out duration-200 ${
                    isActive
                      ? "bg-[#1c69dc] text-white"
                      : "bg-[#e6f1fe] text-[#1c69dc] hover:bg-[#1c69dc] hover:text-white"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
              </NavLink>
              <div className="text-center">
                <span className="text-[12px]">{item.text}</span>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* ==================== RECENT TRANSACTIONS ==================== */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-semibold text-lg text-gray-700">
            Recent Transactions
          </h1>
          <Link
            to={"/u/history"}
            className="text-[15px] font-medium text-gray-700"
          >
            See All
          </Link>
        </div>
        <div className="space-y-3">
          {mockData.map((item, i) => {
            const isSent = item.type === "sent";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm mt-2.5"
              >
                <div className="flex items-center gap-4">
                  {/* Icon Container */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isSent ? "bg-red-50" : "bg-emerald-50"
                    }`}
                  >
                    {isSent ? (
                      <ArrowUpRight className="w-6 h-6 text-red-500" />
                    ) : (
                      <ArrowDownLeft className="w-6 h-6 text-emerald-500" />
                    )}
                  </div>

                  {/* Text Info */}
                  <div>
                    <h3 className="font-bold text-gray-900 text-[15px]">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">
                      {item.time}
                    </p>
                  </div>
                </div>

                {/* Amount */}
                <div
                  className={`font-bold sm:text-base text-[15px] ${
                    isSent ? "text-red-500" : "text-emerald-500"
                  }`}
                >
                  {isSent ? "- " : "+ "}
                  Rs. {item.amount.toLocaleString()}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserDashboardComponent;
