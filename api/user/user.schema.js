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
const {
  managerProgramsObjectMap,
} = require('../../lib/managerProgramMap.index');

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
  return jwt.sign(this.toObject(), process.env.LASOVA_ACCESS_TOKEN_SECRET);
};

UserSchema.virtual('fullname').get(function () {
  return `${this.firstname} ${this.lastname}`;
});

UserSchema.virtual('permissions').get(function () {
  return UserTypePermissionsMap.get(this.userType);
});

UserSchema.virtual('associatedPrograms').get(function () {
  if (this.userType === UserTypes.ProgramManager) {
    return managerProgramsObjectMap[this.email];
  }
  return null;
});

UserSchema.set('toObject', {
  transform: function (doc, ret, options) {
    delete ret.hash;
    delete ret.iat;
    return ret;
  },
});

const User = model('User', UserSchema);
module.exports = User;
