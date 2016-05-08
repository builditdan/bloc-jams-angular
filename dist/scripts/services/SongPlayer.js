(function() {
  function SongPlayer($rootScope, Fixtures) {
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
* @function private stopSong
* @desc Stops the current song and clears the current song that was playing
* @param {Object} song
*/
    var stopSong = function() {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null; 
    }    
    
/**
* @function private setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/
    var setSong = function(song) {
      if (currentBuzzObject) {
        stopSong(song)
      }
      currentBuzzObject = new buzz.sound(song.audioUrl, {
          formats: ['mp3'],
          preload: true
      });
      
      currentBuzzObject.bind('timeupdate', function() {
          $rootScope.$apply(function() {
            SongPlayer.currentTime = currentBuzzObject.getTime();
          });
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
 * @function public setCurrentTime
 * @desc Set current time (in seconds) of currently playing song
 * @param {Number} time
 */
 SongPlayer.setCurrentTime = function(time) {
     if (currentBuzzObject) {
         currentBuzzObject.setTime(time);
     }
 }; 
    
/**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
 SongPlayer.currentTime = null;
 
    
    
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
* @desc Decrements current song index to the previous song, stops at first song
* @returns {numeric}
*/
    SongPlayer.previous = function() {
       var currentSongIndex = getSongIndex(SongPlayer.currentSong);
       currentSongIndex--;
      if (currentSongIndex < 0) {
         stopSong();
       } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
       }
   };
    
    /**
* @function public next
* @desc Increments current song index to the next song, stops at last song
* @returns {numeric}
*/
    SongPlayer.next = function() {
       var currentSongIndex = getSongIndex(SongPlayer.currentSong);
       currentSongIndex++;
       songCount = Fixtures.getNoSongs()
       if (currentSongIndex > songCount - 1 ) {
         stopSong();
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
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
  
})();
