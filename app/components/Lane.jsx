import React from 'react';
import uuid from 'uuid';
import connect from 'connect-alt';
import LaneActions from '../actions/LaneActions';
import NoteActions from '../actions/NoteActions';
import Notes from './Notes';

@connect('NoteStore', ({ NoteStore: { notes } }) => ({ notes }))
class Lane extends React.Component {

	editNote = (id, task) => {
		NoteActions.update({id, task, editing: false});
	}

	addNote = e => {
		e.stopPropagation();

		const noteId = uuid.v4();

		NoteActions.create({
			id: noteId,
			task: 'New task'
		});

		LaneActions.attachToLane({
			laneId: this.props.lane.id,
			noteId
		});
	}

	deleteNote = (noteId, e) => {
		e.stopPropagation();

		LaneActions.detachFromLane({
			laneId: this.props.lane.id,
			noteId
		});

		NoteActions.delete(noteId);
	}

	activateNoteEdit = id => {
		NoteActions.update({id, editing: true});
	}

	render() {
		console.log(this.props);
		const {lane, notes, ...props} = this.props;

		return (
			<div {...props}>
				<div className="lane-header">
					<div className="lane-add-note">
						<button onClick={this.addNote}>+</button>
					</div>
					<div className="lane-name">{lane.name}</div>
				</div>
				<Notes
					notes={selectNotesByIds(notes, this.props.lane.notes)}
					onNoteClick={this.activateNoteEdit}
					onEdit={this.editNote}
					onDelete={this.deleteNote}
					/>
			</div>
		);
	}
}

function selectNotesByIds(allNotes, noteIds = []) {
	// `reduce` is a powerful method that allows us to
	// fold data. You can implement `filter` and `map`
	// through it. Here we are using it to concatenate
	// notes matching to the ids.
	return noteIds.reduce((notes, id) =>
		// Concatenate possible matching ids to the result
		notes.concat(
			allNotes.filter(note => note.id === id)
		)
	, []);
}

export default Lane;
