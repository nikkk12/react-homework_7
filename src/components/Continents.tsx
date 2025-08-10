import type { ReactNode } from "react"


interface ContinentsProps {
    children : ReactNode
    className : string
}

export const Continents = ({children,className} : ContinentsProps) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
