import uuid from 'uuid';
import NoteActions from '../actions/NoteActions';

export default class NoteStore {
	constructor() {
		// magic method that binds actions to store methods by convention
		// i.e. `create` action will bind to `create` or `onCreate` method (but not both)
		this.bindActions(NoteActions);

		// this will become the store state
		this.notes = [];
	}

	create(note) {
		this.setState({
			notes: this.notes.concat(note)
		});
	}

	update(updatedNote) {
		this.setState({
			notes: this.notes.map(note => {
				if (note.id === updatedNote.id) {
					return Object.assign({}, note, updatedNote);
				}

				return note;
			})
		});
	}

	delete(id) {
		this.setState({
			notes: this.notes.filter(note => note.id !== id)
		});
	}
}
