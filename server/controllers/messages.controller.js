const messageService = require('../services/messages.service');

exports.sendMessage = async (req, res) => {
  try {
    const { sender_id, receiver_id, message } = req.body;

    // Validation
    if (!sender_id || !receiver_id || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Additional validation (e.g., check if users exist) can be added here

    const newMessageId = await messageService.sendMessage(sender_id, receiver_id, message);
    const newMessage = await messageService.getMessageById(newMessageId);

    res.status(201).json({
      message: 'Message sent successfully',
      data: newMessage
    });
  } catch (error) {
    console.error('Error in sendMessage controller:', error);
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await messageService.getAllMessages();
    res.status(200).json({
      message: 'Messages retrieved successfully',
      data: messages
    });
  } catch (error) {
    console.error('Error in getAllMessages controller:', error);
    res.status(500).json({ message: 'Error retrieving messages', error: error.message });
  }
};

exports.getMessagesByUserId = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const messages = await messageService.getMessagesByUserId(userId);
    res.status(200).json({
      message: 'Messages for user retrieved successfully',
      user_id: userId,
      data: messages
    });
  } catch (error) {
    console.error('Error in getMessagesByUserId controller:', error);
    res.status(500).json({ message: 'Error retrieving messages for user', error: error.message });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message content is required' });
    }

    const updatedMessage = await messageService.updateMessage(messageId, message);
    res.status(200).json({
      message: 'Message updated successfully',
      data: updatedMessage
    });
  } catch (error) {
    console.error('Error in updateMessage controller:', error);
    if (error.message === 'Message not found') {
      res.status(404).json({ message: 'Message not found' });
    } else {
      res.status(500).json({ message: 'Error updating message', error: error.message });
    }
  }
};