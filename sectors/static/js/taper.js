/* f(x)
---------------------------------------------------------------------------*/


$.fn.reconstitute = function() {};







/* floating labels
---------------------------------------------------------------------------*/

function doseParam(){
     $( '.dose-param' ).floatlabels({
        customEvent  : null,
        customLabel  : null,
        exclude      : '.no-label',
        inputRegex   : /email|number|password|search|tel|text|url/,
        prioritize   : 'label',
        requiredClass: 'required',
        style        : 1,
        transform    : 'input, select, textarea',
    });
};
doseParam();

function daysParam(){
     $( '.days-param' ).floatlabels({
        // This function is run immediately after an element has been transformed by float-labels.
        //customEvent: function( el ) {},
        // This function lets you modify a label text; it must return a string.
        //customLabel : function( labelEl, el ) {console.log( labelEl.text );},
        exclude      : '.no-label',
        inputRegex   : /email|number|password|search|tel|text|url/,
        prioritize   : 'label',
        requiredClass: 'required',
        style        : 1,
        transform    : 'input, select, textarea',
    });
};
daysParam();

/* datepicker (pickadate)
---------------------------------------------------------------------------*/
function datePicker() {
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
                $('.cal-wrapper').removeClass('cal-hover');
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
datePicker();

// snap popup to bottom on mobile browsers
if (mobile) {
    $('.picker__frame').css({ 'bottom': '0', 'margin-bottom': '0', 'top': 'auto'});
    $('.picker__box').css({ 'border-radius': '0', 'border-bottom-width': '0'});
} else {
    $('.picker__frame').css({ 'top': '15%'});
}

// Taper start date, hover color
$('.cal-wrapper').mouseover(function() {
    $(this).addClass('cal-hover');
}).mouseout(function(){
    $(this).removeClass('cal-hover');
});



/* checkboxes (iCheck)
---------------------------------------------------------------------------*/
function checkBoxes() {
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

    $('.checkbox.qod:not(.noiCheck)').iCheck({
        checkboxClass: 'icheckbox_futurico',
        radioClass: 'iradio_futurico',
        increaseArea: '20%',
        ifChecked: function () {},
    });
    $('.checkbox.qod:not(.noiCheck)').
        on('ifChecked', function(event){
            $(this).parent().next().addClass('checked');
        }).
        on('ifUnchecked', function(event){
            $(this).parent().next().removeClass('checked');
        });
}; // checkboxes()
checkBoxes();



function checkboxResize() {
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
}; // checkbox_resize()
checkboxResize();



/* headroom js
---------------------------------------------------------------------------*/
$('nav').headroom({
    'tolerance': 5,
    'offset': 205,
    'classes': {
        'initial'  : 'animated',
        'pinned'   : 'slideDown',
        'unpinned' : 'slideUp'
        }
    });



/* add controls to last phase
---------------------------------------------------------------------------*/
$.fn.initialControls = function() {
    var controls = $('<div/>', { class: 'phase-add-delete animated slideInRight' }).
        append( $('<div>', {id: 'del', class: 'phase-del'}) ).
        append( $('<div>', {id: 'add', class: 'phase-add'}) ).
        append( $('<div>', {id: 'calc', class: 'taper-calc'}) );

    this.append(controls);
    
    $('.phase-add, .phase-del, .taper-calc').
        on( 'mouseover', function() {
            $(this).filter(':not(:animated)').animate({
                width: '100%'
            },'fast');
        }).
        on( 'mouseout', function() {
            $(this).animate({
                width: '80%'
            },'fast');
        });
}; // taperControls()
$( '.phase' ).last().initialControls();




/* resize taper params on large screens
---------------------------------------------------------------------------*/
function paramsSize() {
    if ($(window).width() < lg) {
        $('.med-wrapper, .size-wrapper').removeClass('v-align');
    }
    $(window).resize(function() {
        var width = $(window).width();
        if (width < lg) {
            $('.med-wrapper, .size-wrapper').removeClass('v-align');
        } else if (width > lg) {
            $('.med-wrapper, .size-wrapper').addClass('v-align');
        }
    });
}; // paramsSize()
paramsSize();



/* Q.O.D. behavior
---------------------------------------------------------------------------*/
function phaseQod() {
    $('[id$=_taper]').on('click', '.phase-qod', function(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();

        $(this).toggleClass('active');
        var value = ($(this).children().val() == 0) ? '1' : '0';
        $(this).children().val(value);


        e.preventDefault();
    });
}; // phaseQod()
phaseQod();
