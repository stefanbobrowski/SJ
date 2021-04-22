import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// import TrackVisibility from 'react-on-screen';
import InfiniteScroll from 'react-infinite-scroll-component';

import Photo from '../../components/Photo/Photo';
import chevronUp from '../../assets/icons/chevron-up.svg';

import './Album.scss';

function Album(props) {
  const [photoCols, setPhotoCols] = useState([[], []]);
  const [showScroll, setShowScroll] = useState(false);
  // const [allLoaded, setAllLoaded] = useState(false);

  const [apiURI, setApiUri] = useState('http://localhost:3003');
  // const [apiURI, setApiUri] = useState('https://stefanbobrowski.com/api/exercise-logs');

  const [tempPhotos, setTempPhotos] = useState([]);
  const [dataSize, setDataSize] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [more, setMore] = useState(true);

  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);

    return () => {
      removeEventListener('scroll', checkScrollTop);
    };
  }, []);

  useEffect(() => {
    // console.log('Album props: ', props.albumName);
    setPhotoCols([[], []]);
    setCurrentPage(1);
    fetchPhotos(currentPage);
  }, [props.albumName]);

  useEffect(() => {
    if (tempPhotos.length) {
      const middle = Math.ceil(tempPhotos.length / 2);
      const left = tempPhotos.slice(0, middle);
      const right = tempPhotos.slice(middle);

      // console.log(left);
      // console.log(right);

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

  // const finishLoading = () => {
  //   setAllLoaded(true);

  //   setTimeout(function () {
  //     window.scrollTo({ top: 1, behavior: 'smooth' });
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //   }, 300);
  // };

  const fetchPhotos = async () => {
    console.log('fetching photos', currentPage);

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    try {
      const response = await fetch(
        `${apiURI}/photos?album=${props.albumName}&pageNum=${nextPage}`,
        {
          method: 'GET',
        },
      );
      const res = await response.json();
      console.log(res);

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

  return (
    <div className="page album">
      {errorMsg ? <p>{errorMsg.message}</p> : <></>}
      <InfiniteScroll
        dataLength={dataSize} //This is important field to render the next data
        next={fetchPhotos}
        hasMore={more}
        loader={
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>{' '}
          </div>
        }
        scrollThreshold={0.95}
        // scrollThreshold={'100px'}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
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
