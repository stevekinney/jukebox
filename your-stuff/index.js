import Database from "../my-stuff/super-real-totally-not-fake-database";

const getAlbumsForArtist = artist => {
  return new Promise((resolve, reject) => {
    Promise.all(
      artist.albums.map(id => Database.findAlbum(id))
    ).then(albums => {
      resolve({ ...artist, albums });
    });
  });
};

const getAlbumsForArtists = artists => {
  return Promise.all(artists.map(getAlbumsForArtist));
};

const getSongsForAlbum = album => {
  return new Promise((resolve, reject) => {
    Promise.all(album.songs.map(id => Database.findSong(id))).then(songs => {
      resolve({ ...album, songs });
    });
  });
};

const getSongsForArtist = artist => {
  return new Promise((resolve, reject) => {
    Promise.all(artist.albums.map(getSongsForAlbum)).then(albums => {
      resolve({ ...artist, albums });
    });
  });
};

const getSongsForArtists = artists => {
  return Promise.all(artists.map(getSongsForArtist));
};

const toObject = artists => ({ artists });

export default () => {
  return new Promise((resolve, reject) => {
    Database.findAllArtists()
      .then(getAlbumsForArtists)
      .then(getSongsForArtists)
      .then(toObject)
      .then(resolve)
      .catch(reject);
  });
};
