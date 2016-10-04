import React from 'react';

import Note from './Note';


// exract notes from props argument (es6 destructuring)
// export default ({notes}) => (
//     <ul>{notes.map(note =>
// 		<li key={note.id}><Note task={note.task} /></li>
// 	)}</ul>
// );

export default ({
    notes,
    onDelete = () => {}
}) => (
    <ul>{notes.map(({id, task}) =>
		<li key={id}>
            <Note onDelete={onDelete.bind(null, id)} task={task}/>
        </li>
	)}</ul>
);
