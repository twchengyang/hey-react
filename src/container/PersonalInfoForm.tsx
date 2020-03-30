import React from 'react';
import './CustomForm.css'
import TextInput from '../components/TextInput'
import RadioSelector from '../components/RadioSelector';
import SingleSelector from '../components/SingleSelector';
import MultipleSelector from '../components/MultipleSelector';

type Gender = 'male' | 'female'
type Role = '' | 'Developer' | 'Senior Developer' | 'Lead Developer' | 'Tech Lead'
type Language = 'Java' | 'C++' | 'C' | 'Javascript' | 'Python'

interface PersonalInfo {
  firstName: string
  lastName: string
  gender: Gender
  role: Role
  languages: Array<Language>
}

export default class CustomForm extends React.Component<{}, PersonalInfo> {
  constructor(props: any) {
    super(props)
    this.state = { firstName: '', lastName: '', gender: 'male', role: '', languages: [] }
  }

  handleFirstNameChange = (e: React.FormEvent<HTMLInputElement>) => this.setState({ firstName: e.currentTarget.value })
  handleLastNameChange = (e: React.FormEvent<HTMLInputElement>) => this.setState({ lastName: e.currentTarget.value })
  handleRadioSelect = (e: React.FormEvent<HTMLInputElement>) => this.setState({ gender: e.currentTarget.value as Gender })
  handleSingleSelect = (e: React.FormEvent<HTMLSelectElement>) => this.setState({ role: e.currentTarget.value as Role })
  handleMultipleSelect = (e: React.FormEvent<HTMLSelectElement>) =>
    this.setState({ languages: Array.from(e.currentTarget.selectedOptions, (item) => item.value as Language) })
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Hello ${this.state.gender === 'male' ? 'Mr' : 'Miss'} ${this.state.firstName} ${this.state.lastName}\n
Your role is ${this.state.role}\n
Your favourite languages are ${this.state.languages}`)
  }
  genderValues: Gender[] = ['male', 'female']
  roleValues: Role[] = ['Developer', 'Senior Developer', 'Lead Developer', 'Tech Lead']
  languageValues: Language[] = ['Java', 'C++', 'C', 'Javascript', 'Python']


  render() {
    return <div className='custom-form'>
      <h1>Personal Info</h1>
      <form onSubmit={this.handleSubmit} >
        <TextInput name='First Name' id='fname' onChange={this.handleFirstNameChange} value={this.state.firstName} />
        <TextInput name='Last Name' id='lname' onChange={this.handleLastNameChange} value={this.state.lastName} />
        <RadioSelector name='Gender' id='gender' values={this.genderValues} onSelect={this.handleRadioSelect} selected={this.state.gender} />
        <SingleSelector name='Role' id='role' values={this.roleValues} onSelect={this.handleSingleSelect} selected={this.state.role} />
        <MultipleSelector name='Languages' id='language' values={this.languageValues}
          onSelect={this.handleMultipleSelect} selected={this.state.languages} />
        <input type='submit' value='SUBMIT' />
      </form>
    </div>
  }
}
