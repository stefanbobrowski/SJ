import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';

import instagram from '../../assets/icons/instagram.svg';
import youTube from '../../assets/icons/youtube.svg';

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
			setShowMobileNav(false);
		});
	}, [history]);

	useEffect(() => {
		if (showMobileNav) {
			document.body.style.overflowY = 'hidden';
		} else {
			document.body.style.overflowY = 'auto';
		}
	}, [showMobileNav]);

	return (
		<header>
			<Link to="/" className="home-link">
				susie jetta
			</Link>

			<nav className="desktop-nav">
				<NavLink exact className="nav-link" activeClassName="is-active" to="/">
					I
				</NavLink>
				<NavLink exact className="nav-link" activeClassName="is-active" to="/II">
					II
				</NavLink>
				<NavLink exact className="nav-link" activeClassName="is-active" to="/packages">
					packages
				</NavLink>
				<NavLink exact className="nav-link" activeClassName="is-active" to="/about">
					about
				</NavLink>
				<NavLink exact className="nav-link" activeClassName="is-active" to="/contact">
					contact
				</NavLink>
				<a
					className="instagram"
					href="https://www.instagram.com/susiejetta/"
					target="_blank"
					rel="noreferrer"
				>
					<img src={instagram} alt="Instagram" title="Instagram" />
				</a>
				<a
					className="youtube"
					href="https://www.youtube.com/channel/UCiV7zs_StQ6yv03WnLKy0vg"
					target="_blank"
					rel="noreferrer"
				>
					<img src={youTube} alt="YouTube" title="YouTube" />
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
				<NavLink exact className="nav-link" activeClassName="is-active" to="/">
					I
				</NavLink>
				<NavLink exact className="nav-link" activeClassName="is-active" to="/II">
					II
				</NavLink>
				<NavLink exact className="nav-link" activeClassName="is-active" to="/packages">
					packages
				</NavLink>
				<NavLink exact className="nav-link" activeClassName="is-active" to="/about">
					about
				</NavLink>
				<NavLink exact className="nav-link" activeClassName="is-active" to="/contact">
					contact
				</NavLink>
				<a
					className="mobile-instagram"
					href="https://www.instagram.com/susiejetta/"
					target="_blank"
					rel="noreferrer"
				>
					<img src={instagram} alt="instagram" title="Instagram" />
				</a>
				<a
					className="mobile-youtube"
					href="https://www.youtube.com/channel/UCiV7zs_StQ6yv03WnLKy0vg"
					target="_blank"
					rel="noreferrer"
				>
					<img src={youTube} alt="YouTube" title="YouTube" />
				</a>
			</nav>
		</header>
	);
}

export default Header;
