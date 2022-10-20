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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      {courses.map(course => {
          const sumExercises = (course.parts).reduce((accum, item) => accum + item.exercises, 0)
          return (
            <>
              < Course course={course} />
              <p>total of {sumExercises} exercises</p>
            </>
          )
        }
      )}
    </>
  )
}

export default App