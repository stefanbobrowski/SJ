import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import InfiniteScroll from 'react-infinite-scroll-component';
import smoothscroll from 'smoothscroll-polyfill';

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
  const [tempPhotos, setTempPhotos] = useState([]);
  const [photoCols, setPhotoCols] = useState([[], []]);
  const [errorMsg, setErrorMsg] = useState('');
  const [showScroll, setShowScroll] = useState(false);

  // Functions

  const fetchPhotos = async (page, pageSize) => {
    console.log('fetching photos', page, apiUrl);

    setCurrentPage(page);

    try {
      const response = await fetch(
        `${apiUrl}/photos?album=${props.albumName}&pageNum=${page}&pageSize=${pageSize}`,
        {
          method: 'GET',
        },
      );
      const res = await response.json();
      console.log('log the res', res);

      if (res.photos.length) {
        setTempPhotos(res.photos);
      } else {
        setMore(false);
      }
    } catch (err) {
      console.log(err);
      setErrorMsg(err);
    }
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
    fetchPhotos(0, 4);
  }, [props.albumName]);

  useEffect(() => {
    if (tempPhotos.length) {
      const middle = Math.floor(tempPhotos.length / 2);
      const left = tempPhotos.slice(0, middle);
      const right = tempPhotos.slice(middle);

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
    }
  }, [tempPhotos]);

  return (
    <div className="page album">
      {errorMsg ? <p>{errorMsg.message}</p> : <></>}
      <InfiniteScroll
        dataLength={dataSize}
        next={() => fetchPhotos(currentPage + 1, 2)}
        hasMore={more}
        scrollThreshold={0.8}
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
                  <Photo albumName={props.albumName} photo={photo} key={j} />
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
