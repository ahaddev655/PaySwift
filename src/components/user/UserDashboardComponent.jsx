import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useState } from "react";

function UserDashboardComponent() {
  const [userBalance, setUserBalance] = useState("45000");
  return (
    <div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-linear-to-r from-[#1c69dc] to-[#0f57c3] py-6 px-6 rounded-xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-13 h-13 bg-[#4986e1] rounded-full grid place-items-center">
              <Zap className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-white/70 text-sm leading-2.25">
                Good Morning
              </h1>
              <h1 className="text-[22px] text-white font-semibold">
                Muhammad Ahad
              </h1>
            </div>
          </div>
        </div>

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
    </div>
  );
}

export default UserDashboardComponent;
