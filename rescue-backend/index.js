const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

const Sentry = require("@sentry/node");

Sentry.init({ 
  dsn: "https://bbb19e7631a37600be57fc27ee65656d@o4508700606267392.ingest.de.sentry.io/4508700634841168",
  tracesSampleRate: 1.0,
});

// Add error handler
app.use(Sentry.Handlers.errorHandler());

// Get all resources
app.get('/api/resources', (req, res) => {
  db.all('SELECT * FROM resources', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add new resource
app.post('/api/resources', (req, res) => {
  const { name, lat, lng, needs, severity } = req.body;
  db.run(
    'INSERT INTO resources (name, lat, lng, needs, severity) VALUES (?, ?, ?, ?, ?)',
    [name, lat, lng, needs, severity],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        id: this.lastID,
        name,
        lat,
        lng,
        needs,
        severity
      });
    }
  );
});

// Add volunteer registration endpoint
app.post('/api/volunteers', (req, res) => {
    const { name, email, skills, availability } = req.body;
    db.run(
      'INSERT INTO volunteers (name, email, skills, availability) VALUES (?, ?, ?, ?)',
      [name, email, skills, availability],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
      }
    );
  });

  // Update Resource
app.put('/api/resources/:id', (req, res) => {
  const { name, lat, lng, needs, severity, description, contact_info } = req.body;
  db.run(
    `UPDATE resources SET 
      name = ?, 
      lat = ?, 
      lng = ?, 
      needs = ?, 
      severity = ?, 
      description = ?, 
      contact_info = ?
     WHERE id = ?`,
    [name, lat, lng, needs, severity, description, contact_info, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Resource updated', changes: this.changes });
    }
  );
});

// Delete Resource
app.delete('/api/resources/:id', (req, res) => {
  db.run(
    'DELETE FROM resources WHERE id = ?',
    [req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Resource deleted', changes: this.changes });
    }
  );
});

app.listen(5000, () => console.log('Server running on port 5000'));