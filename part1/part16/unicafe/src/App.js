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

const Statistics = ({good, neutral, bad}) => {

  if (good + neutral + bad === 0) {
    return (
      <>
        No feedback given
      </>
    )
  }
  else {
    const average = (good - bad) / (good + neutral + bad)
    const positive = (good) / (good + neutral + bad) * 100
  
    return (
      <dl>
        < Statetext name={"good\n"} value={good} />
        < Statetext name={"neutral"} value={neutral} />
        < Statetext name={"bad"} value={bad} />
        < Statetext name={"all"} value={good + bad + neutral} />
        < Statetext name={"average"} value={average} />
        < Statetext name={"positive"} value={positive.toString() + " %"} />
      </dl>
    )
  }

  
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      < Header header={"give feedback"} />
      < Button text={"good"} handleClick={() => setGood(good + 1)} />
      < Button text={"neutral"} handleClick={() => setNeutral(neutral + 1)} />
      < Button text={"bad"} handleClick={() => setBad(bad + 1)}/>
      < Header header={"statistics"} />

      < Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
