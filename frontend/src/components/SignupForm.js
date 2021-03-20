import './SignupForm.css'
import { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

function SignupForm(props) {
  axios.defaults.withCredentials = true

  const [user, setUser] = useState({
    _id: '', studentNumber: 0, firstName: '', lastName: '', password: '', address: '', city: '', phone: '', email: '', program: ''
  })

  const onChange = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const { _id, ...newStudent } = user

    axios.post('api/students/register', newStudent)
      .then(() => props.history.push('/login'))
      .catch(err => {
        if (err.response.data.msg) alert(err.response.data.msg);
      })

    
  }

  return (
    <div className="signup-container" >
      <form className="signup-form" onSubmit={onSubmit}>
        <div className="signup-item">
          <label htmlFor="studentNumber">Student Number</label>
          <input type="number" name="studentNumber" className="form-control" onChange={onChange} required />
        </div>
        <div className="signup-item">
          <label htmlFor="firstName">First name</label>
          <input type="text" name="firstName" className="form-control" onChange={onChange} required />
        </div>
        <div className="signup-item">
          <label htmlFor="lastName">Last name</label>
          <input type="text" name="lastName" className="form-control" onChange={onChange} required />
        </div>
        <div className="signup-item">
          <label htmlFor="address">Address</label>
          <input type="text" name="address" className="form-control" onChange={onChange} required />
        </div>
        <div className="signup-item">
          <label htmlFor="city">City</label>
          <input type="text" name="city" className="form-control" onChange={onChange} required />
        </div>
        <div className="signup-item">
          <label htmlFor="phone">Phone</label>
          <input type="text" name="phone" className="form-control" onChange={onChange} required />
        </div>
        <div className="signup-item">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" className="form-control" onChange={onChange} required />
        </div>
        <div className="signup-item">
          <label htmlFor="program">Program</label>
          <input type="text" name="program" className="form-control" onChange={onChange} required />
        </div>
        <div className="signup-item">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" className="form-control" onChange={onChange} required />
        </div>
        <div>
          <button type="submit" className="signup-button">Sign Up</button>
        </div>
        <div>
          <small>
            Already have an account? &nbsp;
            <Link to='/login'>Log In</Link>
          </small>
        </div>
      </form>
    </div>
  )
}

export default withRouter(SignupForm)
