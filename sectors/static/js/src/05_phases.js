/* f(x)
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

function phaseAddControls(phase) {
    var $controls = $('.phase-add-delete'),
        control_in = 'slideInRight',
        control_out = 'slideOutRight';

    $controls.
    removeClass(control_in).
    addClass(control_out).
    one(animation_end, function() {
        $(this).removeClass(control_out);
    }).
    detach().
    appendTo(phase).
    addClass(control_in);
}

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

$.fn.doseInput = function() {
    this.keypress(function(event) {
        return isDose(event, $(this))
    });
    this.on('change', function() {
        var value = parseFloat($(this).val()) || '';
        var output = value + ' mg';
        if (value == '') {
            $(this).val('');
        } else {
            $(this).val(output);
        }
    });
};

$.fn.daysInput = function() {

    this.keypress(function(event) {
        return isDays(event, $(this))
    });

    this.on('change blur', function() {
        var value = parseFloat($(this).val()) || '';
        var output = value + ' days';
        if (value == '') {
            $(this).val('');
        } else {
            $(this).val(output);
        }
    });
    this.on('keyup keydown', function() {
        $label = $(this).prev();
        var value = parseFloat($(this).val()) || '';
        var output = value + ' days';
        if (value != '') {
            var weeks = Math.floor(parseInt(value, 10) / 7);
            var days = parseInt(value, 10) % 7;

            if (weeks != 0) {
                if (days == 1) { days_display = ' Day' } else { days_display = ' Days' };
                var display = weeks + ' Weeks, ' + days + days_display;
            } else {
                var display = 'Days';
            }
            $label.html(display);
        }
    });
};


/* Dynamic Phases
---------------------------------------------------------------------------*/

$('#add').click(function() {
    $(this).closest('form').find(':input').slice(-1).blur();

    // increment phase number
    var newid = 1;
    $.each($('.phase'), function() {
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
        'class': 'row phase animated'
    });

    var label = $('<div/>', { class: 'phase-label', unselectable: 'on', html: 'Phase ' + n });
    label.appendTo($phase);

    var qod = $('<div/>', { class: 'phase-qod-wrapper' }).
    append($('<div/>', { class: 'phase-qod' }).append($('<input/>', { class: 'phase-qod', id: 'nl_qod_' + n, name: 'nl_qod_' + n, type: 'hidden', value: '0' })));
    qod.appendTo($phase);

    var num = $('<div/>', { class: 'col-xs-2 phase-num v-align' }).
    append($('<p/>', { unselectable: 'on', html: n }));
    num.appendTo($phase);

    //var params = $('<div/>', { class: 'col-xs-8 pull-xs-2 col-md-9 pull-md-1 phase-params' });
    var params = $('<div/>', { class: 'col-xs-7 pull-xs-3 col-sm-8 pull-sm-2 col-md-9 pull-md-1 phase-params' }); 
    var row = $('<div/>', { class: 'row' });

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
    $phase.appendTo($('#nl_form .container-fluid'));

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
    $phase.
    addClass('slideInRight').
    one(animation_end, function() {
        var inputs = $(this).closest('form').find(':input');
        inputs.slice(-2, -1).focus();
    });

    // show controls on new phase
    phaseAddControls($phase);

    $('html, body').animate({
        scrollTop: $phase.offset().top
    }, 500);

});

$('#del').click(function() {
    if ($('.phase').length == 2) {
        return;
    } else {
        var $phase = $('.phase').slice(2).last();

        var $controls = $('.phase-add-delete'),
            control_in = 'slideInRight',
            control_out = 'slideOutRight';

        $controls.
        removeClass(control_in).
        addClass(control_out).
        one(animation_end, function() {
            $(this).removeClass(control_out);
        });

        $phase.
        removeClass('slideInRight').
        addClass('slideOutRight').
        one(animation_end, function() {
            $(this).slideToggle('fast', 'linear', function() { $phase.detach(); });

            $controls.
            addClass(control_in).
            appendTo($phase.prev());

            var inputs = $(this).closest('form').find(':input');
            inputs.slice(-4, -3).focus();
        });
    }
});

$('[id$=_form]').on('keydown', '[id$=_days]:last', function(e) {
    if (e.which == 9) {
        e.preventDefault();
        $('#add').trigger('click');
    }
});
$('[id$=_form]').on('keydown', '[id$=_days]', function(e) {
    if (e.which == 8 && $(this).val() == '') {
        e.preventDefault();
        var inputs = $(this).closest('.phase-params').find('.param-input');
        $(this).blur();
        inputs.slice(-2, -1).focus();
    }
});
$('[id$=_form]').on('keydown', '[id$=_dose]', function(e) {
    if (e.which == 8 && $(this).val() == '' && $(this).attr('id') == 'p2_dose') {
        e.preventDefault();
        var inputs = $(this).closest('form').find('.param-input');
        $(this).blur();
        inputs.slice(-3, -2).focus();
    }
});
$('[id$=_form]').on('keydown', '[id$=_dose]:last', function(e) {
    if (e.which == 8 && $(this).val() == '') {
        e.preventDefault();
        $('#del').trigger('click');
    }
});


$('[id$=_dose], [id$=_days], [id$=_mg], [id$=_time]').each(function() {
    var $this = $(this);

    $this.onFocus();
    $this.onBlur();

    if ($this[0].id.indexOf('_dose') !== -1) {
        $this.doseInput();
    } else if ($this[0].id.indexOf('_days') !== -1) {
        $this.daysInput();
    }
});
