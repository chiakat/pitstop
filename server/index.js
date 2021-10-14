const express = require('express');
const db = require('../database');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../react-client/dist'));


// adds the new records to the database
app.post('/addRecord', function(req, res) {
  console.log(req.body)
  let { placeId, name, location, directions, hours, publicOrPrivate, isAccessible, male, female,
    hasChangingTable, hasToiletPaper, hasSoap, unisex, isFree, needKey, isVerified, rating, type } = req.body;

  let latitude = location.lat;
  let longitude = location.lng;

  if (!placeId || placeId === '') {
    placeId = type + latitude + longitude
  }

  location = JSON.stringify(location)

  let values = [placeId, name, location, latitude, longitude, directions, hours, publicOrPrivate, isAccessible, male, female, hasChangingTable, hasToiletPaper, hasSoap, unisex, isFree, needKey, isVerified, rating, type]

  let insertQuery = 'INSERT INTO toiletsandtap VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.run(insertQuery, values, (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send(err);
    }
    console.log(`Success! A row has been inserted for ${name} ${type}`);
    res.status(201).send();
  });
});

// gets all toilet and water fountain data
app.get('/', function(req, res) {
});


// updates existing records
app.patch('/', function(req, res) {
});



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
