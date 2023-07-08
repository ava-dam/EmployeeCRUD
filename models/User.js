var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  id: {
    type: String,
  },

  firstname: {
    type: String,
  },

  lastname: {
    type: String,
  },

  dob: {
    type: String,
  },

  add1: {
      type: String,
  },

  add2: {
      type: String,
  },

  city: {
      type: String,
  },

  state: {
      type: String,
  },

  zip: {
      type: String,
  },

  dept: {
      type: String,
  },

  email: {
    type: String,
  },

  role: {
    type: String,
  },

  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.firstname,
    role: this.role,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET");
};

module.exports = User = mongoose.model('User', userSchema);