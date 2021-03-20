import './LoginForm.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

// Actions
import { getStudent } from '../redux/actions/studentActions'

function LoginForm(props) {
  axios.defaults.withCredentials = true

  const dispatch = useDispatch()

  const [loginInfo, setLoginInfo] = useState({ studentNumber: 0, password: '' })

  const onChange = (e) => {
    e.persist()
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const student = {
      studentNumber: loginInfo.studentNumber,
      password: loginInfo.password,
    }

    axios.post('api/students/login', student)
      .then(() => {
        dispatch(getStudent())
        props.history.push('/')
      } )
      .catch(err => {
        if(err.response.data.msg) alert(err.response.data.msg);
      })
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmit}>
        <div className="login-item">
          <label htmlFor="studentNumber">Student Number</label>
          <input type="number" name="studentNumber" className="form-control" onChange={onChange} required />
        </div>
        <div className="login-item">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" className="form-control" onChange={onChange} required />
        </div>
        <div className="">
          <button type="submit" className="login-button">Log In</button>
        </div>
        <div>
          <small>
            Don't have an account? &nbsp;
              <Link to='/signup'>Sign Up</Link>
          </small>
        </div>
      </form>
    </div>
  )
}

export default withRouter(LoginForm)
