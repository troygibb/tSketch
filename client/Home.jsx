import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div id='home'>
				<div className='heroSection__wrapper'>
					<div className='container'>
						<div className='row'>
							<div className='col-lg-6'>
								<h1 className='heroSection__heading'>Welcome to Draw Trump a Doodle!</h1>
								<p className='heroSection__text'>Do you have a lot of feelings about the President Elect but no outlet to accurately express them? If so, you have found the right place! Here at Draw Trump a Doodle, we allow you to draw your emotionial response to Donald Drumpf, write a short personal message to Mr. Trump and with a click of a button, automatically send a post card with your personalized message to the White House!</p>
							</div>
							<div className="col-lg-6"></div>
						</div>
						<div className='row'>
							<div className='col-lg-8 col-lg-offset-2'>
								<div className='heroSection__CTAWrapper text-center'>
									<h2 className='heroSection__CTAHeading'>Make America Draw Again</h2>
									<Link to='/draw'>
										<button className='btn btn-lg heroSection__CTAButton'>Draw Trump A Doodle Now!</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='aboutSection__wrapper'>
					<div className='container'>
						<div className='row'>
							<h2 className='text-center aboutSection__heading'>About the Project</h2>
							<div className='col-lg-6'>
								<p>
								We are going to make placeholder text great again. Greater than
								ever before. You could see there was text coming out of her eyes,
								text coming out of her wherever.
								</p>
								<p>
								When other websites give you text, they’re not sending the best.
								They’re not sending you, they’re sending words that have lots of
								problems and they’re bringing those problems with us. They’re
								bringing mistakes. They’re bringing misspellings. They’re typists…
								And some, I assume, are good words. The concept of Lorem Ipsum
								was created by and for the Chinese in order to make U.S. design
								jobs non-competitive. I know words. I have the best words. I have
								a 10 year old son. He has words. He is so good with these words
								it's unbelievable. You have so many different things placeholder
								text has to be able to do, and I don't believe Lorem Ipsum has
								the stamina.
								</p>
							</div>
							<div className='col-lg-6'>
								<img className="aboutSection__image" src='http://previews.123rf.com/images/olesia/olesia1203/olesia120300064/12686332-Carrier-pigeon-with-a-bag-and-letter-in-a-bill-Stock-Photo-cartoon.jpg'/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Home;
