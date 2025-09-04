import { ComponentProps, FC } from "react"

interface Props extends ComponentProps<'label'> {}

export const Label:FC<Props> = ({children,...props}) => {
  return(
    <label
      {...props}
      className="block text-sm font-medium text-gray-700"
      >
      {children}
    </label>
  )
}