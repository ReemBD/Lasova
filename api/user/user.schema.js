const mongoose = require('mongoose');
const { validateEmail } = require('../../helpers/auth.helper');
const { ErrorMessages } = require('../../lib/consts/ErrorCodes');
const {
  UserTypes,
  UserTypePermissionsMap,
} = require('../../lib/consts/UserType.enum');
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');
const { user } = require('pg/lib/defaults');

const required = true;

const UserSchema = new Schema({
  firstname: { type: String, required },
  lastname: { type: String, required },
  email: {
    type: String,
    validate: [validateEmail, ErrorMessages.Validation.InvalidEmail],
    required,
  },
  hash: { type: String, required },
  userType: { type: Number, enum: Object.values(UserTypes), required },
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.hash);
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

module.exports = model('User', UserSchema);
