// Sharan Adhikari 24071844

// Import required libraries
const express = require('express');
const mysql = require('mysql2');
const path = require('path'); // For serving HTML files

// Initialize the Express application
const app = express();
const port = 3000;

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Madhumayaadhikari12',
    database: 'crowdfunding_db'
});

// Connecting to MySQL
connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(express.json()); // Parse JSON request bodies

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Creating the GET API for active fundraisers
app.get('/fundraisers', (req, res) => {
    let sql = `
        SELECT FUNDRAISER.*, CATEGORY.NAME 
        FROM FUNDRAISER 
        JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID 
        WHERE FUNDRAISER.ACTIVE = 1;
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching fundraisers' });
        } else {
            res.json(results);
        }
    });
});

// Creating the GET API for Categories
app.get('/categories', (req, res) => {
    let sql = 'SELECT * FROM CATEGORY;';
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching categories' });
        } else {
            res.json(results);
        }
    });
});

// Route for searching fundraisers
app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'search.html')); // Serve the search.html file
});

// Route for individual fundraiser details
app.get('/fundraiser/:id', (req, res) => {
    const fundraiserId = req.params.id;
    const sql = 'SELECT * FROM FUNDRAISER WHERE FUNDRAISER_ID = ?';

    connection.query(sql, [fundraiserId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.length > 0) {
            const fundraiser = results[0];
            res.send(`
                <h1>${fundraiser.CAPTION}</h1>
                <p>Organizer: ${fundraiser.ORGANIZER}</p>
                <p>City: ${fundraiser.CITY}</p>
                <p>Current Funding: $${fundraiser.CURRENT_FUNDING}</p>
                <a href="/">Back to Home</a>
            `);
        } else {
            res.status(404).send('Fundraiser not found');
        }
    });
});
