const Student = require('mongoose').model('Student')

const authAdmin = async (req, res, next) => {
  try {
    // Get user information by id
    const student = await Student.findOne({ _id: req.student.id })
    if (student.role === 0)
      return res.status(400).json({ msg: "Admin resources access denied" })
      
    next()
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

module.exports = authAdmin