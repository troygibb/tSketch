import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';

import { changeBackgroundImage } from './actions';

class PickBackgroundImage extends React.Component {
  render() {
    const backgrounds = [
      [{
        url: '/images/backgrounds/blank.jpg',
        caption: 'Blank',
      }, {
        url: '/images/backgrounds/1.jpg',
        caption: 'Potato Face Trump',
      }, {
        url: '/images/backgrounds/2.jpg',
        caption: 'Two Thumbs Trump',
      }], [{
        url: '/images/backgrounds/3.jpg',
        caption: 'Trump Bullying iPhone',
      }, {
        url: '/images/backgrounds/4.jpg',
        caption: 'Small Hands Trump',
      }, {
        url: '/images/backgrounds/5.jpg',
        caption: 'Butter Face Trump',
      }], [{
        url: '/images/backgrounds/6.jpg',
        caption: 'Smaller Hands Trump',
      }, {
        url: '/images/backgrounds/7.jpg',
        caption: 'Whistling Trump',
      }, {
        url: '/images/backgrounds/8.jpg',
        caption: 'Baby Trump',
      }], [{
        url: '/images/backgrounds/9.jpg',
        caption: 'Bamboozled Trump',
      }, {
        url: '/images/backgrounds/10.jpg',
        caption: 'Small Wagging Finger Trump',
      }, {
        url: '/images/backgrounds/11.jpg',
        caption: 'Smaller Wagging Finger Trump',
      }],
    ];
    return (
      <div className="container bodyWrapper pickBackground">
        {backgrounds.map((row) => {
          return (
            <div className="isotope items col-3 gap row" key={uuid.v4()}>
              {row.map((background) => {
                return (
                  <div className="col-md-4" key={uuid.v4()}>
                    <li className="item thumb interactive" >
                      <a
                        href="#"
                        onClick={
                        (e) => {
                          e.preventDefault();
                          this.props.changeBackgroundImage(background.url);
                        }}
                      >
                        <figure>
                          <div className="icon-overlay icn-link">
                            <img
                              className="pickBackground__preview" src={background.url.replace('.jpg', '-small.jpg')}
                              alt=""
                            />
                          </div>
                          <figcaption className="bordered no-top-border">
                            <div className="info">
                              <h4>{background.caption}</h4>
                            </div>
                          </figcaption>
                        </figure>
                      </a>
                    </li>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}


export default connect(null, { changeBackgroundImage })(PickBackgroundImage);
