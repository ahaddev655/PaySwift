import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  CreditCard,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  X,
} from "lucide-react";

const initialCards = [
  {
    id: 1,
    bank: "HBL",
    last4: "4829",
    type: "Visa Debit",
    color: "linear-gradient(135deg, #1E69E3, #3F63E9)",
    expiry: "09/28",
    balance: "Rs. 45,250",
    isDefault: true,
  },
  {
    id: 2,
    bank: "Meezan Bank",
    last4: "7163",
    type: "Mastercard",
    color: "linear-gradient(135deg, #1D242D, #334155)",
    expiry: "03/27",
    balance: "Rs. 128,900",
    isDefault: false,
  },
];

function UserCardsComponent() {
  const [cards, setCards] = useState(initialCards);
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const activeCard = cards[activeCardIdx] || cards[0];

  // --- Handlers ---
  const handleSetDefault = () => {
    const updatedCards = cards.map((card, i) => ({
      ...card,
      isDefault: i === activeCardIdx,
    }));
    setCards(updatedCards);
  };

  const handleRemoveCard = () => {
    if (cards.length <= 1)
      return alert("You must keep at least one payment method.");

    const updatedCards = cards.filter((_, i) => i !== activeCardIdx);
    setCards(updatedCards);
    setActiveCardIdx(0); // Reset to first card
  };

  const addNewCard = (e) => {
    e.preventDefault();
    const newCard = {
      id: Date.now(),
      bank: "New Bank",
      last4: Math.floor(1000 + Math.random() * 9000).toString(),
      type: "Visa Debit",
      color: "linear-gradient(135deg, #6366f1, #a855f7)",
      expiry: "12/30",
      balance: "Rs. 0",
      isDefault: false,
    };
    setCards([...cards, newCard]);
    setIsAdding(false);
  };

  return (
    <div className="py-6 max-w-5xl mx-auto px-4">
      <div className="space-y-8">
        {/* --- TOP BAR --- */}
        <div className="flex items-center justify-between px-1">
          <div>
            <h1 className="text-2xl font-black text-[#1D242D] tracking-tight">
              My Cards
            </h1>
            <p className="text-sm text-[#737F8F]">
              Manage your linked payment methods
            </p>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-[#1E69E3] hover:bg-[#0A43B8] text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus size={18} />
            Add New Card
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* --- LEFT: CARDS LIST --- */}
          <div className="lg:col-span-3 space-y-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.id}
                layout
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCardIdx(i)}
                className={`relative h-52 rounded-2xl p-6 cursor-pointer overflow-hidden transition-all shadow-xl ${
                  activeCardIdx === i
                    ? "ring-4 ring-[#1E69E3]/30 scale-[1.02]"
                    : "opacity-60 grayscale-[0.3]"
                }`}
                style={{ background: card.color }}
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                <div className="relative flex flex-col h-full justify-between text-white">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-xs font-medium opacity-70 uppercase tracking-widest">
                        {card.bank}
                      </p>
                      <p className="text-lg font-bold tracking-tight">
                        {card.type}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                        <CreditCard size={20} />
                      </div>
                      {card.isDefault && (
                        <span className="text-[10px] bg-white/20 px-2 py-1 rounded-md backdrop-blur-md font-bold uppercase">
                          Default
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-2xl font-mono tracking-[0.2em] my-4">
                    •••• •••• •••• {card.last4}
                  </p>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] opacity-50 uppercase">
                        Card Holder
                      </p>
                      <p className="text-sm font-semibold">PAK SWIFT USER</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] opacity-50 uppercase">
                        Expires
                      </p>
                      <p className="text-sm font-semibold">{card.expiry}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* --- RIGHT: DETAILS & ACTIONS --- */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {activeCard && (
                <motion.div
                  key={activeCard.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <section className="bg-white rounded-2xl border border-[#E1E4E8] shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-[#F8F8F8] flex items-center gap-2">
                      <ShieldCheck size={16} className="text-[#1E69E3]" />
                      <h2 className="text-[11px] font-bold text-[#737F8F] uppercase tracking-[2px]">
                        Card Details
                      </h2>
                    </div>
                    <div className="p-6 space-y-4">
                      <DetailRow label="Bank Name" value={activeCard.bank} />
                      <DetailRow
                        label="Card Number"
                        value={`•••• •••• •••• ${activeCard.last4}`}
                      />
                      <DetailRow
                        label="Current Balance"
                        value={activeCard.balance}
                        highlight
                      />
                      <DetailRow
                        label="Network"
                        value={activeCard.type.split(" ")[0]}
                      />
                      <DetailRow
                        label="Status"
                        value={activeCard.isDefault ? "Primary" : "Active"}
                        isStatus
                      />
                    </div>
                  </section>

                  <section className="bg-white rounded-2xl border border-[#E1E4E8] shadow-sm divide-y divide-[#F8F8F8]">
                    <button
                      onClick={handleSetDefault}
                      disabled={activeCard.isDefault}
                      className={`w-full flex items-center justify-between p-5 transition-colors group ${activeCard.isDefault ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-xl transition-transform ${activeCard.isDefault ? "bg-gray-100 text-gray-400" : "bg-[#F1F6FF] text-[#1E69E3] group-hover:scale-110"}`}
                        >
                          <CheckCircle2 size={18} />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-[#1D242D]">
                            Set as Default
                          </p>
                          <p className="text-xs text-[#737F8F]">
                            {activeCard.isDefault
                              ? "Currently your primary card"
                              : "Use for primary payments"}
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={handleRemoveCard}
                      className="w-full flex items-center justify-between p-5 hover:bg-red-50 transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-50 text-[#E03D3D] rounded-xl group-hover:scale-110 transition-transform">
                          <Trash2 size={18} />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-[#E03D3D]">
                            Remove Card
                          </p>
                          <p className="text-xs text-[#737F8F]">
                            Delete card permanently
                          </p>
                        </div>
                      </div>
                    </button>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* --- ADD CARD MODAL OVERLAY --- */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Add New Card</h3>
              <button
                onClick={() => setIsAdding(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={addNewCard} className="space-y-4">
              <p className="text-sm text-gray-500 mb-4">
                For this demo, clicking "Add" will generate a mockup card.
              </p>
              <button
                type="submit"
                className="w-full bg-[#1E69E3] text-white py-3 rounded-xl font-bold hover:bg-[#0A43B8] transition-colors"
              >
                Confirm Add Card
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

const DetailRow = ({ label, value, highlight = false, isStatus = false }) => (
  <div className="flex justify-between items-center">
    <span className="text-xs text-[#737F8F] font-medium">{label}</span>
    {isStatus ? (
      <span className="bg-[#2EBA73]/10 text-[#2EBA73] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
        {value}
      </span>
    ) : (
      <span
        className={`text-sm font-bold ${highlight ? "text-[#1E69E3]" : "text-[#1D242D]"}`}
      >
        {value}
      </span>
    )}
  </div>
);

export default UserCardsComponent;
