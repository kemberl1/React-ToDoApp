//форма для добавления

import { Component } from "react";
import PropTypes from "prop-types";

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.searchText = "What needs to be done?";
  }

  state = {
    label: "",
  };

  onLabelChange = (event) => {
    this.setState({ label: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { label } = this.state;
    if (label.trim("")) {
      this.props.onItemAdded(label);
      this.setState({ label: "" });
    } else {
      alert("Please enter a task description");
      this.setState({ label: "" });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder={this.searchText}
            autoFocus
            onChange={this.onLabelChange}
            value={this.state.label}
          />
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};
