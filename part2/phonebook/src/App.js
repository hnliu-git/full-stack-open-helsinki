import { useEffect, useState } from 'react'
import personService from './services/persons'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const isExist = persons.reduce((pre, cur) =>
      pre || cur.name === newName, false
    )

    if (isExist) {
      alert(`${newName} is already added to phonebook`)
    } else {

      const personObj = {
        name: newName,
        number: newNumber,
        // id: persons.length + 1
      }

      personService
      .create(personObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filterName={filterName}
        onChange={(event) => setFilterName(event.target.value)}
      />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        nameHandler={(event) => setNewName(event.target.value)}
        newNumber={newNumber}
        numberHandler={(event) => setNewNumber(event.target.value)}
        addHandler={addPerson}
      />
      <h2>Numbers</h2>

      <Persons 
        persons={persons}
        setPersons={setPersons} 
        filterName={filterName}
      />
      
   </div>
  )
}

export default App