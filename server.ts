import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
const PORT = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "swift-recharge-secret-key-2026";

// Database Setup
const db = new Database(process.env.DATABASE_URL || "vtu.db");

// Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS wallets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    balance REAL DEFAULT 0.0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT NOT NULL, -- 'funding', 'airtime', 'data', 'bill'
    amount REAL NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'success', 'failed'
    details TEXT,
    reference TEXT UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'data', 'airtime', 'cable', 'electricity'
    provider TEXT NOT NULL, -- 'MTN', 'Airtel', 'Glo', '9mobile', 'DSTV', etc.
    plan_name TEXT,
    price REAL NOT NULL,
    cost_price REAL NOT NULL,
    is_active INTEGER DEFAULT 1
  );

  -- Initial Services
  INSERT OR IGNORE INTO services (id, name, category, provider, plan_name, price, cost_price) VALUES
  (1, 'MTN 1GB Data', 'data', 'MTN', '1GB Monthly', 300, 250),
  (2, 'MTN 2GB Data', 'data', 'MTN', '2GB Monthly', 600, 500),
  (3, 'MTN 5GB Data', 'data', 'MTN', '5GB Monthly', 1400, 1200),
  (4, 'Airtel 1GB Data', 'data', 'Airtel', '1GB Monthly', 300, 250),
  (5, 'Airtel 2GB Data', 'data', 'Airtel', '2GB Monthly', 600, 500),
  (6, 'Glo 1GB Data', 'data', 'Glo', '1GB Monthly', 250, 200),
  (7, 'Glo 2GB Data', 'data', 'Glo', '2GB Monthly', 500, 400),
  (8, '9mobile 1GB Data', 'data', '9mobile', '1GB Monthly', 400, 350),
  (9, 'MTN Airtime', 'airtime', 'MTN', 'VTU', 0, 0),
  (10, 'Airtel Airtime', 'airtime', 'Airtel', 'VTU', 0, 0),
  (11, 'Glo Airtime', 'airtime', 'Glo', 'VTU', 0, 0),
  (12, '9mobile Airtime', 'airtime', '9mobile', 'VTU', 0, 0),
  (13, 'DSTV Padi', 'cable', 'DSTV', 'Padi Package', 2500, 2400),
  (14, 'DSTV Yanga', 'cable', 'DSTV', 'Yanga Package', 3500, 3300),
  (15, 'GOTV Smallie', 'cable', 'GOTV', 'Smallie Package', 1100, 1000),
  (16, 'GOTV Jinja', 'cable', 'GOTV', 'Jinja Package', 2250, 2100),
  (17, 'IKEDC Prepaid', 'electricity', 'IKEDC', 'Prepaid Token', 0, 0),
  (18, 'EKEDC Prepaid', 'electricity', 'EKEDC', 'Prepaid Token', 0, 0),
  (19, 'AEDC Prepaid', 'electricity', 'AEDC', 'Prepaid Token', 0, 0);
`);

app.use(cors());
app.use(express.json());

// Auth Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: "Forbidden" });
    req.user = user;
    next();
  });
};

// --- Auth Routes ---
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)").run(name, email, hashedPassword);
    const userId = result.lastInsertRowid;
    
    // Create wallet
    db.prepare("INSERT INTO wallets (user_id, balance) VALUES (?, ?)").run(userId, 0);
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user: any = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

// --- User Profile & Wallet ---
app.get("/api/user/profile", authenticateToken, (req: any, res) => {
  const user: any = db.prepare("SELECT id, name, email, role FROM users WHERE id = ?").get(req.user.id);
  const wallet: any = db.prepare("SELECT balance FROM wallets WHERE user_id = ?").get(req.user.id);
  res.json({ ...user, wallet });
});

app.get("/api/user/transactions", authenticateToken, (req: any, res) => {
  const transactions = db.prepare("SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC").all(req.user.id);
  res.json(transactions);
});

// --- Wallet Funding (Mock) ---
app.post("/api/wallet/fund", authenticateToken, (req: any, res) => {
  const { amount, reference, method, bank } = req.body;
  
  const details = method === 'bank' ? `Wallet funding via Bank Transfer (${bank})` : 
                  method === 'card' ? `Wallet funding via Card Payment` :
                  method === 'ussd' ? `Wallet funding via USSD` : `Wallet funding`;

  db.transaction(() => {
    db.prepare("UPDATE wallets SET balance = balance + ? WHERE user_id = ?").run(amount, req.user.id);
    db.prepare("INSERT INTO transactions (user_id, type, amount, status, details, reference) VALUES (?, ?, ?, ?, ?, ?)")
      .run(req.user.id, 'funding', amount, 'success', details, reference);
  })();
  
  res.json({ message: "Wallet funded successfully" });
});

// --- VTU Services ---
app.get("/api/services", (req, res) => {
  const services = db.prepare("SELECT * FROM services WHERE is_active = 1").all();
  res.json(services);
});

app.post("/api/services/buy", authenticateToken, async (req: any, res) => {
  const { serviceId, phoneNumber, amount, details } = req.body;
  
  const wallet: any = db.prepare("SELECT balance FROM wallets WHERE user_id = ?").get(req.user.id);
  const service: any = db.prepare("SELECT * FROM services WHERE id = ?").get(serviceId);
  
  if (!service) return res.status(404).json({ error: "Service not found" });
  
  const finalAmount = service.price || amount;
  
  if (wallet.balance < finalAmount) {
    return res.status(400).json({ error: "Insufficient balance" });
  }
  
  try {
    db.transaction(() => {
      db.prepare("UPDATE wallets SET balance = balance - ? WHERE user_id = ?").run(finalAmount, req.user.id);
      db.prepare("INSERT INTO transactions (user_id, type, amount, status, details, reference) VALUES (?, ?, ?, ?, ?, ?)")
        .run(req.user.id, service.category, finalAmount, 'success', `${service.provider} ${service.category} to ${phoneNumber}`, `TXN-${Date.now()}`);
    })();
    
    res.json({ message: "Transaction successful" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- Admin Routes ---
app.get("/api/admin/stats", authenticateToken, (req: any, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: "Forbidden" });
  
  const totalUsers = db.prepare("SELECT COUNT(*) as count FROM users").get();
  const totalTransactions = db.prepare("SELECT COUNT(*) as count FROM transactions").get();
  const totalRevenue = db.prepare("SELECT SUM(amount) as total FROM transactions WHERE type != 'funding' AND status = 'success'").get();
  
  res.json({ totalUsers, totalTransactions, totalRevenue });
});

// --- Vite Integration & Server Start ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Only listen if not running in a serverless environment (like Vercel)
  if (process.env.VERCEL !== "1") {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

// Start the server if not imported as a module
if (process.env.VERCEL !== "1") {
  startServer();
}

export default app;
