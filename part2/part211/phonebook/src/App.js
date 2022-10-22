import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([ ])

  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchCriteria, setSearchCriteria] = useState('')

  const updateData = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(updateData, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setSearchCriteria(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    // check if name is already added to persons
    const found = persons.some(person => person.name === newName)

    if (!found) {

      const nameObject = {
        name: newName,
        phoneNumber: newPhoneNumber,
        id: Object.keys(persons).length + 1
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

      < Filter filterChange={handleFilterChange} />

      <h1>add a new</h1>

      < PersonForm addNameEvent={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhoneNumber={newPhoneNumber}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />

      <h2>Numbers</h2>

      < Persons persons={persons} searchCriteria={searchCriteria}/>
    </div>
  )
}

export default App