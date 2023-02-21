import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Album from './pages/Album/Album.jsx';
import About from './pages/About/About.jsx';
import Packages from './pages/Packages/Packages.jsx';
import Contact from './pages/Contact/Contact.jsx';
import PageNotFound from './pages/PageNotFound/PageNotFound.jsx';
import Header from './components/Header/Header.jsx';

import './styles/App.scss';

window.onbeforeunload = function () {
	// Set scroll to top on refresh
	window.scrollTo(0, 0);
};

function App() {
	return (
		<div className="App">
			<Header />
			<Switch>
				<Route exact path="/">
					<Album albumName={'I'} />
				</Route>
				<Route exact path="/I">
					<Album albumName={'I'} />
				</Route>
				<Route exact path="/II">
					<Album albumName={'II'} />
				</Route>
				<Route exact path="/packages">
					<Packages />
				</Route>
				<Route exact path="/about">
					<About />
				</Route>
				<Route path="/contact">
					<Contact />
				</Route>
				<Route component={PageNotFound} />
			</Switch>
		</div>
	);
}

export default App;
