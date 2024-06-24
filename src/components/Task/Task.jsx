import { formatDistanceToNow } from 'date-fns'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      editText: props.label,
    }
    this.editField = React.createRef()
  }

  componentDidUpdate(prevState) {
    const { isEditing } = this.state
    if (!prevState.isEditing && isEditing) {
      document.addEventListener('click', this.handleClickOutside, true)
      document.addEventListener('keydown', this.handleEscKey, true)
    } else if (prevState.isEditing && !isEditing) {
      document.removeEventListener('click', this.handleClickOutside, true)
      document.removeEventListener('keydown', this.handleEscKey, true)
    }
  }

  handleEdit = () => {
    this.setState({ isEditing: true })
  }

  handleChange = (event) => {
    this.setState({ editText: event.target.value })
  }

  handleSubmit = (save = true) => {
    const { id, onEdit, label } = this.props
    const { editText } = this.state
    if (save) {
      onEdit(id, editText)
    } else {
      this.setState({ editText: label })
    }
    this.setState({ isEditing: false })
  }

  handleClickOutside = (event) => {
    if (this.editField.current && !this.editField.current.contains(event.target)) {
      this.handleSubmit(false)
    }
  }

  handleEscKey = (event) => {
    if (event.key === 'Escape') {
      this.setState({ isEditing: false })
    }
  }

  render() {
    const { label, createdDate, onDeleted, onToggleDone, done, id, timers, startTimer, pauseTimer } = this.props
    const { isEditing, editText } = this.state
    const timer = timers[id]
    const formattedDate = formatDistanceToNow(new Date(createdDate), {
      includeSeconds: true,
    })

    let taskClassName = ''
    if (done) {
      taskClassName = 'completed'
    } else if (isEditing) {
      taskClassName = 'editing'
    } else {
      taskClassName = 'active'
    }

    return (
      <li className={taskClassName} key={id}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" onChange={() => onToggleDone(id)} checked={done} />
          <label htmlFor={`toggle_${id}`}>
            <span className="title">{label}</span>
            <span className="description description-timer">
              <button
                type="button"
                className={`icon icon-${timer.timerRunning ? 'pause' : 'play'}`}
                onClick={timer.timerRunning ? () => pauseTimer(id) : () => startTimer(id)}
                aria-label={timer.timerRunning ? 'Timer on' : 'Timer off'}
              />
              <span className="time">
                {timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}:
                {timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
              </span>
            </span>
            <span className="description">created {formattedDate}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={this.handleEdit} aria-label="Edit task" />
          <button type="button" className="icon icon-destroy" onClick={() => onDeleted(id)} aria-label="Delete task" />
        </div>
        {isEditing && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              this.handleSubmit()
            }}
            ref={this.editField}
          >
            <input
              type="text"
              className="edit"
              value={editText}
              onChange={this.handleChange}
              onBlur={() => this.handleSubmit(false)}
            />
          </form>
        )}
      </li>
    )
  }
}

Task.propTypes = {
  label: PropTypes.string.isRequired,
  createdDate: PropTypes.instanceOf(Date).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  startTimer: PropTypes.func.isRequired,
  pauseTimer: PropTypes.func.isRequired,
}
