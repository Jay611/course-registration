const router = require('express').Router()
const student = require('../controllers/student.server.controller')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/register', student.register)

router.post('/login', student.login)

router.get('/logout', student.logout)

router.get('/read_cookie', student.isSignedIn);

router.get('/studentinfo', auth, student.getStudent)

router.get('/allstudents', auth, authAdmin, student.getStudents)


module.exports = router