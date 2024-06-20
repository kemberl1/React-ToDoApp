import { formatDistanceToNow } from 'date-fns'
import { Component } from 'react'
import PropTypes from 'prop-types'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      editText: props.label,
      minutes: parseInt(props.minutes, 10),
      seconds: parseInt(props.seconds, 10),
      timerRunning: false,
    }
    this.timerInterval = null
    this.localStorageKey = `timer_${props.id}`
  }

  componentDidMount() {
    this.loadTimerState()
    this.startTimer()
  }

  componentDidUpdate(prevProps) {
    const { done, id } = this.props
    if (prevProps.done !== done || prevProps.id !== id) {
      this.updateTimerState()
    }
  }

  componentWillUnmount() {
    this.clearTimer()
    this.saveTimerState()
  }

  onToggleDone = () => {
    const { id, onToggleDone } = this.props
    this.pauseTimer()
    onToggleDone(id)
  }

  clearTimer = () => {
    clearInterval(this.timerInterval)
    this.timerInterval = null
    this.setState({ timerRunning: false })
  }

  startTimer = () => {
    const { timerRunning } = this.state
    if (!timerRunning) {
      this.setState({ timerRunning: true }, () => {
        this.timerInterval = setInterval(() => {
          this.setState(
            (prevState) => this.decrementTimer(prevState),
            () => {
              this.saveTimerState()
            }
          )
        }, 1000)
      })
    }
  }

  decrementTimer = (prevState) => {
    let { minutes, seconds } = prevState

    if (minutes === 0 && seconds === 0) {
      this.clearTimer()
    } else if (seconds === 0) {
      minutes -= 1
      seconds = 59
    } else {
      seconds -= 1
    }
    return { minutes, seconds }
  }

  pauseTimer = () => {
    this.clearTimer()
    this.setState({ timerRunning: false }, () => {
      this.saveTimerState()
    })
  }

  updateTimerState = () => {
    const { done } = this.props
    if (done) {
      this.pauseTimer()
    } else {
      this.startTimer()
    }
  }

  saveTimerState = () => {
    const { minutes, seconds, timerRunning } = this.state
    const stateToSave = {
      minutes,
      seconds,
      timerRunning,
    }
    localStorage.setItem(this.localStorageKey, JSON.stringify(stateToSave))
  }

  loadTimerState = () => {
    const savedState = JSON.parse(localStorage.getItem(this.localStorageKey))
    if (savedState) {
      this.setState(
        {
          minutes: savedState.minutes,
          seconds: savedState.seconds,
          timerRunning: savedState.timerRunning,
        },
        () => {
          if (savedState.timerRunning) {
            this.startTimer()
          }
        }
      )
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
      <li className={taskClassName} key={id}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" onChange={this.onToggleDone} checked={done} />
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
                {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
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
