// server/routes/auth.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// POST /register
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const result = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
        [name, email, hashedPassword, role || 'general']
      );
  
      res.status(201).json(result.rows[0]); // return only safe public info
    } catch (err) {
      console.error('Registration error:', err.message); // log server-side
      res.status(500).json({ error: err.message }); // return error to frontend
    }
  });
  

// POST /login
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  
      if (!user.rows.length) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const match = await bcrypt.compare(password, user.rows[0].password);
      if (!match) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const safeUser = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role,
      };
  
      const token = jwt.sign(
        { id: safeUser.id, role: safeUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
  
      res.json({ user: safeUser, token });
  
    } catch (err) {
      console.error("Login Error:", err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

module.exports = router;
