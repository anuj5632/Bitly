import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-fit px-4">
      <div className="bg-[#111] border border-border-base rounded-full px-8 py-3 flex flex-wrap items-center justify-center gap-8 shadow-dock backdrop-blur-md">
        <div className="flex items-center gap-6 border-r border-border-base pr-8">
          <Link to="/" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-secondary hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-secondary hover:text-primary transition-colors">
            About
          </Link>
          <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-secondary hover:text-primary transition-colors">
            Terms
          </a>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface-muted">
              v1.2.0-Alpha
            </span>
          </div>
          <span className="text-[9px] font-bold text-on-surface-muted uppercase tracking-widest">
            &copy; {currentYear} Linklytics
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
