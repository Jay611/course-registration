const config = require('../../config/config')
const jwt = require('jsonwebtoken')


const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization")
    if(!token) return res.status(400).json({msg:"Invalid Authentication"})

    jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, student) => {
      if(err) return res.status(400).json({msg:"Invalid Authentication"})

      req.student = student
      next()
    })
  } catch (err) {
    return res.status(500).json({msg: err.message})
  }
}

module.exports = auth