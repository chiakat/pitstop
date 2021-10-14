const express = require('express');
const db = require('../database');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(__dirname + '/../react-client/dist'));


// gets all toilet and water fountain data
app.get('/', function(req, res) {

});


// updates existing records
app.patch('/', function(req, res) {

});


// adds the new records to the database
app.post('/', function(req, res) {

});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
