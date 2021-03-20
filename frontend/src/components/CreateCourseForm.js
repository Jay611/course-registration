import './CreateCourseForm.css'
import { useState } from 'react'
import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'

// Actions
import {
  getCourses as listCourses,
} from '../redux/actions/courseActions'

function CreateCourseForm() {
  axios.defaults.withCredentials = true

  const dispatch = useDispatch()

  const getCourses = useSelector(state => state.getCourses)
  const { courses } = getCourses

  const [course, setCourse] = useState({
    'courseCode': '', 'courseName': ''
  })

  const onChange = (e) => {
    e.persist();
    setCourse({ ...course, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const isExist = courses.filter(c=>c.courseCode === course.courseCode)
    if(isExist.length > 0) alert('This course code already exists')
    else{
      axios.post('http://localhost:5000/api/courses', course)
        .then(() => dispatch(listCourses()))
        .catch(err => alert(err.response.data.msg))
    }
  }

  return (
    <div className="createcourseform-container" >
      <form className="createcourseform-form" onSubmit={onSubmit}>
        <div className="createcourseform-item">
          <label htmlFor="courseCode">Course Code</label>
          <input type="text" name="courseCode" className="createcourseform-control" onChange={onChange} required />
        </div>
        <div className="createcourseform-item">
          <label htmlFor="courseName">Course Name</label>
          <input type="text" name="courseName" className="createcourseform-control" onChange={onChange} required />
        </div>
        <button type="submit" className="createcourseform-button">Create Course</button>
      </form>
    </div>
  )
}

export default CreateCourseForm
