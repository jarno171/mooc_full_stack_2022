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

const Buttons = (props) => {
  
  const good = props["hooks"]["good"][0]
  const setGood = props["hooks"]["good"][1]
  const neutral = props["hooks"]["neutral"][0]
  const setNeutral = props["hooks"]["neutral"][1]
  const bad = props["hooks"]["bad"][0]
  const setBad = props["hooks"]["bad"][1]

  return (
    <>
      < Button text={"good"} handleClick={() => setGood(good + 1)} />
      < Button text={"neutral"} handleClick={() => setNeutral(neutral + 1)} />
      < Button text={"bad"} handleClick={() => setBad(bad + 1)}/>
  </>
  )
}

// Statetext basically alreadyd did the same thing as StatisticsLine, but
// I made this component too just to be sure, hopefully I didn't misunderstand
const StatisticsLine = ({name, value}) => (
  <tr>
    <td>
      {name}
    </td>
    <td>
      {value}
    </td>
  </tr>
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
      <table>
        <tbody>
          < StatisticsLine name={"good\n"} value={good} />
          < StatisticsLine name={"neutral"} value={neutral} />
          < StatisticsLine name={"bad"} value={bad} />
          < StatisticsLine name={"all"} value={good + bad + neutral} />
          < StatisticsLine name={"average"} value={average} />
          < StatisticsLine name={"positive"} value={positive.toString() + " %"} />
        </tbody>
      </table>
    )
  }

  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const hooks = {
    good: [good, setGood],
    neutral: [neutral, setNeutral],
    bad: [bad, setBad]
  }

  return (
    <div>
        < Header header={"give feedback"} />
        < Buttons hooks={hooks} />
        < Header header={"statistics"} />

      < Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
