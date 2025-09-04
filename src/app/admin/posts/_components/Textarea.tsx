import { FC } from "react"

interface Props {
  rows:number,
  id:string,
  value:string,
  onChange:(e:React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const Textarea:FC<Props> = ({rows,id,value,onChange}) => {
  return(
    <div>
      <textarea
        rows={rows}
        id={id}
        value={value}
        onChange={onChange}
        className="border rounded-md mt-1 border-gray-200 w-full p-2"
        >

        </textarea>
    </div>
  )
}