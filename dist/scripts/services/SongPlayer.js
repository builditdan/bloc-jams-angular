(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};
    
  
/**
* @desc Gets the current album from Fixtures 
* @type {object}
*/
    var currentAlbum = Fixtures.getAlbum();

/**
* @desc Buzz object audio file
* @type {Object}
*/
 
    var currentBuzzObject = null;
  
/**
* @function private playSong
* @desc Plays the current song and sets song.playing to true so pause button is shown
* @param {Object} song
*/
    var playSong = function(song) {
      currentBuzzObject.play();   
      song.playing = true;   
    }
  
/**
* @function private setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }
      currentBuzzObject = new buzz.sound(song.audioUrl, {
          formats: ['mp3'],
          preload: true
      });
      SongPlayer.currentSong = song;
    };

    
/**
* @desc Gets the current index of the song
* @type {Numeric}
*/
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };
    
    
/**
* @desc Current name of the song that is playing
* @type {String}
*/
    SongPlayer.currentSong = null
    
    
/**
* @function public play
* @desc Plays the current song and sets song.playing to true so pause button is shown
* @param {Object} song
*/
    
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };
    
/**
* @function public pause
* @desc Pauses the current song and sets song.playing to true so pause button is shown
* @param {Object} song
* @returns {object}
*/

    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };
    
/**
* @function public previous
* @desc Decrements current song index to the previous song
* @returns {numeric}
*/
  SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;
     if (currentSongIndex < 0) {
       currentBuzzObject.stop();
       SongPlayer.currentSong.playing = null;
     } else {
       var song = currentAlbum.songs[currentSongIndex];
       setSong(song);
       playSong(song);
     }
 };
  
        
   return SongPlayer;
}
  
  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
  
  
})();
