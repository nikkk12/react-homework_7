import axios from "axios"
import { useEffect, useState, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Header } from "../components/Header"
import { BackBtn } from "../components/BackBtn"
import { CountryInfoCompo } from "./CountryInfoCompo"

export const CountryInfo = () => {

  const [searchParams] = useSearchParams()
  const name = searchParams.get("name")
  const [data , setData] = useState<any[]>([])
  const [darkMode , setDarkMode] = useState(false)
  const [borders , setBorders] = useState<any[]>([])

  const navigate = useNavigate()
  function goBack () {
    navigate("/")
  }

  useEffect(() => {
    async function loadData () {
        try{
            const response = await axios.get(`https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,subregion,tld,currencies,languages,borders`)
            const result = response.data
            setData(result)
        }catch (error){
            console.log("ERROR : " , error)
        }
    }
    loadData()
  } , [])

  useEffect(() => {
    async function loadData () {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/all?fields=cca3,name,borders`)
        const result = response.data
        setBorders(result)
      }catch(error){
        console.log("ERROR : " , error)
      }
    }
    loadData()
  } , [])

  console.log(borders)

  function countries () {
  if(!data) return [];
  return data.filter(country => country.name.common.toLowerCase() === name?.toLocaleLowerCase())
  }

  // function borderCountries() {
  //   if(!borders) return [];
  //   const res =  borders.find(border => border.name.common.toLocaleLowerCase() === name)
  //  if(!res) return [];
  //  return res.borders.slice(0,3)
  // }

function borderCountries () {
    if(!borders) return [];

    const country = borders.find(
        (c) => c.name.common.toLowerCase() === name?.toLocaleLowerCase()
    );
    if(!country || !country.borders) return [];
    
    const borderNames = country.borders.map((borderCode: any) => {
      console.log(borderCode)
        const borderCountry = borders.find((c) => c.cca3 === borderCode)
        return borderCountry ? borderCountry.name.common : borderCode
    })

    return borderNames.slice(0,3)
}

 const borderedCountries = borderCountries()
 console.log(borderedCountries)
 
  return (
    <div className={darkMode ? "dark" : "light-mode"}>
        <Header 
        mode={() => {setDarkMode(!darkMode)}}
        />
        <BackBtn 
        mode={goBack}
        className="back-btn"
        />
     {countries() ? (
        countries().map((item , index) => (
            <div key={index}>
               <CountryInfoCompo
               className="sec-info-page"
               url={item.flags.svg}
               alt={item.flags.alt}
               country={item.name.common}
               population={item.population}
               region={item.region}
               capital={item.capital}
               nativeName={
                item.name.nativeName
                  ? item.name.nativeName[Object.keys(item.name.nativeName)[0]].official
                  : "N/A"
              }
              subRegion={item.subregion}
              topLevelDomain={item.tld[0]}
              currencies={
                item.currencies ? 
                item.currencies[Object.keys(item.currencies)[0]].name
                : "N/A"
              }
              languages={
                item.languages 
                ? item.languages[Object.keys(item.languages)[0]]
                : "N/A"
              }
               />
               <div className="footer">
                 {borderedCountries.map((item: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined,index: Key | null | undefined) => (
                  <button key={index}>{item}</button>
                 ))}
               </div>
            </div>
        ))
     ) : 
     <p>Country not found</p>
     }
    </div>
  )
}