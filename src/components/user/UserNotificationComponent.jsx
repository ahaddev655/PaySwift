import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowDownLeft,
  ArrowUpRight,
  Megaphone,
  Shield,
  CheckCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialNotifications = [
  {
    id: 1,
    icon: "received",
    title: "Money Received",
    desc: "Rs. 5,000 received from Sara Ali",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    icon: "sent",
    title: "Transfer Successful",
    desc: "Rs. 2,500 sent to Ahmed Khan",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    icon: "promo",
    title: "Free Transfers This Week!",
    desc: "Send money with zero fees until Sunday",
    time: "3 hours ago",
    read: false,
  },
  {
    id: 4,
    icon: "security",
    title: "New Login Detected",
    desc: "Login from Samsung Galaxy S24 in Lahore",
    time: "Today, 9:15 AM",
    read: true,
  },
  {
    id: 5,
    icon: "received",
    title: "Money Received",
    desc: "Rs. 12,000 received from Fatima Noor",
    time: "Yesterday",
    read: true,
  },
  {
    id: 6,
    icon: "sent",
    title: "Bill Payment",
    desc: "Rs. 3,200 paid for electricity bill",
    time: "Yesterday",
    read: true,
  },
  {
    id: 7,
    icon: "promo",
    title: "Refer & Earn",
    desc: "Invite friends and earn Rs. 500 per referral",
    time: "Apr 9, 2026",
    read: true,
  },
  {
    id: 8,
    icon: "security",
    title: "PIN Changed",
    desc: "Your account PIN was updated successfully",
    time: "Apr 8, 2026",
    read: true,
  },
];

// Mapping icons to Hex-based background and text colors
const iconConfig = {
  received: {
    icon: ArrowDownLeft,
    bg: "bg-[#2EBA73]/10",
    text: "text-[#2EBA73]",
  },
  sent: { icon: ArrowUpRight, bg: "bg-[#E03D3D]/10", text: "text-[#E03D3D]" },
  promo: { icon: Megaphone, bg: "bg-[#1E69E3]/10", text: "text-[#1E69E3]" },
  security: { icon: Shield, bg: "bg-[#F1F6FF]", text: "text-[#1E69E3]" },
};

const UserNotificationComponent = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="py-6">
      {unreadCount > 0 && (
        <button
          onClick={markAllRead}
          className="flex items-center gap-1 text-blue-700 hover:text-blue-800 transition-colors ml-auto"
        >
          <CheckCheck className="w-4 h-4" />
          <span className="text-xs font-semibold">Read all</span>
        </button>
      )}
      {/* Notifications List */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-6 mt-6 space-y-3"
      >
        {notifications.map((notif, i) => {
          const config = iconConfig[notif.icon];
          const Icon = config.icon;

          return (
            <motion.div
              key={notif.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              style={{ boxShadow: "0 2px 12px -2px rgba(29, 36, 45, 0.06)" }}
              className={`bg-white rounded-xl p-4 flex items-start gap-3 transition-all ${
                !notif.read ? "border-l-4 border-[#1E69E3]" : ""
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${config.bg} ${config.text}`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-semibold text-[#1D242D] ${!notif.read ? "" : "opacity-70"}`}
                >
                  {notif.title}
                </p>
                <p className="text-xs text-[#737F8F] mt-0.5 truncate">
                  {notif.desc}
                </p>
                <p className="text-[10px] text-[#737F8F] mt-1">{notif.time}</p>
              </div>

              {!notif.read && (
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E69E3] shrink-0 mt-1" />
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default UserNotificationComponent;
