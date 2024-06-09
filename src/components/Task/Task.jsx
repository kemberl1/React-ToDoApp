//одна задача
import { formatDistanceToNow } from "date-fns";
import React, { Component } from "react";

export default class Task extends Component{

render (){

	const { label, createdDate, onDeleted, onToggleDone, done} = this.props;
	const formattedDate = formatDistanceToNow(new Date(createdDate), {includeSeconds: true});
	
	return (
		<li className={done ? "completed" : ""}>
			<div className="view">
				<input className="toggle" type="checkbox" onChange={onToggleDone}/>
				<label>
					<span className="description">{label}</span>
					<span className="created"> created {formattedDate}</span>
				</label>
				<button className="icon icon-edit"></button>
				<button className="icon icon-destroy" onClick={onDeleted}></button>
			</div>
		</li>
	)
}
}

