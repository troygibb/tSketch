import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="home">
        <section id="hero">
          <div id="owl-main" className="owl-carousel owl-one-item">
            <div className="item img-bg-center homeHero">
              <div className="container">
                <div className="caption vertical-center text-center">
                  <h1 className="fadeInDown-1 light-color">Make America Draw Again!</h1>
                  <p className="fadeInDown-2 light-color">
                    Do you have a lot of feelings about the President Elect but no outlet to accurately express them? If so, you have found the right place! Here at Draw Trump a Doodle, we allow you to draw your emotionial response to Donald Drumpf, write a short personal message to Mr. Trump and with a click of a button, automatically send a post card with your personalized message to the White House!
                  </p>
                  <div className="fadeInDown-3">
                    <Link className="btn btn-large" to="/pickBackgroundImage">Draw Trump A Doodle Now!</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
