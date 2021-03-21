import * as actionTypes from '../constants/courseConstants'

export const getCoursesReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_COURSES_REQUEST:
      return {
        loading: true,
        courses: []
      }
    case actionTypes.GET_COURSES_SUCCESS:
      return {
        loading: false,
        courses: action.payload
      }
    case actionTypes.GET_COURSES_FAIL:
      return {
        loading: false,
        courses: [],
        error: action.payload
      }

    default:
      return state
  }
}

export const updateMyCourseReducer = (state = { registeredCourses: [] }, action) => {
  switch (action.type) {

    case actionTypes.UPDATE_MYCOURSE_REQUEST:
      return {
        mycourse_loading: true,
        registeredCourses: action.payload
      }
    case actionTypes.UPDATE_MYCOURSE_SUCCESS:
      return {
        mycourse_loading: false,
        registeredCourses: action.payload
      }
    case actionTypes.UPDATE_MYCOURSE_FAIL:
      return {
        mycourse_loading: false,
        registeredCourses: [],
        mycourse_error: action.payload
      }

    case actionTypes.STUDENT_LOGOUT_SUCCESS:
      return {
        mycourse_loading: false,
        registeredCourses: [],
      }

    default:
      return state
  }
}