// Uses Node.js built-in SQLite (available Node 22.5+ / Node 25)
// No native compilation needed!
const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const { randomUUID } = require('node:crypto');
require('dotenv').config();

const dbPath = process.env.DB_PATH
  ? path.resolve(process.env.DB_PATH)
  : path.join(__dirname, 'epicurean.db');

const db = new DatabaseSync(dbPath);

// ─── WAL mode for performance / memory mode for serverless ──────────────────
if (process.env.VERCEL) {
  db.exec("PRAGMA journal_mode = memory");
} else {
  db.exec("PRAGMA journal_mode = WAL");
}
db.exec("PRAGMA foreign_keys = ON");

// ─── Create Tables ──────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    full_name TEXT,
    google_id TEXT UNIQUE,
    is_verified INTEGER DEFAULT 0,
    otp_code TEXT,
    otp_expires INTEGER,
    reset_token TEXT,
    reset_expires INTEGER,
    role TEXT DEFAULT 'customer',
    created_date TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS menu_items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    shop TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    is_available INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    created_date TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT,
    customer_email TEXT NOT NULL,
    shop TEXT NOT NULL,
    items TEXT NOT NULL,
    subtotal REAL,
    discount_amount REAL DEFAULT 0,
    total REAL NOT NULL,
    coupon_code TEXT,
    is_subscription_order INTEGER DEFAULT 0,
    is_free_order INTEGER DEFAULT 0,
    status TEXT DEFAULT 'pending',
    created_date TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS coupons (
    id TEXT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    discount_type TEXT NOT NULL,
    discount_value REAL NOT NULL,
    min_order_amount REAL DEFAULT 0,
    applicable_shops TEXT,
    max_uses INTEGER,
    times_used INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    expiry_date TEXT,
    created_date TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS customer_subscriptions (
    id TEXT PRIMARY KEY,
    customer_email TEXT NOT NULL,
    customer_name TEXT,
    plan_id TEXT NOT NULL,
    plan_name TEXT,
    order_threshold INTEGER,
    paid_orders INTEGER,
    orders_this_month INTEGER DEFAULT 0,
    free_orders_used INTEGER DEFAULT 0,
    start_date TEXT,
    renewal_date TEXT,
    status TEXT DEFAULT 'active',
    created_date TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS subscription_plans (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    monthly_price REAL NOT NULL,
    order_threshold INTEGER NOT NULL,
    paid_orders INTEGER NOT NULL,
    is_active INTEGER DEFAULT 1,
    created_date TEXT DEFAULT (datetime('now'))
  );
`);

// ─── Seed Default Data ───────────────────────────────────────────────────────
function seedIfEmpty() {
  const planCount = db.prepare('SELECT COUNT(*) as count FROM subscription_plans').get();
  if (planCount.count === 0) {
    const insertPlan = db.prepare(`
      INSERT INTO subscription_plans (id, name, description, monthly_price, order_threshold, paid_orders, is_active)
      VALUES (?, ?, ?, ?, ?, ?, 1)
    `);
    insertPlan.run(randomUUID(), 'Starter', 'Perfect for occasional diners. Pay for 3, get 1 free.', 9.99, 4, 3);
    insertPlan.run(randomUUID(), 'Regular', 'Our most popular plan. Pay for 5, get 3 free.', 19.99, 8, 5);
    insertPlan.run(randomUUID(), 'Gourmet', 'For food lovers. Pay for 8, get 7 free.', 34.99, 15, 8);
    console.log('✓ Seeded subscription plans');
  }

  const menuCount = db.prepare('SELECT COUNT(*) as count FROM menu_items').get();
  if (menuCount.count === 0) {
    const ins = db.prepare(`
      INSERT INTO menu_items (id, name, description, price, shop, category, image_url, is_available, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)
    `);
    // Sandwich Corner
    ins.run(randomUUID(), 'Classic Club', 'Triple-decker with smoked turkey, crispy bacon, lettuce, tomato & mayo on toasted bread.', 12.99, 'Sandwich Corner', 'Classics', '/images/menu/club-sandwich.png', 1);
    ins.run(randomUUID(), 'Caprese Melt', 'Fresh mozzarella, heirloom tomatoes, basil & pesto aioli on warm ciabatta.', 11.49, 'Sandwich Corner', 'Specialty', '/images/menu/caprese-sandwich.png', 2);
    ins.run(randomUUID(), 'Grilled Cheese Deluxe', 'Gooey cheddar & gruyère melt with tomato soup on the side.', 10.49, 'Sandwich Corner', 'Classics', '/images/menu/grilled-cheese.png', 3);
    ins.run(randomUUID(), 'Avocado BLT', 'Smashed avocado, bacon, lettuce, tomato on artisan sourdough.', 13.49, 'Sandwich Corner', 'Specialty', '/images/menu/avocado-toast.png', 4);
    // Breakfast Bistro
    ins.run(randomUUID(), 'Eggs Benedict', 'Two poached eggs on English muffin with ham & rich hollandaise sauce.', 14.99, 'Breakfast Bistro', 'Eggs', '/images/menu/eggs-benedict.png', 1);
    ins.run(randomUUID(), 'Buttermilk Pancake Stack', 'Five fluffy golden pancakes with maple syrup, berries & whipped butter.', 12.49, 'Breakfast Bistro', 'Pancakes & Waffles', '/images/menu/pancakes.png', 2);
    ins.run(randomUUID(), 'Brioche French Toast', 'Thick brioche slices, caramelized crust, powdered sugar, fresh berries & cream.', 13.49, 'Breakfast Bistro', 'Pancakes & Waffles', '/images/menu/french-toast.png', 3);
    ins.run(randomUUID(), 'Specialty Latte', 'Barista-crafted latte with beautiful rosette art. Single or double shot.', 5.49, 'Breakfast Bistro', 'Drinks', '/images/menu/latte.png', 4);
    // NYC Burger
    ins.run(randomUUID(), 'Classic Smash', 'Signature thin-and-crispy smash patty, American cheese, pickles & special sauce.', 12.99, 'NYC Burger', 'Burgers', '/images/menu/smash-burger.png', 1);
    ins.run(randomUUID(), 'Double Stack', 'Two smash patties, double cheese, caramelized onions, lettuce, tomato, brioche bun.', 16.49, 'NYC Burger', 'Burgers', '/images/menu/double-smash.png', 2);
    ins.run(randomUUID(), 'Crispy Chicken', 'Golden fried chicken thigh, coleslaw, pickles, spicy mayo on toasted brioche.', 14.49, 'NYC Burger', 'Burgers', '/images/menu/chicken-burger.png', 3);
    ins.run(randomUUID(), 'NYC Fries', 'Hand-cut golden fries tossed with seasoning, served with ketchup & aioli.', 5.99, 'NYC Burger', 'Sides', '/images/menu/crispy-fries.png', 4);
    console.log('✓ Seeded menu items');
  }

  const couponCount = db.prepare('SELECT COUNT(*) as count FROM coupons').get();
  if (couponCount.count === 0) {
    const insCoupon = db.prepare(`INSERT INTO coupons (id, code, discount_type, discount_value, min_order_amount, is_active) VALUES (?, ?, ?, ?, ?, 1)`);
    insCoupon.run(randomUUID(), 'WELCOME10', 'percentage', 10, 0);
    insCoupon.run(randomUUID(), 'SAVE5', 'fixed', 5, 20);
    console.log('✓ Seeded sample coupons (WELCOME10, SAVE5)');
  }
}

seedIfEmpty();

// ─── Helpers ─────────────────────────────────────────────────────────────────
function parseJSON(val) {
  try { return JSON.parse(val); } catch { return val; }
}

function serializeRow(row) {
  if (!row) return null;
  const out = {};
  for (const [k, v] of Object.entries(row)) {
    if (['is_available','is_active','is_verified','is_subscription_order','is_free_order'].includes(k)) {
      out[k] = v === 1 || v === true;
    } else if (['items','applicable_shops'].includes(k) && typeof v === 'string') {
      out[k] = parseJSON(v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

function processValue(k, v) {
  if (Array.isArray(v)) return JSON.stringify(v);
  if (typeof v === 'boolean') return v ? 1 : 0;
  return v;
}

// ─── Generic CRUD ─────────────────────────────────────────────────────────────
const entityOps = {
  filter(table, filters = {}, sort = '-created_date', limit = 200) {
    const conditions = Object.entries(filters).filter(([, v]) => v !== undefined && v !== null);
    let sql = `SELECT * FROM ${table}`;
    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.map(([k]) => `${k} = ?`).join(' AND ');
    }
    if (sort) {
      const dir = sort.startsWith('-') ? 'DESC' : 'ASC';
      sql += ` ORDER BY ${sort.replace(/^-/, '')} ${dir}`;
    }
    sql += ` LIMIT ${Math.min(limit, 500)}`;
    const vals = conditions.map(([k, v]) => processValue(k, v));
    return db.prepare(sql).all(...vals).map(serializeRow);
  },

  get(table, id) {
    return serializeRow(db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id));
  },

  create(table, data) {
    const id = randomUUID();
    const row = { id, created_date: new Date().toISOString(), ...data };
    const processed = {};
    for (const [k, v] of Object.entries(row)) processed[k] = processValue(k, v);
    const keys = Object.keys(processed);
    db.prepare(`INSERT INTO ${table} (${keys.join(',')}) VALUES (${keys.map(() => '?').join(',')})`).run(...Object.values(processed));
    return serializeRow(db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id));
  },

  update(table, id, data) {
    const processed = {};
    for (const [k, v] of Object.entries(data)) processed[k] = processValue(k, v);
    const sets = Object.keys(processed).map(k => `${k} = ?`).join(', ');
    db.prepare(`UPDATE ${table} SET ${sets} WHERE id = ?`).run(...Object.values(processed), id);
    return serializeRow(db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id));
  },

  delete(table, id) {
    db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(id);
    return { success: true };
  }
};

module.exports = { db, entityOps, generateId: randomUUID };
