import { useEffect, useState } from 'react'
import usePromise from 'react-use-promise';

import axios from 'axios'

const countryInfo = (countryToFind, countryData) => {
  // only take first = only row
  const countryDataForInfo = countryData.filter((country) => {
    return country.name.common === countryToFind
  })[0]

  return countryDataForInfo
}

const pullWeatherInfo = async (latitude, longtitude) => {

  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY

  const urlRoot = "https://api.openweathermap.org/data/2.5/weather?"

  const searchParams = new URLSearchParams()
  searchParams.append("lat", latitude)
  searchParams.append("lon", longtitude)
  searchParams.append("appid", apiKey)

  const url = urlRoot + searchParams.toString()

  return axios.get(url)
}

const Button = (props) => {
  return (
    <>
      < button onClick={() => props.handleCountryToShowInfoChange(props.countryForInfo)}>
        show
      </ button >
    </>
  )}

const pullCityWeather = async (countryForInfo, countryData) => {

  if (countryForInfo !== "") {

    // only take first = only row
    const countryDataForInfo = countryInfo(countryForInfo, countryData)

     // get weather data for location
    const locationLat = countryDataForInfo.latlng[0]
    const locationLong = countryDataForInfo.latlng[1]

    return pullWeatherInfo(locationLat, locationLong)
      .then(response => {
        const tempKelvin = response.data.main.temp
        const windSpeed = response.data.wind.speed
        const icon = response.data.weather[0].icon
        const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

        return {
          temp: tempKelvin - 273.15,
          wind: windSpeed,
          url: iconUrl
        }
      })
  } else {
    return { }
  }
}

const CountryInfo = ({countryForInfo, countryData}) => {

  /* Only draw if additional info country is set to be drawn */
  if (countryForInfo !== "") {

    // only take first = only row
    const countryDataForInfo = countryInfo(countryForInfo, countryData)

    return (
      <div>
        <p>{countryForInfo}</p>
        <p>capital: {countryDataForInfo.capital[0]}</p>
        <p>area: {countryDataForInfo.area}</p>
        <p>languages: {Object.keys(countryDataForInfo.languages).map(countryKey => {
          return (
            <li key={countryDataForInfo.languages[countryKey]}>
              {countryDataForInfo.languages[countryKey]}
            </li>
          )
        })}</p>
        <p>
          < img src={countryDataForInfo.flags.png} alt={countryForInfo} />
        </p>
      </div>
    )
  }
}

const Weather = ({weather, countryToShowInfo}) => {
  if ((weather) && (countryToShowInfo !== "")) {
    return (
      <>
        < img src={weather.url} alt={"Weather"} />
        <p>temperature: {weather.temp} celsius</p>
        <p>wind speed: {weather.wind} m/s</p>
      </>
    )
  }
}

const Filter = (props) => {

  const countriesFiltered = props.countries.filter((country) => {
    return country.includes(props.searchCriteria)
  })

  if (countriesFiltered.length <= 10) {
    return (
      <>
        {countriesFiltered.map(country => {
          return (
            <div key={country}>
              {country} < Button countryForInfo={country} countryData={props.countryData} handleCountryToShowInfoChange={props.handleCountryToShowInfoChange} />
            </div>
          )
        })}
      </>
    )
  } else {
    return (
      <p>
        Too many countries, specify another filter
      </p>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([ ])
  const [countryData, setCountryData] = useState({})
  const [searchCriteria, setSearchCriteria] = useState('')
  const [countryToShowInfo, setCountryToShowInfo] = useState('')

  const [weather, error] = usePromise(() => pullCityWeather(countryToShowInfo, countryData), [countryToShowInfo])

  const handleFilterChange = (event) => {
    setSearchCriteria(event.target.value)
    setCountryToShowInfo('')
  }

  const loadData = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const commonNameCountries = response.data.map(country => {
          return country.name.common
        })

        setCountries(commonNameCountries)
        setCountryData(response.data)
      })
  }

  const handleCountryToShowInfoChange = (countryName) => {
    setCountryToShowInfo(countryName)
  }

  useEffect(loadData, [])

  return (
    <div>
      <h2>find countries</h2>
      <div>
        search countries: < input onChange={handleFilterChange} />
      </div>

      < Filter searchCriteria={searchCriteria} countries={countries} countryData={countryData} handleCountryToShowInfoChange={handleCountryToShowInfoChange} />

      < CountryInfo countryForInfo={countryToShowInfo} countryData={countryData} />
      < Weather weather={weather} countryToShowInfo={countryToShowInfo} />
      {error}
    </div>
  )
}

export default App