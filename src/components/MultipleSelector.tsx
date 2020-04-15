import React from 'react'

interface Selectable {
  name: string
  id: string
  selected: Array<string>
  values: Array<string>
  onSelect: (value: Array<string>) => void
}

export default function MultipleSelector(props: Selectable) {
  return (
    <>
      <label htmlFor={props.id}>{props.name}</label>
      <select id={props.id} name={props.name.toLocaleLowerCase()} multiple value={props.selected}
        onChange={(e) => props.onSelect(Array.from(e.currentTarget.selectedOptions, (item) => item.value))}>
        {props.values.map(
          value => <option key={value} value={value}>{value}</option>
        )}
      </select>
    </>
  )
}