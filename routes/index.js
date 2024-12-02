var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Hotel Paraíso',
    hotelName: 'Hotel Paraíso',
    phone: '+34 601 34 59 14',
    location: 'Calle Pedro Ceron 7, Las Palmas de Gran Canaria, España',
  });
});

module.exports = router;
