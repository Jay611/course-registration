import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Reducers
import {
  getStudentReducer
} from './reducers/studentReducers'
import {
  getCoursesReducer,
  updateCourseReducer
} from './reducers/courseReducers'

const reducer = combineReducers({
  student: getStudentReducer,
  getCourses: getCoursesReducer,
  myCourses: updateCourseReducer
})

const middleware = [thunk]

// const profileFromLocalStorage = localStorage.getItem('profile') ?
//   JSON.parse(localStorage.getItem('profile')) : []

const INITIAL_STATE = {
  student: {
    // profile: profileFromLocalStorage
  },
  getCourses:{
    courses: []
  }
}

const store = createStore(
  reducer,
  // INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store