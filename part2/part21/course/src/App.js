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
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  
  const sumExercises = (course.parts).reduce((accum, item) => accum + item.exercises, 0)

  return (
    <>
      < Course course={course} />
      <p>total of {sumExercises} exercises</p>
    </>
  )
}

export default App