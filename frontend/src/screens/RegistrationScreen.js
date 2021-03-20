import './RegistrationScreen.css'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Components
import Course from '../components/Course'
import RegisteredSection from '../components/RegisteredSection'

// Actions
import { getStudent } from '../redux/actions/studentActions'
import {
  getCourses as listCourses,
  updateMyCourse
} from '../redux/actions/courseActions'

function RegistrationScreen() {

  const dispatch = useDispatch()

  // Get all courses
  const getCourses = useSelector(state => state.getCourses)
  const { loading, courses, error } = getCourses


  const student = useSelector(state => state.student)
  const { profile } = student

  const myCourses = useSelector(state => state.myCourses)
  const { mycourse_loading, registeredCourses, mycourse_error } = myCourses

  if (!profile) window.location.href = '/login'

  useEffect(() => {
    dispatch(listCourses())
    dispatch(getStudent())
  }, [dispatch])

  useEffect(() => {
    if (profile._id) {
      dispatch(updateMyCourse(profile._id))
    }
  }, [dispatch, profile._id])

  return (
    <>
      <div className="registrationscreen">
        <div className="registrationscreen-left">
          <h2>Courses</h2>
          {loading || profile.loading ?
            <p>Loading...</p>
            : error ?
              <h2>{error}</h2> :
              courses.length === 0 ?
                <p>No course exists</p>
                : courses.map((course) => (
                  <Course
                    key={course._id}
                    course={course}
                    sectionButtonType="ADD"
                  />
                ))
          }
        </div>

        <div className="registrationscreen-right">
          <h2>My Courses</h2>
          {mycourse_loading || profile.loading ? (
            <p>Loading...</p>
          ) : (mycourse_error ? (
            <h2>{mycourse_error}</h2>
          ) : (
            registeredCourses && registeredCourses.length > 0 ? registeredCourses.map((course) => (
              <RegisteredSection key={`${course._id}-${course.sectionNumber}`} course={course} />
            )) : (
              <div>
                There is no course.
              </div>
            )
          )
          )}

        </div>

      </div>
    </>


  )
}

export default RegistrationScreen
