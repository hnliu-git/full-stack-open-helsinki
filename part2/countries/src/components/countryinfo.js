
const Country = ({country}) => {
    return (
        <>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h3>languages</h3>
            <ul>
                {Object.values(country.languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt='flag' />
        </> 
    )
}

const CountryName = ({country}) => (
    <p>{country.name.common}</p>
)

const CountryList = ({countries}) =>
    <>
        {countries.map(country =>
            <CountryName 
                key={country.name.common} 
                country={country} 
            />
        )}
    </>


const CountryInfo = ({filter, countries}) => {
    const filterCountries = countries.filter(country =>
            country.name.common.toLowerCase().includes(filter.toLowerCase())
        )
    
    console.log(filterCountries)

    if (filterCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (filterCountries.length === 1) {
        return <Country country={filterCountries[0]} />
    } else if (filterCountries.length <= 10) {
        return <CountryList countries={filterCountries} />
    }
}

export default CountryInfo