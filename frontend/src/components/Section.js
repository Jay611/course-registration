import './Section.css'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

// Actions
import {
  updateMyCourse
} from '../redux/actions/courseActions'

function Section(props) {
  axios.defaults.withCredentials = true

  const { _id, courseCode, section, sectionButtonType } = props

  const dispatch = useDispatch()

  const myCourses = useSelector(state => state.myCourses)
  const { registeredCourses } = myCourses

  const student = useSelector(state => state.student.profile)

  const addCourseHandler = () => {
    const isExist = registeredCourses.filter(c => c.courseCode === courseCode)
    if (isExist.length > 0) alert('This course already registered')
    else {
      axios.post('api/courses/sections/addsection', { studentId: student._id, courseCode, semester: section.semester, sectionNumber: section.sectionNumber })
        .then(() => dispatch(updateMyCourse(student._id)))
    }
  }

  const showStudents = () => {
    axios.post('/api/courses/studentslist', { courseId: _id, semester: section.semester, sectionNumber: section.sectionNumber })
      .then(res => {
        props.history.push({
          pathname: '/students',
          state: res.data
        })
      })

  }

  const sectionButtonTypeSwitch = (type) => {
    switch (type) {
      case "ADD":
        return (
          <button className="section-addBtn" onClick={addCourseHandler}>
            <i className="fas fa-plus"></i>
          </button>
        )
      case "EDIT":
        return (
          <div>
            <button className="section-addBtn">
              <i className="far fa-edit"></i>
            </button>
            <button className="section-addBtn">
              <i className="fas fa-trash"></i>
            </button>
          </div>
        )
      default:
        return (
          <div>
            <button className="section-addBtn" onClick={showStudents}>
              <i className="fas fa-users"></i>
            </button>
          </div>
        )
    }
  }

  return (
    <div className="section">
      <p>{section.semester}</p>
      <p className="section-number">Sec {section.sectionNumber.toLocaleString('en-US', {
        minimumIntegerDigits: 3,
        useGrouping: false
      })}</p>
      {section.classHour.map((c, index) => (
        <p key={index} className="section-classhour">{`${c.dayOfWeek} ${c.startTime.hour}:${c.startTime.minute} - ${c.endTime.hour}:${c.endTime.minute}`}</p>
      ))}
      <p className="section-professor">{section.professor}</p>

      {sectionButtonTypeSwitch(sectionButtonType)}

    </div>
  )
}

export default withRouter(Section)
