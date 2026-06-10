const db = require('./db');

async function createTable() {
  try {
    console.log('Creating notices table if it does not exist...');
    await db.execute(`
      CREATE TABLE IF NOT EXISTS notices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        target_role ENUM('All', 'Admin', 'Teacher', 'Student', 'Parent') DEFAULT 'All',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_by CHAR(36)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    
    // Insert some sample notices
    const [rows] = await db.execute('SELECT COUNT(*) as count FROM notices');
    if (rows[0].count === 0) {
        console.log('Inserting sample notices...');
        await db.execute(`
            INSERT INTO notices (title, content, target_role, created_by) VALUES 
            ('Welcome to VR EduStream ERP', 'We are excited to launch the new School Management System. Please explore the dashboard.', 'All', 'admin-id'),
            ('Staff Meeting on Friday', 'There will be a mandatory staff meeting this Friday at 4 PM in the main hall.', 'Teacher', 'admin-id'),
            ('Fee Payment Deadline', 'Reminder: The deadline for Term 2 fee payment is approaching. Please ensure timely payment.', 'Parent', 'admin-id')
        `);
    }

    console.log('Notices table setup complete.');
    process.exit(0);
  } catch (err) {
    console.error('Error setting up notices table:', err);
    process.exit(1);
  }
}

createTable();
