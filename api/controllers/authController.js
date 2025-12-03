/*
 registerUser(req, res) - creates new user (hash password, save to DB)
 getUser(req, res) - 
 loginUser(req,res) - checks credentials 
 verifyToken(req,res, next) - middleware to confirm user is logged in 
 logoutUser(req,res) (optional) - destroys session / invalidates token
*/


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

// Get User
exports.loginUser = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if (!user || bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({message: "Invalid Credentials"})
  }
};


// Need to check this still
// router.post('/register', (request, response) => {
//     const {name, email, password} = request.body;

//     if (!name || !email || !password) 
//         return response.status(400).json({message: 'All fields are required'});


//     const sql = 'INSERT INTO Users (name, email, password) VALUES (?,?,?)';
//     db.query(sql, [name, email, password], (err, result) => {
//         if (err) return response.status(500).json({error: err.message});
//         response.status(201).json({message: 'User registered successfully'});
//     });
// });

// const bcrypt = require('bcrypt');

// router.post('/login', async (request, response)=> {
//     const {email, password} = request.body;
//     if (!email || !password) return response.status(400).json({message: 'Email and password are required'});

//     try {
//         const [rows] = await db.promise().query('SELECT * from Users WHERE email = ?', [email]);
//         if (rows.length === 0) {
//             return response.status(401).json({message: 'Invalid email or password'});
//         }
//         const user = rows[0];

//         //Compare hashed passwords
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) { return response.status(401).json({message: 'Invalid username or password'});
//         }

//         //Login Successful
//         response.json({message: 'Login Successful', user: {id: user.id, email: user.email}});
//     } catch (err) {
//         console.error(err);
//         response.status(500).json({message: 'Server error during login'});
//     }
// });