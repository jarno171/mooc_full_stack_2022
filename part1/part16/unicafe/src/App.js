import { useState } from 'react'

const Header = ({header}) => {
  return (
    <h1>{header}</h1>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const header = "give feedback"

  return (
    <div>
      < Header header={header} />
      < Button text={"good"} handleClick={() => setGood(good + 1)} />
      < Button text={"neutral"} handleClick={() => setNeutral(neutral + 1)} />
      < Button text={"bad"} handleClick={() => setBad(bad + 1)}/>
    </div>
  )
}

export default App
