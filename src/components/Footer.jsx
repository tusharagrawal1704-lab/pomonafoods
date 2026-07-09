import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1B] text-[#F9F7F2]/70 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-heading text-2xl font-bold text-[#F9F7F2]">Pomona</span>
              <span className="font-heading text-2xl font-light italic text-[#C5A059]">Foods</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Three kitchens, one vision. We believe every meal should be a moment worth savoring.
            </p>
          </div>
          <div>
            <h4 className="font-display text-xs font-semibold tracking-widest text-[#C5A059] mb-4">OUR KITCHENS</h4>
            <div className="space-y-2">
              <Link to="/shop/Sandwich Corner" className="block text-sm hover:text-[#F9F7F2] transition-colors">Sandwich Corner</Link>
              <Link to="/shop/Breakfast Bistro" className="block text-sm hover:text-[#F9F7F2] transition-colors">Breakfast Bistro</Link>
              <Link to="/shop/NYC Burger" className="block text-sm hover:text-[#F9F7F2] transition-colors">NYC Burger</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display text-xs font-semibold tracking-widest text-[#C5A059] mb-4">PLATFORM</h4>
            <div className="space-y-2">
              <Link to="/membership" className="block text-sm hover:text-[#F9F7F2] transition-colors">Membership</Link>
              <Link to="/dashboard" className="block text-sm hover:text-[#F9F7F2] transition-colors">My Orders</Link>
              <Link to="/owner" className="block text-sm hover:text-[#F9F7F2] transition-colors">Owner Portal</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-[#F9F7F2]/10 mt-12 pt-8 text-center text-xs text-[#F9F7F2]/40">
          © 2026 PomonaFoods. All rights reserved.
        </div>
      </div>
    </footer>
  );
}