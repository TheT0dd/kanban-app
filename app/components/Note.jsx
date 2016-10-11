import React from 'react';
import {DragSource} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const noteSource = {
	beginDrag(props) {
		console.log('begin dragging note', props);

		return {};
	}
};

@DragSource(ItemTypes.NOTE, noteSource, (connect) => ({
	connectDragSource: connect.dragSource()
}))
class Note extends React.Component {
	render() {
		const {connectDragSource, children, ...props} = this.props;

		// In case we wanted to implement dragging based on a handle,
		// we could apply connectDragSource only to a specific part of a Note.
		return connectDragSource(
			<div {...props}>
				{children}
			</div>
		);
	}
}



export default Note;
