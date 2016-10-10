import React from 'react';
import uuid from 'uuid';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import connect from 'connect-alt';

// `connect-alt` decorator that connects component to stores
//
// The component will only listen to change events emitted
// by the specified stores (1st param, maybe be more than
// one separated by commas).
// Second param is a reducer function that extracts data from
// the store.
//
// Connecting a component to a store, means the selected store
// state will be available to the component under `this.props`.
@connect('NoteStore', ({ NoteStore: { notes } }) => ({ notes }))
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
		NoteActions.create({id: uuid.v4(), task: 'New task'});
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

		NoteActions.delete(id);
	}

	activateNoteEdit = (id) => {
		NoteActions.update({
			id, // ES6 shorthand property
			editing: true
		});
	}

	editNote = (id, task) => {
		NoteActions.update({
			id, 
			task,
			editing: false
		});
	}
}


export default App;
