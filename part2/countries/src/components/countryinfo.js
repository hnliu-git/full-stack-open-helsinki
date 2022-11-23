import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState({}) 

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=${api_key}`)
            .then(response => {
                const data = response.data
                const theWeather = {
                    'temp': (data.main.temp - 273.15).toFixed(0),
                    'wind': data.wind.speed,
                    'icon': `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                    'desc': data.weather.description
                }
                setWeather(theWeather)
            })
    }, [capital])


    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>temperature {weather.temp} Celcius</p>
            <img src={weather.icon} alt={weather.desc} />
            <p>wind {weather.wind} m/s</p>
        </div>
    )

}


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
            <Weather capital={country.capital} />
        </> 
    )
}

const CountryName = ({country}) => {
    const [isShow, setShow] = useState(false)
    const btnShowHandler = () => setShow(!isShow)

    if (isShow){
        return (
            <>
                <p>
                    {country.name.common}
                    <button onClick={btnShowHandler}>
                        show
                    </button>
                </p>
                <Country country={country} />
            </>
        )
    } else {
        return (
            <p>
                {country.name.common}
                <button onClick={btnShowHandler}>
                    show
                </button>
            </p>
        )
        
    }
}



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

    if (filterCountries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (filterCountries.length === 1) {
        return <Country country={filterCountries[0]} />
    } else if (filterCountries.length <= 10) {
        return <CountryList countries={filterCountries} />
    }
}

export default CountryInfo