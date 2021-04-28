import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import InfiniteScroll from 'react-infinite-scroll-component';
import smoothscroll from 'smoothscroll-polyfill';
import TrackVisibility from 'react-on-screen';

import Photo from '../../components/Photo/Photo';

import chevronUp from '../../assets/icons/chevron-up.svg';
import logo from '../../assets/logo.png';

import './Album.scss';

smoothscroll.polyfill();

function Album(props) {
  // State
  const [apiUrl, setApiUrl] = useState('http://localhost:3003');
  // const [apiUrl, setApiUrl] = useState('https://susiejetta.com/api');

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
  function shufflePhotos(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
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

    if (nextPhotos) {
      const middle = Math.floor(nextPhotos.length / 2);
      const left = nextPhotos.slice(0, middle);
      const right = nextPhotos.slice(middle);

      let clone = photoCols;

      if (!clone.length) {
        clone.push(left);
        clone.push(right);
      } else {
        let l = clone[0];
        let r = clone[1];
        l = [...l, ...left];
        r = [...r, ...right];
        setDataSize(dataSize + l.length + r.length);
        clone = [l, r];
      }

      setPhotoCols(clone);
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
    setPhotoCols([[], []]);
    setMore(true);
    setDataSize(0);
    setShuffled([]);
    fetchAlbum();
  }, [props.albumName]);

  useEffect(() => {
    if (photoAlbum.length && !shuffled.length) {
      setShuffled(shufflePhotos(photoAlbum));
    }
  }, [photoAlbum]);

  useEffect(() => {
    if (shuffled.length) {
      // initial fetch of 6
      fetchPhotos(1, 6);
    }
  }, [shuffled]);

  return (
    <div className="page album">
      {errorMsg ? <p>{errorMsg.message}</p> : <></>}
      <InfiniteScroll
        dataLength={dataSize}
        next={() => fetchPhotos(currentPage + 1, 2)}
        hasMore={more}
        scrollThreshold={0.9}
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
