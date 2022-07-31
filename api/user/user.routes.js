const express = require('express');
const {
  authenticateToken,
} = require('../../middlewares/authentication.middleware');
const router = express.Router();
const { getUserPermissions } = require('./user.controller');

router.get('/permissions', authenticateToken, getUserPermissions);
module.exports = router;
