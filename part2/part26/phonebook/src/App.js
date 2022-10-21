import { useState } from 'react'

const Person = (props) => {
  return (
    <>
      {props.name}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas'
    }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    // check if name is already added to persons
    const found = persons.some(person => person.name === newName)

    if (!found) {

      const nameObject = {
        name: newName
      }

      setPersons(persons.concat(nameObject))
      setNewName('')
    }
    else {
      alert(`${newName} is already on the list`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <p key={person.name}>
          < Person name={person.name} />
        </p>
      ))}
    </div>
  )
}

export default App