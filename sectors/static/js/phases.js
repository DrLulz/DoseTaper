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
        (charCode != 53 || $(element).val().substring($(element).val().indexOf('.'), $(element).val().indexOf('.').length).length>1) && (charCode != 8))
        return false;

    return true;
} 

/* Dynamic Phases
---------------------------------------------------------------------------*/
$(function() {    
    $('#add').click( function () {

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
            'class': 'row phase animated slideInRight'
        });

        var label = $('<div/>', { class: 'phase-label',  unselectable: 'on',  html: 'Phase ' + n });
        label.appendTo($phase);

        var qod = $('<div/>', { class: 'phase-qod-wrapper' }).
            append($('<div/>', { class: 'phase-qod' }).
                append($('<input/>', { class: 'phase-qod',  id: 'nl_qod_' + n,  name: 'nl_qod_' + n,  type: 'hidden',  value: '0' }) ));
        qod.appendTo($phase);

        var num = $('<div/>', { class: 'col-xs-2 phase-num v-align' }).
            append($('<p/>', { unselectable: 'on',  html: n }));
        num.appendTo($phase);

        //$('<div class="col-xs-2 col-md-1 phase-spacer"></div>').appendTo($phase);
        $('<div/>', { class: 'col-xs-2 col-md-1 phase-spacer' }).appendTo($phase);

        var params = $('<div/>', { class: 'col-xs-8 col-md-9 phase-params' });
        var row = $('<div/>', { class: 'row' });

        var dose = $('<div/>', { class: 'col-md-6 dose-param' }).
            append($('<label/>', { class: 'param-label',  for: p + '_dose',  html: 'Dose' })).
            append($('<input/>', { class: 'param-input',  type: 'tel',  id: p + '_dose', name: p + '_dose'}));

        var days = $('<div/>', { class: 'col-md-6 days-param' }).
            append($('<label/>', { id: p + '_days_label',  class: 'param-label',  for: p + '_days',  html: 'Days' })).
            append($('<input/>', { class: 'param-input',  type: 'tel',  id: p + '_days', name: p + '_days'}));

        dose.appendTo(row);
        days.appendTo(row);
        row.appendTo(params);
        params.appendTo($phase);


        
        $phase.appendTo( $('#nl_form .container-fluid') );
        
        $('html, body').animate({
            scrollTop: $phase.offset().top
        }, 500);

    });

    $('#del').click( function () {
        var $phase = $( '.phase' ).slice(2).last();
        $phase.slideToggle('fast', 'linear', function(){ $phase.remove(); });
    });


    $('#nl_form').on('keydown', '[id$=_days]:last', function(e) {
        if (e.which == 9) {
            $('#add').trigger('click');
            //$("#del_phase").trigger("click");
        }
    });
});




jQuery(function($){
    var p1_dose = $('#p1_dose');
    p1_dose.keypress(function (event) {
        return isDose(event, this)
    });

    p1_dose.on('change', function() {
        var value = parseFloat($(this).val());
        var output = value + ' mg';
        $(this).val(output);
    }); 

    var p1_days = $('#p1_days');
    p1_days.keypress(function (event) {
        return isDays(event, this)
    });
    p1_days.on('change', function() {
        var value = parseFloat($(this).val());
        var output = value + ' days';
        $(this).val(output);
        var weeks = Math.floor(parseInt(value, 10) / 7);
        var days = parseInt(value, 10) % 7;

        if (weeks != 0) {
            var display = weeks + ' Weeks, ' + days + ' Days';
        } else {
            var display = 'Days ' + days;
        }
        $('#p1_days_label').html(display);
    }); 
});