import React from 'react'

interface Selectable {
  name: string
  id: string
  selected: Array<string>
  values: Array<string>
  onSelect: (e: React.FormEvent<HTMLSelectElement>) => void
}

export default function MultipleSelector(props: Selectable) {
  return (
    <>
      <label htmlFor={props.id}>{props.name}</label>
      <select id={props.id} name={props.name.toLocaleLowerCase()} multiple onChange={props.onSelect}>
        {props.values.map(
          value => <option value={value} selected={props.selected.includes(value)}>{value}</option>
        )}
      </select>
    </>
  )
}