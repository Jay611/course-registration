import './CoursesScreen.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Components
import Course from '../components/Course'
import CreateCourseForm from '../components/CreateCourseForm'

import {
  getCourses as listCourses,
} from '../redux/actions/courseActions'
function CoursesScreen() {

  const [createCourseFormShow, setCreateCourseFormShow] = useState(false)

  const dispatch = useDispatch()

  const getCourses = useSelector(state => state.getCourses)
  const { loading, courses, error } = getCourses

  useEffect(() => {
    dispatch(listCourses())
    // dispatch(getStudent())
  }, [dispatch])

  const createCourseFormShowHandler = () => {
    setCreateCourseFormShow(!createCourseFormShow)
  }

  return (
    <div className="coursescreen">
      <h2>Courses</h2>

        <button className="coursescreen-createBtn" onClick={createCourseFormShowHandler}>
          <i className="fas fa-plus"></i>
          <span>New Course</span>
        </button>

      {createCourseFormShow ? (
        <div><CreateCourseForm /></div>
      )
        : (<></>)
      }
      {loading ?
        <p>Loading...</p>
        : error ?
          <h2>{error}</h2> :
          courses.length === 0 ?
            <p>No course exists</p>
            : courses.map((course) => (
              <Course
                key={course._id}
                course={course}
                addSectionFormEnable={true}
              />
            ))
      }
    </div>
  )
}

export default CoursesScreen
