import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Link2, LogOut, LayoutDashboard, Home, Info } from "lucide-react";
import { useStoreContext } from "../contextApi/ContextApi";
import { Button } from "./ui";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-out
        ${scrolled 
          ? "bg-dark-900/80 backdrop-blur-xl border-b border-dark-700/50 shadow-glass" 
          : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 bg-linear-to-br from-primary-600 to-indigo-600 rounded-xl shadow-glow"
            >
              <Link2 className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-white">
              Linklytics
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`
                      relative px-4 py-2 rounded-xl text-sm font-medium
                      transition-all duration-300
                      ${path === link.path
                        ? "text-white"
                        : "text-dark-300 hover:text-white"
                      }
                    `}
                  >
                    {path === link.path && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-dark-800 rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <link.icon className="w-4 h-4" />
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              {!token ? (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">
                      Get Started
                    </Button>
                  </Link>
                </>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onLogOutHandler}
                  icon={LogOut}
                >
                  Log Out
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="md:hidden p-2 text-dark-300 hover:text-white transition-colors"
          >
            {navbarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {navbarOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-900/95 backdrop-blur-xl border-b border-dark-700/50"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setNavbarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-300
                    ${path === link.path
                      ? "bg-primary-600/10 text-primary-400"
                      : "text-dark-300 hover:text-white hover:bg-dark-800"
                    }
                  `}
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-dark-700/50 space-y-2">
                {!token ? (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setNavbarOpen(false)}
                      className="block"
                    >
                      <Button variant="secondary" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setNavbarOpen(false)}
                      className="block"
                    >
                      <Button className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => {
                      onLogOutHandler();
                      setNavbarOpen(false);
                    }}
                    icon={LogOut}
                  >
                    Log Out
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;