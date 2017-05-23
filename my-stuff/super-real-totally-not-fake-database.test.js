import answerKey from "./answer-key";
import Database, {
  generateAnswerKey,
  artists,
  albums,
  songs
} from "./super-real-totally-not-fake-database";

describe("generateAnswerKey", () => {
  it("should generate a valid answer key", () => {
    expect(generateAnswerKey()).toEqual(answerKey);
  });
});

describe("Database", () => {
  describe("findAllArtists()", () => {
    const getNames = records => records.map(r => r.name);

    it("should call its callback", () => {
      const callback = jest.fn();
      Database.findAllArtists(callback);
      expect(callback.mock.calls.length).toBe(1);
    });

    it("should return a promise", () => {
      expect(Database.findAllArtists() instanceof Promise).toBe(true);
    });

    it("should receive artists in its callback", done => {
      const callback = (err, artists) => {
        expect(getNames(artists)).toEqual(getNames(answerKey.artists));
        done();
      };
      Database.findAllArtists(callback);
    });

    it("should receive artists in its promise resolution", () => {
      expect.assertions(1);
      return Database.findAllArtists().then(artists => {
        expect(getNames(artists)).toEqual(getNames(answerKey.artists));
      });
    });
  });

  describe("findArtist()", () => {
    const [firstArtist] = answerKey.artists;
    const { id } = firstArtist;

    it("should find the correct artist via callback", done => {
      Database.findArtist(id, (err, artist) => {
        expect(artist.name).toEqual(firstArtist.name);
        done();
      });
    });

    it("should find the correct artist via promise", () => {
      expect.assertions(1);
      return Database.findArtist(id).then(artist => {
        expect(artist.name).toEqual(firstArtist.name);
      });
    });

    it("should pass an error to the callback if not found", done => {
      const notRealId = "definitely does not exist";
      Database.findArtist(notRealId, (err, artist) => {
        expect(err).toBe(`There is no artist with the ID of ${notRealId}.`);
        done();
      });
    });

    it("should reject the promise if not found", () => {
      expect.assertions(1);
      const notRealId = "definitely does not exist";
      return Database.findArtist(notRealId).catch(err => {
        expect(err).toBe(`There is no artist with the ID of ${notRealId}.`);
      });
    });
  });

  describe("findAllAlbums()", () => {
    const getTitles = records => records.map(r => r.titles);

    it("should call its callback", () => {
      const callback = jest.fn();
      Database.findAllAlbums(callback);
      expect(callback.mock.calls.length).toBe(1);
    });

    it("should return a promise", () => {
      expect(Database.findAllAlbums() instanceof Promise).toBe(true);
    });

    it("should receive albums in its callback", done => {
      expect.assertions(1);
      const callback = (err, result) => {
        expect(result).toEqual(Object.values(albums));
        done();
      };
      Database.findAllAlbums(callback);
    });

    it("should receive albums in its promise resolution", () => {
      expect.assertions(1);
      return Database.findAllAlbums().then(result => {
        expect(result).toEqual(Object.values(albums));
      });
    });
  });

  describe("findAlbum()", () => {
    const [firstAlbum] = Object.values(albums);
    const { id } = firstAlbum;

    it("should find the correct album via callback", done => {
      Database.findAlbum(id, (err, album) => {
        expect(album.title).toEqual(firstAlbum.title);
        done();
      });
    });

    it("should find the correct album via promise", () => {
      expect.assertions(1);
      return Database.findAlbum(id).then(album => {
        expect(album.title).toEqual(firstAlbum.title);
      });
    });

    it("should pass an error to the callback if not found", done => {
      const notRealId = "definitely does not exist";
      Database.findAlbum(notRealId, err => {
        expect(err).toBe(`There is no album with the ID of ${notRealId}.`);
        done();
      });
    });

    it("should reject the promise if not found", () => {
      expect.assertions(1);
      const notRealId = "definitely does not exist";
      return Database.findAlbum(notRealId).catch(err => {
        expect(err).toBe(`There is no album with the ID of ${notRealId}.`);
      });
    });
  });

  describe("findAllSongs()", () => {
    const getTitles = records => records.map(r => r.title);

    it("should call its callback", () => {
      const callback = jest.fn();
      Database.findAllSongs(callback);
      expect(callback.mock.calls.length).toBe(1);
    });

    it("should return a promise", () => {
      expect(Database.findAllSongs() instanceof Promise).toBe(true);
    });

    it("should receive songs in its callback", done => {
      const callback = (err, result) => {
        expect(result).toEqual(Object.values(songs));
        done();
      };
      Database.findAllSongs(callback);
    });

    it("should receive songs in its promise resolution", () => {
      expect.assertions(1);
      return Database.findAllSongs().then(result => {
        expect(result).toEqual(Object.values(songs));
      });
    });
  });

  describe("findSong()", () => {
    const [firstSong] = songs;
    const { id } = firstSong;

    it("should find the correct song via callback", done => {
      Database.findSong(id, (err, song) => {
        expect(song.name).toEqual(firstSong.name);
        done();
      });
    });

    it("should find the correct song via promise", done => {
      expect.assertions(1);
      Database.findSong(id)
        .then(song => {
          expect(song.name).toEqual(firstSong.name);
        })
        .then(done)
        .catch(done);
    });

    it("should pass an error to the callback if not found", done => {
      const notRealId = "definitely does not exist";
      Database.findSong(notRealId, (err, song) => {
        expect(err).toBe(`There is no song with the ID of ${notRealId}.`);
        done();
      });
    });

    it("should reject the promise if not found", () => {
      expect.assertions(1);
      const notRealId = "definitely does not exist";
      return Database.findSong(notRealId).catch(err => {
        expect(err).toBe(`There is no song with the ID of ${notRealId}.`);
      });
    });
  });
});
