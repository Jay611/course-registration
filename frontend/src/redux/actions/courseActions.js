import * as actionTypes from '../constants/courseConstants'
import axios from 'axios'

// Get all courses
export const getCourses = () => (dispatch) => {
  axios.defaults.withCredentials = true
  
  dispatch({ type: actionTypes.GET_COURSES_REQUEST })

  axios.get('api/courses/')
  .then(({data}) => {

    dispatch({
      type: actionTypes.GET_COURSES_SUCCESS,
      payload: data
    })
  })
  .catch(err=>{
    if (err.response.data.msg) {
      alert(err.response.data.msg);
      window.location.href='/login'
    } else{
      dispatch({
        type: actionTypes.GET_COURSES_FAIL,
        payload: err.response.data.msg
      })
    }
  })
}

export const updateMyCourse = (studentId) => (dispatch) => {
  axios.defaults.withCredentials = true

  dispatch({ type: actionTypes.UPDATE_MYCOURSE_REQUEST })

  axios.get('http://localhost:5000/api/courses/mycourse/' + studentId)
  .then(({data}) => {
    dispatch({
      type: actionTypes.UPDATE_MYCOURSE_SUCCESS,
      payload: data
    })
  })
  .catch(err => {
    if (err.response.data.msg) {
      alert(err.response.data.msg);
      window.location.href='/login'
    } else{
      dispatch({
        type: actionTypes.UPDATE_MYCOURSE_FAIL,
        payload: err.response.data.msg
      })
    }
  })
}
