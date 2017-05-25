import Database from '../my-stuff/super-real-totally-not-fake-database';

const getDataForView = async () => {
  const artists = await Database.findAllArtists();

  for (let artist of artists) {
    artist.albums = await Promise.all(artist.albums.map(id => Database.findAlbum(id)));
    for (let album of artist.albums) {
      album.songs = await Promise.all(album.songs.map(id => Database.findSong(id)));
    }
  }

  return { artists };
};

export default getDataForView;
