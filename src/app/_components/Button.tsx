import { ComponentProps, FC } from "react";

interface Props extends ComponentProps<'button'> {
  variant:'post' | 'delete'
  onClick?:() => void;
  children:React.ReactNode
}

export const Button:FC<Props> =({variant,onClick,children,...props}) => {
  return(
    <button
      {...props}
      onClick={onClick}
      className={`
        py-2
        px-4
        font-bold
        rounded-md
        border
        border-transparent
        shadow-sm
        text-sm
        font-medium
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        text-white
        ${variant === 'post'
          ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
          : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
        }`}
        >
          {children}
    </button>
  )
}