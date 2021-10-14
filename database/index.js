const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./toiletsandtap.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the Toilets and Tap SQlite database.');
});


// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

module.exports = db;