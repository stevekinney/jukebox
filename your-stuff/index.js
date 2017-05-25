import Database from "../my-stuff/super-real-totally-not-fake-database";

export default () => {
  return new Promise((resolve, reject) => {
    Database.findAllArtists().then(artists => {
      console.log({ artists });
      resolve({ artists });
    }).catch(reject);
  });
};
