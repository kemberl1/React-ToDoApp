//одна задача
import { formatDistanceToNow } from "date-fns";
import { Component } from "react";
import PropTypes from "prop-types";

export default class Task extends Component {
  render() {
    const { label, createdDate, onDeleted, onToggleDone, done } = this.props;
    const formattedDate = formatDistanceToNow(new Date(createdDate), {
      includeSeconds: true,
    });

    return (
      <li className={done ? "completed" : ""}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleDone} />
          <label>
            <span className="description">{label}</span>
            <span className="created"> created {formattedDate}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
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
};
