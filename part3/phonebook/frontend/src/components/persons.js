import personService from '../services/persons'


const Person = ({name, number}) =>
    <>
        <p>{name} {number}</p>
    </>

const Persons = ({persons, setPersons, filterName}) => {
    const filterPerson = persons.filter(person => 
        person.name.toLowerCase().includes(filterName.toLowerCase())
    )

    const deletionOf = person => {
        return () => {
            if (window.confirm(`Delete ${person.name} ?`)) {
                personService
                ._delete(person.id)
                .then(response => {
                    const newPersons = persons.filter(item => person.id !== item.id )
                    setPersons(newPersons)
                })
            }
        }
    }

    return (
        <>
            {filterPerson.map(person =>
                <div key={person.id}>
                    <Person 
                        name={person.name}
                        number={person.number}
                    />
                    <button onClick={deletionOf(person)}>
                        delete
                    </button>
                </div>
            )}
        </>
    )
    
}

export default Persons