import React from 'react';
import './PersonalInfoForm.css'
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
  province: string
  cityCandidate: string[]
  city: string
  role: Role
  languages: Array<Language>
}

export default class CustomForm extends React.Component<{}, PersonalInfo> {
  constructor(props: any) {
    super(props)
    this.state = { firstName: '', lastName: '', gender: 'male', province: '', cityCandidate: [], city: '', role: '', languages: [] }
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
Stay at ${this.state.city}, ${this.state.province}\n
Your role is ${this.state.role}\n
Your favourite languages are ${this.state.languages}`)
  }
  handleProvinceSelect = (e: React.FormEvent<HTMLSelectElement>) => this.setState({ province: e.currentTarget.value, cityCandidate: this.safeGet(this.provinceValues, e.currentTarget.value), city: '' })
  handleCitySelect = (e: React.FormEvent<HTMLSelectElement>) => this.setState({ city: e.currentTarget.value })
  genderValues: Gender[] = ['male', 'female']
  roleValues: Role[] = ['Developer', 'Senior Developer', 'Lead Developer', 'Tech Lead']
  languageValues: Language[] = ['Java', 'C++', 'C', 'Javascript', 'Python']
  provinceValues: Map<string, Array<string>> = new Map([['Shanghai', ['Shanghai']], ['Shaanxi', ['Xi\'an', 'Xianyang', 'Shangluo', 'Ankang']], ['Beijing', ['Beijing', 'Zhongnanhai']]])

  safeGet(m: Map<string, Array<string>>, key: string): Array<string> {
    const value = this.provinceValues.get(key);
    if (value) {
      return value;
    } else {
      return [];
    }
  }

  render() {
    return (
      <div className='custom-form'>
        <h1>Personal Info</h1>
        <form onSubmit={this.handleSubmit} >
          <TextInput name='First Name' id='fname' onChange={this.handleFirstNameChange} value={this.state.firstName} />
          <TextInput name='Last Name' id='lname' onChange={this.handleLastNameChange} value={this.state.lastName} />
          <RadioSelector name='Gender' id='gender' values={this.genderValues} onSelect={this.handleRadioSelect} selected={this.state.gender} />
          <SingleSelector name='Province' id='province' values={Array.from(this.provinceValues.keys())} onSelect={this.handleProvinceSelect} selected={this.state.province} />
          <SingleSelector name='City' id='city' values={this.state.cityCandidate} onSelect={this.handleCitySelect} selected={this.state.city} />
          <SingleSelector name='Role' id='role' values={this.roleValues} onSelect={this.handleSingleSelect} selected={this.state.role} />
          <MultipleSelector name='Languages' id='language' values={this.languageValues}
            onSelect={this.handleMultipleSelect} selected={this.state.languages} />
          <input type='submit' value='SUBMIT' />
        </form>
      </div>
    );
  }
}
