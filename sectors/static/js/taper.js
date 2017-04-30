$(document).ready(function() {

    $( 'form#nl_taper' ).floatlabels({
        style: 1,
    });

    /* datepicker (pickadate)
    ---------------------------------------------------------------------------*/
    date_picker();

    if (mobile) {
        $('.picker__frame').css({ 'bottom': '0', 'margin-bottom': '0', 'top': 'auto'});
        $('.picker__box').css({ 'border-radius': '0', 'border-bottom-width': '0'});
    } else {
        $('.picker__frame').css({ 'top': '15%'});
    }
    
/*     if (mobile) {
        var deviceAgent = navigator.userAgent.toLowerCase();
        var iOS = deviceAgent.match(/(iPad|iPhone|iPod)/i);
        if (iOS) {
            if (!localStorage.getItem('reload')) {
                localStorage.setItem('reload', 'true');
                location.reload();
            } else {
                localStorage.removeItem('reload');
            }
        }
    } */
    // Taper start date, grow/shrink input box to text
    $("input.autogrow").autoGrowInput({minWidth: 30, comfortZone: 20});
    $(window).resize(function() {
        $("input.autogrow").autoGrowInput({minWidth: 30, comfortZone: 20});
    });
/*     if (mobile) {
        var deviceAgent = navigator.userAgent.toLowerCase();
        var iOS = deviceAgent.match(/(iPad|iPhone|iPod)/i);
        if (iOS) {
            console.log('iOS');
            //window.dispatchEvent(new Event('resize'));
        }
    } */
    
    // Taper start date, red on hover
    $('.date-wrapper').mouseover(function() {
        $(this).addClass('date-hover');
    }).mouseout(function(){
        $(this).removeClass('date-hover');
    });

    /* checkboxes (iCheck)
    ---------------------------------------------------------------------------*/
    checkboxes();
    checkbox_resize();

});


function date_picker() {
    var $date_icon = $( '.input-group-addon' ),
        $date_field = $( '#input_date' ).pickadate({
            format: 'mmmm dd, yyyy',
            today: '<i class="fa fa-crosshairs" aria-hidden="true"></i>',
            clear: '',
            close: '<i class="fa fa-times" aria-hidden="true"></i>',
            onStart: function () {
                var date = new Date();
                this.set('select', [date.getFullYear(), date.getMonth(), date.getDate()]);
            },
            onClose: function() {
                $('.date-wrapper').removeClass('date-hover');
            },
        }),
        picker_open_close = $date_field.pickadate( 'picker' )
    $date_icon.
        on( 'click', function( event ) {
            if ( picker_open_close.get( 'open' ) ) {
                picker_open_close.close()
            }
            else {
                picker_open_close.open()
            }
            event.stopPropagation()
        }).
        on( 'mousedown', function(event) {
            event.preventDefault()
        })
}; // datepicker()


$.fn.autoGrowInput = function(o) {
    //var options = {year: "numeric", month: "long", day: "numeric"};
    //var date = new Date(),
    //    longDate = date.toLocaleString('en-us', options);

    //maxWidth: 1000,
    if (mobile) {
        var deviceAgent = navigator.userAgent.toLowerCase();
        var iOS = deviceAgent.match(/(iPad|iPhone|iPod)/i);
        if (iOS) {
            if (verge.viewportW() > verge.viewportH()) {
                var portrait = 0;
            } else {
                var portrait = 1;
            }
        }
    }

    o = $.extend({ maxWidth: verge.viewportW(), minWidth: 0, comfortZone: 70 }, o);

    this.filter('input:text').each(function(){

        var minWidth = o.minWidth || $(this).width();
        var val = '';
        var input = $(this);
        var testSubject = $('<tester/>').attr('id', 'tester').css({
            position: 'absolute',
            top: -9999,
            left: -9999,
            width: 'auto',
            fontSize: input.css('fontSize'),
            fontFamily: input.css('fontFamily'),
            fontWeight: input.css('fontWeight'),
            letterSpacing: input.css('letterSpacing'),
            whiteSpace: 'nowrap'
        });
        var check = function() {

            if (val === (val = input.val())) {return;}

            // Enter new content into testSubject
            var escaped = val.replace(/&/g, '&amp;').replace(/\s/g,' ').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            testSubject.html(escaped);

            // Calculate new width + whether to change
            //var testerWidth = testSubject.width();
            var testerWidth = $( 'tester' ).width();
            // if testerWidth plus comfortZone is greater or equal to minWidth 
                // newWidth is equal to testerWidth + comfortZone
                // else newWidth is equal to minWidth
            var newWidth = (testerWidth + o.comfortZone) >= minWidth ? testerWidth + o.comfortZone : minWidth;
            var currentWidth = input.width();
            var isValidWidthChange = (newWidth < currentWidth && newWidth >= minWidth) || (newWidth > minWidth && newWidth < o.maxWidth);

            // Animate width
            if (isValidWidthChange) {

                if (!localStorage.getItem('initial_view')) {
                    console.log('first time here')
                    localStorage.setItem('initial_view', 'true');
                    if (portrait) {
                        input.width(currentWidth - verge.viewportW() + o.comfortZone);
                    } else {
                        input.width(newWidth);
                    }   
                } else {
                    console.log('not first time here')
                    localStorage.removeItem('initial_view');
                    input.width(newWidth);
                }



            }
            console.log('viewportW()', verge.viewportW());
            if (testerWidth === document.getElementById('tester').offsetWidth) {
                console.log('testerWidth', testerWidth)
            } else {
                console.log('testerWidth != js testerWidth')
                console.log('testerWidth', testerWidth)
                console.log('document.getElementById("tester").offsetWidth', document.getElementById('tester').offsetWidth)
            }
            //console.log('o.comfortZone', o.comfortZone);
            //console.log('minWidth', minWidth);
            console.log('testerWidth + o.comfortZone = newWidth', (testerWidth + o.comfortZone));
            //console.log('(testerWidth + o.comfortZone) >= minWidth', ((testerWidth + o.comfortZone) >= minWidth))
            //console.log('newWidth', newWidth);
            //console.log('o.maxWidth', o.maxWidth);
            console.log('currentWidth', currentWidth);
            console.log('');

        };   

        testSubject.insertAfter(input);

        //$(this).bind('keyup keydown blur update', check);
        //$(this).bind('keyup load blur update change', check).bind('keydown', function() {
        //    setTimeout(check);
        //});
        $(this).bind('change', check);
        check();
        $(window).load(check());


    });
    return this;
}; // autoGrowInput()


function checkboxes() {
    $('.checkbox:not(.noiCheck)').iCheck({
        checkboxClass: 'icheckbox_flat-grey',
        radioClass: 'iradio_flat-grey',
        //increaseArea: '20%',
        ifChecked: function () {
            console.log($(this).next());
        },
    });
    $('.checkbox:not(.noiCheck)').
        on('ifChecked', function(event){
            $(this).parent().next().addClass('checked');
        }).
        on('ifUnchecked', function(event){
            $(this).parent().next().removeClass('checked');
        });
};

function checkbox_resize() {
    if ( $(window).width() > 649 && $(window).width() < 980) {
        $( '.row-1' ).append($( '.row-2' ).children()).removeClass('row-1').addClass('row-0');
        $( '.row-2' ).remove();
    };

    $(window).resize(function() {
        var width = $(window).width();
        var table = $( '.size-param table' );
        var zero = $( '.row-0' );
        var one  = $( '.row-1' );
        var two  = $( '.row-2' );
        
        if ( width > 649 && width < 980) {
            if ( ! zero.length ) {
                one.append(two.children()).removeClass('row-1').addClass('row-0');
                two.remove();
                }
            
        } else if (width < 650 || width > 779) {
            if ( zero.length ) {
                var tr_one = $( 'tr.row-0' ).children('td').slice(0, 3);
                var tr_two = $( 'tr.row-0' ).children('td').slice(3, 6);
                table.append($('<tr/>', {class: 'row-1', html: tr_one}));
                table.append($('<tr/>', {class: 'row-2', html: tr_two}));
                zero.remove();
                }
        }
    });
};



/* $('<div/>', {
    id: someID,
    className: 'foobar',
    html: content
}); */

