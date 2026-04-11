import {
  ArrowLeftRight,
  Clock,
  House,
  MoveRight,
  User,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function UserSidebarComponent() {
  const [isToggle, setIsToggle] = useState(false);
  const navItems = [
    { link: "/u/", name: "Home", icon: <House size={20} /> },
    {
      link: "/u/transfer",
      name: "Transfer",
      icon: <ArrowLeftRight size={20} />,
    },
    { link: "/u/history", name: "History", icon: <Clock size={20} /> },
    { link: "/u/profile", name: "Profile", icon: <User size={20} /> },
  ];

  return (
    <>
      <div
        className={`fixed w-full h-full bg-black/50 backdrop-blur-md transition-opacity ease-in-out duration-200 ${isToggle ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />
      <div
        className={`z-20 lg:max-w-67.75 sm:max-w-73.75 w-full min-h-screen bg-white border border-gray-200 py-4 lg:relative fixed transition-transform duration-200 ease-in-out ${isToggle ? "translate-x-0" : "lg:translate-x-0 -translate-x-full"}`}
      >
        <button
          onClick={() => setIsToggle(false)}
          className="absolute top-4 right-4 lg:hidden p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 ease-in-out active:scale-90"
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        {!isToggle && (
          <button
            onClick={() => setIsToggle(true)}
            className="fixed top-6 -right-10 lg:hidden flex items-center justify-center w-10 h-12 bg-blue-600 text-white rounded-r-2xl shadow-lg shadow-blue-200 transition-all duration-300 hover:w-12 group"
          >
            <MoveRight
              className="transition-transform duration-300 group-hover:translate-x-1"
              size={20}
              strokeWidth={2.5}
            />
          </button>
        )}
        {/* ==================== LOGO ==================== */}
        <div className="flex items-center justify-center gap-3 mb-4 px-3">
          <div className="w-10 h-10 bg-[#4986e1] rounded-full grid place-items-center">
            <Zap className="w-5 h-5 text-white" fill="currentColor" />
          </div>
          <h1 className="text-2xl font-semibold">
            Pak<span className="text-blue-600">Swift</span>
          </h1>
        </div>
        {/* ==================== NAVIGATION LINKS ==================== */}
        <ul className="px-2 space-y-2">
          {navItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.link}
              end
              className={({
                isActive,
              }) => `group flex items-center py-2.5 px-4 mx-2 rounded-xl mb-1 transition-all duration-300 ease-in-out
      ${
        isActive
          ? "bg-blue-50 text-blue-700 shadow-sm"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }
    `}
            >
              {/* Active Indicator Line */}
              {({ isActive }) => (
                <>
                  <div
                    className={`
          transition-transform duration-300 group-hover:scale-110
          ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-blue-500"}
        `}
                  >
                    {item.icon}
                  </div>

                  <span className="ml-3 text-[14px] font-semibold tracking-tight">
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </ul>
      </div>
    </>
  );
}

export default UserSidebarComponent;
