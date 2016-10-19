import React from 'react';
import {compose} from 'redux';
import {DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';
import LaneHeader from './LaneHeader';
import Notes from './Notes';
import LaneActions from '../actions/LaneActions';
import NoteActions from '../actions/NoteActions';
import connect from 'connect-alt';


class Lane extends React.Component {

	render() {

		const {connectDropTarget, lane, notes, ...props} = this.props;

		return connectDropTarget(
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

Lane.propTypes = {
	lane: React.PropTypes.shape({
		id: React.PropTypes.string.isRequired,
		editing: React.PropTypes.bool,
		name: React.PropTypes.string,
		notes: React.PropTypes.array
	}).isRequired,
	connectDropTarget: React.PropTypes.func
};
Lane.defaultProps = {
	name: '',
	notes: []
};

function selectNotesByIds(allNotes, noteIds = []) {
	return noteIds.reduce((notes, id) => (
		notes.concat(allNotes.filter(note => note.id === id))
	), []);
}


const noteTarget = {
	hover(targetProps, monitor) {
		const sourceProps = monitor.getItem();
		const sourceId = sourceProps.id;

		// If the target lane doesn't have notes,
		// attach the note to it.
		//
		// `attachToLane` performs necessarly
		// cleanup by default and it guarantees
		// a note can belong only to a single lane
		// at a time.
		if (!targetProps.lane.notes.length) {
			LaneActions.attachToLane({laneId: targetProps.lane.id, noteId: sourceId});
		}
	}
};

export default compose(
	DropTarget(ItemTypes.NOTE, noteTarget, connect => ({
		connectDropTarget : connect.dropTarget()
	})),
	connect('NoteStore', 'LaneStore', ({ NoteStore: { notes } }) => ({ notes }))
)(Lane);
