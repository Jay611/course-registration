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

  const {courseCode, courseName, section} = course

  const removeCourseHandler = () => {
    axios.delete('/api/courses/section/removesection', { data: { studentId: student._id, courseCode: courseCode, semester: section.semester, sectionNumber: section.sectionNumber } })
    .then(() => dispatch(updateMyCourse(student._id)))
    
  }

  return (
      <div className="registered-section">
        <p className="registered-courseCode">{courseCode}</p>
        <p className="registered-courseName">{courseName}</p>
        <p className="registered-semester">{section.semester}</p>
        <p className="section-sectionNumber">Sec {section.sectionNumber.toLocaleString('en-US', {
          minimumIntegerDigits: 3,
          useGrouping: false
        })}</p>
        <button className="registered-section-addBtn" onClick={removeCourseHandler}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
  )
}

export default RegisteredSection
