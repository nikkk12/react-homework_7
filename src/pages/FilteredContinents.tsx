import { useNavigate, useSearchParams } from "react-router"
import { BackBtn } from "../components/BackBtn"
import { Header } from "../components/Header"
import { useLocation } from "react-router"
import { type ReactElement, type JSXElementConstructor, type ReactNode, type ReactPortal, type Key, useState } from "react"
import { Continents } from "../components/Continents"


export const FilteredContinents = () => {

    const navigate = useNavigate()
    const[darkmode , setDarkMode] = useState<any>(true)
    const location = useLocation().state
    const [params] = useSearchParams()
    const searchedParams = params.get("cont")
    console.log(searchedParams)
   
    

    function goBack () {
        navigate("/")
    }

    function moreInfo (country: any) {
        navigate(`/country?name=${country}`)
    }

    function filteredByContinetsName () : any {
        if(!location) return [];
        return location.filter((continent: { region: string | null }) => continent.region === searchedParams)
    }

  return (
    <div className={darkmode ? "light" : "continets-dark-mode"}>
        <Header
        mode={() => {setDarkMode(!darkmode)}}
        />
        <BackBtn
         mode={goBack}
         className="back-btn"
         />
         <Continents className="continents-box">

       {filteredByContinetsName() ? (
        filteredByContinetsName().map((item: { 
            
            flags : {svg : string , alt : string},
            name: { common: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined } },_index: Key | null | undefined) => (   
            <div key={_index} className="continents-container">
                <img src={item.flags.svg} alt={item.flags.alt} />
                <button type="button"
                onClick={() => {moreInfo(item.name.common)}}
                >{item.name.common}
                    <span> More...</span>
                </button>
            </div>
            
        ))
       ):
       <p>country not found</p>
       }
         </Continents>
    </div>
  )
}
