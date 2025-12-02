
const bcrypt = require("bcrypt");
const db = require("../config/db"); // or your ORM / database connection

// REGISTER
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Basic validation
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    // 2. Check if user already exists
    const existing = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0)
      return res.status(400).json({ error: "User already exists" });

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Insert user into database
    await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      hashedPassword
    ]);

    // 5. Send success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during registration" });
  }
};
