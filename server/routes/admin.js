const express = require('express');
const router = express.Router();
const db = require('../db'); // assuming db is already configured
const verifyToken = require('../middleware/verifyToken');
router.use(verifyToken); // All admin routes protected
// ✅ Get all pending verifications
router.get('/verifications', async (req, res) => {
  try {
    const pendingUsers = await db.query(
      'SELECT id, name, email FROM users WHERE is_verified = false'
    );
    const pendingEvents = await db.query(
      'SELECT id, name, category FROM events WHERE is_verified = false'
    );
    res.json({ users: pendingUsers.rows, events: pendingEvents.rows });
  } catch (err) {
    console.error('Error fetching verifications:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Approve user
router.post('/verifications/user/:id/approve', async (req, res) => {
  try {
    await db.query('UPDATE users SET is_verified = true WHERE id = $1', [req.params.id]);
    res.json({ message: 'User approved' });
  } catch (err) {
    res.status(500).json({ message: 'Error approving user' });
  }
});

// ✅ Reject user (delete)
router.post('/verifications/user/:id/reject', async (req, res) => {
  try {
    await db.query('DELETE FROM users WHERE id = $1', [req.params.id]);
    res.json({ message: 'User rejected' });
  } catch (err) {
    res.status(500).json({ message: 'Error rejecting user' });
  }
});

// ✅ Approve event
router.post('/verifications/event/:id/approve', async (req, res) => {
  try {
    await db.query('UPDATE events SET is_verified = true WHERE id = $1', [req.params.id]);
    res.json({ message: 'Event approved' });
  } catch (err) {
    res.status(500).json({ message: 'Error approving event' });
  }
});

// ✅ Reject event
router.post('/verifications/event/:id/reject', async (req, res) => {
  try {
    await db.query('DELETE FROM events WHERE id = $1', [req.params.id]);
    res.json({ message: 'Event rejected' });
  } catch (err) {
    res.status(500).json({ message: 'Error rejecting event' });
  }
});

router.get('/stats', async (req, res) => {
    try {
      const totalUsers = await db.query('SELECT COUNT(*) FROM users');
      const pendingUsers = await db.query('SELECT COUNT(*) FROM users WHERE is_verified = false');
      const totalEvents = await db.query('SELECT COUNT(*) FROM events');
      const pendingEvents = await db.query('SELECT COUNT(*) FROM events WHERE is_verified = false');
  
      res.json({
        totalUsers: Number(totalUsers.rows[0].count),
        pendingUsers: Number(pendingUsers.rows[0].count),
        totalEvents: Number(totalEvents.rows[0].count),
        pendingEvents: Number(pendingEvents.rows[0].count),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching stats" });
    }
  });
  

module.exports = router;
