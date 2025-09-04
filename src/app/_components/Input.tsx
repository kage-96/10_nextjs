import { ChangeEvent, FC } from "react"


interface Props extends React.ComponentProps<'input'> {
  onChange:(e:ChangeEvent<HTMLInputElement>) => void;
}

export const Input:FC<Props> = ({onChange,...props}) => {
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
