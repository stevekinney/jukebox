import answerKey from './answer-key';
import Database, {
  generateAnswerKey,
  artists,
  albums,
  songs
} from './super-real-totally-not-fake-database';

describe('generateAnswerKey', () => {
  it('should generate a valid answer key', () => {
    expect(generateAnswerKey()).toEqual(answerKey);
  });
});

describe('Database', () => {
  describe('findAllArtists()', () => {
    const getNames = records => records.map(r => r.name);

    it('should call its callback', () => {
      const callback = jest.fn();
      Database.findAllArtists(callback);
      expect(callback.mock.calls.length).toBe(1);
    });

    it('should return a promise', () => {
      expect(Database.findAllArtists() instanceof Promise).toBe(true);
    });

    it('should receive artists in its callback', done => {
      const callback = (err, artists) => {
        expect(getNames(artists)).toEqual(getNames(answerKey.artists));
        done();
      };
      Database.findAllArtists(callback);
    });

    it('should receive artists in its promise resolution', done => {
      Database.findAllArtists()
        .then(artists => {
          expect(getNames(artists)).toEqual(getNames(answerKey.artists));
        })
        .then(done);
    });
  });

  describe('findArtist()', () => {
    const [firstArtist] = answerKey.artists;
    const { id } = firstArtist;

    it('should find the correct artist via callback', done => {
      Database.findArtist(id, (err, artist) => {
        expect(artist.name).toEqual(firstArtist.name);
        done();
      });
    });

    it('should find the correct artist via promise', done => {
      Database.findArtist(id)
        .then(artist => {
          expect(artist.name).toEqual(firstArtist.name);
        })
        .then(done);
    });

    it('should pass an error to the callback if not found', (done) => {
      const notRealId = 'definitely does not exist';
      Database.findArtist(notRealId, (err, artist) => {
        expect(err).toBe(`There is no artist with the ID of ${notRealId}.`);
        done();
      });
    });

    it('should reject the promise if not found', (done) => {
      const notRealId = 'definitely does not exist';
      Database.findArtist(notRealId).catch((err) => {
        expect(err).toBe(`There is no artist with the ID of ${notRealId}.`);
        done();
      });
    });
  });

  describe('findAllAlbums()', () => {
    const getTitles = records => records.map(r => r.titles);

    it('should call its callback', () => {
      const callback = jest.fn();
      Database.findAllAlbums(callback);
      expect(callback.mock.calls.length).toBe(1);
    });

    it('should return a promise', () => {
      expect(Database.findAllAlbums() instanceof Promise).toBe(true);
    });

    it('should receive albums in its callback', done => {
      const callback = (err, result) => {
        expect(result).toEqual(Object.values(albums));
        done();
      };
      Database.findAllAlbums(callback);
    });

    it('should receive albums in its promise resolution', done => {
      Database.findAllAlbums()
        .then(result => {
          expect(result).toEqual(Object.values(albums));
        })
        .then(done);
    });
  });

  describe('findAlbum()', () => {
    const [firstAlbum] = Object.values(albums);
    const { id } = firstAlbum;

    it('should find the correct album via callback', done => {
      Database.findAlbum(id, (err, album) => {
        expect(album.title).toEqual(firstAlbum.title);
        done();
      });
    });

    it('should find the correct album via promise', done => {
      Database.findAlbum(id)
        .then(album => {
          expect(album.title).toEqual(firstAlbum.title);
        })
        .then(done);
    });

    it('should pass an error to the callback if not found', (done) => {
      const notRealId = 'definitely does not exist';
      Database.findAlbum(notRealId, (err) => {
        expect(err).toBe(`There is no album with the ID of ${notRealId}.`);
        done();
      });
    });

    it('should reject the promise if not found', (done) => {
      const notRealId = 'definitely does not exist';
      Database.findAlbum(notRealId).catch((err) => {
        expect(err).toBe(`There is no album with the ID of ${notRealId}.`);
        done();
      });
    });
  });

  describe('findAllSongs()', () => {
    const getTitles = records => records.map(r => r.title);

    it('should call its callback', () => {
      const callback = jest.fn();
      Database.findAllSongs(callback);
      expect(callback.mock.calls.length).toBe(1);
    });

    it('should return a promise', () => {
      expect(Database.findAllSongs() instanceof Promise).toBe(true);
    });

    it('should receive songs in its callback', done => {
      const callback = (err, result) => {
        expect(result).toEqual(Object.values(songs));
        done();
      };
      Database.findAllSongs(callback);
    });

    it('should receive songs in its promise resolution', done => {
      Database.findAllSongs()
        .then(result => {
          expect(result).toEqual(Object.values(songs));
        })
        .then(done);
    });
  });

  describe('findSong()', () => {
    const [firstSong] = songs;
    const { id } = firstSong;

    it('should find the correct song via callback', done => {
      Database.findSong(id, (err, song) => {
        expect(song.name).toEqual(firstSong.name);
        done();
      });
    });

    it('should find the correct song via promise', done => {
      Database.findSong(id)
        .then(song => {
          expect(song.name).toEqual(firstSong.name);
        })
        .then(done);
    });

    it('should pass an error to the callback if not found', (done) => {
      const notRealId = 'definitely does not exist';
      Database.findSong(notRealId, (err, song) => {
        expect(err).toBe(`There is no song with the ID of ${notRealId}.`);
        done();
      });
    });

    it('should reject the promise if not found', (done) => {
      const notRealId = 'definitely does not exist';
      Database.findSong(notRealId).catch((err) => {
        expect(err).toBe(`There is no song with the ID of ${notRealId}.`);
        done();
      });
    });
  });
});
