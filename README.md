# Jukebox

I'm going to let you into a few secrets about building modern web applications:

1. Asynchronous programming is kind of tricky. Anyone who tells you otherwise is a liar and should _not_ be trusted. It's super important and makes for way better user experiences—but, yea—it's hard.
2. Sometimes we don't always get the APIs or database schemas we want, but we have to make due.

This is a challenge to help train your asynchronous muscles. You're not going to like me by the end of this, but this is based on stuff that I've—unfortunately—had to deal with more times than I would like. (And yes, it's a bit contrived and intentionally so. Just go with it.)

Put on your imagination hats.

Ready? Cool.

So, you're building some kind of fancy jukebox application. Ideally, it's something that doesn't pop up every time you plug your iPhone into your MacBook. (Or, whatever the equivalently annoying thing is for you Android users.) You'd like to show the the all the artists with each of their albums and songs.

In our ficticious world, you'd like to have some kind of data structure that has the following characteristics:

- You have an array of artists.
- Each artist has an array of albums.
- Each album has an array of songs.

With a data structure like this, I'm sure you could put together some fancy user interface using some component-based, front-framework. I believe in you.

Okay. So, there is a catch: No one—in our fantasy land—is going to give you this data structure. Here is what you have to work with:

- `Database.findAllArtists()`
- `Database.findArtist(<id>)`
- `Database.findAllAlbums()`
- `Database.findAlbum(<id>)`
- `Database.findAllSongs()`
- `Database.findSong(<id>)`

It gets worse. Because this is JavaScript, these are all asynchronous. Each takes a callback function as an argument and returns a promise—so you can drink your asynchronous Kool-Aid™ any way you please.

Let's look at some examples, shall we?

Here is one example using the callback pattern:

```js
Database.findArtist(1, (artist) => {
  console.log(artist); // { name: 'The Beatles', id: 1, albums: [ 5, 6 ] }
});
```

Okay, and now once more with the promise pattern:

```js
Database.findArtist(1).then(artist => console.log(artist)); // { name: 'The Beatles', id: 1, albums: [ 5, 6 ] }
```

Do you see the problem? You're not getting the albums! You're getting the `id`s of the albums. This isn't going to be good enough. We now need to request the albums as well.

```js
Database.findAlbum(5).then(artist => console.log(artist));
/* { title: 'Rubber Soul',
     id: 5,
     artist: 1,
     songs: [ 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93 ] }
*/

Database.findAlbum(6).then(artist => console.log(artist));
/* { title: 'Revolver',
     id: 6,
     artist: 1,
     songs: [ 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79 ] }
*/

```

Oh, no! Look at all of those songs! And there are even more artists! This technique isn't going to scale is it? It's your job to figure out a clever solution. You can take a look at `./my-stuff/answer-key.json` to get a sense of what the final data structure is supposed to look like.

Are you up to the challenge?

## Your Mission

There is one big honking test that you need to get passing. That said, you can write your own and tackle this anyway you choose, but your job is to get that test passing.
