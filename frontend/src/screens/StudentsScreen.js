import './StudentsScreen.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

// Components
import StudentList from '../components/StudentList'

function StudentsScreen(props) {
  const dispatch = useDispatch()
  
  useEffect(() => {
    // dispatch(getStudent())
  }, [dispatch])

  return (
    <div>
      <StudentList students={props.location.state}/>
    </div>
  )
}

export default StudentsScreen
