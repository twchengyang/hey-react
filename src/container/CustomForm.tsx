import React from 'react';
import './CustomForm.css'
import TextInput from '../components/TextInput'
import FormSubmit from '../components/FormSubmit'

interface FullName {
  firstName: string
  lastName: string
}

export default class CustomForm extends React.Component<{}, FullName> {
  constructor(props: any) {
    super(props)
    this.state = { firstName: "", lastName: "" }
  }

  firstNameChangeHandler = (e: React.FormEvent<HTMLInputElement>) => this.setState({ firstName: e.currentTarget.value })
  lastNameChangeHandler = (e: React.FormEvent<HTMLInputElement>) => this.setState({ lastName: e.currentTarget.value })
  alertName = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Hello ${this.state.firstName} ${this.state.lastName}`)
  }

  render() {
    return <div className="custom-form">
      <h1>Personal Info</h1>
      <form onSubmit={this.alertName.bind(this)} >
        <TextInput name="First Name" id="fname" changeHandler={this.firstNameChangeHandler.bind(this)} />
        <TextInput name="Last Name" id="lname" changeHandler={this.lastNameChangeHandler.bind(this)} />
        <FormSubmit />
      </form>
    </div>
  }
}
