/* f(x) and variables
---------------------------------------------------------------------------*/


/* typeahead
--------------------------------------------------*/
var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
        var matches, substringRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        cb(matches);
    };
};

var meds = ['Prednisone', 'Methylprednisolone'];

var rx_typeahead = $('#taper_med').typeahead({
    hint: true,
    highlight: true,
    minLength: 0
}, {
    name: 'prescription',
    source: substringMatcher(meds)
}).bind('focus', function() {
    $(this).data('initial_value', $(this).val());
    rx_typeahead.typeahead('val', '');
}).bind('blur', function() {
    var saved_value = $(this).data('initial_value');
    var new_value = $(this).val();
    if (new_value) {
        rx_typeahead.typeahead('val', new_value);
    } else {
        rx_typeahead.typeahead('val', saved_value);
    }
});



/* floating labels
---------------------------------------------------------------------------*/
function doseParam(){
    //console.log('doseParam');
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
function daysParam(){
    //console.log('daysParam')
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
                //var date = new Date();
                var date = new Date(2016,11,31);
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


function resizeDelay(){
    var $table = $('table.rx').not('.hidden');
    var zero   = $table.find('.row-0');
    var one    = $table.find('.row-1');
    var two    = $table.find('.row-2');
    
    // one row
    if ( width() > 1155 ) {
        if ( ! zero.length ) {
            one.append(two.children()).removeClass('row-1').addClass('row-0');
            two.remove();
            }
    // two rows
    } else {
        if ( zero.length ) {
            var tr_one = zero.children('td').slice(0, 3);
            var tr_two = zero.children('td').slice(3, 6);
            console.log('tr_one', tr_one)
            console.log('tr_two', tr_two)
            $table.append($('<tr/>', {class: 'row-1', html: tr_one}));
            $table.append($('<tr/>', {class: 'row-2', html: tr_two}));
            zero.remove();
            }
    }
}

function checkboxResize() {
    
    var $table = $('table.rx').not('.hidden');
    var zero = $table.find('.row-0');

    // 2 rows
    if ( width() < 1156 ) {
        
        var tr_one = zero.children('td').slice(0, 3);
        var tr_two = zero.children('td').slice(3, 6);

        $table.append($('<tr/>', {class: 'row-1', html: tr_one}));
        $table.append($('<tr/>', {class: 'row-2', html: tr_two}));
        zero.remove();
    } else if ( !zero.length ) {
        var one = $table.find('.row-1');
        var two = $table.find('.row-2');
        one.append(two.children()).removeClass('row-1').addClass('row-0');
        two.remove();
    };

    var doit;
    window.onresize = function(){
      clearTimeout(doit);
      doit = setTimeout(resizeDelay, 5);
    };

    if (width() < lg) {
        $('.sup-size-wrapper').removeClass('v-align');
    }
    if (width() < md) {
        $('.sup-med-wrapper').removeClass('v-align');
    }


    $(window).resize(function() {
        if (width() < md) {
            $('.sup-med-wrapper').removeClass('v-align');
        } else {
            $('.sup-med-wrapper').addClass('v-align');
        }
        if (width() < lg) {
            $('.sup-size-wrapper').removeClass('v-align');
        } else {
            $('.sup-size-wrapper').addClass('v-align');
        }    
    });

}; // checkbox_resize()



/* phase controls: add controls to last phase
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
        on( 'mouseout touchend', function() {
            $(this).animate({
                width: '80%'
            },'fast');
        });
}; // initialControls()



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