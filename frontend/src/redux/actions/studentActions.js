import * as actionTypes from '../constants/studentConstants'
import axios from 'axios'

export const getStudent = () => (dispatch, getState) => {
  axios.defaults.withCredentials = true

  axios.get('http://localhost:5000/api/students/studentinfo')
  .then(({data}) => {
    dispatch({
      type: actionTypes.GET_STUDENT_SUCCESS,
      payload: data
    })
  })
  .catch(err => {
    if (err.response.data.msg) {
      alert(err.response.data.msg);
    } else{
      dispatch({
        type: actionTypes.GET_STUDENT_FAIL,
        payload: err.response.data.msg
      })
    }
  })
}

export const logout = () => (dispatch) => {
  axios.defaults.withCredentials = true

  dispatch({ type: actionTypes.STUDENT_LOGOUT_REQUEST })

  axios.get('http://localhost:5000/api/students/logout')
    .then(() => {
      dispatch({
        type: actionTypes.STUDENT_LOGOUT_SUCCESS,
        payload: null
      })
    })
    .catch(err => {
      if (err.response.data.msg) {
        alert(err.response.data.msg);
      } else {
        dispatch({
          type: actionTypes.STUDENT_LOGOUT_FAIL,
          payload: err.response.data.msg
        })
      }
    })
}