// db.js
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "cs340_rupet",
  password: "5415",
  database: "cs340_rupet",
  connectionLimit: 5,
});

db.connect(err => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + db.threadId);
});

module.exports = db;

