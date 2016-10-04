import React from 'react';

// exract notes from props argument (es6 destructuring)
export default ({notes}) => (
    <ul>{notes.map(note => <li key={note.id}>{note.task}</li>)}</ul>
);
