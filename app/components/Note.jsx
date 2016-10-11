import React from 'react';
import {compose} from 'redux';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

/**
 * Implements the drag source contract.
 */
const noteSource = {
	beginDrag(props) {
		console.log('begin dragging note', props);

		return {};
	}
};

const noteTarget = {
	hover(targetProps, monitor) {
		const sourceProps = monitor.getItem();

		console.log('dragging note', sourceProps, targetProps);
	}
};

class Note extends React.Component {
	render() {
		const {
			// injected by ReactDnD
			isDragging,
			connectDragSource,
			connectDropTarget,

			children,
			...props
		} = this.props;

		// In case we wanted to implement dragging based on a handle,
		// we could apply connectDragSource only to a specific part of a Note.
		return compose(connectDragSource, connectDropTarget)(
			<div {...props}>
				{children}
			</div>
		);
	}
}

export default compose(
	DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	})),
	DropTarget(ItemTypes.NOTE, noteTarget, (connect, monitor) => ({
		connectDropTarget: connect.dropTarget()
	}))
)(Note);
