//форма для добавления

import React, { Component } from "react"

export default class NewTaskForm extends Component {
	constructor(){
	super()
	this.searchText = 'What needs to be done?';
	}

	state = {
		label: ''
	}

	onLabelChange = (event) => {
		this.setState({ label: event.target.value })
	}

	onSubmit = (event) => {
		event.preventDefault();
		this.props.onItemAdded(this.state.label)
		this.setState({ label: '' });
	}

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
			value={this.state.label}/>
			</form>
		</header>
	)
}
}