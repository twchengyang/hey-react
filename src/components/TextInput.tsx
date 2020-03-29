import React from 'react';

interface TextInput {
  name: string,
  id: string,
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TextInput(props: TextInput) {
  return <>
    <label htmlFor={props.id}>{props.name}</label>
    <input type="text" id={props.id} onChange={props.changeHandler} />
  </>
}