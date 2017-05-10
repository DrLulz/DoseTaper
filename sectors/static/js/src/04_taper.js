/* typeahead
---------------------------------------------------------------------------*/
$('.typeahead')
    //.typeahead(/* pass in your datasets and initialize the typeahead */)
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

$('[id$=_form]').on('keydown', '.twitter-typeahead #taper_med', function(e) {
    if (e.which == 13 || e.which == 9) {
        e.preventDefault();
        $('.tt-selectable').first().click();
        //$(this).blur();
    }
});




/* floating labels
---------------------------------------------------------------------------*/
doseParam();
daysParam();


/* datepicker (pickadate)
---------------------------------------------------------------------------*/
datePicker();

// http://www.inabrains.com/tooltip/guide.html#api
/* $('#input_date').LiteTooltip({
    title: 
    '<div class="l-tip">' +
    'Start Date' +
    '</div>'
});  */

// http://ned.im/noty/options.html
var n = new Noty({
    type: 'warning', // alert, success, error, warning, info
    layout: 'topCenter', // top, topLeft, topCenter, topRight, center, centerLeft, centerRight, bottom, bottomLeft, bottomCenter, bottomRight
    theme: 'mint',
    text: 'Notification', // HTML or string
    timeout: 2000, // false, 1000, 3000, 3500, etc.
    progressBar: true,
    closeWith: ['click', 'button'],
    animation: {
        open: 'noty_effects_open',
        close: 'noty_effects_close'
    },
    id: false,
    force: false,
    killer: false,
    queue: 'global',
    container: false,
    buttons: [],
    titleCount: {
        conditions: []
    },
    modal: true
});
//n.show()


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



/* checkboxes (iCheck)
---------------------------------------------------------------------------*/
checkBoxes();
checkboxResize();



/* headroom js
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



/* add controls to last phase
---------------------------------------------------------------------------*/
$('.phase').last().initialControls();


/* Q.O.D. behavior
---------------------------------------------------------------------------*/
phaseQod();
