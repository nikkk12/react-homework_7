interface Header {
  mode ? : () => void
}

export const Header = ({mode }: Header) => {
  return (
    <header>
            <h6>Where in the world?</h6>
            <button onClick={mode} type="button">Dark Mode</button> 
    </header>
  )
}
