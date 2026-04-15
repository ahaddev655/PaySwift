import {
  KeyRound,
  Mail,
  MoveRight,
  Phone,
  UserRound,
  UserRoundKey,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import googleIcon from "../assets/google_icon.svg";
import { useNavigate } from "react-router-dom";

const INITIAL_STATE = {
  fname: "",
  email: "",
  password: "",
  mobileNumber: "",
  pinCode: "",
};

const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="flex flex-col space-y-1 relative">
    <label className="font-medium text-sm text-gray-700">{label}</label>
    <div className="relative">
      <input
        {...props}
        className="h-10 w-full rounded-lg text-sm border-2 border-gray-300 focus:border-blue-700 text-gray-600 px-3 pl-10 placeholder:text-gray-400 transition-colors outline-none"
      />
      <Icon size={17} className="absolute top-3 left-3.5 text-gray-500" />
    </div>
  </div>
);

function AuthPage() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isLogin, setIsLogin] = useState(false);
  // Default values prevent "undefined" errors on inputs
  const {
    fname = "",
    email = "",
    password = "",
    mobileNumber = "",
    pinCode = "",
  } = formData;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isInvalidEmail = !email?.trim() || !email.includes("@");
    const isInvalidPass =
      !password?.trim() || (!isLogin && password.length < 11);

    if (isLogin) {
      // Login Logic
      if (!email || !pinCode) return toast.error("All fields are required");
      if (isInvalidEmail) return toast.error("Email is invalid");

      localStorage.setItem("token", "user-qwertyuiopasdfghjklzxcvbnm");
      localStorage.setItem("id", "1");
      toast.success("Welcome Back, User!");
    } else {
      // Signup Logic
      if (!email || !password || !fname || !mobileNumber || !pinCode)
        return toast.error("All fields are required");
      if (isInvalidEmail) return toast.error("Email is invalid");
      if (!fname?.trim()) return toast.error("Full Name is required");
      if (!mobileNumber?.trim())
        return toast.error("Mobile Number is required");
      if (isInvalidPass)
        return toast.error("Password length must be more than 11");

      toast.success("Registration Successful");
      localStorage.setItem("token", "user-qwertyuiopasdfghjklzxcvbnm");
      localStorage.setItem("id", "1");
    }

    console.log(formData);
    setFormData(INITIAL_STATE);
    setTimeout(() => {
      navigate("/u/");
    }, 1500);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    let val = value;
    if (name === "mobileNumber") {
      const clean = value.replace(/\D/g, "").slice(0, 11);
      val = clean.length > 4 ? `${clean.slice(0, 4)} ${clean.slice(4)}` : clean;
    }

    if (name === "pinCode") {
      val = value.replace(/\D/g, "").slice(0, 4);
    }
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  // Reset form when switching between login and signup
  useEffect(() => {
    setFormData(INITIAL_STATE);
  }, [isLogin]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center h-screen bg-gray-50"
    >
      <div className="w-full max-w-md mx-4 shadow-2xl rounded-xl max-h-[90vh] overflow-y-auto bg-white">
        <ToastContainer
          theme="dark"
          autoClose={800}
          hideProgressBar
          position="top-center"
          limit={3}
        />

        {/* Header Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-linear-to-r from-[#1c69dc] to-[#0f57c3] py-6 px-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#4986e1] rounded-xl grid place-items-center">
              <Zap className="w-5 h-5 text-white" fill="currentColor" />
            </div>
            <h1 className="text-xl text-white font-semibold">PakSwift</h1>
          </div>
          <h1 className="text-2xl font-bold text-white">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h1>
          <p className="text-sm text-white/70">
            {isLogin
              ? "Sign in to continue"
              : "Join millions of PakSwift users"}
          </p>
        </motion.div>

        {/* Form Section */}
        <div className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <InputField
                label="Full Name"
                icon={UserRound}
                name="fname"
                value={fname}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            )}

            <InputField
              label="Email"
              icon={Mail}
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="john.doe@example.com"
              required
            />

            {!isLogin && (
              <InputField
                label="Password"
                icon={UserRoundKey}
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                placeholder="•••••••••••"
                required
              />
            )}

            {!isLogin && (
              <InputField
                label="Mobile Number"
                icon={Phone}
                name="mobileNumber"
                value={mobileNumber}
                onChange={handleInputChange}
                placeholder="03XX XXXXXXX"
                required
              />
            )}

            <InputField
              label="PIN"
              icon={KeyRound}
              name="pinCode"
              value={pinCode}
              onChange={handleInputChange}
              placeholder="XXXX"
              required
            />

            <button
              type="submit"
              className="text-white bg-linear-to-r from-[#1c69dc] to-[#0f57c3] w-full py-3 group rounded-lg flex items-center justify-center font-medium hover:opacity-90 transition-opacity"
            >
              {isLogin ? "Sign In" : "Create Account"}{" "}
              <MoveRight className="ml-3 -translate-x-1 group-hover:translate-x-0 transition-transform" />
            </button>
          </form>

          <div className="flex items-center gap-3 my-4">
            <div className="h-px bg-gray-300 w-full" />
            <span className="text-sm text-gray-400">OR</span>
            <div className="h-px bg-gray-300 w-full" />
          </div>

          <button className="py-3 w-full border-2 border-blue-300 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all font-medium">
            <img src={googleIcon} alt="Google" className="w-5 h-5" /> Continue
            With Google
          </button>

          <p className="text-center text-sm text-[#7384A3]">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span
              className="text-[#1f66d9] font-semibold cursor-pointer hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default AuthPage;
