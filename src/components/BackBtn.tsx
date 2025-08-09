interface Backbtn {
    className  : string
    mode : () => void
}

export const BackBtn = ({className,mode} : Backbtn) => {
  return (
    <div className={className}>
        <button 
        onClick={mode}
        type="button">
            Back
        </button>
    </div>
  )
}
