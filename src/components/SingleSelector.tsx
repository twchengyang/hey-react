import React from 'react'

interface Selectable {
  name: string
  id: string
  values: Array<string>
  selected: string
  onSelect: (e: React.FormEvent<HTMLSelectElement>) => void
}

export default function SingleSelector(props: Selectable) {
  return (
    <>
      <label htmlFor={props.id} >{props.name}</label>
      <select id={props.id} name={props.name.toLocaleLowerCase()} onChange={props.onSelect} value={props.selected}>
        {props.selected === '' && <option value="">--Please choose an option--</option>}
        {props.values.map(
          value => <option value={value}>{value}</option>
        )}
      </select>
    </>
  );
}