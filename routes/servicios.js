var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('servicios', {
    title: 'Servicios del Hotel',
	phone: '+34 601 34 59 15',
    location: 'Calle Pedro Ceron 5, Las Palmas de Gran Canaria, España',
    services: [
      { name: 'Spa de lujo', image: '/images/spa2.jpg' },
      { name: 'Gimnasio', image: '/images/gym2.jpg' },
      { name: 'Restaurante gourmet', image: '/images/restaurant2.jpg' },
      { name: 'Piscina climatizada', image: '/images/pool2.jpg' },
    ],
  });
});

module.exports = router;