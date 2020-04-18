import React from 'react'
import { PersonalInfo } from '../container/PersonalInfoForm'

export default class History extends React.Component<{}, { history: PersonalInfo[] }> {
  constructor(props: any) {
    super(props)
    this.state = { history: [] }
  }

  componentDidMount() {
    const storedHistory = localStorage.getItem('history')
    if (storedHistory) {
      const history: Array<PersonalInfo> = JSON.parse(storedHistory);
      this.setState({ history });
    }
  }

  render() {
    if (this.state.history) {
      return (
        <div>{this.state.history.reverse().map(item =>
          <div>
            <h2>{item.firstName} {item.lastName}</h2>
            <p><b>Gender:</b> {item.gender}</p>
            <p><b>Role:</b> {item.role}</p>
            <p><b>Address:</b> {item.province} {item.city}</p>
            <p><b>Skills:</b> {item.languages.join(', ')}</p>
          </div>
        )
        }
        </div>
      );
    } else {
      return <h1>No History!</h1>
    }
  }
}