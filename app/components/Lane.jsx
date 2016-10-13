import React from 'react';
import LaneHeader from './LaneHeader';
import Notes from './Notes';
import LaneActions from '../actions/LaneActions';
import NoteActions from '../actions/NoteActions';
import connect from 'connect-alt';


@connect('NoteStore', 'LaneStore', ({ NoteStore: { notes } }) => ({ notes }))
class Lane extends React.Component {

	render() {

		const {lane, notes, ...props} = this.props;

		return (
			<div {...props}>
				<LaneHeader lane={lane} />
				<Notes
					notes={selectNotesByIds(notes, this.props.lane.notes)}
					onNoteClick={this.activateNoteEdit}
					onEdit={this.editNote}
					onDelete={this.deleteNote}
					/>
			</div>
		);
	}

	editNote = (id, task) => {
		NoteActions.update({id, task, editing: false});
	}

	deleteNote = (noteId, e) => {
		e.stopPropagation();

		LaneActions.detachFromLane({
			laneId: this.props.lane.id,
			noteId
		});

		NoteActions.delete(noteId);
	}

	activateNoteEdit = (id) => {
		NoteActions.update({id, editing: true});
	}
}

function selectNotesByIds(allNotes, noteIds = []) {
	return noteIds.reduce((notes, id) => (
		notes.concat(allNotes.filter(note => note.id === id))
	), []);
}

export default Lane;
