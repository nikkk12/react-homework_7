

export const FilterBtn = ({className , clased,onClick}) => {
  return (
    <div  className={className}>
        <button
        onClick={onClick}
        type="button">Filter by Region</button>
        <div className={clased}>
            <span> 
                <button type="button">Africa</button>
            </span>
            <span>
          <button type="button">America</button>
            </span>
            <span>
          <button type="button">Asia</button>
            </span>
            <span>
          <button type="button">Europe</button>
            </span>
            <span>
          <button type="button">Oceania</button>
            </span>
        </div> 
    </div>
  )
}
