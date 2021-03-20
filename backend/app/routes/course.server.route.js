const router = require('express').Router()
const course = require('../controllers/course.server.controller')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/')
  .get(auth, course.getCourses) // get all courses
  .post(auth, authAdmin, course.createCourse)  // create new course

router.route('/course/:id') // update and delete course
  .put(auth, authAdmin, course.updateCourse)
  .delete(auth, authAdmin, course.deleteCourse)

router.route('/mycourse/:studentId')
  .get(auth, course.getCourseByStudent) //get courses by student

router.post('/studentslist', course.getStudentsByCourse)


router.route('/sections')
  .post(auth, authAdmin, course.createSection) // create new section of a course

router.route('/sections/:sectionNumber')  // update and delete section
  .put(auth, authAdmin, course.updateSection)
  .delete(auth, authAdmin, course.deleteSection)

router.route('/sections/addsection') // add a section to student
  .post(auth, course.addCourseToStudent)

router.route('/section/removesection') // delete a section from student
  .delete(auth, course.deleteSectionFromStudent)


module.exports = router