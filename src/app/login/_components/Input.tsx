import { FC } from "react";

interface Props {
  type:string,
  id:string,
  value:string,
  isSubmitting:boolean,
  placeholder:string,
  onChange:(value:string) => void
}

export const Input:FC<Props> = ({type,id,value,isSubmitting,placeholder,onChange}) => {
  return(
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e)=> onChange(e.target.value)}
      className="border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
      placeholder={placeholder}
      required
      readOnly={isSubmitting}
    />
  )
}