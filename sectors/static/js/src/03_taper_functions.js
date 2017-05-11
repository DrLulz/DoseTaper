/*--------------------------------------------------------------------------
  --------------------------------------------------------------------------
  *
  *                                Taper
  *
  --------------------------------------------------------------------------
---------------------------------------------------------------------------*/


/* float-labels
/* https://github.com/geminilabs/float-labels.js/tree/master
----------------------------------------------------------------------------
----------------------------------------------------------------------------
---------------------------------------------------------------------------*/
doseParam();
daysParam();

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



/* pickadate
/* https://github.com/amsul/pickadate.js
----------------------------------------------------------------------------
----------------------------------------------------------------------------
---------------------------------------------------------------------------*/
datePicker();

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
        picker_open_close = $date_field.pickadate( 'picker' );

    $date_icon
        .on( 'click', function( event ) {
            if ( picker_open_close.get( 'open' ) ) {
                picker_open_close.close()
            } else {
                picker_open_close.open()
            }
            event.stopPropagation()
        })
        .on( 'mousedown', function(event) {
            event.preventDefault()
        });
    update_span();
}; // datepicker()

// snap popup to bottom on mobile browsers
if (mobile) {
    $('.picker__frame').css({ 'bottom': '0', 'margin-bottom': '0', 'top': 'auto' });
    $('.picker__box').css({ 'border-radius': '0', 'border-bottom-width': '0' });
} else {
    $('.picker__frame').css({ 'top': '15%' });
}

// Taper start date, hover color
$('#datepicker-addon .fa-calendar-o, #input_date').on('mouseover mouseout', function() {
    $('#datepicker-addon .fa-calendar-o, #input_date').toggleClass('cal-hover');
});


/* iCheck
/* https://github.com/fronteed/iCheck/
----------------------------------------------------------------------------
----------------------------------------------------------------------------
---------------------------------------------------------------------------*/
checkBoxes();
checkboxResize();

function checkBoxes() {
    $('.checkbox:not(.noiCheck)').iCheck({
        checkboxClass: 'icheckbox_flat-grey',
        radioClass: 'iradio_flat-grey',
        //increaseArea: '20%',
        ifChecked: function () {
            console.log($(this).next());
        },
    })
    .on('ifChecked', function(event){
        $(this).parent().next().addClass('checked');
    })
    .on('ifUnchecked', function(event){
        $(this).parent().next().removeClass('checked');
    });
}; // checkboxes()


/* Delay the rearrangement of the pill size table
/* on window resize to prevent duplicate sizes.
--------------------------------------------------*/
function resizeDelay(){

    var $table = $('table.rx').not('.hidden'),
        zero   = $table.find('.row-0'),
        one    = $table.find('.row-1'),
        two    = $table.find('.row-2');
    
    // one row
    if ( width() > 1155 && !zero.length ) {
        one.append(two.children()).removeClass('row-1').addClass('row-0');
        two.remove();

    // two rows
    } else if ( zero.length ) {

        var tr_one = zero.children('td').slice(0, 3),
            tr_two = zero.children('td').slice(3, 6);

        $table.append( $('<tr/>', {class: 'row-1', html: tr_one}) )
              .append( $('<tr/>', {class: 'row-2', html: tr_two}) );

        zero.remove();
    }
}

function checkboxResize() {
    
    var $table = $('table.rx').not('.hidden'),
        zero   = $table.find('.row-0');

    // 2 rows
    if ( width() < 1156 ) {
        
        var tr_one = zero.children('td').slice(0, 3),
            tr_two = zero.children('td').slice(3, 6);

        $table.append( $('<tr/>', {class: 'row-1', html: tr_one}) )
              .append( $('<tr/>', {class: 'row-2', html: tr_two}) );

        zero.remove();

    // 1 row
    } else if ( !zero.length ) {
        var one = $table.find('.row-1'),
            two = $table.find('.row-2');

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



/* typeahead
/* https://github.com/twitter/typeahead.js/
----------------------------------------------------------------------------
----------------------------------------------------------------------------
---------------------------------------------------------------------------*/
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

var rx_typeahead = $('#taper_med').typeahead(
    {
        hint: true,
        highlight: true,
        minLength: 0
    },
    {
        name: 'prescription',
        source: substringMatcher(meds)
    })
    .bind('focus', function() {
        $(this).data('initial_value', $(this).val());
        rx_typeahead.typeahead('val', '');
    })
    .bind('blur', function() {
        var saved_value = $(this).data('initial_value'),
            new_value   = $(this).val();

        if (new_value) {
            rx_typeahead.typeahead('val', new_value);
        } else {
            rx_typeahead.typeahead('val', saved_value);
        }
    });

$('.typeahead')
    //.on('typeahead:opened', onOpened)
    .on('typeahead:selected', onSelected)
    .on('typeahead:autocompleted', onAutocompleted);

//function onOpened($e) {}

function onSelected($e, rx) {
    $('table.rx').not('#' + rx).addClass('hidden');
    $('table#' + rx).removeClass('hidden');
    checkboxResize();
    $e.target.blur();
}

function onAutocompleted($e, rx) {
    $('table.rx').not('#' + rx).addClass('hidden');
    $('table#' + rx).removeClass('hidden');
    checkboxResize();
    $e.target.blur();
}

// if user presses enter (13) or tab (9) select the hint
$('[id$=_form]').on('keydown', '.twitter-typeahead #taper_med', function(e) {
    if (e.which == 13 || e.which == 9) {
        e.preventDefault();
        $('.tt-selectable').first().click();
    }
});



/* headroom
/* https://github.com/WickyNilliams/headroom.js
----------------------------------------------------------------------------
----------------------------------------------------------------------------
---------------------------------------------------------------------------*/
$('nav').headroom({
    'tolerance': 5,
    'offset': 205,
    'classes': {
        'initial': 'animated',
        'pinned': 'slideDown',
        'unpinned': 'slideUp'
    }
});



/*--------------------------------------------------------------------------
  --------------------------------------------------------------------------
  *
  *                        Initial Phase Controls
  *
  --------------------------------------------------------------------------
---------------------------------------------------------------------------*/

// add initial controls to last non-linear phase
$.fn.nonLinearControls = function() {
    //console.log('this nonLinearControls', this)
    var controls = $('<div/>', { class: 'phase-add-delete animated slideInRight' })
        .append( $('<div>', {id: 'del', class: 'phase-del'}) )
        .append( $('<div>', {id: 'add', class: 'phase-add'}) )
        .append( $('<div>', {id: 'calc', class: 'taper-calc'}) );

    this.append(controls);
    
    $('.phase-add, .phase-del, .taper-calc')
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
}; // nonLinearControls()

$.fn.linearControls = function() {
    //console.log('this linearControls', this)
    var controls = $('<div/>', { class: 'phase-add-delete' })
        //append( $('<div>', {id: 'del', class: 'phase-del animated slideInRight inactive'}) ).
        .append( $('<div>', {id: 'ldel', class: 'phase-empty'}) )
        .append( $('<div>', {id: 'ladd', class: 'phase-add animated slideInRight'}) )
        .append( $('<div>', {id: 'calc', class: 'taper-calc animated slideInRight'}) );

    this.append(controls);
    
    $('.phase-add, .phase-del, .taper-calc')
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
}; // linearControls()


// Q.O.D.
function phaseQod() {
    $('[id$=_taper]').on('click', '.phase-qod', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        $(this).toggleClass('active');

        var input = $(this).children(),
            value = (input.val() == 0) ? '1' : '0';
        
        input.val(value);
    });
}; // phaseQod()

$('.phase.non-linear').last().nonLinearControls();
$('.phase.linear').linearControls();
phaseQod();



/*--------------------------------------------------------------------------
  --------------------------------------------------------------------------
  *
  *                            Database
  *
  --------------------------------------------------------------------------
---------------------------------------------------------------------------*/

/* remember user input when focus is lost
---------------------------------------------------------------------------*/
$.fn.onFocus = function() {
    this.focus(function(e) {
        var number = $(this).val().replace(/[^0-9\.]/g, '');
        $(this).data('initial_value', $(this).val());
        $(this).data('initial_number', number);
        if (number != '') { $(this).val(number); } else { $(this).val(''); };
    });
};

$.fn.onBlur = function() {
    this.blur(function(e) {
        if ($(this).val() == '') {
            $(this).val('');
        } else if ($(this).val() == $(this).data('initial_number')) {
            $(this).val($(this).data('initial_value'));
        };
    });
};

/*--------------------------------------------------------------------------
  --------------------------------------------------------------------------
  *
  *                         Validation & Flow
  *
  --------------------------------------------------------------------------
---------------------------------------------------------------------------*/


/* validate user input
---------------------------------------------------------------------------*/
function isDays(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if ((charCode < 48 || charCode > 57) && (charCode != 8))
        return false;
    return true;
}

function isDose(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if ((charCode != 46 || $(element).val().indexOf('.') != -1) && // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57) && (charCode != 8))
        return false;

    else if (($(element).val().indexOf('.') != -1) &&
        (charCode != 53 || $(element).val().substring($(element).val().indexOf('.'), $(element).val().indexOf('.').length).length > 1) && (charCode != 8))
        return false;

    return true;
}

/* add "mg" to dose and "days" to duration & validate input
---------------------------------------------------------------------------*/
$.fn.doseInput = function() {
    this.keypress(function(event) {
        return isDose(event, $(this))
    });
    this.on('change', function() {
        var value = parseFloat($(this).val()) || '',
            output = value + ' mg';

        if (value == '') { $(this).val(''); } else { $(this).val(output); }
    });
};

$.fn.daysInput = function() {
    this.keypress(function(event) {
        return isDays(event, $(this))
    })
    .on('change blur', function() {
        var value = parseFloat($(this).val()) || '',
            disp_dy = (value == 1) ? ' day' : ' days',
            output = value + disp_dy;

        if (value == '') {
            $(this).val('');
        } else {
            $(this).val(output);
        }
    })
    .on('keyup keydown', function(e) {
        $label = $(this).prev();

        var value = parseFloat($(this).val()) || '',
            output = value + ' days';

        if (value != '') {
            
            var weeks = Math.floor(parseInt(value, 10) / 7),
                days  = parseInt(value, 10) % 7;

            var disp_wk = (weeks == 1) ? ' Week, ' : ' Weeks, ',
                disp_dy = (days == 1) ? ' Day' : ' Days';
            
            // there are weeks
            if (weeks != 0) {

                if (days != 0) {
                    var display = weeks + disp_wk + days + disp_dy;
                } else {
                    var disp_wk = (weeks == 1) ? ' Week' : ' Weeks',
                        display = weeks + disp_wk;
                }

            // there are no weeks
            } else {
                var display = disp_dy;
            }
            $label.html(display);
        }
    });
};

/* generate sentence for linear input
---------------------------------------------------------------------------*/
$.fn.linearInput = function() {

    this.on('keyup keydown', function(e) {
        if (e.which == 13) {
            e.preventDefault();
            $(this).blur();
        }
    
        $inst = $('.instructions span');

        var initial   = $('#start_mg').val().replace(/[^0-9\.]/g, ''),
            terminal  = $('#stop_mg').val().replace(/[^0-9\.]/g, ''),
            decrement = $('#step_mg').val().replace(/[^0-9\.]/g, ''),
            interval  = $('#step_time').val().replace(/[^0-9\.]/g, '');

        var iniNum = (initial != '') ? [1, initial] : [0, '_ '],
            terNum = (terminal != '') ? [1, terminal] : [0, '_ '],
            decNum = (decrement != '') ? [1, decrement] : [0, '_ '],
            intNum = (interval != '') ? [1, interval] : [0, '_'];

        var iniDisp = 'Start at ' +iniNum[1]+ 'mg',
            terDisp = 'Stop at ' +terNum[1]+ 'mg',
            decDisp = 'Decrease by ' +decNum[1]+ 'mg',
            intDisp = ' every ' +intNum[1]+ ' days.';

        if (iniNum[0]) {
            var display = iniDisp+ ', ' +terDisp+ ', ' +decDisp + intDisp;
        } 
        if (!iniNum[0]) {
            var display = '';
        }

        $inst.html(display);

    });
};

/* Advancing and retreating with keys tab, enter, and delete.
 * 
 * 8  = delete
 * 9  = tab
 * 13 = enter
---------------------------------------------------------------------------*/

// dose text field
$('[id$=_form]').on('keydown', '[id$=_dose]', function(e) {

    var key = e.which;

    if ( !(key == 8 || key == 13) ) {
        return
    }

    var dose  = e.target.id,
        last  = $('[id$=_dose]:last').attr('id'),
        value = $(this).val();

    // retreat to previous phase duration if delete key pressed
    if ( (key == 8) && (value == '') && (dose == 'p2_dose') ) {
        e.preventDefault();
        var inputs = $(this).closest('form').find('.param-input');
        $(this).blur();
        inputs.slice(-3, -2).focus();
        return
    } else if ( (key == 8) && (value == '') ) {
        e.preventDefault();
        $('#del').trigger('click');
        return        
    }

    // blur & set 'mg' value if enter pressed
    if (key == 13) {
        e.preventDefault();
        $(this).blur();
        return
    }

});

// days text field
$('[id$=_form]').on('keydown', '[id$=_days]', function(e) {

    var key = e.which;

    if ( !(key == 8 || key == 9 || key == 13) ) {
        return
    }

    var days  = e.target.id,
        last  = $('[id$=_days]:last').attr('id'),
        value = $(this).val();

    //console.log('keypress', days, last, value)

    // retreat to previous field if delete pressed
    if ( (key == 8) && (value == '') ) {
        e.preventDefault();
        var inputs = $(this).closest('.phase-params').find('.param-input');
        $(this).blur();
        inputs.slice(-2, -1).focus();
        return
    }

    // if on last phase duration, and tab is pressed, create new phase
    if ( (key == 9) && (days == last) ) {
        e.preventDefault();
        $('#add').trigger('click');
        return
    }

    // blur & set 'days' value if enter pressed
    if (key == 13) {
        e.preventDefault();
        $(this).blur();
        return
    }
});

$('[id$=_dose], [id$=_days], [id$=_mg], [id$=_time]').each(function(e) {

    var $this = $(this),
        id    = $this[0].id;

    $this.onFocus();
    $this.onBlur();

    if (~id.indexOf('dose')) {
        $this.doseInput();

    } else if (~id.indexOf('days')) {
        $this.daysInput();

    } else if (~id.indexOf('mg')) {
        $this.doseInput();
        $this.linearInput();

    } else if (~id.indexOf('time')) {
        $this.daysInput();
        $this.linearInput();
    }

});

/*--------------------------------------------------------------------------
  --------------------------------------------------------------------------
  *
  *                            Phase Addition
  *
  --------------------------------------------------------------------------
---------------------------------------------------------------------------*/

/* remove controls from last phase and add controls to new phase
---------------------------------------------------------------------------*/
function newControls(phase) {
    var $controls = $('.non-linear .phase-add-delete'),
        control_in = 'slideInRight',
        control_out = 'slideOutRight';

    $controls
        .removeClass(control_in)
        .addClass(control_out)
        .one(animation_end, function() {
            $(this).removeClass(control_out);
            })
        .detach()
        .appendTo(phase)
        .addClass(control_in);
}

$('#add, #ladd').click(function(e) {
    $(this).closest('form').find(':input').slice(-1).blur();

    if (e.target.id == 'ladd') {
/*         $('#ldel')
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
            }); */
        
        $('#ladd')
            .addClass('phase-empty animated slideOutRight')
            //.addClass('phase-add ')

        $('#pl #calc')
            .removeClass('slideInRight')
            .addClass('slideOutRight');
    }

    // increment phase number
    var newid = (e.target.id == 'ladd') ? 0 : 1;
    $.each($('.phase.non-linear'), function() {
        if (parseInt($(this).data('id')) > newid) {
            newid = parseInt($(this).data('id'));
        }
    });
    newid++;

    var n = newid,
        p = 'p' + newid;

    var $phase = $('<div/>', {
        id: p,
        'data-id': n,
        'class': 'row phase non-linear animated'
    });

    var label = $('<div/>', { class: 'phase-label', unselectable: 'on', html: 'Phase ' + n });
    label.appendTo($phase);

    var qod = $('<div/>', { class: 'phase-qod-wrapper' })
              .append($('<div/>', { class: 'phase-qod' })
              .append($('<input/>', { class: 'phase-qod', id: 'nl_qod_' + n, name: 'nl_qod_' + n, type: 'hidden', value: '0' })));
    qod.appendTo($phase);

    var num = $('<div/>', { class: 'col-xs-2 phase-num v-align' })
              .append($('<p/>', { unselectable: 'on', html: n }));
    num.appendTo($phase);

    var params = $('<div/>', { class: 'col-xs-7 pull-xs-3 col-sm-8 pull-sm-2 col-md-9 pull-md-1 phase-params' }),
        row    = $('<div/>', { class: 'row' });

    // dose
    var dose = $('<div/>', { class: 'col-md-6 dose-param' }),
        dose_label = $('<label/>', { class: 'param-label', for: p + '_dose', html: 'Dose' }),
        dose_input = $('<input/>', { class: 'param-input', type: 'tel', id: p + '_dose', name: p + '_dose' });
    dose_label.appendTo(dose);
    dose_input.appendTo(dose);

    // days
    var days = $('<div/>', { class: 'col-md-6 days-param' }),
        days_label = $('<label/>', { id: p + '_days_label', class: 'param-label', for: p + '_days', html: 'Days' }),
        days_input = $('<input/>', { class: 'param-input', type: 'tel', id: p + '_days', name: p + '_days' });
    days_label.appendTo(days);
    days_input.appendTo(days);

    // build .phase div
    dose.appendTo(row);
    days.appendTo(row);
    row.appendTo(params);
    params.appendTo($phase);

    // append phase div
    $phase.appendTo($('[id$=_form] .container-fluid'));

    // dose input functions
    dose_input.onFocus();
    dose_input.onBlur();
    dose_input.doseInput();

    // days input functions
    days_input.onFocus();
    days_input.onBlur();
    days_input.daysInput();

    // apply float labels
    doseParam();
    daysParam();

    // show new phase
    $phase
        .addClass('slideInRight')
        .one(animation_end, function() {
            var inputs = $(this).closest('form').find(':input');
            inputs.slice(-2, -1).focus();
        });

    // show controls on new phase
    newControls($phase);

    $('html, body').animate({
        scrollTop: $phase.offset().top
    }, 500);

});

$('#del, #ldel').click(function(e) {

    if (e.target.id == 'ldel') {
        
        $('#pl #calc')
            .removeClass('slideOutRight')
            .addClass('slideInRight');

        $('#ladd')
            .addClass('slideInRight')
            .removeClass('phase-empty slideOutRight')
    } else {
        if (!$('#p2').length) {
            $('#ldel')
                .removeClass('slideInRight')
                .addClass('slideOutRight')
                .one(animation_end, function() {
                    $(this).addClass('phase-empty')
                           .removeClass('phase-del animated slideInRight');
                });
                
            $('#ladd')
                .addClass('slideInRight')
                .removeClass('phase-empty slideOutRight')

            $('#pl #calc')
                .removeClass('slideOutRight')
                .addClass('slideInRight');
        }
    }

    if ($('.phase').length == 2) {
        return;
    } else {
        var $phase = $('.phase').slice(2).last();

        var $controls   = $('.non-linear .phase-add-delete'),
            control_in  = 'slideInRight',
            control_out = 'slideOutRight';

        $controls
            .removeClass(control_in)
            .addClass(control_out)
            .one(animation_end, function() {
                $(this).removeClass(control_out);
            });

        $phase
            .removeClass('slideInRight')
            .addClass('slideOutRight')
            .one(animation_end, function() {
                $(this).slideToggle('fast', 'linear', function() { $phase.detach(); });

                $controls
                    .addClass(control_in)
                    .appendTo($phase.prev());

                var inputs = $(this).closest('form').find(':input');
                inputs.slice(-4, -3).focus();
            });
    }
});


/*--------------------------------------------------------------------------
  --------------------------------------------------------------------------
  *
  *                           Linear Functions
  *
  --------------------------------------------------------------------------
---------------------------------------------------------------------------*/

