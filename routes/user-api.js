var express = require('express');
var router = express.Router();
const { expressjwt }  = require('express-jwt');
var { jwt } = require('express-jwt');
var auth = expressjwt({
  secret: 'MY_SECRET',
  userProperty: 'payload',
  algorithms: ["HS256"]
});

// var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

// profile
// router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.get("/", ctrlAuth.getAll);
// GET - /api/employees/kajsdhjkash28 (Get Employee by Id)
router.get("/:id", ctrlAuth.get);
// POST - /api/employees (Create an Employee)
router.post("/", ctrlAuth.create);
// PUT - /api/employees/kajsdhjkash28 (Update Employee by Id)
router.put("/:id", ctrlAuth.edit);
// DELETE - /api/employees/kajsdhjkash28 (DELETE Employee by Id)
router.delete("/:id", ctrlAuth.delete);

module.exports = router;