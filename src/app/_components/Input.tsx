import { forwardRef } from "react"


interface Props extends React.ComponentProps<'input'> {}

export const Input = forwardRef<HTMLInputElement,Props>(({...props},ref) => {
  return(
    <div>
      <input
      ref={ref}
        {...props}
        className="block border w-full p-3 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-gray-900 rounded-md mt-1 border-gray-200"
        />
      </div>
    )
  }
)
Input.displayName = "Input"