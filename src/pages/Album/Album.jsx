import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import InfiniteScroll from 'react-infinite-scroll-component';
import TrackVisibility from 'react-on-screen';
import smoothscroll from 'smoothscroll-polyfill';

import Photo from '../../components/Photo/Photo';

import chevronUp from '../../assets/icons/chevron-up.svg';
import logo from '../../assets/logo.png';

import './Album.scss';

smoothscroll.polyfill();

function Album(props) {
	// State
	// const apiUrl = 'http://localhost:3003';
	const apiUrl = 'https://susiejetta.com/api';

	const [dataSize, setDataSize] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [more, setMore] = useState(true);
	const [photoCols, setPhotoCols] = useState([[], []]);
	const [errorMsg, setErrorMsg] = useState('');
	const [showScroll, setShowScroll] = useState(false);
	const [photoAlbum, setPhotoAlbum] = useState([]);
	const [shuffled, setShuffled] = useState([]);
	const [lastIndex, setLastIndex] = useState(0);

	// Functions
	function shufflePhotos(arr) {
		// shuffle
		let shuffledDeck = arr;
		for (let i = 0; i < shuffledDeck.length; i++) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
		}
		// Top 4
		let top4 = [];
		for (let i = 1; i < 5; i++) {
			let top = shuffledDeck.find((t) => t === `top${i}.jpg`);
			if (top !== undefined) {
				top4.push(top);
				shuffledDeck.splice(shuffledDeck.indexOf(top), 1);
			}
		}
		if (top4.length) {
			shuffledDeck = top4.concat(shuffledDeck);
		}

		return shuffledDeck;
	}

	const fetchAlbum = async () => {
		try {
			const response = await fetch(`${apiUrl}/photos?album=${props.albumName}`, {
				method: 'GET',
			});
			const res = await response.json();
			setPhotoAlbum(res.photos);
		} catch (err) {
			console.log('FETCH PHOTOS ERROR:', err);
			setErrorMsg(err);
		}
	};

	const fetchPhotos = (page, pageSize) => {
		const nextPhotos = shuffled.slice(lastIndex, lastIndex + pageSize);
		const anyPhotos = nextPhotos.length;
		if (anyPhotos) {
			setDataSize(dataSize + anyPhotos);
			let newPhotoCols = [...photoCols];
			for (let i = 0; i < anyPhotos; i++) {
				if (i % 2 === 0) {
					console.log('i is even', i);
					newPhotoCols[0].push(nextPhotos[i]);
				} else {
					console.log('i is odd', i);
					newPhotoCols[1].push(nextPhotos[i]);
				}
			}
			console.log('newPhoto cols?: ', newPhotoCols);
			setPhotoCols(newPhotoCols);
		} else {
			setMore(false);
		}
		setCurrentPage(page);
		setLastIndex(lastIndex + pageSize);
	};

	const checkScrollTop = () => {
		if (!showScroll && window.pageYOffset > 400) {
			setShowScroll(true);
		} else {
			setShowScroll(false);
		}
	};

	const scrollTop = () => {
		setTimeout(function () {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}, 1);
	};

	// Effects
	useEffect(() => {
		window.addEventListener('scroll', checkScrollTop);

		return () => {
			removeEventListener('scroll', checkScrollTop);
		};
	}, []);

	useEffect(() => {
		setPhotoAlbum([]);
		setPhotoCols([[], []]);
		setMore(true);
		setDataSize(0);
		setShuffled([]);
		setLastIndex(0);
		fetchAlbum();
	}, [props.albumName]);

	useEffect(() => {
		if (photoAlbum && !shuffled.length) {
			setShuffled(shufflePhotos(photoAlbum));
		}
	}, [photoAlbum]);

	useEffect(() => {
		if (shuffled.length) {
			// initial fetch of 6
			fetchPhotos(1, 4);
		}
	}, [shuffled]);

	return (
		<div className="page album">
			{errorMsg ? <p>{errorMsg.message}</p> : <></>}
			<InfiniteScroll
				dataLength={dataSize}
				next={() => fetchPhotos(currentPage + 1, 2)}
				hasMore={more}
				scrollThreshold={0.5}
				endMessage={
					<div className="logo-container">
						<img src={logo} alt="Susie Jetta" />
					</div>
				}
			>
				<div className={`photo-album col-2`}>
					{photoCols &&
						photoCols.map((photoCol, i) => (
							<div className="photo-column" key={i}>
								{photoCol.map((photo, j) => (
									<TrackVisibility partialVisibility once key={j}>
										<Photo albumName={props.albumName} photo={photo} />
									</TrackVisibility>
								))}
							</div>
						))}
				</div>
			</InfiniteScroll>

			<button
				className="scroll-to-top-button"
				style={{ display: showScroll ? 'flex' : 'none' }}
				onClick={scrollTop}
			>
				<img src={chevronUp} alt="Scroll to top" />
			</button>
		</div>
	);
}

export default Album;

Album.propTypes = {
	albumName: PropTypes.string,
};
