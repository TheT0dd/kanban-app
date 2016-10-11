import React from 'react';
import Notes from './Notes';
import LaneActions from '../actions/LaneActions';
import NoteActions from '../actions/NoteActions';
import connect from 'connect-alt';
import uuid from 'uuid';


@connect('NoteStore', ({ NoteStore: { notes } }) => ({ notes }))
class Lane extends React.Component {

	render() {

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
}

function selectNotesByIds(allNotes, noteIds = []) {
	return allNotes.filter(note => noteIds.includes(note.id));
}

export default Lane;
