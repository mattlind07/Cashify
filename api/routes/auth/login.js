
// Users.js
router.post('/register', (request, response) => {
    const {name, email, password} = request.body;

    if (!name || !email || !password) 
        return response.status(400).json({message: 'All fields are required'});


    const sql = 'INSERT INTO Users (name, email, password) VALUES (?,?,?)';
    db.query(sql, [name, email, password], (err, result) => {
        if (err) return response.status(500).json({error: err.message});
        response.status(201).json({message: 'User registered successfully'});
    });
});

const bcrypt = require('bcrypt');

router.post('/login', async (request, response)=> {
    const {email, password} = request.body;
    if (!email || !password) return response.status(400).json({message: 'Email and password are required'});

    try {
        const [rows] = await db.promise().query('SELECT * from Users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return response.status(401).json({message: 'Invalid email or password'});
        }
        const user = rows[0];

        //Compare hashed passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { return response.status(401).json({message: 'Invalid username or password'});
        }

        //Login Successful
        response.json({message: 'Login Successful', user: {id: user.id, email: user.email}});
    } catch (err) {
        console.error(err);
        response.status(500).json({message: 'Server error during login'});
    }
});