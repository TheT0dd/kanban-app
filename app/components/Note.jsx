import React from 'react';
import {compose} from 'redux';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

/**
 * Implements the drag source contract.
 */
const noteSource = {
	beginDrag(props) {
		return {id: props.id};
	}
};

const noteTarget = {
	hover(targetProps, monitor) {
		// target is the note that is being hovered upon
		// source is the note being dragged over the target
		const targetId = targetProps.id;
		const sourceProps = monitor.getItem();
		const sourceId = sourceProps.id;

		if (sourceId !== targetId) {
			targetProps.onMove({sourceId, targetId});
		}
	}
};

class Note extends React.Component {
	render() {
		const {
			// injected by ReactDnD
			isDragging,
			connectDragSource,
			connectDropTarget,

			onMove, id, children, ...props
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
		// these properties are injected into the source note's props
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	})),
	DropTarget(ItemTypes.NOTE, noteTarget, (connect, monitor) => ({
		// these properties are injected into the target note's props
		connectDropTarget: connect.dropTarget()
	}))
)(Note);
