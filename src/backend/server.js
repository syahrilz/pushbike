const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const rateLimit = require('express-rate-limit');
const db = require('./database');

const app = express();
const JWT_SECRET = 'pushbike-secret-key-2024';

// Rate limiting configuration
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs for auth endpoints
  message: 'Too many login attempts, please try again later'
});

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute for general API
  message: 'Too many requests, please try again later'
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../../public/uploads')));

// Apply rate limiting to all API routes
app.use('/api', apiLimiter);

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// =========================
// AUTH ENDPOINTS
// =========================

// POST /api/auth/login - Login admin
app.post('/api/auth/login', authLimiter, (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM admins WHERE username = ?', [username], (err, admin) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    bcrypt.compare(password, admin.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, {
          expiresIn: '8h'
        });
        res.json({ token, username: admin.username });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  });
});

// POST /api/auth/logout - Logout admin
app.post('/api/auth/logout', authenticateToken, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// =========================
// PARTICIPANTS ENDPOINTS
// =========================

// POST /api/participants - Add participant
app.post('/api/participants', authenticateToken, upload.single('photo'), (req, res) => {
  const { name, dob, category, parent_name, contact } = req.body;
  const photo_url = req.file ? '/uploads/' + req.file.filename : null;

  db.run(
    'INSERT INTO participants (name, dob, category, parent_name, contact, photo_url) VALUES (?, ?, ?, ?, ?, ?)',
    [name, dob, category, parent_name, contact, photo_url],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, message: 'Participant added successfully' });
    }
  );
});

// GET /api/participants - Get all participants
app.get('/api/participants', (req, res) => {
  db.all('SELECT * FROM participants ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// GET /api/participants/:id - Get participant detail
app.get('/api/participants/:id', (req, res) => {
  db.get('SELECT * FROM participants WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Participant not found' });
    }
    res.json(row);
  });
});

// DELETE /api/participants/:id - Delete participant
app.delete('/api/participants/:id', authenticateToken, (req, res) => {
  db.run('DELETE FROM participants WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Participant not found' });
    }
    res.json({ message: 'Participant deleted successfully' });
  });
});

// =========================
// RACE DRAW ENDPOINTS
// =========================

// POST /api/race-draw - Input race draw
app.post('/api/race-draw', authenticateToken, (req, res) => {
  const { participant_id, group_name, draw_order } = req.body;

  db.run(
    'INSERT INTO race_draw (participant_id, group_name, draw_order) VALUES (?, ?, ?)',
    [participant_id, group_name, draw_order],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, message: 'Race draw added successfully' });
    }
  );
});

// GET /api/race-draw - Get all race draws
app.get('/api/race-draw', (req, res) => {
  db.all(
    `SELECT rd.*, p.name, p.category 
     FROM race_draw rd 
     JOIN participants p ON rd.participant_id = p.id 
     ORDER BY rd.group_name, rd.draw_order`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

// =========================
// RACE SCHEDULE ENDPOINTS
// =========================

// POST /api/race-schedule - Input race schedule
app.post('/api/race-schedule', authenticateToken, (req, res) => {
  const { group_name, category, start_time, end_time, track_number } = req.body;

  db.run(
    'INSERT INTO race_schedule (group_name, category, start_time, end_time, track_number) VALUES (?, ?, ?, ?, ?)',
    [group_name, category, start_time, end_time, track_number],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, message: 'Race schedule added successfully' });
    }
  );
});

// GET /api/race-schedule - Get all schedules
app.get('/api/race-schedule', (req, res) => {
  db.all('SELECT * FROM race_schedule ORDER BY start_time', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// =========================
// LIVE MONITOR ENDPOINTS
// =========================

// POST /api/live-monitor - Input live position
app.post('/api/live-monitor', authenticateToken, (req, res) => {
  const { participant_id, position, lap_time } = req.body;

  db.run(
    'INSERT INTO live_monitor (participant_id, position, lap_time) VALUES (?, ?, ?)',
    [participant_id, position, lap_time],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, message: 'Live monitor data added successfully' });
    }
  );
});

// GET /api/live-monitor - Get live monitor data
app.get('/api/live-monitor', (req, res) => {
  db.all(
    `SELECT lm.*, p.name, p.category 
     FROM live_monitor lm 
     JOIN participants p ON lm.participant_id = p.id 
     ORDER BY lm.timestamp DESC 
     LIMIT 100`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

// =========================
// RACE RESULTS ENDPOINTS
// =========================

// POST /api/race-results - Input race result
app.post('/api/race-results', authenticateToken, (req, res) => {
  const { participant_id, finish_time, rank, category } = req.body;

  db.run(
    'INSERT INTO race_results (participant_id, finish_time, rank, category) VALUES (?, ?, ?, ?)',
    [participant_id, finish_time, rank, category],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, message: 'Race result added successfully' });
    }
  );
});

// GET /api/race-results - Get all race results
app.get('/api/race-results', (req, res) => {
  const { category } = req.query;
  
  let query = `SELECT rr.*, p.name, p.category 
               FROM race_results rr 
               JOIN participants p ON rr.participant_id = p.id`;
  
  const params = [];
  if (category) {
    query += ' WHERE rr.category = ?';
    params.push(category);
  }
  
  query += ' ORDER BY rr.rank ASC';

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// =========================
// NEXT STAGE ENDPOINTS
// =========================

// POST /api/next-stage - Add participant to next stage
app.post('/api/next-stage', authenticateToken, (req, res) => {
  const { participant_id, stage, status } = req.body;

  db.run(
    'INSERT INTO next_stage (participant_id, stage, status) VALUES (?, ?, ?)',
    [participant_id, stage, status],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, message: 'Participant added to next stage successfully' });
    }
  );
});

// GET /api/next-stage - Get next stage participants
app.get('/api/next-stage', (req, res) => {
  db.all(
    `SELECT ns.*, p.name, p.category 
     FROM next_stage ns 
     JOIN participants p ON ns.participant_id = p.id 
     ORDER BY ns.stage, ns.created_at`,
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
});

// =========================
// ADMINS ENDPOINTS
// =========================

// POST /api/admins - Add admin
app.post('/api/admins', authenticateToken, (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    db.run(
      'INSERT INTO admins (username, password) VALUES (?, ?)',
      [username, hash],
      function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, message: 'Admin added successfully' });
      }
    );
  });
});

// GET /api/admins - Get all admins
app.get('/api/admins', authenticateToken, (req, res) => {
  db.all('SELECT id, username, created_at FROM admins', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// =========================
// UTILITY ENDPOINTS
// =========================

// GET /api/stats - Get dashboard statistics
app.get('/api/stats', (req, res) => {
  const stats = {};
  
  db.get('SELECT COUNT(*) as count FROM participants', (err, row) => {
    stats.participants = row ? row.count : 0;
    
    db.get('SELECT COUNT(*) as count FROM race_schedule', (err, row) => {
      stats.schedules = row ? row.count : 0;
      
      db.get('SELECT COUNT(*) as count FROM race_results', (err, row) => {
        stats.results = row ? row.count : 0;
        
        res.json(stats);
      });
    });
  });
});

module.exports = app;
