const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

//rants
const reservationSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  month: String,
  day: Number,
  year: Number,
  time: String,
  size: Number,
  notes: String,
});

reservationSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

reservationSchema.set('toJSON', {
  virtuals: true
});

const Reservation = mongoose.model('Post', reservationSchema);

app.get('/api/reservations', async (req, res) => {
  try {
    let reservations = await Reservation.find();
    res.send({
      reservations: reservations
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/reservations', async (req, res) => {
  const reservation = new Reservation({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    month: req.body.month,
    day: req.body.day,
    year: req.body.year,
    time: req.body.time,
    size: req.body.size,
    notes: req.body.notes,
  });
  try {
    await reservation.save();
    res.send({
      resveration: reservation
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/reservations/:id', async (req, res) => {
  try {
    await Reservation.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3004, () => console.log('Server listening on port 3004!'));