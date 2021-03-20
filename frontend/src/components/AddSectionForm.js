import './AddSectionForm.css'
import { useState } from 'react'
import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'

// Actions
import {
  getCourses as listCourses,
} from '../redux/actions/courseActions'

function AddSectionForm({ courseCode }) {
  axios.defaults.withCredentials = true

  const dispatch = useDispatch()

  const getCourses = useSelector(state => state.getCourses)
  const { courses } = getCourses

  const [section, setSection] = useState({
    'semester': '', 'sectionNumber': 0, 'dayOfWeek': 'Mon', 'startHour': 0, 'startMinute': 0, 'endHour': 0, 'endMinute': 0, 'professor': ''
  })

  const onChange = (e) => {
    e.persist();
    setSection({ ...section, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const selectedCourse = courses.filter(c => c.courseCode === courseCode)[0]
    const isExist = selectedCourse.sections.filter(s =>
      (s.semester === section.semester) && (s.sectionNumber === Number(section.sectionNumber)))
    if (isExist.length > 0) alert('This semester - section number already exists')
    else {
      const classHour = {
        dayOfWeek: section.dayOfWeek,
        startTime: {
          hour: section.startHour,
          minute: section.startMinute
        },
        endTime: {
          hour: section.endHour,
          minute: section.endMinute
        }
      }

      const newSection = {
        courseCode: courseCode,
        section: {
          sectionNumber: section.sectionNumber,
          semester: section.semester,
          classHour: classHour,
          professor: section.professor,
        }
      }

      axios.post('http://localhost:5000/api/courses/sections', newSection)
        .then(() => dispatch(listCourses()))
        .catch(err => alert(err.response.data.msg))
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="addsectionform">
        <div className="addsectionform-item">
          <label htmlFor="semester">Semester</label>
          <input type="text" name="semester" className="addsectionform-control" onChange={onChange} required placeholder="2021W" />
        </div>
        <div className="addsectionform-item">
          <label htmlFor="sectionNumber">Section Number</label>
          <input type="number" name="sectionNumber" className="addsectionform-control" onChange={onChange} required placeholder="max 3 digits" />
        </div>
        <div className="addsectionform-item">
          <label htmlFor="classHour">Class Hour</label>
          <div className="addsectionform-classhour">
            <select className="addsectionform-control dayofweek" name="dayOfWeek" value={section.dayOfWeek} onChange={onChange}>
              <option key="Mon">Mon</option>
              <option key="Tue">Tue</option>
              <option key="Wed">Wed</option>
              <option key="Thu">Thu</option>
              <option key="Fri">Fri</option>
              <option key="Sat">Sat</option>
              <option key="Sun">Sun</option>
            </select>
            <select className="addsectionform-control" name="startHour" value={section.startHour} onChange={onChange}>
              {Array.from(Array(24).keys()).map((x) => <option key={x + 1} value={x}>{x}</option>)}
            </select>:
        <select className="addsectionform-control" name="startMinute" value={section.startMinute} onChange={onChange}>
              {Array.from(Array(6).keys()).map((x) => <option key={x * 10} value={x * 10}>{x * 10}</option>)}
            </select>-
        <select className="addsectionform-control" name="endHour" value={section.endHour} onChange={onChange}>
              {Array.from(Array(24).keys()).map((x) => <option key={x} value={x}>{x}</option>)}
            </select>:
        <select className="addsectionform-control" name="endMinute" value={section.endMinute} onChange={onChange}>
              {Array.from(Array(6).keys()).map((x) => <option key={x * 10} value={x * 10}>{x * 10}</option>)}
            </select>
          </div>
        </div>
        <div className="addsectionform-item">
          <label htmlFor="professor">Professor</label>
          <input type="text" name="professor" className="addsectionform-control" onChange={onChange} required />
        </div>
        <div>
          <button className="addsectionform-button" type="submit">
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddSectionForm
