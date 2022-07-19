const mongoose = require('mongoose');
const { validateEmail } = require('../../helpers/auth.helper');
const { ErrorMessages } = require('../../lib/consts/ErrorCodes');
const { UserTypes } = require('../../lib/consts/UserType.enum');
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');

const required = true;

const SchemaOptions = {
  methods: {
    checkPassword(password) {
      return bcrypt.compare(password, this.hash);
    },
  },
};

const User = new Schema(
  {
    firstname: { type: String, required },
    lastname: { type: String, required },
    username: { type: String, required: false, trim: true },
    email: {
      type: String,
      validate: [validateEmail, ErrorMessages.Validation.InvalidEmail],
      required,
    },
    hash: { type: String, required },
    userType: { type: String, enum: Object.values(UserTypes), required },
  },
  SchemaOptions
);

module.exports = model('User', User);
