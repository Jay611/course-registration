const config = require('../../config/config')
const Student = require('mongoose').model('Student')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtExpirySeconds = 3600;
const jwtKey =config.secretKey;

class APIfeatures {
  constructor(query, queryString) {
    this.query = query,
      this.queryString = queryString
  }
  filtering() {
    const queryObj = { ...this.queryString } // qeuryString = req.query

    const excludedFields = ['page', 'sort', 'limit']
    excludedFields.forEach(el => delete (queryObj[el]))

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    this.query.find(JSON.parse(queryStr))

    return this
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('-createdAt')
    }
    return this
  }

  paginating() {
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 9
    const skip = (page - 1) * limit
    this.query = this.query.skip(skip).limit(limit)
    return this
  }
}

exports.register = async (req, res) => {
  try {
    const { studentNumber, password } = req.body

    const student = await Student.findOne({ studentNumber })
    if (student) return res.status(400).json({ msg: "The student number already exists." })

    // Password Encryption
    const passwordHash = await bcrypt.hash(password, 10)

    const newStudent = new Student({ ...req.body, password: passwordHash })

    newStudent.save()

    res.json(newStudent)

  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { studentNumber, password } = req.body

    const student = await Student.findOne({ studentNumber })
    if (!student) return res.status(400).json({ msg: "User does not exist." })

    const isMatch = await bcrypt.compare(password, student.password)
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" })

    //If login success, create access token and refresh token
    const token = jwt.sign({ id: student._id }, jwtKey,
      { algorithm: 'HS256', expiresIn: jwtExpirySeconds });

    res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000, httpOnly: true });

    res.json({ token })

  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token")
    return res.status('200').json({ msg: 'Logged out' })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

exports.isSignedIn = (req, res) => {
  try {
    const token = req.cookies.token

    if (!token) return res.status(400).json({ msg: "Please Login or Register" })

    jwt.verify(token, jwtKey, (err, student) => {
      if (err) return res.status(400).json({ msg: "Please Login or Register" })

      res.json({ student })
    })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select("-password")
    res.json(student)
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

exports.getStudents = async (req, res) => {
  try {
    const features = new APIfeatures(Student.find(), req.query)
      .filtering().sorting().paginating()
    const students = await features.query

    res.json(students)
  } catch (err) {
    return res.status(500).json({ msg: err.message })

  }
}
