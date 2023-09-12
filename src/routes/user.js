const express = require('express');
const router = express.Router()
const { 
    createUser, 
    signInUser, 
    fetchAllUsers, 
    fetchSingleUser,
    updateUsers
} = require('../controllers/user.controller')

router.post('/signup', createUser);
router.post('/login', signInUser);
router.get('/', fetchAllUsers);
router.get('/:id', fetchSingleUser);
router.put('/:id', updateUsers);
// router.delete('/:id', deleteUser);

module.exports = router;