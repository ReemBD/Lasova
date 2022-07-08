const express = require('express');
const router = express.Router();
const { login } = require('./authentication.controller');
router.get('/login', login)