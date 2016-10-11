import React from 'react';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';
import connect from '../libs/connect';
import uuid from 'uuid';


class LaneHeader extends React.Component {

	render() {

		const {lane, ...props} = this.props;

		return (
			<div className="lane-header" {...props}>
				<div className="lane-add-note">
					<button onClick={this.addNote}>+</button>
				</div>
				<div className="lane-name">{lane.name}</div>
			</div>
		);
	}

	addNote = e => {
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
}

export default LaneHeader;
