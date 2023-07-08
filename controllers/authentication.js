var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
const DAO = require('../data-access/user-dao');
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = async function(req, res) {
  var user = new User();
  user.id = req.body.id;
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.email = req.body.email;
  user.dob = req.body.dob;
  user.role = req.body.role;
  user.dept = req.body.dept;
  user.add1 = req.body.add1;
  user.add2 = req.body.add2;
  user.city = req.body.city;
  user.state = req.body.state;
  user.zip = req.body.zip;
  user.setPassword(req.body.password);

  try {
    await user.save();
    var token;
    token = user.generateJwt();
    res.status(200);
    console.log('added to DB');
    res.json({
        "token": token
    });
  } catch(err) {
    console.log(err);
  }

};

module.exports.login = function(req, res) {
  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      console.log(req.body);
      res.json({
        "token" : token
      });
      console.log(token);
    } else {
      // If user is not found
      console.log('here2');
      console.log(req.headers); //content-type is okay
      console.log(req.body);
      res.status(401).json(info);
      console.log(info);
    }
  })(req, res);

};

module.exports.getAll = (req, res) => {
  DAO.getAllUsers().then(result => {
    res.status(200).json({data: result, message: "Success in getting all Employees"});
  }).catch(e => {
    res.status(500).json({data: [], message: "Error in getting employees"});
  });
}

module.exports.get = (req, res) => {
  var id = req.params.id;
  DAO.getUser(id).then(result => {
    res.status(200).json({data: result, message: `Success in getting employee`});
  }, err => {
    res.status(500).json({data: [], message: "Error in getting employee"});
  });
}

module.exports.create = async (req, res) => {
  var employee = { id: req.body.id,
                   firstname: req.body.firstname,
                   lastname: req.body.lastname,
                   dob: req.body.dob,
                   add1: req.body.add1,
                   add2: req.body.add2,
                   city: req.body.city,
                   state: req.body.state,
                   zip: req.body.zip,
                   dept: req.body.dept,
                   email: req.body.email,
                   role: req.body.role };
  try {
    var result = await DAO.createUser(employee);
    console.log(employee);
    res.status(201).json({data: result, message: "Success, Creating Employee"});
  } catch(eMsg) {
    res.status(500).json({data: null, message: "Error, Creating Employee"});
  }
}

module.exports.edit = (req, res) => {
  var id = req.params.id;
    // var { eid, ename } = req.body;
    console.log(req.body);
    var employee = { id: req.body.id, 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        dob: req.body.dob,
        add1: req.body.add1,
        add2: req.body.add2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        dept: req.body.dept,
        email: req.body.email,
        role: req.body.role };

    DAO.updateUser(id, employee).then(result => {
        res.status(200).json({data: result, message: "Success, Updating Employee" });
    }, eMsg => {
        res.status(500).json({data: null, message: "Error, Updating Employee" });
    });
}

module.exports.delete = (req, res) => {
  var id = req.params.id;

  DAO.deleteUser(id).then(_ => {
      res.status(204).json({data: null, message: "Success, Deleting Employee" });
  }, eMsg => {
      res.status(500).json({data: null, message: "Error, Deleting Employee" });
  });
}