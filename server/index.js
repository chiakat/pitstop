/* eslint-disable no-console */
/* eslint-disable camelcase */
const functions = require('firebase-functions');
const express = require('express');
const db = require('../database');

const app = express();
const PORT = 3030;

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../react-client/dist`));

// adds the new records to the database
app.post('/api/addRecord', (req, res) => {
  console.log('attept to add:', req.body);
  const {
    name, directions, address, hours, publicOrPrivate, isAccessible, male, female,
    hasChangingTable, hasToiletPaper, hasSoap, unisex, isFree, needKey, isVerified, rating, type,
  } = req.body;

  let { location, place_id } = req.body;
  const latitude = location.lat;
  const longitude = location.lng;
  place_id = place_id === '' ? type + latitude + longitude : place_id;
  location = JSON.stringify(location);
  console.log('place_id', place_id);

  const values = [place_id, name, location, latitude, longitude,
    directions, address, hours, publicOrPrivate, isAccessible, male, female,
    hasChangingTable, hasToiletPaper, hasSoap, unisex, isFree, needKey, isVerified, rating, type];

  const insertQuery = `INSERT OR REPLACE INTO toiletsandtap(place_id, name, location, address,
    latitude, longitude, directions, hours, publicOrPrivate, isAccessible, male, female,
    hasChangingTable, hasToiletPaper, hasSoap, unisex, isFree, needKey, isVerified, rating, type)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(insertQuery, values, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send(err);
    }
    console.log(`Success! A row has been inserted for ${name} ${type}`);
    return res.status(201).send();
  });
});

// adds all api results to the database
app.post('/api/saveResults', (req, res) => {
  console.log(req.body);
  const {
    place_id, status, address, directions, latitude, longitude,
    name, hours, rating, user_ratings_total, type,
  } = req.body;

  const location = JSON.stringify(req.body.location);
  console.log('place_id', place_id);

  const values = [place_id, status, address, directions, location, latitude, longitude,
    name, hours, rating, user_ratings_total, type];

  const insertQuery = `INSERT or REPLACE INTO toiletsandtap(
    place_id, status, address, directions, location, latitude, longitude, name, hours,
    rating, user_ratings_total, type
    ) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`;

  db.run(insertQuery, values, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send(err);
    }
    console.log(`Success! A row has been inserted for ${name} ${type}`);
    return res.status(201).send();
  });
});

// // gets all toilet and water fountain data
// app.get('/', (req, res) => {
// });

// // updates existing records
// app.patch('/', (req, res) => {
// });

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

exports.api = functions.https.onRequest(app);
