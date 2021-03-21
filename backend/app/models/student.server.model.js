// Load the module dependencies
const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  studentNumber: {
    type: Number,
    unique: true,
    required: 'Student number is required'
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  email: {
    type: String,
    // Validate the email format
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: true
  },
  password: {
    type: String,
    // Validate the 'password' value length
    validate: [
      (password) => password && password.length > 6,
      'Password should be longer'
    ],
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  program: {
    type: String,
    required: true
  },
  courses: [{
    _id: false,
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    },
    semester: String,
    sectionNumber: Number
  }],
  role: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true
});

// Set the 'fullname' virtual property
StudentSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
}).set(function (fullName) {
  const splitName = fullName.split(' ');
  this.firstName = splitName[0] || '';
  this.lastName = splitName[1] || '';
});

// Configure the 'Student' to use getters and virtuals when transforming to JSON
StudentSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

// Create the 'Student' model out of the 'Student'
mongoose.model('Student', StudentSchema);