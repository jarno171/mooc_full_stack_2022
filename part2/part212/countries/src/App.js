import { useEffect, useState } from 'react'

import axios from 'axios'

const Filter = (props) => {

  const countriesFiltered = props.countries.filter((country) => {
    return country.includes(props.searchCriteria)
  })

  if (countriesFiltered.length === 1) {
    const countryForInfo = countriesFiltered[0]
    // only take first = only row
    const countryDataForInfo = props.countryData.filter((country) => {
      return country.name.common === countryForInfo
    })[0]

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
        < img src={countryDataForInfo.flags.png} />
      </p>
      </div>
    )
  }

  if (countriesFiltered.length <= 10) {
    return (
      <>
      {countriesFiltered.map(country => {
        return (
          <p key={country}>
            {country}
          </p>
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

  const handleFilterChange = (event) => {
    setSearchCriteria(event.target.value)
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

  useEffect(loadData, [])

  return (
    <div>
      <h2>find countries</h2>
      <div>
      search countries: < input onChange={handleFilterChange} />
      </div>

      < Filter searchCriteria={searchCriteria} countries={countries} countryData={countryData} />
    </div>
  )
}

export default App