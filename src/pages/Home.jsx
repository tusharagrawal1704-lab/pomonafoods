import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Utensils, Coffee } from "lucide-react";

const HERO_PANELS = [
  {
    shop: "Sandwich Corner",
    tagline: "Artisan Layers of Perfection",
    color: "#7D8471",
    image: "/images/hero/sandwich.png",
  },
  {
    shop: "Breakfast Bistro",
    tagline: "Morning Rituals, Perfected",
    color: "#D98E73",
    image: "/images/hero/breakfast.png",
  },
  {
    shop: "NYC Burger",
    tagline: "Flame-Kissed, Never Forgotten",
    color: "#4A3728",
    image: "/images/hero/burger.png",
  },
];

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div>
      {/* Mobile Hero */}
      <section className="md:hidden">
        {HERO_PANELS.map((panel) => (
          <Link
            key={panel.shop}
            to={`/shop/${encodeURIComponent(panel.shop)}`}
            className="block relative h-[55vh] overflow-hidden group"
          >
            <img
              src={panel.image}
              alt={panel.shop}
              className="absolute inset-0 w-full h-full object-cover brightness-[0.65] group-hover:scale-105 transition-transform duration-700"
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${panel.color}CC 0%, transparent 60%)` }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="font-display text-[10px] tracking-[0.3em] text-white/50 uppercase">
                The Kitchen
              </span>
              <h2 className="font-heading text-3xl font-bold text-white mt-1">{panel.shop}</h2>
              <p className="text-white/60 text-sm font-body">{panel.tagline}</p>
            </div>
          </Link>
        ))}
      </section>

      {/* Trifecta Hero — Desktop */}
      <section className="relative h-[calc(100vh-5rem)] hidden md:flex overflow-hidden">
        {HERO_PANELS.map((panel, index) => {
          const isHovered = hoveredIndex === index;
          const hasHover = hoveredIndex !== null;
          return (
            <motion.div
              key={panel.shop}
              className="relative cursor-pointer overflow-hidden"
              animate={{ flex: isHovered ? 3 : hasHover ? 0.5 : 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="absolute inset-0">
                <img
                  src={panel.image}
                  alt={panel.shop}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isHovered ? "scale-105 brightness-75" : hasHover ? "scale-100 brightness-50 saturate-50" : "scale-100 brightness-[0.65]"
                  }`}
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to top, ${panel.color}CC 0%, transparent 60%)`,
                    opacity: isHovered ? 1 : 0.6,
                  }}
                />
              </div>

              <div className="absolute top-8 left-4 z-10">
                <span
                  className="font-display text-xs tracking-[0.3em] text-white/50 whitespace-nowrap"
                  style={{ writingMode: "vertical-rl" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12 z-10">
                <motion.div
                  animate={{ opacity: isHovered || !hasHover ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-heading text-2xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 leading-tight">
                    {panel.shop}
                  </h2>
                  <p className="font-body text-sm lg:text-base text-white/70 mb-6">
                    {panel.tagline}
                  </p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Link
                      to={`/shop/${encodeURIComponent(panel.shop)}`}
                      className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-display font-medium hover:bg-white/20 transition-all border border-white/20"
                    >
                      Enter Kitchen
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Value Props */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 py-24">
        <div className="text-center mb-16">
          <span className="font-display text-xs tracking-[0.3em] text-[#C5A059] uppercase">The Experience</span>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-[#1A1A1B] mt-3">
            Three Kitchens, One Soul
          </h2>
          <p className="font-body text-[#1A1A1B]/50 mt-4 max-w-lg mx-auto text-lg leading-relaxed">
            Each kitchen crafts its own story. Choose your craving, explore the menu, and order with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          {[
            { icon: Utensils, title: "Curated Menus", desc: "Each shop offers a distinct, carefully curated selection of artisan dishes.", color: "#7D8471" },
            { icon: Star, title: "Member Rewards", desc: "Subscribe monthly and unlock free orders as you hit your loyalty milestones.", color: "#C5A059" },
            { icon: Coffee, title: "Seamless Ordering", desc: "Order from any kitchen, apply coupons, and track your orders—all in one place.", color: "#D98E73" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <item.icon className="w-6 h-6" style={{ color: item.color }} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-[#1A1A1B] mb-3">{item.title}</h3>
              <p className="font-body text-[#1A1A1B]/50 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Shop Cards */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HERO_PANELS.map((panel, i) => (
            <motion.div
              key={panel.shop}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/shop/${encodeURIComponent(panel.shop)}`}
                className="block group relative overflow-hidden rounded-2xl aspect-[4/5]"
              >
                <img
                  src={panel.image}
                  alt={panel.shop}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${panel.color}DD 0%, transparent 50%)` }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-heading text-2xl font-bold text-white mb-1">{panel.shop}</h3>
                  <p className="text-white/60 text-sm font-body">{panel.tagline}</p>
                  <div className="mt-4 flex items-center gap-2 text-white/80 text-sm font-display group-hover:text-white transition-colors">
                    View Menu <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Membership CTA */}
      <section className="bg-[#1A1A1B] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 text-center">
          <span className="font-display text-xs tracking-[0.3em] text-[#C5A059] uppercase">Membership</span>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-[#F9F7F2] mt-3">
            Order More, Pay Less
          </h2>
          <p className="text-[#F9F7F2]/50 mt-4 max-w-lg mx-auto text-lg font-body leading-relaxed">
            Join our subscription plans and unlock free orders every month. The more you order, the more you save.
          </p>
          <Link
            to="/membership"
            className="inline-flex items-center gap-2 mt-8 bg-[#C5A059] text-[#1A1A1B] px-8 py-4 rounded-full font-display font-semibold text-sm hover:bg-[#C5A059]/90 transition-colors"
          >
            Explore Plans
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}