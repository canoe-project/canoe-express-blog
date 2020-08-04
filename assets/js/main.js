(function($) {
    var $menu = $('.menu'),
        $menuButton = $('#menuButton'),
        $menuContainer = $('.menuContainer'),
        $body = $('body'),
        $content = $('#content'),
        $wrapper = $('#wrapper');

// $.fn.toggle = function(){
//     $(this).on('click', function(){
//         if($menu.css('display') == 'none'){
//             $menu.show()
//             console.log('show')
//             // $body.closeMenu()
//             // 
//         }
//         else
//             $menu.hide()
//     })
// }

// const $menu = $('.dropdown');

// $(document).mouseup(e => {
//    if (!$menu.is(e.target) // if the target of the click isn't the container...
//    && $menu.has(e.target).length === 0) // ... nor a descendant of the container
//    {
//      $menu.removeClass('is-active');
//   }
//  });

// $('.toggle').on('click', () => {
//   $menu.toggleClass('is-active');
// });

$.fn.menuToggleClose = () =>{
    $(this).on('mouseup', (e)=>{
        if(!$(this).is(e.target) 
            && $(this).has(e.target).length === 0){
                $menu.removeClass('is-active');
            }

    })
}

$.fn.menuToggleButton = () => {
    $(this).on('click', () =>{
        $(this).toggleClass('is-active');
    })
}

$menuButton.menuToggleButton()
$menuContainer.menuToggleClose()


})(jQuery);