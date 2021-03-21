const Course = require('mongoose').model('Course')
const Student = require('mongoose').model('Student')

// Course CRUD
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
    return res.status(200).json(courses)
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

exports.createCourse = async (req, res) => {
  try {
    // If student has role = 1 ---> admin
    // Only admin can create, delete and update course
    const { courseCode } = req.body
    const course = await Course.findOne({ courseCode })
    if (course) return res.status(400).json({ msg: 'This course already exists.' })

    const newCourse = new Course(req.body)
    await newCourse.save()
    return res.status(200).json({ msg: 'created new course' })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

exports.updateCourse = async (req, res) => {
  try {
    const isExist = await Course.findOne({ courseCode: req.body.courseCode })

    if (isExist) return res.status(400).json({ msg: 'This course code already exists.' })

    await Course.findByIdAndUpdate(req.params.id, req.body)

    return res.status(200).json({ msg: 'updated new section' })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id)

    return res.status(200).json({ msg: 'deleted new section' })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

exports.getCourseByStudent = async (req, res) => {
  try {
    Student.findById(req.params.studentId, (err, student) => {
      if (student && student.courses.length !== 0) {
        Promise.all(
          student.courses.map(async (course) => {

            const c = (await Course.findById(course.course)).toObject()
            const section = c.sections.filter(s => s.semester === course.semester && s.sectionNumber === course.sectionNumber)[0]
            delete section.students
            const result = {
              courseCode: c.courseCode,
              courseName: c.courseName,
              section: section
            }
            return result
          })
        ).then(results => {
          return res.status(200).json(results)
        })
      } else {
        return res.status(200).json([])
      }
    })
  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

exports.getStudentsByCourse = async (req, res) => {
  try {
    const { courseId, semester, sectionNumber } = req.body

    const course = await Course.findById(courseId)

    const section = course.sections.filter(s => s.semester == semester && s.sectionNumber === sectionNumber)[0]

    Promise.all(
      section.students.map(async (student) => await Student.findById(student))
    ).then(results => {
      return res.status(200).json(results)
    })

  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}


// Section CRUD
exports.createSection = async (req, res) => {
  try {
    const { courseCode, section } = req.body
    const course = await Course.findOne({ courseCode: courseCode })

    const existSection = course.sections.filter(x => x.sectionNumber === section.sectionNumber)

    if (existSection.length !== 0) return res.status(400).json({ msg: 'This section number already exists.' })

    course.sections.push(section)
    course.save()

    return res.status(200).json({ msg: 'created new section' })

  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

exports.updateSection = async (req, res) => {
  try {
    const updateSection = req.body
    const course = await Course.findOne({ courseCode: updateSection.courseCode })
    if (!course) return res.status(400).json({ msg: 'This course does not exists.' })

    delete updateSection.courseCode
    var existSection = course.sections.filter(x => x.sectionNumber === Number(req.params.sectionNumber))[0]
    if (!existSection) return res.status(400).json({ msg: 'This section number does not exist.' })

    var sameSection = course.sections.filter(x => x.sectionNumber === updateSection.sectionNumber)[0]
    if (sameSection && Number(existSection.sectionNumber) !== updateSection.sectionNumber)
      return res.status(400).json({ msg: 'This section number already exists.' })

    course.sections.update(updateSection)

    return res.status(200).json(course)
    // res.json({ msg: 'updated new section' })

  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

exports.deleteSection = async (req, res) => {
  try {
    return res.status(200).json({ msg: 'created new section' })

  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}


// Add section to Student
exports.addCourseToStudent = async (req, res) => {
  try {
    const { studentId, courseCode, semester, sectionNumber } = req.body
    const student = await Student.findById(studentId)
    const course = await Course.findOne({ courseCode })
    // Add course to student
    student.courses.push({ course, semester, sectionNumber })
    student.save()
    // Add student to course
    course.sections.filter(section => section.sectionNumber === sectionNumber && section.semester === semester)[0].students.push(student)
    course.save()
    return res.status(200).json({ msg: 'added new section' })

  } catch (err) {
    return res.status(500).json({ err: err.message })
  }
}

exports.deleteSectionFromStudent = async (req, res) => {
  try {
    const { studentId, courseCode, semester, sectionNumber } = req.body
    const student = await Student.findById(studentId)
    const course = await Course.findOne({ courseCode })
    console.log(req.body)

    //remove course from student
    student.courses = student.courses.filter(c => !c.course.equals(course._id) || c.semester !== semester || c.sectionNumber !== sectionNumber)
    console.log(student.courses)
    student.save()
    //remove student from course
    section = course.sections.filter(section => section.semester === semester && section.sectionNumber === sectionNumber)[0]
    section.students = section.students.filter(s => !s.equals(student._id))
    course.save()

    return res.status(200).json({ msg: 'Delete section from student' })
  } catch (err) {
    return res.status(500).json({ err: err.message })

  }
}