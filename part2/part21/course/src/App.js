const Header = (props) => (
  <h1>
    {props.text}
  </h1>
)

const Content = (props) => (
  <li>
    {props.name} {props.exercises}
  </li>
)

const Course = (props) => {
  const header = props.course.name
  const parts = props.course.parts

  return (
    <>
      < Header text={header} />
      <ul>
        {parts.map(part =>
          < Content key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </ul>
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

  return <Course course={course} />
}

export default App