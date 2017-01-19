import React from 'react';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="footer__wrapper">
        <a
          href="https://github.com/Greivancers/tSketch"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="footer__github"
            role="presentation"
            src="http://www.iconsplace.com/icons/preview/white/github-256.png"
          />
          Github
        </a>
        { this.props.children }
      </div>
    );
  }
}

export default Footer;
