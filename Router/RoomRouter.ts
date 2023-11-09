import express, {Router} from 'express';
import {listRooms,createRoom, addUserToRoom, getUserInRoom, getRoomsForUser, getAdminNameFromRoom, getRoomsCreatedByAdmin,removeUserFromRoom} from '../Controller/roomController';
import authenticateRole from '../middleware/authMiddleware';


const router = express.Router();

router.post('/create',authenticateRole('admin'),createRoom);
router.get('/listRooms',listRooms);
router.post('/adduserToRoom',authenticateRole('admin'),addUserToRoom)
router.post('/getUsersInRoom', getUserInRoom);
router.post('/getRoomsForUser', authenticateRole('team_member'), getRoomsForUser);
router.post('/getAdminNameForRoom',getAdminNameFromRoom);
router.post('/getRoomsCreatedByAdmin',authenticateRole('admin'),getRoomsCreatedByAdmin);
router.post('/removeUserFromRoom', authenticateRole('admin'), removeUserFromRoom);

export default router;