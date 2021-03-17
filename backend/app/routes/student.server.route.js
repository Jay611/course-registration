const router = require('express').Router()
const student = require('../controllers/student.server.controller')
const auth = require('../middleware/auth')

router.post('/register', student.register)

router.post('/login', student.login)

router.get('/logout', student.logout)

router.get('/refresh_token', student.refreshToken)

router.get('/studentinfo', auth, student.getStudent)



module.exports = router