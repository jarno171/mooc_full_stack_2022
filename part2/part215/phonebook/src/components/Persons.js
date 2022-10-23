import React from 'react'

const Person = (props) => {
    const contains = props.name.includes(props.searchCriteria)
  
    /* If name contains search criteria */
    if (contains) {
      return (
        <>
          {props.name} {props.number}
        </>
      )
    }
    else {
      return (
        <>
        </>
      )
    }
  }

const Persons = (props) => {
    return (
        <>
            {props.persons.map(person => (
                <p key={person.name}>
                < Person name={person.name} number={person.number} searchCriteria={props.searchCriteria} />
                </p>
            ))}
        </>
    )
}

export default Persons