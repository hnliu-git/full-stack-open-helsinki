import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from './components/searchbar'
import CountryInfo from './components/countryinfo'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response =>
        setCountries(response.data)
      )
  }, [])

  const filterHandler = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <SearchBar filter={filter} filterHandler={filterHandler}/>
      <CountryInfo filter={filter} countries={countries}/>
    </div>
  )
}

export default App