import React from "react"

interface ButtonProps {
  content: any,
  calcFn(): void,
  styleClass: string
}

const Button: React.FC<ButtonProps> = ({ content, calcFn, styleClass }) => {
  return (
    <button 
      onClick={calcFn}
      className={styleClass}>

      {content}
    </button>
  )
}

export default Button;