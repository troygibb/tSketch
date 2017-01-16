import React from 'react';

import Draw from './draw';
import PostMessage from './postMessage';
import Message from './message';

class EditPage extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Draw />
				<Message />
				<PostMessage />
			</div>
		)
	}
}

export default EditPage; 