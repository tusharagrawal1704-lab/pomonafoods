import React, { useState } from "react";
import { Plus, Check } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { getShopConfig } from "@/lib/shopConfig";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuItemCard({ item }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const shopConfig = getShopConfig(item.shop);

  const handleAdd = () => {
    addItem(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  if (!item.is_available) {
    return (
      <div className="relative rounded-2xl overflow-hidden bg-[#1A1A1B]/5 opacity-60">
        <div className="aspect-[4/3] bg-[#1A1A1B]/10 flex items-center justify-center">
          {item.image_url ? (
            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover grayscale" />
          ) : (
            <span className="text-[#1A1A1B]/30 font-display text-sm">Restocking</span>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-heading text-lg font-semibold text-[#1A1A1B]/40 line-through">{item.name}</h3>
          <p className="text-sm text-[#1A1A1B]/30 mt-1">Currently unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: `${shopConfig.color}15` }}
          >
            <span className="font-heading text-4xl" style={{ color: `${shopConfig.color}30` }}>
              {item.name.charAt(0)}
            </span>
          </div>
        )}
        {/* Quick Add Button */}
        <button
          onClick={handleAdd}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
          style={{
            backgroundColor: justAdded ? "#22c55e" : shopConfig.color,
            color: "#F9F7F2"
          }}
        >
          <AnimatePresence mode="wait">
            {justAdded ? (
              <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Check className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div key="plus" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Plus className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-lg font-semibold text-[#1A1A1B] leading-tight">{item.name}</h3>
            {item.description && (
              <p className="text-sm text-[#1A1A1B]/50 mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
            )}
          </div>
          <span className="font-display text-lg font-bold whitespace-nowrap" style={{ color: shopConfig.color }}>
            ${item.price.toFixed(2)}
          </span>
        </div>
        <div className="mt-3">
          <span
            className="text-[10px] font-display font-semibold tracking-widest uppercase px-2 py-1 rounded-full"
            style={{ backgroundColor: `${shopConfig.color}12`, color: shopConfig.color }}
          >
            {item.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}