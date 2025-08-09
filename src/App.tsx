import axios from "axios"
import { useEffect, useState, type SetStateAction } from "react"
import {  Header } from "./components/Header"
import { SearchInput } from "./components/SearchInput"
import search from './assets/search.svg'
import { FilterBtn } from "./components/FilterBtn"
import { Countries } from "./components/Countries"
import { useNavigate } from "react-router-dom"

function App() {

  const [darkMode , setDarkMode] = useState(false)
  const [show , setShow] = useState(false)
  const [input , setInput] = useState("")
  const [data , setData] = useState()

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
    if(data){
      return data.map((item: { name: { common: string } }) => item.name.common.toLocaleLowerCase())
    }
  }

 const navigate = useNavigate()
 
 function handleClick () {
  if(countryName().includes(input.trim())){
    const query = encodeURIComponent(input.trim().toLocaleLowerCase())
    navigate(`/country?name=${query}`)
  }else {
    alert("Country not found")
  }
 }

 function handleKeyDown (e: { key: string }) {
 if(e.key === 'Enter'){
  const nameList = countryName()

  if(nameList.includes(input.trim().toLocaleLowerCase())){
    const query = encodeURIComponent(input.trim().toLocaleLowerCase())
    navigate(`/country?name=${query}` , {
      state : data
    })
  }else {
    alert('Country not found')
  }
 }
 }

  return (
    <div className={darkMode  ? "wrapper" : "light"}>
      <Header mode={() => {setDarkMode(!darkMode)}} />
      <SearchInput
      mode={() => {
       handleClick()
      }}
      keyDown={handleKeyDown}
      onChange={(e: { target: { value: SetStateAction<string> } }) => {return setInput(e.target.value)}}
      value={input}
      className="search-inp" url={search} />
      <FilterBtn 
      onClick={() => {setShow(!show)}}
      clased={`hide-card ${show ? `active` : ''}`}
      className="filter-btn" />
      <Countries className="countries-box" />
    </div>
  )
}

export default App