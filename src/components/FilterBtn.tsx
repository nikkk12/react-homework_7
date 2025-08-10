import type { ReactNode } from "react"

interface FilterBtn {
  className ? : string
  clased ? : string
  onClick : () => void
  children: ReactNode 
}

export const FilterBtn = ({className , clased,onClick,children} : FilterBtn) => {

  

  return (
    <div  className={className}>
        <button
        onClick={onClick}
        type="button">Filter by Region</button>
        <div className={clased}>{children}
           
        </div> 
    </div>
  )
}
