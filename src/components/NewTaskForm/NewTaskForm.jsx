// форма для добавления

import { Component } from 'react'

export default class NewTaskForm extends Component {
  constructor() {
    super()
    this.searchText = 'What needs to be done?'
    this.state = {
      label: '',
    }
  }

  onLabelChange = (event) => {
    this.setState({ label: event.target.value })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { label } = this.state
    const { onItemAdded } = this.props
    if (label.trim('')) {
      onItemAdded(label)
      this.setState({ label: '' })
    } else {
      this.setState({ label: '' })
    }
  }

  render() {
    const { label } = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input className="new-todo" placeholder={this.searchText} onChange={this.onLabelChange} value={label} />
        </form>
      </header>
    )
  }
}
