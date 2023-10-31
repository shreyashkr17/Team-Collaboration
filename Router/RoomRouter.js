const express = require("express");
const roomController = require("../Controller/roomController");
const authenticateRole = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/create',authenticateRole('admin'),roomController.createRoom);
router.get('/listRooms',roomController.listRooms);
router.post('/adduserToRoom',authenticateRole('admin'),roomController.addUserToRoom)
router.post('/getUsersInRoom', roomController.getUserInRoom);
router.post('/getRoomsForUser', authenticateRole('team_member'), roomController.getRoomsForUser);
router.post('/getAdminNameForRoom',roomController.getAdminNameFromRoom);
router.post('/getRoomsCreatedByAdmin',authenticateRole('admin'),roomController.getRoomsCreatedByAdmin);

module.exports = router;