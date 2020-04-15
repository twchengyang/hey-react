import React from 'react';

interface TextInput {
  name: string,
  id: string,
  value: string,
  error: string,
  onChange: (value: string) => void
}

export default function TextInput(props: TextInput) {
  return <>
    <label htmlFor={props.id}>{props.name}</label>
    <input type='text' id={props.id} onChange={e => props.onChange(e.currentTarget.value)} value={props.value} />
    <p hidden={props.error.length === 0}>{props.error}</p>
  </>
}