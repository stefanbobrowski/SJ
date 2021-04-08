import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';

import Instagram from '../../assets/icons/instagram.svg';

import './Header.scss';

function Header() {
  const history = useHistory();

  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    const resizeListener = () => {
      const width =
        window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

      if (width > 767) {
        setShowMobileNav(false);
      }
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  useEffect(() => {
    return history.listen((location) => {
      console.log(`You changed the page to: ${location.pathname}`);
      setShowMobileNav(false);
    });
  }, [history]);

  return (
    <header>
      <Link to="/" className="home-link">
        susie jetta
      </Link>

      <nav className="desktop-nav">
        <NavLink exact activeClassName="is-active" to="/">
          I
        </NavLink>
        <NavLink exact activeClassName="is-active" to="/II">
          II
        </NavLink>
        <NavLink exact activeClassName="is-active" to="/III">
          III
        </NavLink>
        <NavLink exact activeClassName="is-active" to="/about">
          about
        </NavLink>
        <NavLink exact activeClassName="is-active" to="/contact">
          contact
        </NavLink>
        <a className="instagram" href="https://www.instagram.com/susiejetta/">
          <img src={Instagram} alt="instagram" />
        </a>

        <button
          className={`mobile-nav-button ${showMobileNav ? 'close' : 'open'}`}
          onClick={() => setShowMobileNav(!showMobileNav)}
        >
          <div className="line-1"></div>
          <div className="line-2"></div>
        </button>
      </nav>

      <nav className={`mobile-nav ${showMobileNav ? 'show' : ''}`}>
        <NavLink exact activeClassName="is-active" to="/">
          I
        </NavLink>
        <NavLink exact activeClassName="is-active" to="/II">
          II
        </NavLink>
        <NavLink exact activeClassName="is-active" to="/III">
          III
        </NavLink>
        <NavLink exact activeClassName="is-active" to="/about">
          about
        </NavLink>
        <NavLink exact activeClassName="is-active" to="/contact">
          contact
        </NavLink>
        <a className="instagram" href="https://www.instagram.com/susiejetta/">
          <img src={Instagram} alt="instagram" />
        </a>
      </nav>
    </header>
  );
}

export default Header;
