import{ useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

function UserHistoryComponent() {
  const [selectedTab, setSelectedTab] = useState("all");

  const tabs = [
    { key: "all", text: "All" },
    { key: "sent", text: "Sent" },
    { key: "received", text: "Received" },
  ];

  const transactions = [
    {
      name: "Ahmed Khan",
      type: "sent",
      amount: 2500,
      time: "2:30 PM",
      date: "Today",
    },
    {
      name: "Sara Ali",
      type: "received",
      amount: 5000,
      time: "11:15 AM",
      date: "Today",
    },
    {
      name: "Jazz Mobile",
      type: "sent",
      amount: 500,
      time: "9:00 PM",
      date: "Yesterday",
    },
    {
      name: "Fatima Noor",
      type: "received",
      amount: 12000,
      time: "3:45 PM",
      date: "Yesterday",
    },
    {
      name: "PTCL Bill",
      type: "sent",
      amount: 3200,
      time: "10:00 AM",
      date: "Apr 8",
    },
    {
      name: "Usman Raza",
      type: "sent",
      amount: 7500,
      time: "5:20 PM",
      date: "Apr 7",
    },
    {
      name: "Freelance Pay",
      type: "received",
      amount: 25000,
      time: "1:00 PM",
      date: "Apr 7",
    },
    {
      name: "K-Electric",
      type: "sent",
      amount: 4800,
      time: "11:30 AM",
      date: "Apr 6",
    },
  ];

  // Logic to filter transactions based on the active tab
  const filteredTransactions = transactions.filter((tx) =>
    selectedTab === "all" ? true : tx.type === selectedTab,
  );

  return (
    <div className="py-6">
      {/* ==================== HEADING ==================== */}
      <h1 className="text-2xl font-semibold text-foreground mb-4">History</h1>

      {/* ==================== NAVIGATION TABS ==================== */}
      <div className="flex items-center gap-3 mb-6">
        {tabs.map((item) => (
          <button
            type="button"
            key={item.key}
            onClick={() => setSelectedTab(item.key)}
            className={`font-medium shadow-md py-2 px-4 rounded-lg transition-colors duration-200 ease-in-out ${selectedTab === item.key ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white bg-white text-black"}`}
          >
            {item.text}
          </button>
        ))}
      </div>

      {/* ==================== TRANSACTION LIST ==================== */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredTransactions.map((tx, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              exit={{ opacity: 0, x: 30 }}
              key={`${tx.name}-${tx.time}-${i}`}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Icon Container */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  tx.type === "received"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {tx.type === "received" ? (
                  <ArrowDownLeft className="w-5 h-5" />
                ) : (
                  <ArrowUpRight className="w-5 h-5" />
                )}
              </div>

              {/* Transaction Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 truncate">
                  {tx.name}
                </p>
                <p className="text-xs text-gray-500">
                  {tx.date} • {tx.time}
                </p>
              </div>

              {/* Amount */}
              <p
                className={`font-bold text-sm whitespace-nowrap ${tx.type === "received" ? "text-green-600" : "text-red-600"}`}
              >
                {tx.type === "received" ? "+" : "-"} Rs.{" "}
                {tx.amount.toLocaleString()}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredTransactions.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No transactions found.
          </p>
        )}
      </div>
    </div>
  );
}

export default UserHistoryComponent;
