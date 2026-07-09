export const SHOPS = {
  "Sandwich Corner": {
    key: "sandwich",
    color: "#7D8471",
    bgClass: "bg-[#7D8471]",
    textClass: "text-[#7D8471]",
    borderClass: "border-[#7D8471]",
    bgLightClass: "bg-[#7D8471]/10",
    tagline: "Artisan Layers of Perfection",
    description: "Handcrafted sandwiches made with locally sourced ingredients and house-baked breads."
  },
  "Breakfast Bistro": {
    key: "breakfast",
    color: "#D98E73",
    bgClass: "bg-[#D98E73]",
    textClass: "text-[#D98E73]",
    borderClass: "border-[#D98E73]",
    bgLightClass: "bg-[#D98E73]/10",
    tagline: "Morning Rituals, Perfected",
    description: "Start your day with our thoughtfully curated breakfast selections and specialty coffee."
  },
  "NYC Burger": {
    key: "burger",
    color: "#4A3728",
    bgClass: "bg-[#4A3728]",
    textClass: "text-[#4A3728]",
    borderClass: "border-[#4A3728]",
    bgLightClass: "bg-[#4A3728]/10",
    tagline: "Flame-Kissed, Never Forgotten",
    description: "Premium smash burgers and sides inspired by New York's legendary burger culture."
  }
};

export const getShopConfig = (shopName) => SHOPS[shopName] || SHOPS["Sandwich Corner"];