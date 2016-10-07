import React from 'react';
import uuid from 'uuid';
import Notes from './Notes';
import connect from '../libs/connect';


class App extends React.Component {

	render() {
		const {notes} = this.props;

		return (
			<div>
				<button className="add-note" onClick={this.addNote}>+</button>

				<Notes
					notes={notes}
					onNoteClick={this.activateNoteEdit}
					onEdit={this.editNote}
					onDelete={this.deleteNote}
					/>
			</div>
		);
	}

	addNote = () => {
		// It would be possible to write this in an imperative style.
		// I.e., through `this.state.notes.push` and then
		// `this.setState({notes: this.state.notes})` to commit.
		//
		// I tend to favor functional style whenever that makes sense.
		// Even though it might take more code sometimes, I feel
		// the benefits (easy to reason about, no side effects)
		// more than make up for it.
		//
		// Libraries, such as Immutable.js, go a notch further.
		this.setState({
			notes: this.state.notes.concat([
				{
					id: uuid.v4(),
					task: 'New task'
				}
			])
		});
	}

	// Class Instance Field With an Arrow Function (ES8+)
	//
	// This method works by setting deleteNote to an arrow function one time when
	// the component is created. Inside render and in other functions, this.deleteNote
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
	deleteNote = (id, e) => {
		// Avoid bubbling to edit
		e.stopPropagation();

		this.setState({
			notes: this.state.notes.filter(note => note.id !== id)
		});
	}

	activateNoteEdit = (id) => {
		this.setState({
			notes: this.state.notes.map(note => {
				if (note.id === id) {
					note.editing = true;
				}

				return note;
			})
		});
	}

	editNote = (id, task) => {
		this.setState({
			notes: this.state.notes.map(note => {
				if (note.id === id) {
					note.editing = false;
					note.task = task;
				}

				return note;
			})
		});
	}
}


export default connect (
	({notes}) => ({notes})
)(App);
