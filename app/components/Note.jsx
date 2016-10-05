import React from 'react';

export default class Note extends React.Component {
	render() {
		const {children, ...props} = this.props;
		return (
			<div {...props}>
				{children}
			</div>
		);
	}
}
