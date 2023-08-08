const mysql = require('mysql');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb'
}

function getUsersFromDB(callback) {
    const conection = mysql.createConnection(dbConfig);

    const query = 'SELECT * FROM users';

    conection.query(query, (err, result) => {
        if(err) {
            console.error("Error: ", err);
            callback({ status: 500, error: err }, null)
        } else {
            conection.end();

            callback(null, { status: 200, data: result });
        }
    })
}

function getUserFromDB(id, callback) {
    const conection = mysql.createConnection(dbConfig);

    const query = 'SELECT * FROM users WHERE id = ?';

    conection.query(query, [id], (err, result) => {
        if(err) {
            console.error("Error: ", err);
            callback({ status: 500, error: err }, null)
        } else {
            conection.end();
            callback(null, { status: 200, data: result });
        }
    })
}

function getUserPostsFromDB(id, callback) {
    const conection = mysql.createConnection(dbConfig);

    const query = 'SELECT * FROM posts WHERE user_id = ?';

    conection.query(query, [id], (err, result) => {
        if(err) {
            console.error("Error: ", err);
            callback({ status: 500, error: err }, null)
        } else {
            conection.end();
            callback(null, { status: 200, data: result });
        }
    })
}

function addUserToDB(username, age, callback) {
    const conection = mysql.createConnection(dbConfig);

    const query = 'INSERT INTO users (username, age) VALUES (?, ?)';
    const values = [username, age];

    conection.query(query, values, (err, result) => {
        if(err) {
            console.error("Error: ", { status: 500, error: "Error adding users" });
            callback( { status: 500, error: err}, null)
        } else {
            conection.end();
            callback(null, { status: 200, data: result });
        }
    })
}

function deleteUserFromDB(id, callback) {
    const connection = mysql.createConnection(dbConfig);
    const query = 'DELETE FROM users WHERE id = ?';

    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error: ", err);
            callback({ status: 500, error: err }, null);
        } else {
            connection.end();
            callback(null, { status: 200, data: result });
        }
    });
}

module.exports = {
    getUsersFromDB,
    getUserFromDB,
    getUserPostsFromDB,
    addUserToDB,
    deleteUserFromDB,
}