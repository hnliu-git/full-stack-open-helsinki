
const Person = ({name, number}) =>
    <>
        <p>{name} {number}</p>
    </>

const Persons = ({persons, filterName}) => {
    const filterPerson = persons.filter(person => 
        person.name.toLowerCase().includes(filterName.toLowerCase())
    )

    return (
        <>
            {filterPerson.map(person =>
                <Person 
                    key={person.id}
                    name={person.name}
                    number={person.number}
                />    
            )}
        </>
    )
    
}

export default Persons