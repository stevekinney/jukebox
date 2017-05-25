import Database from "../my-stuff/super-real-totally-not-fake-database";

const map = (collection, callback) => Promise.all(collection.map(callback));
const toObject = artists => ({ artists });

const getAlbumsForArtist = artist => {
  return new Promise((resolve, reject) => {
    map(artist.albums, Database.findAlbum).then(albums => {
      resolve({ ...artist, albums });
    });
  });
};

const getAlbumsForArtists = artists => map(artists, getAlbumsForArtist);

const getSongsForAlbum = album => {
  return new Promise((resolve, reject) => {
    map(album.songs, Database.findSong).then(songs => {
      resolve({ ...album, songs });
    });
  });
};

const getSongsForArtist = artist => {
  return new Promise((resolve, reject) => {
    map(artist.albums, getSongsForAlbum).then(albums => {
      resolve({ ...artist, albums });
    });
  });
};

const getSongsForArtists = artists => map(artists, getSongsForArtist);

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
