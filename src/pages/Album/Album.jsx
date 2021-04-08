import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './Album.scss';

function Album(props) {
  const albumRef = useRef();

  const [albums, setAlbums] = useState([
    {
      name: 'I',
      numColumns: 2,
      columns: [
        ['2000/2000', '1920/1080', '2000/2000'],
        ['1000/1000', '2000/2000', '1920/1080', '1920/1080'],
      ],
    },
    {
      name: 'II',
      numColumns: 3,
      columns: [
        ['1920/1080', '2000/2000', '2000/2000', '2000/2000'],
        ['2000/2000', '1920/1080', '2000/2000'],
        ['2000/2000', '2000/2000', '1920/1080', '1920/1080'],
      ],
    },
    {
      name: 'III',
      numColumns: 3,
      columns: [
        ['700/500', '400/300', '600/800', '100/200', '1920/1080', '300/300'],
        ['100/200', '1920/1080', '300/300', '700/500', '400/300', '600/800'],
        ['400/400', '300/400', '700/700', '700/500', '400/300', '600/800'],
      ],
    },
  ]);

  const [album, setAlbum] = useState({});

  const [showAlbum, setShowAlbum] = useState(false);

  const [albumSize, setAlbumSize] = useState(0);
  const [loadCount, setLoadCount] = useState(1);

  const [errorMessage, setErrorMessage] = useState('');

  const getAlbum = (albumName) => {
    albums.forEach((a) => {
      if (a.name === albumName) {
        console.log('yes this album', a);
        setAlbum(a);
        countPhotos(a);
      }
    });
  };

  const countPhotos = (a) => {
    let count = 0;
    a.columns.forEach((col) => {
      count += col.length;
    });
    setAlbumSize(count);
  };

  useEffect(() => {
    if (props) {
      console.log('PROPS', props);
      setAlbum({});
      setAlbumSize(0);
      setShowAlbum(false);
      setLoadCount(1);

      setTimeout(() => {
        console.log('Get album');
        getAlbum(props.albumName);
      }, 200);
    }
  }, [props]);

  const handleLoad = () => {
    setLoadCount(loadCount + 1);
    console.log(`Loading: ${loadCount}/${albumSize}`);
    if (loadCount >= albumSize) {
      console.log('Finished loading');
      setShowAlbum(true);
    }
  };

  return (
    <div className="page album">
      {album.columns && (
        <div className={`photo-album col-${album.numColumns} ${showAlbum ? 'show' : ''}`}>
          {album.columns.map((photoColumn, i) => (
            <div className="photo-column" key={i}>
              {photoColumn.map((photo, j) => (
                <div className="photo" key={j}>
                  <img
                    src={`https://picsum.photos/${photo}`}
                    alt="pic"
                    onLoad={() => handleLoad()}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {errorMessage && <h3 className="error"> {errorMessage} </h3>}
    </div>
  );
}

export default Album;

Album.propTypes = {
  albumName: PropTypes.string,
};
