const express = require('express')
const userController = require("../Controller/userController");

const router = express.Router();

router.post('/register',userController.register);
router.post('/login',userController.Login);
router.post('/logout',userController.Logout);
router.get('/listTeamMembers',userController.listTeamMembers);
router.get('/listAdminMembers',userController.listAdminMember);
router.put('/updatedRoleToAdmin/:username',userController.updateRoleToAdmin)


module.exports = router;