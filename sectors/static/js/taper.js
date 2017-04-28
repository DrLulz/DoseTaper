$(document).ready(function() {
    $( 'form#nl_taper' ).floatlabels({
        style: 1,
    });
    $('#input_date').pickadate({
        format: 'mmmm dd, yyyy',
        today: '<i class="fa fa-crosshairs" aria-hidden="true"></i>',
        clear: '',
        close: '<i class="fa fa-times" aria-hidden="true"></i>',
        onStart: function () {
            var date = new Date();
            this.set('select', [date.getFullYear(), date.getMonth(), date.getDate()]);
        },
        onRender: function() {},
        onClose: function() {},
    });

    if (mobile) {
        $('.picker__frame').css({ 'bottom': '0', 'margin-bottom': '0', 'top': 'auto'});
        $('.picker__box').css({ 'border-radius': '0', 'border-bottom-width': '0'});
    } else {
        $('.picker__frame').css({ 'top': '15%'});
    }
    
    $('input').iCheck({
        checkboxClass: 'icheckbox_minimal-grey',
        radioClass: 'iradio_minimal-grey',
        increaseArea: '20%' // optional
    });

    $("input.autogrow").autoGrowInput({minWidth:30,comfortZone:20});

    $(window).resize(function() {
        $("input.autogrow").autoGrowInput({minWidth:30,comfortZone:20});
    });
});

//(function($){

$.fn.autoGrowInput = function(o) {

    //var options = {year: "numeric", month: "long", day: "numeric"};
    //var date = new Date(),
    //    longDate = date.toLocaleString('en-us', options);

    o = $.extend({
        maxWidth: 1000,
        minWidth: 0,
        comfortZone: 70
    }, o);

    this.filter('input:text').each(function(){

        var minWidth = o.minWidth || $(this).width(),
            val = '',
            input = $(this),
            testSubject = $('<tester/>').css({
                position: 'absolute',
                top: -9999,
                left: -9999,
                width: 'auto',
                fontSize: input.css('fontSize'),
                fontFamily: input.css('fontFamily'),
                fontWeight: input.css('fontWeight'),
                letterSpacing: input.css('letterSpacing'),
                whiteSpace: 'nowrap'
            }),
            check = function() {
                //console.log(val);
                //console.log(input.val());
                //console.log('check()');

                if (val === (val = input.val())) {return;}

                // Enter new content into testSubject
                var escaped = val.replace(/&/g, '&amp;').replace(/\s/g,' ').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                testSubject.html(escaped);

                // Calculate new width + whether to change
                var testerWidth = testSubject.width(),
                    newWidth = (testerWidth + o.comfortZone) >= minWidth ? testerWidth + o.comfortZone : minWidth,
                    currentWidth = input.width(),
                    isValidWidthChange = (newWidth < currentWidth && newWidth >= minWidth)
                                         || (newWidth > minWidth && newWidth < o.maxWidth);

                // Animate width
                if (isValidWidthChange) {
                    input.width(newWidth);
                }

            };            

        testSubject.insertAfter(input);

        //$(this).bind('keyup keydown blur update', check);
        //$(this).bind('keyup load blur update change', check).bind('keydown', function() {
        //    setTimeout(check);
        //});
        $(this).bind('change', check);
        check();

    });

    return this;

};

//})(jQuery);