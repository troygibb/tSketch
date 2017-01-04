import React from 'react';
import LC from 'literallycanvas';

class Draw extends React.Component {
	constructor(props) {
		super(props);
	}
  render() {
  	return <div>
  		<LC.LiterallyCanvasReactComponent imageURLPrefix="../node_modules/literallycanvas/img" />
  	</div>;
  }
}

export default Draw;