import './LoginScreen.css'
import { withRouter } from 'react-router-dom'

// Components
import LoginForm from '../components/LoginForm'

function LoginScreen() {
  return (
    <div className="loginScreen">
      <LoginForm />
    </div>
  )
}

export default withRouter(LoginScreen)
