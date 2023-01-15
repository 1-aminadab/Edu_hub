const express = require('express')
const {
    getAllUsers,
    signup,
    login,
    getUser,
    updateUser,
    deleteUser,
    verifyToken,
    refreshIoken
}  = require('../controllers/tasks')
const router = express.Router()


router.post('/signup',signup)
router.post('/login',login)
router.get('/user',verifyToken,getUser)
router.get("/refresh",refreshIoken,verifyToken,getUser)

// router.get('/user/:id',getUser)
// router.patch('/user/:id',updateUser)
// router.delete('/user/:id',deleteUser)

module.exports = router