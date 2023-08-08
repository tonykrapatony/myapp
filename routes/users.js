var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const cors = require('cors');

// router.use(cors());
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'DELETE', // Додайте DELETE метод
};

router.use(cors(corsOptions));

/* GET users listing. */
router.get('/', function(req, res, next) {
  // let usersList = ["user 1", "user 2"];
  // res.render('users', {title: "Users list", users: usersList});
  usersController.getUsersFromDB((err, usersList) => {
    if (err) {
      res.status(500).send('Error');
    } else {
      console.log(usersList)
      res.status(200).send(usersList)
      // res.render('users', {title: "Users list", users: usersList});
    }
  })
});

/* GET user by ID. */
router.get('/:id', function(req, res, next) {
  const { id } = req.params

  usersController.getUserFromDB(id, (err, userInfo) => {
    if (err) {
      res.status(500).send('Error', err);
    } else {
      console.log(userInfo)
      res.status(200).send(userInfo)
      // res.render('users', {title: "Users list", users: usersList});
    }
  })
});

/* GET user posts by ID. */
router.get('/:id/posts', function(req, res, next) {
  const { id } = req.params

  usersController.getUserPostsFromDB(id, (err, userInfo) => {
    if (err) {
      res.status(500).send('Error', err);
    } else {
      console.log(userInfo)
      res.status(200).send(userInfo)
      // res.render('users', {title: "Users list", users: usersList});
    }
  })
});

router.post('/', function(req, res, next) {
  const { id, username, age } = req.body;
  // Виконання запиту для додавання нового користувача до таблиці users
  usersController.addUserToDB(username, age, (err, result) => {
    if (err) {
      res.status(500).send('Error');
    } else {
      console.log(result)
      res.status(200).send(result)
      // res.render('users', {title: "Users list", users: usersList});
    }
  })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  usersController.deleteUserFromDB(id, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
});

module.exports = router;
