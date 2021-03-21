import './RegistrationScreen.css'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Components
import Course from '../components/Course'
import RegisteredSection from '../components/RegisteredSection'

// Actions
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
  const { profile_loading, profile } = student

  const myCourses = useSelector(state => state.myCourses)
  const { mycourse_loading, registeredCourses, mycourse_error } = myCourses

  useEffect(() => {
    dispatch(listCourses())
  }, [dispatch])

  useEffect(() => {
    if (profile) {
      dispatch(updateMyCourse(profile._id))
    }
  }, [dispatch, profile])

  return (
    <>
      {!profile_loading ? (
        <div className="registrationscreen">
          <div className="registrationscreen-left">
            <h2>Courses</h2>
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
                      sectionButtonType="ADD"
                    />
                  ))
            }
          </div>

          <div className="registrationscreen-right">
            <h2>My Courses</h2>
            {mycourse_loading ? (
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
      ) : (
        <p>Profile Loading...</p>
      )}

    </>


  )
}

export default RegistrationScreen
