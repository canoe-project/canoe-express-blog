(function ($) {
  var $menu = $(".menu"),
    $menuButton = $(".menuButton"),
    $intro = $("#intro"),
    $noticeList = $(".noticeContainer > .contentBox"),
    $writingList = $(".writingContainer > .contentBox"),
    $pictureList = $(".pictureContainer > .contentBox"),
    $document = $("document"),
    $noticeImage = $(".noticeContainer >.contentImg"),
    $snsToggle = $(".snsToggle"),
    $itemList = $(".itemList");

  var noticePost = $.post("/information/notice"),
    writingPost = $.post("/information/writing"),
    introPost = $.post("/information/introText"),
    picturePost = $.post("/information/picture");

  var scrollAmount = 20;
  $document.ready(() => {
    $.when(noticePost, writingPost, picturePost, introPost).done(
      (notice, writing, picture, intro) => {
        $noticeList.children("ul").append(notice[0]);
        $writingList.children("ul").append(writing[0]);
        $pictureList.children("ul").append(picture[0]);
        $intro.append(JSON.parse(intro[0]).content);
      }
    );
  });
  // $document.load();

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

  $pictureList.children("ul").horizontalScroll();
  $menuButton.menuToggleButton();
})(jQuery);
