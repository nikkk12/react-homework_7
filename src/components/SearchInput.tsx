interface SearchInput {
    className? : string,
    url? : string , 
    mode? : () => void
    onChange? : () => void
    value? :  string
    keyDown ? : () => void
}

export const SearchInput = ({className,url,mode,onChange,value,keyDown}  : SearchInput) => {
  return (
    <div className={className}>
        <button type="button" onClick={mode}>
        <img src={url} alt="search" />
        </button>
       <input
       onKeyDown={keyDown}
       value={value}
        onChange={onChange} placeholder="Search for a country..." type="text" />
    </div>
  )
}