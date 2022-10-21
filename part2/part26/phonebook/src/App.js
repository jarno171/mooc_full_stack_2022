import { useState } from 'react'

const Person = (props) => {
  return (
    <>
      {props.name} {props.phoneNumber}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      phoneNumber: '040-1234567'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    // check if name is already added to persons
    const found = persons.some(person => person.name === newName)

    if (!found) {

      const nameObject = {
        name: newName,
        phoneNumber: newPhoneNumber
      }

      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewPhoneNumber('')
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
          number: < input 
            value={newPhoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <p key={person.name}>
          < Person name={person.name} phoneNumber={person.phoneNumber} />
        </p>
      ))}
    </div>
  )
}

export default App