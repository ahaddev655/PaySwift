import { motion } from "framer-motion";
import { MoveLeft, Search, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function UserTransferComponent() {
  // ==================== USESTATES ====================
  const [search, setSearch] = useState("");
  const [transactionPopUp, setTransactionPopUp] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [confirm, setConfirm] = useState(false);
  // ==================== ARRAYS ====================
  const recentContacts = [
    { id: 1, fname: "Ahmed Khan", mobileNumber: "0312-3456789" },
    { id: 2, fname: "Sara Ali", mobileNumber: "0321-9876543" },
    { id: 3, fname: "Fatima Noor", mobileNumber: "0300-1112233" },
    { id: 4, fname: "Usman Raza", mobileNumber: "0333-4455667" },
    { id: 5, fname: "Ayesha Malik", mobileNumber: "0345-7788990" },
  ];
  // ==================== FILTER FUNCTION ====================
  const filtered = recentContacts.filter(
    (c) =>
      c.fname.toLowerCase().includes(search.toLowerCase()) ||
      c.mobileNumber.includes(search),
  );
  // ==================== CARD FUNCTION ====================
  const initials = (name) => {
    return name.split(" ").map((part) => part[0]);
  };

  const handleAmountTransfer = (e) => {
    e.preventDefault();

    if (!amount) {
      toast.error("Amount is required...");
    }

    setConfirm(true);
    setTransactionPopUp(false);
  };

  const handleAmountTransferConfirm = (e) => {
    e.preventDefault();

    setConfirm(false);
    setSelectedUser(null);

    console.log("Amount To Transfer", amount);
    setAmount(false);
  };

  // ==================== COMPONENTS ====================
  const amountPopUp = () => {
    return (
      <div className="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-black/50 z-30 backdrop-blur-md">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-4">
          {/* -------------------- CROSS -------------------- */}
          <button
            onClick={() => {
              setTransactionPopUp(false);
              setSelectedUser(null);
              setAmount("");
            }}
            className="w-full"
          >
            <X className="ml-auto" size={27} strokeWidth={2.25} />
          </button>
          {/* -------------------- PROFILE PICTURE -------------------- */}
          <div className="w-16 h-16 mx-auto rounded-full bg-[linear-gradient(135deg,#1F6FE0,#3F5CF1)] flex items-center justify-center text-white font-semibold text-xl">
            {initials(selectedUser.fname)}
          </div>
          {/* -------------------- USER NAME -------------------- */}
          <p className="font-semibold lg:text-lg text-base text-[#1C2230] text-center mt-3">
            {selectedUser.fname}
          </p>
          {/* -------------------- MOBILE NUMBER -------------------- */}
          <p className="lg:text-base text-sm text-[#737B8C] text-center">
            {selectedUser.mobileNumber}
          </p>

          <form className="mt-4 text-center" onSubmit={handleAmountTransfer}>
            <span className="text-[13px] text-gray-500">
              Transfer Amount (Rs.)
            </span>
            <div>
              <input
                type="number"
                placeholder="Search name or number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-12 rounded-xl bg-white border-0 px-4 w-full shadow-sm mt-2"
              />
            </div>
            <button
              type="submit"
              className={`mt-4 h-12 w-full text-center rounded-lg font-medium transition-colors ease-in-out duration-200 ${amount.length < 1 ? "bg-gray-400 cursor-not-allowed! text-gray-700" : "bg-[linear-gradient(135deg,#1F6FE0,#3F5CF1)] text-white"}`}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    );
  };

  const amountConfirmPopUp = () => {
    return (
      <div className="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-black/50 z-30 backdrop-blur-md">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center w-full justify-between mb-4">
            {/* -------------------- CROSS -------------------- */}
            <button
              onClick={() => {
                setTransactionPopUp(true);
                setConfirm(false);
              }}
            >
              <MoveLeft size={27} strokeWidth={2.25} />
            </button>
            {/* -------------------- CROSS -------------------- */}
            <button
              onClick={() => {
                setSelectedUser(null);
                setAmount("");
                setConfirm(false);
              }}
            >
              <X size={27} strokeWidth={2.25} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[linear-gradient(135deg,#1F6FE0,#3F5CF1)] flex items-center justify-center text-white font-bold text-sm">
              {initials(selectedUser?.fname)}
            </div>

            <div className="flex-1">
              <p className="font-semibold lg:text-base text-sm text-[#1C2230]">
                {selectedUser?.fname}
              </p>
              <p className="lg:text-sm text-xs text-[#737B8C]">
                {selectedUser?.mobileNumber}
              </p>
            </div>
          </div>

          <div className="h-[0.1rem] w-full bg-gray-200 my-4 rounded-full" />
          <div className="flex items-center justify-between">
            <span className="text-[15px] text-gray-500">Amount</span>
            <span className="text-[15px] font-medium">
              Rs. {Number(amount).toLocaleString()}
            </span>
          </div>
          <div className="h-[0.1rem] w-full bg-gray-200 mt-4 rounded-full" />

          <button
            onClick={handleAmountTransferConfirm}
            type="submit"
            className={`mt-4 h-12 w-full text-center rounded-lg font-medium transition-colors ease-in-out duration-200 ${amount.length < 1 ? "bg-gray-400 cursor-not-allowed! text-gray-700" : "bg-[linear-gradient(135deg,#1F6FE0,#3F5CF1)] text-white"}`}
          >
            Confirm Transfer
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* ==================== POPUPS ==================== */}
      {/* -------------------- SEND MONEY POPUP -------------------- */}
      {transactionPopUp && amountPopUp()}
      {/* -------------------- CONFIRM MONEY POPUP -------------------- */}
      {confirm && amountConfirmPopUp()}
      {/* ==================== HEADING ==================== */}
      <h1 className="text-2xl font-semibold text-gray-700 mb-3">Send Money</h1>

      {/* ==================== SEARCH ==================== */}
      <div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative mt-2 w-full"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737B8C]" />
          <input
            type="text"
            placeholder="Search name or number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 rounded-xl bg-white border-0 pl-11 w-full shadow-sm"
          />
        </motion.div>
      </div>
      {/* ==================== CONTACT USER ==================== */}
      <div className="space-y-3 mt-4">
        {filtered.map((contact, i) => (
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={contact.mobileNumber}
            onClick={() => {
              setSelectedUser(contact);
              setTransactionPopUp(true);
            }}
            className="w-full bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow ease-in-out duration-200 flex items-center gap-3 text-left"
          >
            <div className="w-11 h-11 rounded-full bg-[linear-gradient(135deg,#1F6FE0,#3F5CF1)] flex items-center justify-center text-white font-bold text-sm">
              {initials(contact.fname)}
            </div>

            <div className="flex-1">
              <p className="font-semibold lg:text-base text-sm text-[#1C2230]">
                {contact.fname}
              </p>
              <p className="lg:text-sm text-xs text-[#737B8C]">
                {contact.mobileNumber}
              </p>
            </div>

            <User className="w-4 h-4 text-[#737B8C]" />
          </motion.button>
        ))}

        {/* No user found logic */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 text-gray-500"
          >
            No user found
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default UserTransferComponent;
