const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const Driver = mongoose.model('drivers');
const randomDrivers = require('../services/helper/randomDrivers');
const saveTrip = require('../services/helper/saveTrip');
const updateTrip = require('../services/helper/updateTrip');
const getTrips = require('../services/helper/getTrips');
const findDrivers = require('../services/helper/findDrivers');

module.exports = app => {
  app.get('/api/getTrips', requireLogin, (req, res) => {
    getTrips(req.user._id).then(trips => {
      res.send(trips);
    });
  });

  app.post('/api/saveTrip', requireLogin, (req, res) => {
    const tripData = {
      userID: req.user._id,
      driverID: req.body._id,
      driverName: req.body.name
    };
    saveTrip(tripData).then(newTrip => {
      res.send(newTrip);
    });
  });

  app.post('/api/updateTrip', (req, res) => {
    const updateData = req.body;
    updateTrip(updateData).then(updatedTrip => {
      res.send();
    });
  });

  app.post('/api/findDrivers', requireLogin, (req, res, next) => {
    const { lat, lon } = req.body;
    const mapData = { lat: parseFloat(lat), lon: parseFloat(lon) };
    findDrivers(mapData).then(drivers => {
      res.send(drivers);
    });
  });
};
