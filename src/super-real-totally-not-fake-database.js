require('babel-polyfill');

const counter = (() => {
  let count = 0;
  return {
    increment() {
      return count++;
    }
  };
})();

const isFunction = fn => typeof fn === 'function';
const callIfFunction = (fn, ...args) => {
  isFunction(fn) && fn(...args);
};

const create = record => ({ ...record, id: counter.increment() });

const createArtist = artist => ({
  ...create(artist),
  albums: []
});

const addAlbumToArtist = (artist, album) => {
  artist.albums = [...artist.albums, album.id];
  album.artist = artist.id;
  return album;
};

const createAlbum = artist => album => ({
  ...addAlbumToArtist(artist, create(album)),
  songs: []
});

const addSongToAlbum = (album, song) => {
  album.songs = [...album.songs, song.id];
  song.album = album.id;
  return song;
};

const createSong = album => song => ({
  ...addSongToAlbum(album, create(song))
});

const artists = {
  rollingStones: createArtist({ name: 'Rolling Stones' }),
  beatles: createArtist({ name: 'The Beatles' }),
  jimiHendrix: createArtist({ name: 'The Jimi Hendrix Experience' })
};

const createRollingStonesAlbum = createAlbum(artists.rollingStones);
const createBeatlesAlbum = createAlbum(artists.beatles);
const createJimiHendixAlbum = createAlbum(artists.jimiHendrix);

const rollingStonesAlbums = {
  exileOnMainStreet: createRollingStonesAlbum({
    title: 'Exile on Main Street'
  }),
  beggarsBanquet: createRollingStonesAlbum({ title: 'Beggars Banquet' })
};

const beatlesAlbums = {
  rubberSoul: createBeatlesAlbum({ title: 'Rubber Soul' }),
  revolver: createBeatlesAlbum({ title: 'Revolver' })
};

const hendrixAlbums = {
  axisBoldAsLove: createJimiHendixAlbum({ title: 'Axis: Bold as Love' }),
  electricLadyLand: createJimiHendixAlbum({ title: 'Electric Ladyland' })
};

const albums = { ...rollingStonesAlbums, ...beatlesAlbums, ...hendrixAlbums };

let songs = [
  ...[
    { title: 'EXP' },
    { title: 'Up from the Skies' },
    { title: 'Spanish Castle Magic' },
    { title: 'Wait Until Tomorrow' },
    { title: "Ain't No Telling" },
    { title: 'Little Wing' },
    { title: 'If 6 Was 9' },
    { title: "You Got Me Floatin'" },
    { title: 'Castles Made of Sand' },
    { title: "She's So Fine" },
    { title: 'One Rainy Wish' },
    { title: 'Little Miss Lover' },
    { title: 'Bold as Love' }
  ].map(createSong(hendrixAlbums.axisBoldAsLove)),
  ...[
    { title: 'And the Gods Made Love' },
    { title: 'Have You Ever Been (To Electric Ladyland)' },
    { title: 'Crosstown Traffic' },
    { title: 'Voodoo Chile' },
    { title: 'Little Miss Strange' },
    { title: 'Long Hot Summer Night' },
    { title: 'Come On (Part I)' },
    { title: 'Gypsy Eyes' },
    { title: 'Burning of the Midnight Lamp' },
    { title: 'Rainy Day, Dream Away' },
    { title: '1983... (A Merman I Should Turn to Be)' },
    { title: 'Moon, Turn the Tides...Gently Gently Away' },
    { title: 'Still Raining, Still Dreaming' },
    { title: 'House Burning Down' },
    { title: 'All Along the Watchtower' },
    { title: 'Voodoo Child (Slight Return)' }
  ].map(createSong(hendrixAlbums.electricLadyLand)),
  ...[
    { title: 'Sympathy for the Devil' },
    { title: 'No Expectations' },
    { title: 'Dear Doctor' },
    { title: 'Parachute Woman' },
    { title: 'Jigsaw Puzzle' },
    { title: 'Street Fighting Man' },
    { title: 'Prodigal Son' },
    { title: 'Stray Cat Blues' },
    { title: 'Factory Girl' },
    { title: 'Salt of the Earth' }
  ].map(createSong(rollingStonesAlbums.beggarsBanquet)),
  ...[
    { title: 'Rocks Off' },
    { title: 'Rip This Joint' },
    { title: 'Shake Your Hips' },
    { title: 'Casino Boogie' },
    { title: 'Tumbling Dice' },
    { title: 'Sweet Virginia' },
    { title: 'Torn and Frayed' },
    { title: 'Sweet Black Angel' },
    { title: 'Loving Cup' },
    { title: 'Happy' },
    { title: 'Turd on the Run' },
    { title: 'Ventilator Blues' },
    { title: 'I Just Want to See His Face' },
    { title: 'Let It Loose' },
    { title: 'All Down the Line' },
    { title: 'Stop Breaking Down' },
    { title: 'Shine a Light' },
    { title: 'Soul Survivor' }
  ].map(createSong(rollingStonesAlbums.exileOnMainStreet)),
  ...[
    { title: 'Taxman' },
    { title: 'Eleanor Rigby' },
    { title: "I'm Only Sleeping" },
    { title: 'Love You To' },
    { title: 'Here, There and Everywhere' },
    { title: 'Yellow Submarine' },
    { title: 'She Said She Said' },
    { title: 'Good Day Sunshine' },
    { title: 'And Your Bird Can Sing' },
    { title: 'For No One' },
    { title: 'Doctor Robert' },
    { title: 'I Want to Tell You' },
    { title: 'Got to Get You into My Life' },
    { title: 'Tomorrow Never Knows' }
  ].map(createSong(beatlesAlbums.revolver)),
  ...[
    { title: 'Drive My Car' },
    { title: 'Norwegian Wood (This Bird Has Flown)' },
    { title: "You Won't See Me" },
    { title: 'Nowhere Man' },
    { title: 'Think for Yourself' },
    { title: 'The Word' },
    { title: 'Michelle' },
    { title: 'What Goes On' },
    { title: 'Girl' },
    { title: "I'm Looking Through You" },
    { title: 'In My Life' },
    { title: 'Wait' },
    { title: 'If I Needed Someone' },
    { title: 'Run for Your Life' }
  ].map(createSong(beatlesAlbums.rubberSoul))
];

const generateAnswerKey = () => {
  const answer = {
    artists: Object.values(artists)
  };

  answer.artists = answer.artists.map(a => ({
    ...a,
    albums: a.albums.map(id => Object.values(albums).find(al => al.id === id))
  }));

  answer.artists.forEach(artist => {
    artist.albums = artist.albums.map(album => ({
      ...album,
      songs: album.songs.map(id => songs.find(s => s.id === id))
    }));
  });

  return answer;
};

const handleResponse = async (result, callback, type, id) => {
  if (result) {
    callIfFunction(callback, null, result);
    return await new Promise((resolve) => resolve(result));
  } else {
    const error = id ? `There is no ${type} with the ID of ${id}.` : `Could not find ${type}s.`;
    callIfFunction(callback, error, result);
    return await new Promise((resolve, reject) => reject(error));
  }
};

const Database = {
  async findArtist(id, callback) {
    const result = Object.values(artists).find(a => id === a.id);
    return await handleResponse(result, callback, 'artist', id);
  },
  async findAllArtists(callback) {
    const result = Object.values(artists);
    return await handleResponse(result, callback, 'artist');
  },
  async findAlbum(id, callback) {
    const result = Object.values(albums).find(a => id === a.id);
    return await handleResponse(result, callback, 'album', id);
  },
  async findAllAlbums(callback) {
    const result = Object.values(albums);
    return await handleResponse(result, callback, 'album');
  },
  async findSong(id, callback) {
    const result = songs.find(s => id === s.id);
    return await handleResponse(result, callback, 'song', id);
  },
  async findAllSongs(callback) {
    const result = songs;
    return await handleResponse(result, callback, 'song');
  }
};

export default Database;
export { generateAnswerKey, artists, albums, songs };
