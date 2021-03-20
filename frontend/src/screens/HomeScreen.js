import './HomeScreen.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

// Actions
import { getStudent } from '../redux/actions/studentActions'

function HomeScreen() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getStudent())
  }, [dispatch])
  
  return (
    <div className="homescreen">
      HomeScreen
    </div>
  )
}

export default HomeScreen
