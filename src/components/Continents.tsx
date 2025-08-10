import type { ReactNode } from "react"
import styled from "styled-components"

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
