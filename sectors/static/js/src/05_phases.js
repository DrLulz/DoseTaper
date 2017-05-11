/* $('#ladd').click(function() {

    $('#ldel')
        .removeClass('phase-empty')
        .addClass('phase-del animated slideInRight')
        .on( 'mouseover', function() {
            $(this).filter(':not(:animated)').animate({
                width: '100%'
            },'fast');
        })
        .on( 'mouseout touchend', function() {
            $(this).animate({
                width: '80%'
            },'fast');
        });

    $('#pl #calc')
        .removeClass('slideInRight')
        .addClass('slideOutRight');

});
 */
/* 
$('#ldel').click(function() {
    var $p1 = $('#p1'),
        slide_in = 'slideInRight',
        slide_out = 'slideOutRight';

    $p1
        .addClass(slide_out)
        .one(animation_end, function() {
            //removeClass(slide_out)
        });


        //.one(animation_end, function() {
        //    $(this).removeClass(slide_out)
        //})
        
        //$(this).css('display', '');
        //.removeClass(slide_out)
        //.addClass(slide_in)
        //.addClass('hidden');
        //.appendTo('#l_form .container-fluid');

    //$('#pl').append($p1);
        //.removeClass(slide_out)
        //.addClass('hidden')
        //.addClass(slide_in);
});
 */