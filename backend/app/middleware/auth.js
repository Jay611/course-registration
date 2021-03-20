const config = require('../../config/config')
const jwt = require('jsonwebtoken')
const jwtKey = config.secretKey;

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) return res.status(400).json({ msg: "Invalid Authentication" })

    jwt.verify(token, jwtKey, (err, student) => {
      if (err) return res.status(400).json({ msg: "Invalid Authentication" })

      req.student = student
      next()
    })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

module.exports = auth