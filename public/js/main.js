(function ($) {
  var $menu = $(".menu"),
    $menuButton = $("#menuButton"),
    $main = $("#main"),
    $body = $("body"),
    $content = $("#content"),
    $wrapper = $("#wrapper"),
    $notice = $("#notice"),
    $document = $("document");

  /*클릭된 태그 확인용*/
  // $(document).on('click',function(e){
  //     console.log(e.target)
  // })
  $document.ready(() => {
    $.ajax({
      url: "/data",
      type: "get",
    }).done((data) => {
      $notice.children("ul").append(data);
    });

    $.ajax({
      url: "/main",
      type: "get"
    }).done((data) => {
      console.log(data)
      $main.append(data)
    })
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
