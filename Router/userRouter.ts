import express,{Router} from 'express';
import {register, Login, Logout, listTeamMembers, listAdminMember, updateRoleToAdmin, updateRoleToMember} from '../Controller/userController';

const router:Router = express.Router();

router.post('/register',register);
router.post('/login',Login);
router.post('/logout',Logout);
router.get('/listTeamMembers',listTeamMembers);
router.get('/listAdminMembers',listAdminMember);
router.put('/updatedRoleToAdmin/:username',updateRoleToAdmin)


// module.exports = router;
export default router;