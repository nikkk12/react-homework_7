interface CountriesCard {
    url ? : string
    alt ? : string
    country ?: string
    population : string
    region ?: string
    capital?: string
    className?: string
    nativeName?: string
    subRegion?: string 
    topLevelDomain?: string
    currencies ?: string
    languages?: string  
    borderCountries? : string
}

export const CountriesCard = ({
    url,
    alt,
    country,
    population,
    region,
    capital,
    className,
} : CountriesCard) => {
  return (
    <div className={className} >
        <img src={url} alt={alt} />
        <h3>{country}</h3>
        <div>
            <p><span>Population: </span> {population}</p>
            <p><span>Region: </span> {region}</p>
            <p><span>Capital: </span> {capital}</p>
        </div>
    </div>
  )
}
