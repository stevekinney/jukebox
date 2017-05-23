'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

require('babel-polyfill');

var counter = function () {
  var count = 0;
  return {
    increment: function increment() {
      return count++;
    }
  };
}();

var isFunction = function isFunction(fn) {
  return typeof fn === 'function';
};
var callIfFunction = function callIfFunction(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  isFunction(fn) && fn.apply(undefined, args);
};

var create = function create(record) {
  return _extends({}, record, { id: counter.increment() });
};

var createArtist = function createArtist(artist) {
  return _extends({}, create(artist), {
    albums: []
  });
};

var addAlbumToArtist = function addAlbumToArtist(artist, album) {
  artist.albums = [].concat(_toConsumableArray(artist.albums), [album.id]);
  album.artist = artist.id;
  return album;
};

var createAlbum = function createAlbum(artist) {
  return function (album) {
    return _extends({}, addAlbumToArtist(artist, create(album)), {
      songs: []
    });
  };
};

var addSongToAlbum = function addSongToAlbum(album, song) {
  album.songs = [].concat(_toConsumableArray(album.songs), [song.id]);
  song.album = album.id;
  return song;
};

var createSong = function createSong(album) {
  return function (song) {
    return _extends({}, addSongToAlbum(album, create(song)));
  };
};

var artists = {
  rollingStones: createArtist({ name: 'Rolling Stones' }),
  beatles: createArtist({ name: 'The Beatles' }),
  jimiHendrix: createArtist({ name: 'The Jimi Hendrix Experience' })
};

var createRollingStonesAlbum = createAlbum(artists.rollingStones);
var createBeatlesAlbum = createAlbum(artists.beatles);
var createJimiHendixAlbum = createAlbum(artists.jimiHendrix);

var rollingStonesAlbums = {
  exileOnMainStreet: createRollingStonesAlbum({
    title: 'Exile on Main Street'
  }),
  beggarsBanquet: createRollingStonesAlbum({ title: 'Beggars Banquet' })
};

var beatlesAlbums = {
  rubberSoul: createBeatlesAlbum({ title: 'Rubber Soul' }),
  revolver: createBeatlesAlbum({ title: 'Revolver' })
};

var hendrixAlbums = {
  axisBoldAsLove: createJimiHendixAlbum({ title: 'Axis: Bold as Love' }),
  electricLadyLand: createJimiHendixAlbum({ title: 'Electric Ladyland' })
};

var albums = _extends({}, rollingStonesAlbums, beatlesAlbums, hendrixAlbums);

var songs = [].concat(_toConsumableArray([{ title: 'EXP' }, { title: 'Up from the Skies' }, { title: 'Spanish Castle Magic' }, { title: 'Wait Until Tomorrow' }, { title: "Ain't No Telling" }, { title: 'Little Wing' }, { title: 'If 6 Was 9' }, { title: "You Got Me Floatin'" }, { title: 'Castles Made of Sand' }, { title: "She's So Fine" }, { title: 'One Rainy Wish' }, { title: 'Little Miss Lover' }, { title: 'Bold as Love' }].map(createSong(hendrixAlbums.axisBoldAsLove))), _toConsumableArray([{ title: 'And the Gods Made Love' }, { title: 'Have You Ever Been (To Electric Ladyland)' }, { title: 'Crosstown Traffic' }, { title: 'Voodoo Chile' }, { title: 'Little Miss Strange' }, { title: 'Long Hot Summer Night' }, { title: 'Come On (Part I)' }, { title: 'Gypsy Eyes' }, { title: 'Burning of the Midnight Lamp' }, { title: 'Rainy Day, Dream Away' }, { title: '1983... (A Merman I Should Turn to Be)' }, { title: 'Moon, Turn the Tides...Gently Gently Away' }, { title: 'Still Raining, Still Dreaming' }, { title: 'House Burning Down' }, { title: 'All Along the Watchtower' }, { title: 'Voodoo Child (Slight Return)' }].map(createSong(hendrixAlbums.electricLadyLand))), _toConsumableArray([{ title: 'Sympathy for the Devil' }, { title: 'No Expectations' }, { title: 'Dear Doctor' }, { title: 'Parachute Woman' }, { title: 'Jigsaw Puzzle' }, { title: 'Street Fighting Man' }, { title: 'Prodigal Son' }, { title: 'Stray Cat Blues' }, { title: 'Factory Girl' }, { title: 'Salt of the Earth' }].map(createSong(rollingStonesAlbums.beggarsBanquet))), _toConsumableArray([{ title: 'Rocks Off' }, { title: 'Rip This Joint' }, { title: 'Shake Your Hips' }, { title: 'Casino Boogie' }, { title: 'Tumbling Dice' }, { title: 'Sweet Virginia' }, { title: 'Torn and Frayed' }, { title: 'Sweet Black Angel' }, { title: 'Loving Cup' }, { title: 'Happy' }, { title: 'Turd on the Run' }, { title: 'Ventilator Blues' }, { title: 'I Just Want to See His Face' }, { title: 'Let It Loose' }, { title: 'All Down the Line' }, { title: 'Stop Breaking Down' }, { title: 'Shine a Light' }, { title: 'Soul Survivor' }].map(createSong(rollingStonesAlbums.exileOnMainStreet))), _toConsumableArray([{ title: 'Taxman' }, { title: 'Eleanor Rigby' }, { title: "I'm Only Sleeping" }, { title: 'Love You To' }, { title: 'Here, There and Everywhere' }, { title: 'Yellow Submarine' }, { title: 'She Said She Said' }, { title: 'Good Day Sunshine' }, { title: 'And Your Bird Can Sing' }, { title: 'For No One' }, { title: 'Doctor Robert' }, { title: 'I Want to Tell You' }, { title: 'Got to Get You into My Life' }, { title: 'Tomorrow Never Knows' }].map(createSong(beatlesAlbums.revolver))), _toConsumableArray([{ title: 'Drive My Car' }, { title: 'Norwegian Wood (This Bird Has Flown)' }, { title: "You Won't See Me" }, { title: 'Nowhere Man' }, { title: 'Think for Yourself' }, { title: 'The Word' }, { title: 'Michelle' }, { title: 'What Goes On' }, { title: 'Girl' }, { title: "I'm Looking Through You" }, { title: 'In My Life' }, { title: 'Wait' }, { title: 'If I Needed Someone' }, { title: 'Run for Your Life' }].map(createSong(beatlesAlbums.rubberSoul))));

var generateAnswerKey = function generateAnswerKey() {
  var answer = {
    artists: Object.values(artists)
  };

  answer.artists = answer.artists.map(function (a) {
    return _extends({}, a, {
      albums: a.albums.map(function (id) {
        return Object.values(albums).find(function (al) {
          return al.id === id;
        });
      })
    });
  });

  answer.artists.forEach(function (artist) {
    artist.albums = artist.albums.map(function (album) {
      return _extends({}, album, {
        songs: album.songs.map(function (id) {
          return songs.find(function (s) {
            return s.id === id;
          });
        })
      });
    });
  });

  return answer;
};

var handleResponse = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(result, callback, type, id) {
    var error;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!result) {
              _context.next = 7;
              break;
            }

            callIfFunction(callback, null, result);
            _context.next = 4;
            return new Promise(function (resolve) {
              return resolve(result);
            });

          case 4:
            return _context.abrupt('return', _context.sent);

          case 7:
            error = id ? 'There is no ' + type + ' with the ID of ' + id + '.' : 'Could not find ' + type + 's.';

            callIfFunction(callback, error, result);
            _context.next = 11;
            return new Promise(function (resolve, reject) {
              return reject(error);
            });

          case 11:
            return _context.abrupt('return', _context.sent);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function handleResponse(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var Database = {
  findArtist: function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id, callback) {
      var result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              result = Object.values(artists).find(function (a) {
                return id === a.id;
              });
              _context2.next = 3;
              return handleResponse(result, callback, 'artist', id);

            case 3:
              return _context2.abrupt('return', _context2.sent);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function findArtist(_x5, _x6) {
      return _ref2.apply(this, arguments);
    }

    return findArtist;
  }(),
  findAllArtists: function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(callback) {
      var result;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              result = Object.values(artists);
              _context3.next = 3;
              return handleResponse(result, callback, 'artist');

            case 3:
              return _context3.abrupt('return', _context3.sent);

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function findAllArtists(_x7) {
      return _ref3.apply(this, arguments);
    }

    return findAllArtists;
  }(),
  findAlbum: function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id, callback) {
      var result;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              result = Object.values(albums).find(function (a) {
                return id === a.id;
              });
              _context4.next = 3;
              return handleResponse(result, callback, 'album', id);

            case 3:
              return _context4.abrupt('return', _context4.sent);

            case 4:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function findAlbum(_x8, _x9) {
      return _ref4.apply(this, arguments);
    }

    return findAlbum;
  }(),
  findAllAlbums: function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(callback) {
      var result;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              result = Object.values(albums);
              _context5.next = 3;
              return handleResponse(result, callback, 'album');

            case 3:
              return _context5.abrupt('return', _context5.sent);

            case 4:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function findAllAlbums(_x10) {
      return _ref5.apply(this, arguments);
    }

    return findAllAlbums;
  }(),
  findSong: function () {
    var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(id, callback) {
      var result;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              result = songs.find(function (s) {
                return id === s.id;
              });
              _context6.next = 3;
              return handleResponse(result, callback, 'song', id);

            case 3:
              return _context6.abrupt('return', _context6.sent);

            case 4:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function findSong(_x11, _x12) {
      return _ref6.apply(this, arguments);
    }

    return findSong;
  }(),
  findAllSongs: function () {
    var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(callback) {
      var result;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              result = songs;
              _context7.next = 3;
              return handleResponse(result, callback, 'song');

            case 3:
              return _context7.abrupt('return', _context7.sent);

            case 4:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function findAllSongs(_x13) {
      return _ref7.apply(this, arguments);
    }

    return findAllSongs;
  }()
};

Database.findArtist(1).then(console.log);
Database.findAlbum(5).then(console.log);
Database.findAlbum(6).then(console.log);

exports.default = Database;
exports.generateAnswerKey = generateAnswerKey;
exports.artists = artists;
exports.albums = albums;
exports.songs = songs;
