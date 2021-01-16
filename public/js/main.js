(function ($) {
  var $notice = $("#notice "),
    $writing = $("#writing"),
    $picture = $("#picture"),
    $menuButton = $(".menuButton"),
    $menu = $(".menu"),
    $document = $("document"),
    $intro = $("#intro"),
    $snsToggle = $(".snsToggle"),
    $itemList = $(".snsitemList");

  var noticePost = $.post("/information/notice"),
    writingPost = $.post("/information/writing"),
    introPost = $.post("/information/introText"),
    picturePost = $.post("/information/picture");

  var recentPost = $.post("/information/recentPostList", {
    type: "recentPostList",
  });

  var scrollAmount = 20;
  // $document.ready(() => {
  //   $.when(noticePost, writingPost, picturePost, introPost).done(
  //     (notice, writing, picture, intro) => {
  //       $notice.children(".contentBox").children("ul").append(notice[0]);
  //       $writing.children(".contentBox").children("ul").append(writing[0]);
  //       $picture.children(".contentBox").children("ul").append(picture[0]);
  //       $intro.append(JSON.parse(intro[0]).content);
  //     }
  //   );
  // });

  $(() => {
    $.when(recentPost).done((recentPost) => {
      console.log(recentPost);
      recentPost.forEach((element) => {
        switch (element.category) {
          case "notice":
            $notice.children(".contentBox").children("ul").append(
              `<li>
                <a href="/read/${element._id}">${element.title}</a><span>${element.date}</span>
              </li>`
            );
            break;
          case "writing":
            $writing
              .children(".contentBox")
              .children("ul")
              .append(
                `<li>
                  <div class="headCopy">
                    <h3>${element.title}</h3>
                    <div class="imfomation">
                      <span class="star">${element.star}</span>
                      <span class="view">${element.views}</span>
                    </div> 
                  </div>
                  <div class="contentBody">
                    <img class="blockContentImg" src="${element.thumbnail}">
                    <div class="blockContent">${element.content.substr(
                      0,
                      50
                    )}</div>
                  </div>
                  <div class="blocDate">
                  ${element.date.toISOString().substring(0, 10)}
                  </div>
                </li>`
              );
            break;
          case "picture":
            $picture.children(".contentBox").children("ul").append(
              `<li>
                <img 
                  class="picture" src="${element.thumbnail}">
              </li>`
            );
            break;
          default:
        }
      });
    });
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

  $.fn.contentsLoader = function () {
    $(this).on("click", () => {});
  };

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

  $.fn.activeSign = function () {
    $(this).on("mouseover", () => {});
  };

  $picture.children(".contentBox").children("ul").horizontalScroll();
  $menuButton.menuToggleButton();
})(jQuery);
