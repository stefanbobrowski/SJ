import React from 'react';

import Instagram from '../../assets/icons/instagram.svg';

import './Contact.scss';

function Contact(props) {
  return (
    <div className="page contact">
      <div className="email-insta">
        <p>susiejetta@gmail.com</p>
        <a className="instagram" href="https://www.instagram.com/susiejetta/">
          <img src={Instagram} alt="instagram" />
        </a>
      </div>
    </div>
  );
}

export default Contact;
