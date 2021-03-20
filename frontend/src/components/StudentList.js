import './StudentList.css'
import { useState, useEffect } from 'react'
import axios from 'axios'


function Student({ students }) {
  axios.defaults.withCredentials = true

  const [isOpen, setIsOpen] = useState(false)
  const [courses, setCourses] = useState([])

  const [allStudents, setAllStudents] = useState([])

  useEffect(() => {
    if (students) {
      setAllStudents([...students])
    } else {
      axios.get('/api/students/allstudents')
        .then(res => setAllStudents([...res.data]))
        .catch(err => alert(err.response.data.msg))
    }
  }, [students])

  const onDoubleClickHandler = (studentId) => e => {
    e.preventDefault()
    setIsOpen(true)
    axios.get('http://localhost:5000/api/courses/mycourse/' + studentId)
      .then(({ data }) => {
        setCourses(data)
      })
      .catch(err => {
        // if (err.response.data.msg) alert(err.response.data.msg)
      })
  }

  const findSection = (course) => {
    return (course.sections.filter(x => x.sectionNumber === course.sectionNumber)[0])
  }

  return (
    <>
      <div className="students">
        <h2>Students</h2>
        <table className="students-table">
          <thead>
            <tr>
              <th>student Number</th>
              <th>program</th>
              <th>first Name</th>
              <th>last Name</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {allStudents.map(student => (
              <tr key={student._id} onDoubleClick={onDoubleClickHandler(student._id)}>
                <td>{student.studentNumber}</td>
                <td>{student.program}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen ? (
        <div className="modal-backdrop">
          <div className="modal-content-wrapper">
            <div className="modal-content">
              <div className="modal-header">
                <span>Courses</span>
                <button onClick={() => setIsOpen(false)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-body">
                {courses ? (
                  <table>
                    <thead>
                      <tr>
                        <th>course Code</th>
                        <th>course Name</th>
                        <th>semester</th>
                        <th>section Number</th>
                        <th>professor</th>
                      </tr>
                    </thead>
                    <tbody>
                    {courses.map(course => {
                      const section = findSection(course)
                      return (
                          <tr key={course._id}>
                            <td>{course.courseCode}</td>
                            <td>{course.courseName}</td>
                            <td>{section.semester}</td>
                            <td>Sec {course.sectionNumber.toLocaleString('en-US', {
                              minimumIntegerDigits: 3,
                              useGrouping: false
                            })}</td>
                            <td>{section.professor}</td>
                          </tr>
                      )
                    })}
                    </tbody>
                  </table>
                ) : (
                  <p>No course</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}

    </>
  )
}

export default Student
