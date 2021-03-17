const config = require('../../config/config')
const Student = require('mongoose').model('Student')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { json } = require('express')

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
    const accesstoken = createAccessToken({ id: student._id })
    const refreshtoken = createRefreshToken({ id: student._id })

    res.cookie('refreshtoken', refreshtoken, {
      httpOnly: true,
      path: '/api/students/refresh_token'
    })

    res.json({accesstoken})

  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

exports.logout = async (req, res) => {
  try {
    res.clearCookie('refreshtoken', { path: '/api/students/refresh_token' })
    res.json({ msg: 'Logged out' })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

exports.refreshToken = (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken

    if (!rf_token) return res.status(400).json({ msg: "Please Login or Register" })

    jwt.verify(rf_token, config.REFRESH_TOKEN_SECRET, (err, student) => {
      if (err) return res.status(400).json({ msg: "Please Login or Register" })

      const accesstoken = createAccessToken({ id: student.id })

      res.json({accesstoken})
    })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

exports.getStudent = async (req, res) => {
  try {
    res.json(req.student)
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

const createAccessToken = (student) => {
  return jwt.sign(student, config.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}
const createRefreshToken = (student) => {
  return jwt.sign(student, config.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}