import { useEffect, useState } from "react"
import { CountriesCard } from "./CountriesCard"
import axios from "axios"


export const Countries = ({className}) => {

  const [data , setData] = useState(null)  

  const selectedCountries = 
[
    "Germany" , 
    "United States" ,
    "Brazil" ,
    "Iceland",
    "Afghanistan" ,
    "Åland Islands" ,
    "Albania" ,
    "Algeria"
]
  
 function getSelectedCountries () {
    if(!data) return[];
    return selectedCountries.map(name => 
        data.find(country => country.name.common === name)
    )
 }

  useEffect(() => {
    async function loadData () {
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,subregion,tld,currencies,languages,borders`)
            const result = response.data
            setData(result) 
        }catch(error){
            console.log("ERROR : " ,error)
        }
    }
    loadData()
  } , [])

  return (
    <div className={className}>
       {data && (
        getSelectedCountries().map((country) => (
            <CountriesCard
            key={country.name.common}
            url={country.flags.svg}
            alt={country.flags.alt}
            population={country.population}
            region={country.region}
            capital={country.capital}
            country={country.name.common}
            />
        ))
       )}
    </div>
  )
}