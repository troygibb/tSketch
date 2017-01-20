import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { changeBackgroundImage } from './actions';

class PickBackgroundImage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const backgrounds = [
      [{
        url: '/images/backgrounds/blank.jpg',
        caption: 'Blank',
      }, {
        url: '/images/backgrounds/1.jpg',
        caption: 'Caption',
      }, {
        url: '/images/backgrounds/2.jpg',
        caption: 'Caption',
      }], [{
        url: '/images/backgrounds/3.jpg',
        caption: 'Caption',
      }, {
        url: '/images/backgrounds/4.jpg',
        caption: 'Caption',
      }, {
        url: '/images/backgrounds/5.jpg',
        caption: 'Caption',
      }], [{
        url: '/images/backgrounds/6.jpg',
        caption: 'Caption',
      }, {
        url: '/images/backgrounds/7.jpg',
        caption: 'Caption',
      }, {
        url: '/images/backgrounds/8.jpg',
        caption: 'Caption',
      }], [{
        url: '/images/backgrounds/9.jpg',
        caption: 'Caption',
      }, {
        url: '/images/backgrounds/10.jpg',
        caption: 'Caption',
      }, {
        url: '/images/backgrounds/11.jpg',
        caption: 'Caption',
      }],
    ];
    return (
      <div className="container bodyWrapper pickBackground">
        {backgrounds.map((row) => {
          return (
            <div className="isotope items col-3 gap row">
              {row.map((background) => {
                return (
                  <div className="col-md-4">
                    <li className="item thumb interactive">
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
                              className="pickBackground__preview" src={background.url}
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
        <Link to="/draw">
          Next
        </Link>
      </div>
    );
  }
}


export default connect(null, { changeBackgroundImage })(PickBackgroundImage);
