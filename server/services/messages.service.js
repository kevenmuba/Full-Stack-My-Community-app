const db = require('../config/db.config');

exports.sendMessage = async (senderId, receiverId, message) => {
  const query = 'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)';
  try {
    const result = await db.query(query, [senderId, receiverId, message]);
    return result.insertId;
  } catch (error) {
    console.error('Error in sendMessage service:', error);
    throw error;
  }
};

exports.getMessageById = async (messageId) => {
  const query = 'SELECT * FROM messages WHERE id = ?';
  try {
    const [message] = await db.query(query, [messageId]);
    return message;
  } catch (error) {
    console.error('Error in getMessageById service:', error);
    throw error;
  }
};

exports.getAllMessages = async () => {
  const query = 'SELECT * FROM messages ORDER BY created_at DESC';
  try {
    const messages = await db.query(query);
    return messages;
  } catch (error) {
    console.error('Error in getAllMessages service:', error);
    throw error;
  }
};

exports.getMessagesByUserId = async (userId) => {
  const query = 'SELECT * FROM messages WHERE sender_id = ? OR receiver_id = ? ORDER BY created_at DESC';
  try {
    const messages = await db.query(query, [userId, userId]);
    return messages;
  } catch (error) {
    console.error('Error in getMessagesByUserId service:', error);
    throw error;
  }
};

exports.updateMessage = async (messageId, newContent) => {
  const query = 'UPDATE messages SET message = ? WHERE id = ?';
  try {
    const result = await db.query(query, [newContent, messageId]);
    if (result.affectedRows === 0) {
      throw new Error('Message not found');
    }
    return await this.getMessageById(messageId);
  } catch (error) {
    console.error('Error in updateMessage service:', error);
    throw error;
  }
};