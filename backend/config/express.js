const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')


module.exports = function () {
  const app = express()
  app.use(express.json())
  app.use(cookieParser())

  app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


  // Load the routing files
  app.use('/api/students', require('../app/routes/student.server.route.js'));
  app.use('/api/courses', require('../app/routes/course.server.route.js'));

  return app
}