const mongoose = require('mongoose');
const { validateEmail } = require('../../helpers/auth.helper');
const { ErrorMessages } = require('../../lib/consts/ErrorMessages');
const {
  UserTypes,
  UserTypePermissionsMap,
} = require('../../lib/consts/UserType.enum');
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../../services/logger.service');

const required = true;

const UserSchema = new Schema({
  firstname: { type: String, required },
  lastname: { type: String, required },
  email: {
    type: String,
    validate: [validateEmail, ErrorMessages.InvalidEmail],
    required,
  },
  hash: { type: String, required },
  userType: { type: Number, enum: Object.values(UserTypes), required },
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.hash);
};

UserSchema.methods.generateBearerAuthToken = function () {
  return jwt.sign(this.toObject(), process.env.JWT_ACCESS_TOKEN_SECRET);
};

UserSchema.virtual('fullname').get(function () {
  return `${this.firstname} ${this.lastname}`;
});

UserSchema.virtual('permissions').get(function () {
  return UserTypePermissionsMap.get(this.userType);
});

UserSchema.set('toObject', {
  transform: function (doc, ret, options) {
    delete ret.hash;
    delete ret.userType;
    ret.permissions = UserTypePermissionsMap.get(1);
    return ret;
  },
});

const User = model('User', UserSchema);
User.watch().on('error', (err) => {
  logger.error('Error in user model layer: ', err);
});
module.exports = User;
