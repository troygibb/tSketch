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
                  <div className="fadeInDown-3">
                    <Link className="btn btn-large btn-red" to="/pickBackgroundImage">
                      Draw Trump A Doodle Now!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="who-we-are" className="dark-bg">
          <div className="container inner-top inner-bottom-sm">
            <div className="row">
              <div className="col-md-8 col-sm-9 center-block text-center">
                <header>
                  <h1>WTF Is This?</h1>
                  <p>
                      Do you have a lot of feelings about the new President but no outlet to accurately express them? If so, you have found the right place! Here at Draw Trump a Doodle, we allow you to draw your emotionial response to Mr. Trump, write a short personal message and with a click of a button we will print out a 4" x 6" postcard with your doodle and message and mail it to the White House!
                  </p>
                </header>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="light-bg">
          <div className="container inner">

            <div className="row">
              <div className="col-md-8 col-sm-9 center-block text-center">
                <header>
                  <h1>Questions?</h1>
                  <p>With a service as great as this, you surely have some questions.</p>
                </header>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 inner-right-sm inner-top-sm">

                <h3>How much does it cost?</h3>
                <p>We are charging $2 per postcard to cover the cost of printing and postage. Expressing your feelings to the President with high resolution doodles has never been cheaper!</p>

                <h3>Can I really draw anything I want?</h3>
                <p>Yes! We are unopinionated and support anyone willing to express their feelings.</p>

                <h3>Will Donald Trump read my postcard?</h3>
                <p>Given his history of Trump responding to his Twitter feed, there’s a good chance your card will draw his ire!</p>

              </div>
              <div className="col-sm-6 inner-left-sm inner-top-sm">
                <h3>Will my doodle and message really be sent to the White House?</h3>
                <p>You bet they are! We are using a service called <a href="https://lob.com/" target="_blank">Lob</a> that prints out and sends postcards with the click of a button! Once you pay and submit, your postcard(s) will be mailed via USPS within the next business day. If you’re wondering, the postcards will be sent to the address: “The White House, 1600 Pennsylvania Avenue NW, Washington DC, 20500"</p>

                <h3>Will my postcard be made available in the DrawTrumpADoodle gallery ?</h3>
                <p>Yes! But your personal information will remain anonymous.</p>

              </div>
            </div>
          </div>
        </section>

      </div>
    );
  }
}

export default Home;
