const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'disaster.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to SQLite database');
});

// Create resources table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      needs TEXT NOT NULL,
      severity TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      description TEXT,
      contact_info TEXT,
      severity TEXT CHECK(severity IN ('high', 'medium', 'low')) NOT NULL
    )
  `);
});
  
  // Add volunteers table
  db.run(`
    CREATE TABLE IF NOT EXISTS volunteers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      skills TEXT,
      availability TEXT,
      registered_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

module.exports = db;