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
