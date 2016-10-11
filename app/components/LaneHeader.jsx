import React from 'react';
import Editable from './Editable';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';
import connect from '../libs/connect';
import uuid from 'uuid';


class LaneHeader extends React.Component {

	render() {

		const {lane, ...props} = this.props;

		return (
			<div className="lane-header" onClick={this.activateLaneEdit} {...props}>
				<div className="lane-add-note">
					<button onClick={this.addNote}>+</button>
				</div>
				<Editable
					className="lane-name"
					editing={lane.editing}
					value={lane.name}
					onEdit={this.editName}
					/>
					<div className="lane-delete">
						<button onClick={this.deleteLane}>x</button>
					</div>
			</div>
		);
	}

	addNote = (e) => {
		e.stopPropagation();

		const {lane} = this.props;
		const noteId = uuid.v4();

		NoteActions.create({
			id: noteId,
			task: 'New task'
		});
		LaneActions.attachToLane({
			laneId: lane.id, noteId
		});
	}

	activateLaneEdit = () => {
		const {lane} = this.props;

		LaneActions.update({
			id: lane.id,
			editing: true
		});
	}

	editName = (name) => {
		const {lane} = this.props;

		LaneActions.update({
			id: lane.id,
			name,
			editing: false
		});
	}

	deleteLane = (e) => {
		// Avoid bubbling to edit
		e.stopPropagation();

		const {lane} = this.props;

		LaneActions.delete(lane.id);
	}
}

export default LaneHeader;
