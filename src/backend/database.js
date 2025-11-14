const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, '../../pushbike.db');
const db = new sqlite3.Database(dbPath);

// Initialize database schema
db.serialize(() => {
  // Participants table
  db.run(`
    CREATE TABLE IF NOT EXISTS participants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      dob DATE NOT NULL,
      category TEXT NOT NULL,
      parent_name TEXT NOT NULL,
      contact TEXT NOT NULL,
      photo_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Race draw table
  db.run(`
    CREATE TABLE IF NOT EXISTS race_draw (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      participant_id INTEGER NOT NULL,
      group_name TEXT NOT NULL,
      draw_order INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (participant_id) REFERENCES participants(id)
    )
  `);

  // Race schedule table
  db.run(`
    CREATE TABLE IF NOT EXISTS race_schedule (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      group_name TEXT NOT NULL,
      category TEXT NOT NULL,
      start_time DATETIME NOT NULL,
      end_time DATETIME,
      track_number INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Live monitor table
  db.run(`
    CREATE TABLE IF NOT EXISTS live_monitor (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      participant_id INTEGER NOT NULL,
      position INTEGER,
      lap_time TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (participant_id) REFERENCES participants(id)
    )
  `);

  // Race results table
  db.run(`
    CREATE TABLE IF NOT EXISTS race_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      participant_id INTEGER NOT NULL,
      finish_time TEXT NOT NULL,
      rank INTEGER,
      category TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (participant_id) REFERENCES participants(id)
    )
  `);

  // Next stage table
  db.run(`
    CREATE TABLE IF NOT EXISTS next_stage (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      participant_id INTEGER NOT NULL,
      stage TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (participant_id) REFERENCES participants(id)
    )
  `);

  // Admins table
  db.run(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (!err) {
      // Create default admin account if not exists
      const defaultPassword = bcrypt.hashSync('admin123', 10);
      db.run(
        `INSERT OR IGNORE INTO admins (username, password) VALUES (?, ?)`,
        ['admin', defaultPassword],
        (err) => {
          if (!err) {
            console.log('Default admin account created (username: admin, password: admin123)');
          }
        }
      );
    }
  });
});

module.exports = db;
