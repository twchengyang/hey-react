import React from 'react';

interface TextInput {
  name: string,
  id: string,
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TextInput(props: TextInput) {
  return <>
    <label htmlFor={props.id}>{props.name}</label>
    <input type="text" id={props.id} onChange={props.onChange} value={props.value} />
  </>
}