var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('servicios', {
    title: 'Servicios del Hotel',
    services: [
      { name: 'Spa de lujo', image: '/images/spa.jpg' },
      { name: 'Gimnasio', image: '/images/gym.jpg' },
      { name: 'Restaurante gourmet', image: '/images/restaurant.jpg' },
      { name: 'Piscina climatizada', image: '/images/pool.jpg' },
    ],
  });
});

module.exports = router;