import React from 'react';
import Note from './Note';
import Editable from './Editable';
import LaneActions from '../actions/LaneActions';


export default class Notes extends React.Component {

	render() {
		const {
			notes,
			onNoteClick = () => {},
			onEdit = () => {},
			onDelete = () => {}
		} = this.props;

		return (
			<ul className="notes"> {notes.map(({id, editing, task}) =>
				<li key={id}>
					<Note
						className="note"
						id={id}
						onClick={onNoteClick.bind(null, id)}
						onMove={this.onMove}>

						<Editable
							className="editable"
							editing={editing}
							value={task}
							onEdit={onEdit.bind(null, id)}
							/>
						<button className="delete" onClick={onDelete.bind(null, id)}>x</button>
					</Note>
				</li>
			)} </ul>
		);
	}

	onMove = ({sourceId, targetId}) => {
		LaneActions.move({sourceId, targetId});
	}
}
