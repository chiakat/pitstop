const express = require('express');
const db = require('../database');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../react-client/dist`));

// adds the new records to the database
app.post('/addRecord', (req, res) => {
  console.log(req.body);
  const {
    name, directions, hours, publicOrPrivate, isAccessible, male, female,
    hasChangingTable, hasToiletPaper, hasSoap, unisex, isFree, needKey, isVerified, rating, type,
  } = req.body;

  let { location, placeId } = req.body;
  const latitude = location.lat;
  const longitude = location.lng;
  placeId = placeId === '' ? type + latitude + longitude : placeId;
  location = JSON.stringify(location);
  console.log('placeId', placeId);

  const values = [placeId, name, location, latitude, longitude,
    directions, hours, publicOrPrivate, isAccessible, male, female,
    hasChangingTable, hasToiletPaper, hasSoap, unisex, isFree, needKey, isVerified, rating, type];

  const insertQuery = 'INSERT or REPLACE INTO toiletsandtap VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.run(insertQuery, values, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send(err);
    }
    console.log(`Success! A row has been inserted for ${name} ${type}`);
    return res.status(201).send();
  });
});

// gets all toilet and water fountain data
app.get('/', (req, res) => {
});

// updates existing records
app.patch('/', (req, res) => {
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
