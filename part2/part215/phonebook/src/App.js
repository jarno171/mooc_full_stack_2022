import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import ErrorBar from './components/ErrorBar'

import PersonService from './components/PersonService'

const App = () => {
  const [persons, setPersons] = useState([ ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchCriteria, setSearchCriteria] = useState('')
  const [updateMessage, setUpdateMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const updateUiData = () => {
    PersonService.getAll()
      .then (response => {
        setPersons(response)
      })
  }

  useEffect(updateUiData, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setSearchCriteria(event.target.value)
  }

  const updateNotification = (message) => {
    setUpdateMessage(message)
    setTimeout(() => setUpdateMessage(""), 5000)
  }

  const removePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)

    const toDelete = window.confirm(`Do you really want to delete ${personToDelete.name}?`)

    if (toDelete) {
    /* Then from backend */
    PersonService.remove(id)
      .then(response => {
        /* Remove from React state */
        removeName(id)
      })
    }
  }

  const addName = (event) => {
    event.preventDefault()

    // check if name is already added to persons
    const found = persons.some(person => person.name === newName)

    if (!found) {

      const newPersonId = Object.keys(persons).length + 1

      const nameObject = {
        name: newName,
        number: newPhoneNumber,
        id: newPersonId
      }

      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewPhoneNumber('')

      // add new person to backend
      PersonService.create(nameObject)

      updateNotification(`Added new person ${newName}`)
    }
    /* Update phonenumber */
    else {
      const oldPerson = persons.find(person => person.name === newName)

      const toUpdate = window.confirm(`${oldPerson.name} is already added on the list, replace the phone number with a new one?`)

      if (toUpdate) {

        const nameObject = {
          name: oldPerson.name,
          number: newPhoneNumber,
          id: oldPerson.id
        }

        /* First update in backend, then in frontend */
        PersonService.update(oldPerson.id, nameObject)
          .then(response => {
            /* Now update frontend */
            const oldPersonIndex = persons.findIndex(person => person.name === newName)

            /* This wouldnt work with object-references! */
            const updatedArray = [ ...persons ]
            updatedArray[oldPersonIndex]["number"] = newPhoneNumber

            setPersons(updatedArray)
            setNewName('')
            setNewPhoneNumber('')
            updateNotification(`Updated phone number of ${newName}`)
          })
          .catch(error => {
            setErrorMessage(`Person '${oldPerson.name}' was already removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.name !== newName))
          })
      }
    }
  }

  const removeName = (id) => {
    const removed = persons.filter(person => person.id !== id)

    setPersons(removed)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      < Notification message={updateMessage} />
      < ErrorBar message={errorMessage} />

      < Filter filterChange={handleFilterChange} />

      <h1>add a new</h1>

      < PersonForm addNameEvent={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhoneNumber={newPhoneNumber}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />

      <h2>Numbers</h2>

      < Persons persons={persons} searchCriteria={searchCriteria} removePersonFunction={(id) => removePerson(id)}/>
    </div>
  )
}

export default App