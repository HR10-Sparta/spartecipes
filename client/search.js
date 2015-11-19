/*==========================================
=            Search Bar Section            =
==========================================*/

// global keycode constant
var KEYCODE_ESC = 27;
// extending the jQuery prototype with setCursorPosition
$.fn.setCursorPosition = function(pos) {
  this.each(function(index, elem) {
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  });
  return this;
};

// intialize
$(document).ready(function() {
  // cache variables
  $("#menu-toggle").on('click', function(e) {
    console.log("clicked shopping cart");
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

    $("#wrap2").on('click', function(e) {
    console.log("clicked shopping cart");
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  var $search = $('#search');
  var $searchtext = $('#searchtext');
  // on any keydown, start parsing keyboard input
  var str = "";
  $(document).keydown(function(e) {
    str += e;
    if ($search.is(':visible')) {
      switch (e.which) {
        case KEYCODE_ESC:
          $search.fadeOut(200);
          $searchtext.blur().hide();
          break;
        case 13:
          angular.element(document.getElementById('HeaderController')).scope().retrieveRecipes($searchtext.val());
          $search.fadeOut(200);
          $searchtext.blur().hide();
          break;
        default:
          $searchtext.focus();
          break;
      }
    } else {
      $searchtext.show().focus();
      // grab the key pressed ( String.fromCharCode(e.which) )
      // and insert it into $searchtext.
      // then,set the cursor to the end of $searchtext.
      $searchtext.val(String.fromCharCode(e.which).toLowerCase())
        .setCursorPosition($searchtext.val().length);
      $search.fadeIn(200);
    }
  });
});


/*============================================
=            Video Player Section            =
============================================*/

// Load the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.
  var player;
  function onYouTubePlayerAPIReady() {
    player = new YT.Player('video-big', {
      videoId: 'Uj49PA8-L1E',
      autoplay: 1,
      controls: 0,
      enablejsapi: 1,
      end: 136,
      start: 5,
      fs: 0,
      loop: 1,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      showinfo: 0,
      events: {
        'onReady' : function (e) {e.target.playVideo(); },
        'onStateChange' : function (e) {e.target.playVideo(); }
      }
    });
  }

  /*===================================
  =            Login Modal            =
  ===================================*/



