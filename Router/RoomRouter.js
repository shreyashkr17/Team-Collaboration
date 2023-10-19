const express = require("express");
const roomController = require("../Controller/roomController");
const authenticateRole = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/create',authenticateRole('admin'),roomController.createRoom);
router.get('/listRooms',roomController.listRooms);
router.post('/adduserToRoom',authenticateRole('admin'),roomController.addUserToRoom)
router.post('/getUsersInRoom', authenticateRole('admin'), roomController.getUserInRoom);

module.exports = router;