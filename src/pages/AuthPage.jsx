import {
  Mail,
  MoveRight,
  Phone,
  UserRound,
  UserRoundKey,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import googleIcon from "../assets/google_icon.svg";

function AuthPage() {
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    password: "",
    mobileNumber: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [isLogin, setIsLogin] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === "mobileNumber") {
      const cleanValue = value.replace(/\D/g, "");

      finalValue = cleanValue.slice(0, 11);

      if (finalValue.length > 4) {
        finalValue = `${finalValue.slice(0, 4)} ${finalValue.slice(4)}`;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center h-screen overflow-hidden bg-gray-50"
    >
      <div className="w-full max-w-md mx-4 shadow-2xl rounded-xl max-h-149 overflow-y-auto">
        {/* ==================== Header ==================== */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-linear-to-r from-[#1c69dc] to-[#0f57c3] py-6 px-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#4986e1] rounded-xl grid place-items-center">
              <Zap className="w-5 h-5 text-white" fill="currentColor" />
            </div>
            <h1 className="text-xl text-white font-semibold tracking-wide">
              PakSwift
            </h1>
          </div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Create an Account
            </h1>
            <p className="text-sm text-white/70 mt-1">
              Join millions of PakSwift users
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="bg-white p-6"
        >
          {/* ==================== FORM ==================== */}
          <div className="rounded-lg">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* -------------------- FULL NAME -------------------- */}
              {isLogin ? (
                ""
              ) : (
                <div className="flex flex-col space-y-1 relative">
                  <label
                    htmlFor="fname"
                    className="font-medium text-sm text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fname"
                    id="fname"
                    value={formData.fname}
                    className="h-10 rounded-lg text-sm border-2 border-gray-300 focus:border-blue-700 text-gray-600 transition-colors ease-in-out px-3 pl-10 placeholder:text-gray-400"
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                  <UserRound
                    size={17}
                    className="absolute top-9 left-3.5 text-gray-500"
                  />
                </div>
              )}
              {/* -------------------- EMAIL -------------------- */}
              <div className="flex flex-col space-y-1 relative">
                <label
                  htmlFor="email"
                  className="font-medium text-sm text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={formData.email}
                  className="h-10 rounded-lg text-sm border-2 border-gray-300 focus:border-blue-700 text-gray-600 transition-colors ease-in-out px-3 pl-10 placeholder:text-gray-400"
                  onChange={handleInputChange}
                  placeholder="john.doe@example.com"
                />
                <Mail
                  size={17}
                  className="absolute top-9 left-3.5 text-gray-500"
                />
              </div>
              {/* -------------------- PASSWORD -------------------- */}
              <div className="flex flex-col space-y-1 relative">
                <label
                  htmlFor="password"
                  className="font-medium text-sm text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  className="h-10 rounded-lg text-sm border-2 border-gray-300 focus:border-blue-700 text-gray-600 transition-colors ease-in-out px-3 pl-10 placeholder:text-gray-400"
                  onChange={handleInputChange}
                  placeholder="•••••••••••"
                />
                <UserRoundKey
                  size={17}
                  className="absolute top-9 left-3.5 text-gray-500"
                />
              </div>
              {/* -------------------- PHONE NUMBER -------------------- */}
              {isLogin ? (
                ""
              ) : (
                <div className="flex flex-col space-y-1 relative">
                  <label
                    htmlFor="mobileNumber"
                    className="font-medium text-sm text-gray-700"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="mobileNumber"
                    id="mobileNumber"
                    value={formData.mobileNumber}
                    className="h-10 rounded-lg text-sm border-2 border-gray-300 focus:border-blue-700 text-gray-600 transition-colors ease-in-out px-3 pl-10 placeholder:text-gray-400"
                    onChange={handleInputChange}
                    placeholder="03XX XXXXXXX"
                  />
                  <Phone
                    size={17}
                    className="absolute top-9 left-3.5 text-gray-500"
                  />
                </div>
              )}
              {/* -------------------- BUTTON -------------------- */}
              <div className="text-center">
                <button
                  type="submit"
                  className="text-white bg-linear-to-r from-[#1c69dc] to-[#0f57c3] w-full py-3 group rounded-lg flex items-center justify-center"
                >
                  <span className="text-lg font-medium tracking-wide">
                    {isLogin ? "Sign In" : "Create Account"}
                  </span>
                  <MoveRight className="ml-3 -translate-x-1 group-hover:translate-x-0 transition-transform" />
                </button>
              </div>
            </form>
            {/* -------------------- CONTINUE WITH -------------------- */}
            <div className="flex items-center gap-3 my-4">
              <div className="h-[0.1rem] bg-gray-300 w-full rounded-full" />
              <span className="text-sm text-gray-400">OR</span>
              <div className="h-[0.1rem] bg-gray-300 w-full rounded-full" />
            </div>
            {/* -------------------- GOOGLE BUTTON -------------------- */}
            <div className="text-center">
              <button
                type="button"
                className="py-3 w-full border-2 border-blue-300 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-shadow ease-in-out duration-300"
              >
                <img src={googleIcon} alt="IMG" />
                <span className="font-medium">Continue With Google</span>
              </button>
            </div>
            <p className="text-center text-sm text-[#7384A3] mt-3.5">
              {isLogin
                ? "Already have an account? "
                : "Don't have an account? "}
              {isLogin ? (
                <span
                  className="text-[#1f66d9] font-semibold cursor-pointer"
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </span>
              ) : (
                <span
                  className="text-[#1f66d9] font-semibold cursor-pointer"
                  onClick={() => setIsLogin(true)}
                >
                  Sign In
                </span>
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AuthPage;
