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
                  <h2 className="fadeInDown-1 light-color">Make America Draw Again!</h2>
                  <div className="fadeInDown-3">
                    <Link className="btn btn-large" to="/pickBackgroundImage">Draw Trump A Doodle Now!</Link>
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
                      Do you have a lot of feelings about the President Elect but no outlet to accurately express them? If so, you have found the right place! Here at Draw Trump a Doodle, we allow you to draw your emotionial response to Donald Drumpf, write a short personal message to Mr. Trump and with a click of a button, automatically send a post card with your personalized message to the White House!
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
                  <p>Magnis modipsae que voloratati andigen daepeditem quiate re porem aut labor. Laceaque quiae sitiorem rest non restibusaes maio es dem tumquam.</p>
                </header>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 inner-right-sm inner-top-sm">

                <h3>How long are the contracts?</h3>
                <p>Conecus iure posae volor remped modis aut accabora incim resto explabo eictemperum quiae sitiorem volor remped modis volor.</p>

                <h3>Can i switch plans later?</h3>
                <p>Conecus iure posae volor remped modis aut accabora incim resto explabo eictemperum quiae sitiorem volor remped modis volor.</p>

                <h3>What support options do i have?</h3>
                <p>Conecus iure posae volor remped modis aut accabora incim resto explabo eictemperum quiae sitiorem volor remped modis volor.</p>

              </div>
              <div className="col-sm-6 inner-left-sm inner-top-sm">
                <h3>Is there a setup fee?</h3>
                <p>Conecus iure posae volor remped modis aut accabora incim resto explabo eictemperum quiae sitiorem volor remped modis volor.</p>

                <h3>What types of payment methods are accepted?</h3>
                <p>Conecus iure posae volor remped modis aut accabora incim resto explabo eictemperum quiae sitiorem volor remped modis volor.</p>

                <h3>Can i cancel my account at any time?</h3>
                <p>Conecus iure posae volor remped modis aut accabora incim resto explabo eictemperum quiae sitiorem volor remped modis volor.</p>

              </div>
            </div>
          </div>
        </section>

      </div>
    );
  }
}

export default Home;
