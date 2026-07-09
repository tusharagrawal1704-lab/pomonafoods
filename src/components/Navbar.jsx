import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User, Menu, X, Crown } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { itemCount } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isOwner = location.pathname.startsWith("/owner");

  const navLinks = isOwner
    ? [
        { label: "Dashboard", path: "/owner" },
        { label: "Menu", path: "/owner/menu" },
        { label: "Orders", path: "/owner/orders" },
        { label: "Coupons", path: "/owner/coupons" },
        { label: "Subscriptions", path: "/owner/subscriptions" },
      ]
    : [
        { label: "Shops", path: "/" },
        { label: "My Orders", path: "/dashboard" },
        { label: "Membership", path: "/membership" },
      ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F9F7F2]/90 backdrop-blur-xl border-b border-[#1A1A1B]/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-3">
            <span className="font-heading text-xl lg:text-2xl font-bold tracking-tight text-[#1A1A1B]">
              Pomona
            </span>
            <span className="font-heading text-xl lg:text-2xl font-light italic text-[#C5A059]">
              Foods
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-display font-medium tracking-wide transition-colors ${
                  location.pathname === link.path
                    ? "text-[#C5A059]"
                    : "text-[#1A1A1B]/60 hover:text-[#1A1A1B]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {!isOwner && (
              <Link to="/cart" className="relative group">
                <ShoppingBag className="w-5 h-5 text-[#1A1A1B]/70 group-hover:text-[#1A1A1B] transition-colors" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-[#C5A059] text-[#F9F7F2] text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </Link>
            )}
            <Link
              to={isOwner ? "/" : "/owner"}
              className="flex items-center gap-1.5 text-xs font-display font-medium px-3 py-1.5 rounded-full border border-[#1A1A1B]/10 hover:border-[#C5A059] hover:text-[#C5A059] transition-all"
            >
              {isOwner ? <User className="w-3.5 h-3.5" /> : <Crown className="w-3.5 h-3.5" />}
              {isOwner ? "Customer" : "Owner"}
            </Link>
            <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#F9F7F2] border-t border-[#1A1A1B]/5"
          >
            <div className="px-6 py-4 space-y-3">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-display font-medium text-[#1A1A1B]/70 hover:text-[#1A1A1B]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}