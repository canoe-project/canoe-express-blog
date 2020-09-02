(function ($) {
  var $menu = $(".menu"),
    $menuButton = $(".menuButton"),
    $intro = $("#intro"),
    $noticeList = $(".noticeContainer > .contentBox"),
    $writingList = $(".writingContainer > .contentBox"),
    $document = $("document"),
    $noticeImage = $(".noticeContainer >.contentImg");

  /*클릭된 태그 확인용*/
  // $(document).on('click',function(e){
  //     console.log(e.target)
  // })
  $document.ready(() => {
    $.ajax({
      url: "/information/notice",
      type: "post",
      acync: true,
    }).done((data) => {
      $noticeList.children("ul").append(data);
    });

    $.ajax({
      url: "/information/writing",
      type: "post",
      acync: true,
    }).done((data) => {
      $writingList.children("ul").append(data);
    });

    $.ajax({
      url: "/information/introText",
      type: "post",
      acync: true,
    }).done((data) => {
      $intro.append(JSON.parse(data).content);
    });
  });
  // $document.load();

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
