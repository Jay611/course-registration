import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Reducers
import {
  getStudentReducer
} from './reducers/studentReducers'
import {
  getCoursesReducer,
  updateMyCourseReducer
} from './reducers/courseReducers'

const reducer = combineReducers({
  student: getStudentReducer,
  getCourses: getCoursesReducer,
  myCourses: updateMyCourseReducer
})

const middleware = [thunk]

// const profileFromLocalStorage = localStorage.getItem('profile') ?
//   JSON.parse(localStorage.getItem('profile')) : []


const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store