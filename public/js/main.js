(function ($) {
  var $notice = $("#notice "),
    $writing = $("#writing"),
    $picture = $("#picture"),
    $menuButton = $(".menuButton"),
    $menu = $(".menu"),
    $document = $("document"),
    $intro = $("#intro"),
    $snsToggle = $(".snsToggle"),
    $itemList = $(".itemList"),
    $snsButton = $(".snsButton");

  var noticePost = $.post("/information/notice"),
    writingPost = $.post("/information/writing"),
    introPost = $.post("/information/introText"),
    picturePost = $.post("/information/picture");

  var scrollAmount = 20;
  $document.ready(() => {
    $.when(noticePost, writingPost, picturePost, introPost).done(
      (notice, writing, picture, intro) => {
        $notice.children(".contentBox").children("ul").append(notice[0]);
        $writing.children(".contentBox").children("ul").append(writing[0]);
        $picture.children(".contentBox").children("ul").append(picture[0]);
        $intro.append(JSON.parse(intro[0]).content);
      }
    );
  });
  $(window).on("load", () => {
    $notice
      .children(".contentImg")
      .css({ "background-image": `url(/images/noticeImg.svg)` });
    $writing
      .children(".contentImg")
      .css({ "background-image": `url(/images/writingImg.svg)` });
    $picture
      .children(".contentImg")
      .css({ "background-image": `url(/images/pictureImg.svg)` });
  });

  $(document).on("mouseup", (e) => {
    if (!$menu.is(e.target)) {
      $menu.removeClass("is-active");
    }
  });

  $snsToggle.hover(() => {
    $itemList.toggleClass("is-active");
  });

  $.fn.menuToggleButton = function () {
    $(this).on("click", () => {
      $menu.toggleClass("is-active");
    });
  };

  $.fn.moveRight = function () {
    if ($(this)[0].scrollWidth - $(this).scrollLeft() > $(this).outerWidth()) {
      $(this).scrollLeft($(this).scrollLeft() + scrollAmount);
    }
  };

  $.fn.moveLeft = function () {
    if ($(this).scrollLeft() > 0) {
      $(this).scrollLeft($(this).scrollLeft() - scrollAmount);
    }
  };

  $.fn.horizontalScroll = function () {
    $(this).on("mousewheel DOMMouseScroll", (e) => {
      if (e.originalEvent.wheelDelta / 120 > 0) {
        $(this).moveLeft();
      } else {
        $(this).moveRight();
      }
    });
  };

  $.fn.activeSign = function(){
    $(this).on("mouseover",()=>{
      
    })
  }


  $picture.children(".contentBox").children("ul").horizontalScroll();
  $menuButton.menuToggleButton();
})(jQuery);
