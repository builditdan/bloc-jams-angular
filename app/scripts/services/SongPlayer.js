(function() {
  function SongPlayer() {
    var SongPlayer = {};
    
/**
* @desc Current name of the song that is playing
* @type {String}
*/
    var currentSong = null;
    
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
        currentSong.playing = null;
      }
      currentBuzzObject = new buzz.sound(song.audioUrl, {
          formats: ['mp3'],
          preload: true
      });
      currentSong = song;
    };
    
/**
* @function public play
* @desc Plays the current song and sets song.playing to true so pause button is shown
* @param {Object} song
*/
    
    SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };
    
/**
* @function public pause
* @desc Pauses the current song and sets song.playing to true so pause button is shown
* @param {Object} song
*/

    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };
      
    return SongPlayer;
  }
  
  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
  
  
})();
