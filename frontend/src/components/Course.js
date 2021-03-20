import { useState } from 'react'
import './Course.css'
import Section from './Section'

// components
import AddSectionForm from '../components/AddSectionForm'


function Course({ course, sectionButtonType, addSectionFormEnable = false }) {
  const [expand, setExpand] = useState(false)

  const expandBtnHandler = () => {
    setExpand(!expand)
  }

  return (
    <>
      <div className={expand ? "course course-expand" : "course"}>
        <p className="courseCode">{course.courseCode}</p>
        <p className="courseName">{course.courseName}</p>

        <button className="course-expandBtn" onClick={expandBtnHandler}>
          <i className={expand ? "fas fa-chevron-right" : "fas fa-chevron-down"}></i>
        </button>

      </div>
      <div className={expand ? "sections expand" : "sections"}>
        {addSectionFormEnable ? (
          <AddSectionForm courseCode={course.courseCode} />
        ) : (
          <></>
        )}
        {course.sections.map((section) => (
          <Section
            key={`${course.courseCode}-${section.semester}-${section.sectionNumber}`}
            _id={course._id}
            courseCode={course.courseCode}
            courseName={course.courseName}
            section={section}
            sectionButtonType={sectionButtonType}
          />
        ))}
      </div>

    </>
  )
}

export default Course
