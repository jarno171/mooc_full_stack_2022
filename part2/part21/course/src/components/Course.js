import React from 'react'

const Header = (props) => (
    <h1>
      {props.text}
    </h1>
  )
  
  const Content = (props) => (
    <p>{props.name} {props.exercises}</p>
  )
  
  const Course = (props) => {
    const header = props.course.name
    const parts = props.course.parts
  
    return (
      <>
        < Header text={header} />
          {parts.map(part =>
            < Content key={part.id} name={part.name} exercises={part.exercises} />
         )}
         <p>total of {props.sumExercises} exercises </p>
      </>
    )
  }

export default Course