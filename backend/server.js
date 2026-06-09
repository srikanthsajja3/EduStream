const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [users] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    // Note: PHP bcrypt hash ($2y$) is compatible with node bcryptjs ($2a$ / $2b$) 
    // but some versions might need a quick prefix swap if it fails. 
    // Usually, it works fine.
    const isMatch = await bcrypt.compare(password, user.password_hash.replace('$2y$', '$2a$'));

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.status !== 'Active') {
      return res.status(403).json({ error: 'Account is inactive' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
        must_change_password: user.must_change_password
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Students Route
app.get('/api/students', async (req, res) => {
  try {
    const [students] = await db.execute(`
      SELECT s.*, c.name as class_name, cs.section_name 
      FROM students s
      LEFT JOIN classes c ON s.joined_class_id = c.id
      LEFT JOIN class_sections cs ON s.joined_section_id = cs.id
      LIMIT 100
    `);
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Teachers Route
app.get('/api/teachers', async (req, res) => {
  try {
    const [teachers] = await db.execute('SELECT * FROM teachers');
    res.json(teachers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Academics Routes
app.get('/api/classes', async (req, res) => {
  try {
    const [classes] = await db.execute('SELECT * FROM classes');
    res.json(classes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/timetable/:sectionId', async (req, res) => {
  const { sectionId } = req.params;
  try {
    const [timetable] = await db.execute(`
      SELECT t.*, ts.start_time, ts.end_time, ts.remarks as slot_name, s.name as subject_name, tea.name as teacher_name
      FROM timetable t
      JOIN time_slots ts ON t.time_slot_id = ts.id
      JOIN teacher_subject tsub ON t.teacher_subject_id = tsub.id
      JOIN subjects s ON tsub.subject_id = s.id
      JOIN teachers tea ON tsub.teacher_id = tea.id
      WHERE t.class_section_id = ?
      ORDER BY ts.start_time
    `, [sectionId]);
    res.json(timetable);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Attendance Routes
app.get('/api/attendance/:date', async (req, res) => {
  const { date } = req.params;
  try {
    const [attendance] = await db.execute(`
      SELECT sa.*, s.name as student_name, c.name as class_name, cs.section_name
      FROM student_attendance sa
      JOIN students s ON sa.student_id = s.id
      LEFT JOIN classes c ON s.joined_class_id = c.id
      LEFT JOIN class_sections cs ON s.joined_section_id = cs.id
      WHERE sa.date = ?
    `, [date]);
    res.json(attendance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fees Routes
app.get('/api/fees/summary', async (req, res) => {
  try {
    const [summary] = await db.execute(`
      SELECT 
        SUM(total_amount) as total_expected,
        SUM(CASE WHEN status = 'Paid' THEN total_amount ELSE 0 END) as total_collected,
        SUM(CASE WHEN status != 'Paid' THEN total_amount ELSE 0 END) as total_pending
      FROM student_fees
    `);
    res.json(summary[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/fees/payments', async (req, res) => {
  try {
    const [payments] = await db.execute(`
      SELECT sfp.*, s.name as student_name, sf.fee_type
      FROM student_fee_payments sfp
      JOIN student_fees sf ON sfp.student_fee_id = sf.id
      JOIN students s ON sf.student_id = s.id
      ORDER BY sfp.payment_date DESC
      LIMIT 50
    `);
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
