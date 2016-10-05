import React from 'react';
import classnames from 'classnames';

const Editable = ({editing, value, onEdit, className, ...props}) => {
	if (editing) {
		// {...props} - object spread operator
		return <Editable.Edit
			className={classnames('edit', className)}
			value={value}
			onEdit={onEdit}
			{...props}
			/>;
	}

	return <Editable.Value value={value} className={classnames('value', className)} />;
};

// Namespaced Component: Editable.Value
Editable.Value = ({value, ...props}) => <span {...props}>{value}</span>;

// Namespaced Componens: Editable.Edit
Editable.Edit = class Edit extends React.Component {
	render() {
		// ES7 - Rest operator in object destructuring
		const {value, onEdit, ...props} = this.props;

		return <input
				type="text"
				autoFocus={true}
				defaultValue={value}
				onBlur={this.finishEdit}
				onKeyPress={this.checkEnter}
				{...props} />;
	}
	checkEnter = (e) => {
		if (e.key === 'Enter') {
			this.finishEdit(e);
		}
	}
	finishEdit = (e) => {
		const value = e.target.value;

		if (this.props.onEdit) {
			this.props.onEdit(value);
		}
	}
};


export default Editable;
