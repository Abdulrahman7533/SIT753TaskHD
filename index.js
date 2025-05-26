const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();

const port = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '11223344',
    database: 'SIT772_7_2C'
});

if (process.env.NODE_ENV === 'test') {
    console.log("Skipping DB connection during test...");
} else {
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database.');
    });
}

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Form submission for adding a new doctor
app.post('/add-doctor', (req, res) => {
    const { Doctor_ID, Doctor_Name, Doctor_Phone, Doctor_Email, Doctor_Specialty } = req.body;

    // Check required fields
    if (!Doctor_ID || !Doctor_Name || !Doctor_Specialty) {
        return res.status(400).send('Error: Required fields are missing.');
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (Doctor_Email && !emailRegex.test(Doctor_Email)) {
        return res.status(400).send('Error: Invalid email format.');
    }

    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (Doctor_Phone && !phoneRegex.test(Doctor_Phone)) {
        return res.status(400).send('Error: Invalid phone number.');
    }

    // SQL query to insert a new doctor
    const sql = `INSERT INTO Doctor (Doctor_ID, Doctor_Name, Doctor_Phone, Doctor_Email, Doctor_Specialty) 
               VALUES ('${Doctor_ID}', '${Doctor_Name}', '${Doctor_Phone}', '${Doctor_Email}', '${Doctor_Specialty}')`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Error inserting data');
        }
        res.send('Doctor added successfully');
    });
});

if (require.main === module) {
    const server = app.listen(port, () => {
        console.log(`Web server running at: http://localhost:${port}`);
        console.log('Type Ctrl+C to shut down the web server');
    });

    if (process.env.NODE_ENV === 'test') {
        setTimeout(() => {
            server.close(() => {
                console.log("Test server closed.");
            });
        }, 1000);
    }
}

module.exports = app;
