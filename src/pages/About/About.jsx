import React from 'react';

import './About.scss';

import logo from '../../assets/logo.png';

function About(props) {
  return (
    <div className="page about">
      <div className="about-container">
        <div className="logo-container">
          <img src={logo} alt="Susie Jetta" />
        </div>
        <p>
          I have been a photographer and director since I was 9 years old and I got my first paid
          photography gigs at 13. I then started to do make up at 16 and started charging girls in
          my school for beauty photoshoots. I moved to Florida after high school, attended beauty
          school, met a lot of people in the beauty industry as a make up artist and photographer,
          and became a beauty school drop out when I was 20. I started bartending to supplement
          income but it led me down a dark path.
        </p>

        <p>
          It wasn’t until 2017 that I got out of bartending and truly began to heal. My work started
          to flourish. Instead of bartending, I started working with kids and was able to enjoy my
          craft with zero stress again. I was born to be a photographer and highlight people’s
          beauty and authenticity. I have over 17+ years of experience with:{' '}
        </p>

        <ul>
          <li>Swim</li>
          <li>Editorial</li>
          <li>Beauty</li>
          <li>Fitness</li>
          <li>Lifestyle</li>
          <li>Music</li>
          <li>Photography</li>
          <li>Photojournalism</li>
          <li>Make up</li>
          <li>Styling</li>
          <li>Creative Direction</li>
        </ul>
        <p>- Susie Jetta</p>
      </div>
    </div>
  );
}

export default About;
