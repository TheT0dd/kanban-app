import React from 'react';

import Note from './Note';

export default class Notes extends React.Component {
	render() {
		const {
			notes,
			onDelete = () => {}
		} = this.props;
		return (
			<ul>{notes.map((note) => <li key={note.id}>
				<Note onDelete={onDelete} item={note}/>
			</li>)}</ul>
		);
	}
}
