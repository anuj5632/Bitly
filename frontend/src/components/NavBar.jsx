import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, LayoutDashboard, Home, Info, Link2 } from "lucide-react";
import { useStoreContext } from "../contextApi/ContextApi";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const path = useLocation().pathname;

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: Info },
    ...(token ? [{ name: "Dashboard", path: "/dashboard", icon: LayoutDashboard }] : []),
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-20 flex flex-col items-center py-8 bg-surface-secondary border-r border-border-base z-50">
      {/* Logo */}
      <Link to="/" className="mb-12">
        <motion.div
          whileHover={{ rotate: 15, scale: 1.1 }}
          className="text-primary lime-glow"
        >
          <Link2 className="w-8 h-8" />
        </motion.div>
      </Link>

      {/* Nav Links */}
      <nav className="flex-1 flex flex-col gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="relative p-3 rounded-xl transition-all duration-300 group"
            title={link.name}
          >
            {path === link.path && (
              <motion.div
                layoutId="nav-blob"
                className="absolute inset-0 bg-primary/20 border-radius-morph animate-morph"
                style={{ borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%' }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <link.icon 
              className={`w-6 h-6 relative z-10 transition-all duration-300 ${
                path === link.path ? "text-primary lime-glow scale-110" : "text-on-surface-muted group-hover:text-on-surface group-hover:scale-110"
              }`} 
            />
          </Link>
        ))}
      </nav>

      {/* Logout */}
      {token && (
        <button
          onClick={onLogOutHandler}
          className="p-3 text-on-surface-muted hover:text-error transition-colors group"
          title="Logout"
        >
          <LogOut className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
