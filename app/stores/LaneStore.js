import LaneActions from '../actions/LaneActions';

export default class LaneStore {
	constructor() {
		this.bindActions(LaneActions);

		this.lanes = [];
	}

	create(lane) {
		// If `notes` aren't provided for some reason,
		// default to an empty array.
		lane.notes = lane.notes || [];

		this.setState({
			lanes: this.lanes.concat(lane)
		});
	}

	update(updatedLane) {
		this.setState({
			lanes: this.lanes.map(lane => {
				if (lane.id === updatedLane.id) {
					return Object.assign({}, lane, updatedLane);
				}

				return lane;
			})
		});
	}

	delete(id) {
		// NOTE: we could also delete the notes belonging to the lane
		// or we could leave them alone and even create a recycle bin
		// based on orphaned notes
		this.setState({
			lanes: this.lanes.filter(lane => lane.id !== id)
		});
	}

	attachToLane({laneId, noteId}) {
		this.setState({
			lanes: this.lanes.map(lane => {
				// remove note if already exists in any lane
				if (lane.notes.includes(noteId)) {
					lane.notes = lane.notes.filter(note => note !== noteId);
				}
				// append note at the end of the correct lane
				if (lane.id === laneId) {
					lane.notes = lane.notes.concat([noteId]);
				}

				return lane;
			})
		});
	}

	detachFromLane({laneId, noteId}) {
		this.setState({
			lanes: this.lanes.map(lane => {
				if (lane.id === laneId) {
					lane.notes = lane.notes.filter(note => note !== noteId);
				}

				return lane;
			})
		});
	}

	move({sourceId, targetId}) {
		console.log(`source: ${sourceId}, target: ${targetId}`);
	}
}
