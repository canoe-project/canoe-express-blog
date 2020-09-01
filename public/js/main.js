(function ($) {
  var $menu = $(".menu"),
    $menuButton = $("#menuButton"),
    $intro = $("#intro"),
    $writingList = $(".writingContainer > .contentBox"),
    $noticeList = $(".noticeContainer > .contentBox"),
    $document = $("document");

  /*클릭된 태그 확인용*/
  // $(document).on('click',function(e){
  //     console.log(e.target)
  // })
  $document.ready(() => {
    $.ajax({
      url: "/information/notice",
      type: "get",
    }).done((data) => {
      $noticeList.children("ul").append(data);
    });

    // $.ajax({
    //   url: "/writing",
    //   type: "get",
    // }).done((data) => {
    //   $writingList.children("ul").append(data);
    // });

    $.ajax({
      url: "/information/introText",
      type: "get",
    }).done((data) => {
      $intro.append(JSON.parse(data).content);
    });
  });

  $(document).on("mouseup", (e) => {
    if (!$menu.is(e.target)) {
      $menu.removeClass("is-active");
    }
  });

  $.fn.menuToggleButton = function () {
    $(this).on("click", () => {
      $menu.toggleClass("is-active");
    });
  };

  $menuButton.menuToggleButton();
})(jQuery);
