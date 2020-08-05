(function($) {
    var $menu = $('.menu'),
        $menuButton = $('#menuButton'),
        $menuContainer = $('.menuContainer'),
        $body = $('body'),
        $content = $('#content'),
        $wrapper = $('#wrapper');


/*클릭된 태그 확인용*/
// $(document).on('click',function(e){
//     console.log(e.target)
// })

$(document).on('mouseup', (e)=>{
    if( !$menu.is(e.target))
    {
            $menu.removeClass('is-active');
    }
})

$.fn.menuToggleButton = function(){
    $(this).on('click', () =>{
        $menu.toggleClass('is-active');
    })
}

$menuButton.menuToggleButton()

})(jQuery);