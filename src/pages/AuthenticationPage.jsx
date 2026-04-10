import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AuthenticationPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email && !formData.fullName && !formData.password) {
      toast.error("All fields are required...");
      return;
    }

    if (!formData.email?.trim()) {
      toast.error("Email is required...");
      return;
    }

    if (!formData.email?.includes("@")) {
      toast.error("Email is invalid...");
      return;
    }

    if (!isLogin) {
      if (!formData.fullName?.trim()) {
        toast.error("Full name is required...");
        return;
      }
    }

    if (!formData.password?.trim()) {
      toast.error("Password is required...");
      return;
    }

    if (formData.password?.length < 11) {
      toast.error("Password should be more than 11...");
      return;
    }

    console.log("Form Submitted:", formData);
    toast.success(
      isLogin ? "Welcome Back, User!" : "Registration Successfully",
    );
    setTimeout(() => {
      navigate("/u/");
    }, 1000);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ fullName: "", email: "", password: "" });
  };

  return (
    <div className="container-class flex items-center justify-center min-h-screen font-sans">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
        {/* Brand Header */}
        <div className="pt-10 pb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Pak<span className="text-blue-600">Swift</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {isLogin
              ? "Welcome back! Please login."
              : "Create your account to get started."}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex px-8 relative border-b border-gray-100">
          <button
            onClick={() => isLogin && toggleAuthMode()}
            className={`flex-1 py-4 text-sm font-semibold transition-colors duration-300 ${!isLogin ? "text-blue-600" : "text-gray-400"}`}
          >
            Sign Up
          </button>
          <button
            onClick={() => !isLogin && toggleAuthMode()}
            className={`flex-1 py-4 text-sm font-semibold transition-colors duration-300 ${isLogin ? "text-blue-600" : "text-gray-400"}`}
          >
            Login
          </button>

          <div
            className="tab-underline absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out"
            style={{
              width: "40%",
              transform: isLogin ? "translateX(110%)" : "translateX(10%)",
            }}
          />
        </div>

        {/* Form Body */}
        <div className="p-8">
          <ToastContainer
            position="top-center"
            theme="dark"
            autoClose={800}
            hideProgressBar
          />
          <form
            onSubmit={handleSubmit}
            className="space-y-5 fade-in"
            key={isLogin ? "login" : "signup"}
          >
            {!isLogin && (
              <div className="fade-in">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="pakswift-input w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                  />
                </div>
              </div>
            )}

            <div className="fade-in">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@pakswift.com"
                  className="pakswift-input w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                />
              </div>
            </div>

            <div className="fade-in">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="pakswift-input w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-4 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-lg shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
            >
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationPage;
