import React from 'react';
import { Link } from 'react-router-dom';

import './PageNotFound.scss';

const PageNotFound = () => (
	<div className="page-not-found">
		<main>
			<div className="page-message">
				<h2>404</h2>
				<h4>Page not found</h4>
				<p>This page could not be found. Please make sure you have typed the correct URL.</p>
				<Link to="/">
					<span>Back Home</span>
				</Link>
			</div>
		</main>
	</div>
);

export default PageNotFound;
