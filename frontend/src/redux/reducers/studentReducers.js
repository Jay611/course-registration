import * as actionTypes from '../constants/studentConstants'


export const getStudentReducer = (state = { profile: null }, action) => {
  switch (action.type) {
    case actionTypes.GET_STUDENT_REQUEST:
      return {
        profile_loading: true,
        profile: null
      }
    case actionTypes.GET_STUDENT_SUCCESS:
      return {
        profile_loading: false,
        profile: action.payload
      }
    case actionTypes.GET_STUDENT_FAIL:
      return {
        profile_loading: false,
        error: action.payload
      }
    case actionTypes.STUDENT_LOGOUT_SUCCESS:
      return {
        profile_loading: false,
        profile: action.payload
      }
    case actionTypes.STUDENT_LOGOUT_FAIL:
      return {
        profile_loading: false,
        profile: action.payload
      }
    default:
      return state
  }

}