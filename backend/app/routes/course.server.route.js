const router = require('express').Router()
const course = require('../controllers/course.server.controller')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/')
  .get(course.getCourses)
  .post(auth, authAdmin, course.createCourse)


module.exports = router