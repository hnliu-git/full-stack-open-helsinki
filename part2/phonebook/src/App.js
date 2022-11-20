import { useState } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const isExist = persons.reduce((pre, cur) =>
      pre || cur.name === newName, false
    )

    if (isExist) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const copy = persons.concat({
        name: newName,
        number: newNumber
      })
      setPersons(copy)
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

      <Persons persons={persons} filterName={filterName}/>
      
   </div>
  )
}

export default App