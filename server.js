const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');



const app = express();
app.use(cors());              // Allow cross-origin requests (from Expo app)
app.use(express.json());      // Parse JSON bodies

// MySQL connection config
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'razakimlie.1911836',  // your password
  database: 'recipe_box',           // your database name
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database.');
});

// Routes

// Get all recipes
app.get('/recipes', (req, res) => {
  db.query('SELECT * FROM recipes', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add a new recipe
app.post('/recipes', (req, res) => {
  const { title, ingredients, instructions } = req.body;
  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ error: 'Missing recipe data' });
  }
  db.query(
    'INSERT INTO recipes (title, ingredients, instructions) VALUES (?, ?, ?)',
    [title, ingredients, instructions],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: results.insertId, title, ingredients, instructions });
    }
  );
});

// Update a recipe by id
app.put('/recipes/:id', (req, res) => {
  const { id } = req.params;
  const { title, ingredients, instructions } = req.body;
  db.query(
    'UPDATE recipes SET title = ?, ingredients = ?, instructions = ? WHERE id = ?',
    [title, ingredients, instructions, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Recipe updated' });
    }
  );
});

// Delete a recipe by id
app.delete('/recipes/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM recipes WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Recipe deleted' });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
