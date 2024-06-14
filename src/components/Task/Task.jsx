import { formatDistanceToNow } from 'date-fns'
import { Component } from 'react'
import PropTypes from 'prop-types'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      editText: props.label,
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
    const { label, createdDate, onDeleted, onToggleDone, done, id } = this.props
    const { isEditing, editText } = this.state
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
          <input id={id} className="toggle" type="checkbox" onChange={onToggleDone} />
          <label htmlFor={`toggle_${id}`}>
            <span className="description">{label}</span>
            <span className="created">
              {' '}
              created
              {formattedDate}
            </span>
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
}
