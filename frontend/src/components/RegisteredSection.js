import './RegisteredSection.css'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

// Actions
import {
  updateMyCourse
} from '../redux/actions/courseActions'

function RegisteredSection({ course }) {
  axios.defaults.withCredentials = true

  const dispatch = useDispatch()

  const student = useSelector(state => state.student.profile)

  const findSemester = () => {
    return (course.sections.filter(x => x.sectionNumber === course.sectionNumber)[0].semester)
  }

  const removeCourseHandler = () => {
    axios.delete('/api/courses/section/removesection', { data: { studentId: student._id, courseCode: course.courseCode, sectionNumber: course.sectionNumber } })
    .then(() => dispatch(updateMyCourse(student._id)))
    
  }

  return (
    course.status !== "removed" ? (
      <div className="registered-section">
        <p className="registered-courseCode">{course.courseCode}</p>
        <p className="registered-courseName">{course.courseName}</p>
        <p className="registered-semester">{findSemester()}</p>
        <p className="section-sectionNumber">Sec {course.sectionNumber.toLocaleString('en-US', {
          minimumIntegerDigits: 3,
          useGrouping: false
        })}</p>
        <button className="registered-section-addBtn" onClick={removeCourseHandler}>
          <i className="fas fa-trash"></i>
        </button>
      </div>)
      : ''
  )
}

export default RegisteredSection
