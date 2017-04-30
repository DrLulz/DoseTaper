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
    var update_span = function () {
        $('#input_date').text(picker_open_close.get());
    };
    var $date_icon = $( '.input-group-addon' ),
        $date_field = $( '#input_date' ).pickadate({
            format: 'mmmm dd, yyyy',
            today: '<i class="fa fa-crosshairs" aria-hidden="true"></i>',
            clear: '',
            close: '<i class="fa fa-times" aria-hidden="true"></i>',
            formatSubmit: 'mm/dd/yyyy',
            hiddenName: true,
            onStart: function () {
                var date = new Date();
                this.set('select', [date.getFullYear(), date.getMonth(), date.getDate()]);
            },
            onClose: function() {
                update_span();
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
    update_span();
}; // datepicker()


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
