//sharan Adhikari 24071844
const mysql = require('mysql2'); // Importing the MySQL module to interact with the database

// 1. Create a connection to the database using the connection details
const connection = mysql.createConnection({
    host: 'localhost',        // host where MySQL database is running 
    user: 'root',             //  MySQL username, i didnt change it while installation so i wrote root
    password: 'Madhumayaadhikari12', 
    database: 'crowdfunding_db' // The database name that I created, in this case 'crowdfunding_db'
});

// 2. Opening  the MySQL connection
connection.connect((err) => {
    if (err) {
        // If there's an error, log it and stop further execution
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    // If the connection is successful, log the connection thread ID
    console.log('Connected to the database as id ' + connection.threadId);
});

// 3. Export the connection object for use in other files
module.exports = connection;
