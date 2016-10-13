import React from 'react';
import {compose} from 'redux';
import Lanes from './Lanes';
import LaneActions from '../actions/LaneActions';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import connect from 'connect-alt';
import uuid from 'uuid';


class App extends React.Component {

	render() {
		const {lanes} = this.props;
		return (
			<div>
				<button className="add-lane" onClick={this.addLane}>+</button>
				<Lanes lanes={lanes}/>
			</div>
		);
	}

	// Class Instance Field With an Arrow Function (ES8+)
	//
	// This method works by setting addLane to an arrow function one time when
	// the component is created. Inside render and in other functions, this.addLane
	// can be passed along without fear because the arrow function preserves the this binding.
	//
	// It is labelled “ES8+” because it’s not technically part of ES6 or ES7 (aka ES2016).
	// ES2016 has been finalized and only includes Array.prototype.includes and the exponentiation
	// operator, so if and when this makes it into the spec, it’ll likely be ES2017 (ES8) or
	// beyond.
	//
	// Even though this is supported by Babel, there’s a (small) risk that this feature could be
	// taken out of the spec and require some refactoring, but a lot of people are using it so it
	// seems likely that it’ll stay put.

	addLane = () => {
		LaneActions.create({id: uuid.v4(), name: 'New Lane'});
	}
}

export default compose(
	DragDropContext(HTML5Backend),
	// `connect-alt` higher order component that connects component to stores
	//
	// The component will only listen to change events emitted by the specified
	// stores (1st param, maybe be more than one separated by commas).
	// Last param is a reducer function that extracts data from the store.
	//
	// Connecting a component to a store, means the selected store state will be
	// available to the component under `this.props`.
	connect('LaneStore', ({ LaneStore: { lanes } }) => ({ lanes }))
)(App);
