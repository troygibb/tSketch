import React from 'react';
import { Link } from 'react-router';
import Atrament from './atrament';

class Home extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div id='home'>
				<Atrament />
				<h1>Welcome to Draw Trump a Doodle!</h1>
				<p>Do you have a lot of feelings about the President Elect but no outlet to accurately express them? If so, you have found the right place! Here at Draw Trump a Doodle, we allow you to draw your emotionial response to Donald Drumpf, write a short personal message to Mr. Trump and with a click of a button, automatically send a post card with your personalized message to the White House!
				</p>
				<Link to='/draw'>
					<button className='btn-default'>Draw Trump A Doodle Now!</button>
				</Link>
			</div>
		)
	}
}

export default Home; 