

interface countryInfo {
    url ? : string
    alt ? : string
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
    country? :string
}

export const CountryInfoCompo = ({
    population,
    region,
    capital,
    className,
    nativeName,
    subRegion,
    topLevelDomain,
    currencies,
    languages,
    url,
    alt,
    country
} : countryInfo) => {

  return (
    <div className={className}>
         <img src={url} alt={alt} />
         <h3>{country}</h3>
         <div>
            <p><span>Native Name: </span> {nativeName}</p>
            <p><span>Population: </span> {population}</p>
            <p><span>Region: </span> {region}</p>
            <p><span>Sub Region: </span> {subRegion}</p>
            <p><span>Capital: </span> {capital}</p>

            <p className="top-level"><span>Top Level Domain: </span> {topLevelDomain}</p>
            <p><span>Currencies: </span> {currencies}</p>
            <p><span>Languages </span> {languages}</p>

            <div className="border-countries">
                <h2>Boorder Countries:</h2>
                <div>
                   
                </div>
            </div>
        </div>
    </div>
  )
}
