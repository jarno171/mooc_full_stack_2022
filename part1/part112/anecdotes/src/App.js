import { useState } from 'react'

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 * 
 * https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 */
 function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Search for the maximum in dictionary-object */
function getMaxFromObject(object) {
  let currentMax = 0
  let currentIndex = 0

  for (const [key, value] of Object.entries(object)) {
    if (value > currentMax) {
      currentMax = value
      currentIndex = key
    }
  }

  return currentIndex
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick} >
      {props.label}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  // could be dynamic
  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 })

  const handleClickNext = () => {
    const randomNumber = getRandomInt(0, anecdotes.length - 1)
    setSelected(randomNumber)
  }

  const handleClickVote = () => {
    const updatedVotes = { ...votes }
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }

  return (
    <div>
      {/* Still uses random anecdote though, could be just looping to next? this works for the excercise */}
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>this anecdote has {votes[selected]} votes</p>
      <p>< Button label={"vote"} handleClick={handleClickVote} /> </p>
      <p>< Button label={"Random anecdote"} handleClick={handleClickNext} /></p>
      <h1>anecdote with most votes</h1>
      <p>{anecdotes[getMaxFromObject(votes)]}</p>
    </div>
  )
}

export default App