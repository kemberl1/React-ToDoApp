import { Component } from 'react'

export default class NewTaskForm extends Component {
  constructor() {
    super()
    this.searchText = 'What needs to be done?'
    this.state = {
      label: '',
      minutes: '',
      seconds: '',
    }
  }

  onLabelChange = (event) => {
    this.setState({ label: event.target.value })
  }

  onMinChange = (event) => {
    const { value } = event.target
    if (/^\d*$/.test(value) && value.length <= 4) {
      this.setState({ minutes: value })
    }
  }

  onSecChange = (event) => {
    const { value } = event.target
    if (/^\d*$/.test(value) && value.length <= 2) {
      this.setState({ seconds: value })
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { label, minutes, seconds } = this.state
    const { onItemAdded } = this.props
    if (label.trim() && /^\d*$/.test(minutes) && /^\d*$/.test(seconds)) {
      onItemAdded(label, minutes, seconds)
      this.setState({ label: '', minutes: '', seconds: '' })
    } else {
      this.setState({ label: '', minutes: '', seconds: '' })
    }
  }

  render() {
    const { label, minutes, seconds } = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input className="new-todo" placeholder={this.searchText} onChange={this.onLabelChange} value={label} />
          <input className="new-todo-form__timer" placeholder="Min" onChange={this.onMinChange} value={minutes} />
          <input className="new-todo-form__timer" placeholder="Sec" onChange={this.onSecChange} value={seconds} />
          <button type="submit" style={{ display: 'none' }} aria-label="submit task" />
        </form>
      </header>
    )
  }
}
