import styled from "styled-components"

interface CountriesCard {
    url ? : string
    alt ? : string
    country ?: string
    population : any
    region ?: string
    capital?: string
    className?: string
    nativeName?: string
    subRegion?: string 
    topLevelDomain?: string
    currencies ?: string
    languages?: string  
    borderCountries? : string
    onClick? :  () => void
}

export const CountriesCard = ({
    url,
    alt,
    country,
    population,
    region,
    capital,
    className,
    onClick
} : CountriesCard) => {
  return (
    <div className={className} >
        <img src={url} alt={alt} />
        <Button onClick={onClick}>{country}</Button>
        <div>
            <p><span>Population: </span> {population}</p>
            <p><span>Region: </span> {region}</p>
            <p><span>Capital: </span> {capital}</p>
        </div>
    </div>
  )
}

const Button = styled.button `
border: none;
background: transparent;
font-weight: 800;
font-size: 18px;
line-height: 26px;
letter-spacing: 0px;
color: #111517;
padding-left: 18px;
margin-top: 22px;
margin-bottom: 22px;
cursor: pointer;
`