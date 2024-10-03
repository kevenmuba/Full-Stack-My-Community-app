const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messages.controller');

router.post('/api/messages', messageController.sendMessage);

router.get('/api/messages', messageController.getAllMessages);
router.get('/api/messages/user/:user_id', messageController.getMessagesByUserId);
router.put('/api/messages/:id', messageController.updateMessage);

module.exports = router;