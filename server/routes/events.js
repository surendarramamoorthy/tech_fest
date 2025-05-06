const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/verifyToken");

// Create new event (admin or coordinator)
router.post("/create", verifyToken, async (req, res) => {
    const {
      title,
      category,
      description,
      date,
      prizes,
      brochure_url,
      image_url,
      registration_fee
    } = req.body;
  
    const userId = req.user.id;
  
    try {
      const result = await db.query(
        `INSERT INTO events
        (title, category, description, date, created_by, is_verified, created_at, prizes, brochure_url, image_url, registration_fee)
        VALUES ($1, $2, $3, $4, $5, false, NOW(), $6, $7, $8, $9)
        RETURNING *`,
        [title, category, description, date, userId, prizes, brochure_url, image_url, registration_fee]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error("Error creating event:", err.message);
      res.status(500).json({ message: "Event creation failed" });
    }
  });
  

// ✅ Register for an event
router.post("/register", verifyToken, async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user.id;

  try {
    const existing = await db.query(
      "SELECT * FROM event_registrations WHERE user_id = $1 AND event_id = $2",
      [userId, eventId]
    );
    if (existing.rows.length) {
      return res.status(400).json({ message: "Already registered" });
    }

    await db.query(
      "INSERT INTO event_registrations (user_id, event_id) VALUES ($1, $2)",
      [userId, eventId]
    );

    res.json({ message: "Registered successfully" });
  } catch (err) {
    console.error("Event registration failed:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get events user has registered for
router.get("/my-registrations", verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await db.query(
      `SELECT e.id, e.name, r.status, r.registered_at
       FROM event_registrations r
       JOIN events e ON r.event_id = e.id
       WHERE r.user_id = $1`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch registrations" });
  }
});

router.get("/", async (req, res) => {
    try {
      const events = await db.query(`
        SELECT 
          id, title, category, description, date,
          prizes, brochure_url, image_url, registration_fee
        FROM events
        WHERE is_verified = true
        ORDER BY date ASC
      `);
  
      res.json(events.rows);
    } catch (err) {
      console.error("Error fetching events:", err.message);
      res.status(500).json({ message: "Failed to load events" });
    }
  });
module.exports = router;
