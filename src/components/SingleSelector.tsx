import React from 'react'

interface Selectable {
  name: string
  id: string
  values: Array<string>
  selected: string
  onSelect: (value: string) => void
}

export default function SingleSelector(props: Selectable) {
  return (
    <>
      <label htmlFor={props.id} >{props.name}</label>
      <select id={props.id} name={props.name.toLocaleLowerCase()} onChange={(e) => props.onSelect(e.currentTarget.value)} value={props.selected}>
        {props.selected === '' && <option value="">--Please choose an option--</option>}
        {props.values.map(
          value => <option key={value} value={value}>{value}</option>
        )}
      </select>
    </>
  );
}