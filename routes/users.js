const express = require('express');
const router = express.Router();
const db = require('../db');

// Add User
router.post('/add', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error inserting user.');
    }
    console.log('User inserted:', result);
    res.send('User inserted successfully.');
  });
});

// Get all users
router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


// Delete a user
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to delete user');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('User not found');
    }
    res.send('User deleted successfully');
  });
});


// Update a user
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;  // Assuming you're updating name and email
  
  console.log(`Updating user with ID: ${id}`);  // Log the ID for debugging

  // SQL UPDATE query
  const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  db.query(query, [name, email, id], (err, result) => {
    if (err) {
      console.error(err);  // Log the error for debugging
      return res.status(500).send('Failed to update user');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('User not found');
    }
    console.log(`Updated user with ID: ${id}`);  // Log successful update
    res.send('User updated successfully');
  });
});


module.exports = router;
