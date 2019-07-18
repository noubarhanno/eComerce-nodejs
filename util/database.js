const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'N0ub@rH@nn01987'
});

module.exports = pool.promise();