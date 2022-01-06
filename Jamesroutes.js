var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  next()
})
let lessons = [
  {
      "id": 1,
      "Subject": "Math",
      "Location": "London",
      "price": 100,
  },
  {
      "id": 2,
      "Subject": "Engilsh",
      "Location": "London",
      "price": 100,
  },
  {
      "id": 3,
      "Subject": "Science",
      "Location": "Oxford",
      "price": 100,
  },
  {
      "id": 4,
      "Subject": "Histoy",
      "Location": "York",
      "price": 80,
  },
  {
      "id": 5,
      "Subject": "Music",
      "Location": "Brisol",
      "price": 90,
  }
]

let user = [
  {
    'email': 'user@email.com',
    'password': 'mypassword'
  }

]

router.get('/lesson', (request, response) => {
  response.end(JSON.stringify(lessons));

});

router.get('/user', (request, response) => {
  response.end(JSON.stringify(user));
});



module.exports = router