const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();

//Initialize Express app
const app = express();
const port = 3000;

app.use('/api/users', require('./routes/users'));

