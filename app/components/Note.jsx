import React from 'react';

export default class Note extends React.Component {
	render() {
		// Don't need a bind here, since it's just calling
		// our own click handler;
		return (
			<div>
				<span>{this.props.item.task}</span>
				<button onClick={this.handleDelete}>x</button>
			</div>
		);
	}

	// Class Instance Field With an Arrow Function (ES8+)
	//
	// This method works by setting handleDelete to an arrow function one time when
	// the component is created. Inside render and in other functions, this.handleDelete
	// can be passed along without fear because the arrow function preserves the this binding.
	//
	// It is labelled “ES8+” because it’s not technically part of ES6 or ES7 (aka ES2016).
	// ES2016 has been finalized and only includes Array.prototype.includes and the exponentiation
	// operator, so if and when this makes it into the spec, it’ll likely be ES2017 (ES8) or
	// beyond.
	//
	// Even though this is supported by Babel, there’s a (small) risk that this feature could be
	// taken out of the spec and require some refactoring, but a lot of people are using it so it
	// seems likely that it’ll stay put.
	handleDelete = (e) => {
		// Our click handler knows the item's id, so it
		// can just pass it along.
		this.props.onDelete(this.props.item.id, e);
	}
}
