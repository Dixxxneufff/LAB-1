var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('servicios', {
    title: 'Servicios del Hotel',
    services: [
      { name: 'Spa de lujo', image: '../public/images/spa.jpg' },
      { name: 'Gimnasio', image: '../public/images/gym.jpg' },
      { name: 'Restaurante gourmet', image: '../public/images/restaurant.jpg' },
      { name: 'Piscina climatizada', image: '../public/images/pool.jpg' },
    ],
  });
});

module.exports = router;