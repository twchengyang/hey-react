import React from 'react'

interface Selectable {
  name: string
  id: string
  values: Array<string>
  selected: string
  onSelect: (e: React.FormEvent<HTMLInputElement>) => void
}

export default function RadioSelector(props: Selectable) {
  return (
    <>
      <label htmlFor={props.id}>{props.name}</label>
      <div id={props.id}>
        {props.values.map((value: string) => (
          <>
            <input type="radio" id={value.toLocaleLowerCase()} value={value} onChange={props.onSelect} checked={props.selected === value} />
            <label htmlFor={value.toLocaleLowerCase()}>{value}</label>
          </>
        ))
        }
      </div>
    </>
  );
}