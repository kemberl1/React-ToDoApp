// одна задача
import { formatDistanceToNow } from 'date-fns';
import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Task extends Component {
  state = {
    isEditing: false,
    editText: this.props.label,
  };

  handleEdit = () => {
    this.setState({ isEditing: true });
  }

  handleChange = (event) => {
    this.setState({ editText: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { id, onEdit } = this.props;
    onEdit(id, this.state.editText);
    this.setState({ isEditing: false });
  }

  handleBlur = () => {
    const { id, onEdit } = this.props;
    onEdit(id, this.state.editText);
    this.setState({ isEditing: false });
  }

  render() {
    const { label, createdDate, onDeleted, onToggleDone, done } = this.props;
    const formattedDate = formatDistanceToNow(new Date(createdDate), {
      includeSeconds: true,
    });
    const { isEditing, editText } = this.state;

    return (
      <li className={done ? 'completed' : isEditing ? 'editing' : ''}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleDone} />
          <label>
            <span className="description">{label}</span>
            <span className="created">
              {' '}
              created
              {formattedDate}
            </span>
          </label>
          <button className="icon icon-edit" onClick={this.handleEdit} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {isEditing && (
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="edit"
              value={editText}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoFocus
            />
          </form>
        )}
      </li>
    );
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
};
