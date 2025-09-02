import { ChangeEvent, FC } from "react"


interface ButtonProps extends React.ComponentProps<'input'> {
  onChange:(e:ChangeEvent<HTMLInputElement>) => void;
}

export const Input:FC<ButtonProps> = ({onChange,...props}) => {
  return(
    <div>
      <input
        {...props}
        onChange={onChange}
        className="block border w-full p-3 rounded-md mt-1 border-gray-200"
        />
      </div>
  )
}
