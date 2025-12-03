const bcrypt = require('bcrypt');
const db = require('../shared/db');

exports.getUsers = async (req, res) => {
	try {
		const [rows] = await db.promise().query('SELECT id, name, email FROM Users');
		return res.json(rows);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Server error fetching users' });
	}
};

// Register / create user
exports.createUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.status(400).json({ error: 'All fields are required' });
		}

		// Check if user exists
		const [existing] = await db.promise().query('SELECT id FROM Users WHERE email = ?', [email]);
		if (existing.length > 0) {
			return res.status(400).json({ error: 'User already exists' });
		}

		const hashed = await bcrypt.hash(password, 10);
		await db.promise().execute('INSERT INTO Users (name, email, password) VALUES (?, ?, ?)', [name, email, hashed]);

		return res.status(201).json({ message: 'User registered successfully' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Server error during registration' });
	}
};

// Login handler
exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ error: 'Email and password are required' });
		}

		const [rows] = await db.promise().query('SELECT * FROM Users WHERE email = ?', [email]);
		if (rows.length === 0) {
			return res.status(401).json({ error: 'Invalid email or password' });
		}

		const user = rows[0];
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

		// Return minimal user info
		return res.json({ message: 'Login successful', user: { id: user.id, email: user.email, name: user.name } });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Server error during login' });
	}
};
