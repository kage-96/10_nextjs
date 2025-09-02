import React, { FC } from 'react'

interface Props {
  htmlFor:string,
  text:string
}
export const Label:FC<Props> = ({htmlFor,text}) => {
  return (
    <label htmlFor={htmlFor}>{text}</label>
  )
}
