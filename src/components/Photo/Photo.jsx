/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import './Photo.scss';

const Photo = (props) => {
	const [loaded, setLoaded] = useState(false);

	const handleLoad = () => {
		setLoaded(true);
	};

	return (
		<div className={`photo ${loaded ? 'loaded' : ''} ${props.isVisible ? 'visible' : ''}`}>
			<img
				src={process.env.PUBLIC_URL + `albums/${props.albumName}/` + props.photo}
				// loading="lazy"
				alt="photo"
				onLoad={handleLoad}
			/>
		</div>
	);
};

export default Photo;
