import { formatDistanceToNow } from 'date-fns'
import { Component } from 'react'
import PropTypes from 'prop-types'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      editText: props.label,
      minutes: props.minutes,
      seconds: props.seconds,
      timerRunning: false,
    }
    this.timerInterval = null
  }

  componentDidMount() {
    this.updateTimerState()
  }

  componentDidUpdate(prevProps) {
    const { done } = this.props
    if (prevProps.done !== done) {
      this.updateTimerState()
    }
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  onToggleDone = () => {
    const { id, onToggleDone } = this.props
    this.pauseTimer()
    onToggleDone(id)
  }

  clearTimer = () => {
    clearInterval(this.timerInterval)
    this.setState({ timerRunning: false })
  }

  startTimer = () => {
    const { timerRunning } = this.state
    if (!timerRunning) {
      this.setState({ timerRunning: true })
      this.timerInterval = setInterval(() => {
        const { minutes, seconds } = this.state
        let mins = parseInt(minutes, 10)
        let secs = parseInt(seconds, 10)

        if (mins === 0 && secs === 0) {
          this.clearTimer()
        } else {
          if (secs === 0) {
            mins -= 1
            secs = 59
          } else {
            secs -= 1
          }
          this.setState({ minutes: mins.toString(), seconds: secs.toString() })
        }
      }, 1000)
    }
  }

  pauseTimer = () => {
    this.clearTimer()
  }

  updateTimerState = () => {
    const { done } = this.props
    if (done) {
      this.pauseTimer()
    } else {
      this.startTimer()
    }
  }

  handleEdit = () => {
    this.setState({ isEditing: true })
  }

  handleChange = (event) => {
    this.setState({ editText: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { id, onEdit } = this.props
    const { editText } = this.state
    onEdit(id, editText)
    this.setState({ isEditing: false })
  }

  handleBlur = () => {
    const { id, onEdit } = this.props
    const { editText } = this.state
    onEdit(id, editText)
    this.setState({ isEditing: false })
  }

  render() {
    const { label, createdDate, onDeleted, done, id } = this.props
    const { isEditing, editText, minutes, seconds, timerRunning } = this.state
    const formattedDate = formatDistanceToNow(new Date(createdDate), {
      includeSeconds: true,
    })

    let taskClassName = ''
    if (done) {
      taskClassName = 'completed'
    } else if (isEditing) {
      taskClassName = 'editing'
    }

    return (
      <li className={taskClassName}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" onChange={this.onToggleDone} />
          <label htmlFor={`toggle_${id}`}>
            <span className="title">{label}</span>
            <span className="description description-timer">
              <button
                type="button"
                className={`icon icon-${timerRunning ? 'pause' : 'play'}`}
                onClick={timerRunning ? this.pauseTimer : this.startTimer}
                aria-label={timerRunning ? 'Timer off' : 'Timer on'}
              />
              <span className="time">
                {minutes}:{seconds}
              </span>
            </span>
            <span className="description">created {formattedDate}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={this.handleEdit} aria-label="Edit task" />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="Delete task" />
        </div>
        {isEditing && (
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="edit"
              value={editText}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
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
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
}
