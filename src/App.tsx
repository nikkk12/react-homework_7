import axios from "axios"
import { useEffect, useState} from "react"
import {  Header } from "./components/Header"
import { SearchInput } from "./components/SearchInput"
import search from './assets/search.svg'
import { FilterBtn } from "./components/FilterBtn"
import { Countries } from "./components/Countries"
import { useNavigate } from "react-router-dom"

function App() {

  const [darkMode , setDarkMode] = useState<any>(false)
  const [show , setShow] = useState<any>(false)
  const [input , setInput] = useState<any>("")
  const [data , setData] = useState<any>()
  const navigate = useNavigate()
  const [suggestions , Setsuggestions] = useState<string[]>([])
  
  useEffect(() => {
    async function loadData() {
      try{
        const response = await axios.get(`https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,subregion,tld,currencies,languages,borders`)
        const result = response.data
        setData(result)
      }catch(error){
        console.log("ERROR : " , error)
      }
    }
    loadData()

  } , [])

  function countryName () {
   if(!data) return [];
   return data.map((item: { name: { common: string } }) => item.name.common.toLocaleLowerCase())
  }

 function handleClick () {

    const value = input.trim().toLocaleLowerCase()
    const names = countryName()

    if(names?.includes(value)){
      const query = encodeURIComponent(value)
      navigate(`/country?name=${query}`)
    } else {
      alert("Country not found")
    }
 }

 function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key === 'Enter') {
    const value = input.trim().toLowerCase();
    const names = countryName();

    if (names.includes(value)) {
      navigate(`/country?name=${encodeURIComponent(value)}`);
    } else {
      alert('Country not found');
    }
  }
}

 function regionName(): string[] {
  if (!Array.isArray(data)) return [];
  
  const regions = data
    .map((item: { region?: string }) => item.region)
    .filter((r): r is string => typeof r === 'string');

  const unique = Array.from(new Set(regions));
  unique.pop();
  return unique.sort();
}

function filterByContinent(continent: any) {
 navigate(`/continent?cont=${continent}` , {
  state : data
 })
}

function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
  const value = e.target.value;
  setInput(value);

  if (!value.trim()) {
    Setsuggestions([]);
    return;
  }

  const lowerValue = value.toLowerCase();

  const matches = data
    ?.map((item: { name: { common: string } }) => item.name.common)
    .filter((name: string) => name.toLowerCase().startsWith(lowerValue)) ?? [];

  Setsuggestions(matches);
}

  return (
    <div className={darkMode  ? "wrapper" : "light"}>
      <Header mode={() => {setDarkMode(!darkMode)}} />
      <SearchInput
      mode={() => {
       handleClick()
      }}
      keyDown={handleKeyDown}
      onChange={handleInputChange}
      value={input}
      className="search-inp" url={search} />
      {suggestions.length > 0 && (
  <div className="suggestion-box">
    {suggestions.map((name, idx) => (
      <div
        key={idx}
        className="suggestion-item"
        onClick={() => {
          setInput(name);
          Setsuggestions([]);
        }}
      >
        {name}
      </div>
    ))}
  </div>
)}
      <FilterBtn 
      onClick={() => {setShow(!show)}}
      clased={`hide-card ${show ? `active` : ''}`}
      className="filter-btn" >
      {(regionName() || []).map((item,index)  => (
        <span key={index}>
          <button
          onClick={() => {filterByContinent(item)}}
          type="button">
            {item}
          </button>
        </span>
      ))}
      </FilterBtn>
      <Countries className= "countries-box" />
    </div>
  )
}

export default App