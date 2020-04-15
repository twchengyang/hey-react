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
  firstNameErr: string
  lastName: string
  lastNameErr: string
  gender: Gender
  province: string
  cityCandidate: string[]
  city: string
  role: Role
  languages: Array<Language>
}

type PersonalInfoKeys = keyof PersonalInfo

export default class CustomForm extends React.Component<{}, PersonalInfo> {
  constructor(props: any) {
    super(props)
    this.state = { firstName: '', firstNameErr: '', lastName: '', lastNameErr: '', gender: 'male', province: '', cityCandidate: [], city: '', role: '', languages: [] }
  }

  updateState = <T extends any>(key: keyof PersonalInfo, value: T) => (
    prevState: PersonalInfo
  ): PersonalInfo => ({
    ...prevState,
    [key]: value
  })
  handleInputValue<T>(name: keyof PersonalInfo): (v: T) => void {
    return (value: T) => this.setState(this.updateState(name, value))
  }

  handleProvinceSelect = (value: string) => this.setState({ province: value, cityCandidate: this.safeGet(this.provinceValues, value), city: '' })

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Hello ${this.state.gender === 'male' ? 'Mr' : 'Miss'} ${this.state.firstName} ${this.state.lastName}\n
Stay at ${this.state.city}, ${this.state.province}\n
Your role is ${this.state.role}\n
Your favourite languages are ${this.state.languages}`)
  }

  genderValues: Gender[] = ['male', 'female']
  roleValues: Role[] = ['Developer', 'Senior Developer', 'Lead Developer', 'Tech Lead']
  languageValues: Language[] = ['Java', 'C++', 'C', 'Javascript', 'Python']
  provinceValues: Map<string, Array<string>> =
    new Map([['Shanghai', ['Shanghai']], ['Shaanxi', ['Xi\'an', 'Xianyang', 'Shangluo', 'Ankang']], ['Beijing', ['Beijing', 'Zhongnanhai']]])

  safeGet(m: Map<string, Array<string>>, key: string): Array<string> {
    const value = this.provinceValues.get(key);
    if (value) {
      return value;
    } else {
      return [];
    }
  }

  updateStateWithError = <T extends any>(key: keyof PersonalInfo, value: T, errKey: keyof PersonalInfo, errValue: string) => (
    prevState: PersonalInfo
  ): PersonalInfo => ({
    ...prevState,
    [key]: value,
    [errKey]: errValue
  })
  handleInputValueWithError(name: keyof PersonalInfo): (value: string) => void {
    return (value: string) => this.setState(this.updateStateWithError(name, value, (name + 'Err') as keyof PersonalInfo, this.validName(name, value)));
  }

  validName = (name: keyof PersonalInfo, value: string) => {
    if (value.length === 0) {
      return `${name} is required.`;
    } else if (!value.match('^[a-zA-Z]+$')) {
      return `${name} must be alphabetic`;
    }
    return '';
  }

  validAll = () => {
    return this.state.firstName.length !== 0 &&
      this.state.firstNameErr.length === 0 &&
      this.state.lastName.length !== 0 &&
      this.state.lastNameErr.length === 0 &&
      this.state.gender.length !== 0 &&
      this.state.province.length !== 0 &&
      this.state.city.length !== 0 &&
      this.state.role.length !== 0 &&
      this.state.languages.length !== 0
  }

  render() {
    return (
      <div className='custom-form'>
        <h1>Personal Info</h1>
        <form onSubmit={this.handleSubmit} >
          <TextInput name='First Name' id='fname' value={this.state.firstName}
            onChange={this.handleInputValueWithError('firstName').bind(this)} error={this.state.firstNameErr} />
          <TextInput name='Last Name' id='lname' value={this.state.lastName}
            onChange={this.handleInputValueWithError('lastName').bind(this)} error={this.state.lastNameErr} />
          <RadioSelector name='Gender' id='gender' values={this.genderValues}
            onSelect={this.handleInputValue('gender')} selected={this.state.gender} />
          <SingleSelector name='Province' id='province' values={Array.from(this.provinceValues.keys())}
            onSelect={this.handleProvinceSelect} selected={this.state.province} />
          <SingleSelector name='City' id='city' values={this.state.cityCandidate}
            onSelect={this.handleInputValue('city')} selected={this.state.city} />
          <SingleSelector name='Role' id='role' values={this.roleValues}
            onSelect={this.handleInputValue('role')} selected={this.state.role} />
          <MultipleSelector name='Languages' id='language' values={this.languageValues}
            onSelect={this.handleInputValue('languages')} selected={this.state.languages} />
          <input type='submit' value='SUBMIT' disabled={!this.validAll()} />
        </form>
      </div>
    );
  }
}
