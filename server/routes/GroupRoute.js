const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const {createGroup,acceptInvitation,getGroups,groupDetails} = require('../controllers/GroupController');


router.post('/create', authMiddleware, createGroup);

router.post('/invitation/register', acceptInvitation);

router.get('/user-groups', authMiddleware, getGroups);

router.get('/:groupId', authMiddleware, groupDetails);


module.exports = router;
