import * as actionTypes from '../constants/studentConstants'


export const getStudentReducer = (state = { profile: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_STUDENT_REQUEST:
      return {
        loading: true,
        profile: null
      }
    case actionTypes.GET_STUDENT_SUCCESS:
      return {
        loading: false,
        profile: action.payload
      }
    case actionTypes.GET_STUDENT_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case actionTypes.STUDENT_LOGOUT_SUCCESS:
      return {
        loading: false,
        profile: action.payload
      }
    case actionTypes.STUDENT_LOGOUT_FAIL:
      return {
        loading: false,
        profile: action.payload
      }
    default:
      return state
  }

}