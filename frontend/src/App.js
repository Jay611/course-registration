import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


// Screens
import HomeScreen from './screens/HomeScreen'
import CoursesScreen from './screens/CoursesScreen'
import StudentsScreen from './screens/StudentsScreen'
import RegistrationScreen from './screens/RegistrationScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'

// Components
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Switch>
          <Route path='/' exact component={HomeScreen} />
          <Route path='/courses' exact component={CoursesScreen} />
          <Route path='/students' exact component={StudentsScreen} />
          <Route path='/registration' exact component={RegistrationScreen} />
          <Route path='/login' exact component={LoginScreen} />
          <Route path='/signup' exact component={SignupScreen} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
