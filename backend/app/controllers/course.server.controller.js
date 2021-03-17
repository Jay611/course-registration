const Course = require('mongoose').model('Course')


exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
    res.json(courses)
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

exports.createCourse = async (req, res) => {
  try {
    // If student has role = 1 ---> admin
    // Only admin can create, delete and update course
    const { courseCode } = req.body
    const course = await Course.findOne({courseCode})
    if(course) return res.status(400).json({msg: 'This course already exists.'})

    const newCourse = new Course(req.body)
    await newCourse.save()
    res.json({msg: 'created new course'})
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}