import React from 'react';

import logo from '../../assets/logo.png';
import instagram from '../../assets/icons/instagram.svg';
import youTube from '../../assets/icons/youtube.svg';

import './Contact.scss';

function Contact(props) {
  return (
    <div className="page contact">
      <div className="logo-container">
        <img src={logo} alt="Susie Jetta" />
      </div>
      <div className="email-insta">
        <a href="mailto:susiejetta@gmail.com">susiejetta@gmail.com</a>
        <a
          className="instagram"
          href="https://www.instagram.com/susiejetta/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={instagram} alt="Instagram" />
        </a>
        <a
          className="youtube"
          href="https://www.youtube.com/channel/UCiV7zs_StQ6yv03WnLKy0vg"
          target="_blank"
          rel="noreferrer"
        >
          <img src={youTube} alt="YouTube" />
        </a>
      </div>
    </div>
  );
}

export default Contact;
