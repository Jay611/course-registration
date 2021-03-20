const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  courseCode: {
    type: String,
    unique: true,
    required: 'Course code is required'
  },
  courseName: {
    type: String,
    required: 'Course name is required'
  },
  sections: [{
    _id: false,
    sectionNumber: Number,
    semester: {
      type: String,
      match: [/^\d{4}(W|F|S){1}$/, "Please fill a valid semester (ex. 2021W)"],
      required: true
    },
    classHour: [{
      dayOfWeek: String,
      startTime: {
        hour: Number,
        minute: Number
      },
      endTime: {
        hour: Number,
        minute: Number
      }
    }],
    professor: String,
    students: [{
      type: Schema.Types.ObjectId,
      ref: 'Student'
    }]
  }],
}, {
  timestamps: true
});

mongoose.model('Course', CourseSchema);