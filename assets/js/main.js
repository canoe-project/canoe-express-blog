(function($) {
    var $header = $('header');
    var $wrapper = $('#wrapper');
    var $mnueButton = $('#menuButton');
    var $intro = $('#intro');

// $.fn.toggle = function(){
    
//     $(document).ready(function () {
//         $('button#menuButton').click(function () {
//             $('div#menu').toggle('slow');
//         });
//     });
// }
$(document).ready(function () {
    $('button#menuButton').click(function () {
        $('div#menu').toggle('slow');
    });
});


})(jQuery);