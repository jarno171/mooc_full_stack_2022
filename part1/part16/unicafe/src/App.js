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

const Statetext = ({name, value}) => (
    <dt>
      {name} {value}
    </dt>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const average = (good + neutral + bad) === 0 ? 0 : (good - bad) / (good + neutral + bad)
  const positive = ((good + neutral + bad) === 0 ? 0 : (good) / (good + neutral + bad) ) * 100

  return (
    <div>
      < Header header={"give feedback"} />
      < Button text={"good"} handleClick={() => setGood(good + 1)} />
      < Button text={"neutral"} handleClick={() => setNeutral(neutral + 1)} />
      < Button text={"bad"} handleClick={() => setBad(bad + 1)}/>
      < Header header={"give feedback"} />

      <dl>
      < Statetext name={"good\n"} value={good} />
      < Statetext name={"neutral"} value={neutral} />
      < Statetext name={"bad"} value={bad} />
      < Statetext name={"all"} value={good + bad + neutral} />
      < Statetext name={"average"} value={average} />
      < Statetext name={"positive"} value={positive.toString() + " %"} />
      </dl>
    </div>
  )
}

export default App
