interface SearchInput {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  keyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
  url?: string;
  mode: () => void;
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