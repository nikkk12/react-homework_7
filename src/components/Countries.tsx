import { useEffect, useState } from "react"
import { CountriesCard } from "./CountriesCard"
import axios from "axios"
import { useNavigate } from "react-router";


interface Countries {
  className ? : string
}

interface Country {
  name: {
    common: string;
  };
  flags: {
    svg: string;
    alt: string;
  };
  population: any;
  region: string;
  capital: string;
}

export const Countries = ({className} : Countries) => {

  const [data , setData] = useState<Country[] | null> (null)  
  const navigate = useNavigate()

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
  
 function getSelectedCountries () : Country[] {
    if(!data) return[];
    return selectedCountries.map(name => 
        data.find((country: { name: { common: string } }) => country.name.common === name )
    )
    .filter((country): country is Country => country !== undefined)
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

  function handleClickCountriesInfo (countryName : any) {
    navigate(`/country?name=${countryName}`)
  }

  function NumberDisplay( number: number | bigint ) {
    const formatted = new Intl.NumberFormat('en-US').format(number);
    return formatted
  }

  return (
    <div className={className}>
       {data && (
        getSelectedCountries().map((country) => (
            <CountriesCard
            onClick={() => {handleClickCountriesInfo(country.name.common)}}
            key={country.name.common}
            url={country.flags.svg}
            alt={country.flags.alt}
            population={NumberDisplay(country.population)}
            region={country.region}
            capital={country.capital}
            country={country.name.common}
            />
        ))
       )}
    </div>
  )
}