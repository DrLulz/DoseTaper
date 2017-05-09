

/* typeahead
---------------------------------------------------------------------------*/
$('.typeahead')
    //.typeahead(/* pass in your datasets and initialize the typeahead */)
    //.on('typeahead:opened', onOpened)
    .on('typeahead:selected', onSelected)
    .on('typeahead:autocompleted', onAutocompleted);

    //function onOpened($e) {}

    function onSelected($e, rx_name) {
        //console.log('rx_name', rx_name)
        //$('.meds').not('#' + rx_name).hide();
        //$('#' + rx_name).show();
        $e.target.blur();
    }

    function onAutocompleted($e, rx_name) {
        //console.log('rx_name', rx_name)
        //$('.meds').not('#' + rx_name).hide();
        //$('#' + rx_name).show();
        $e.target.blur();
    }

$('[id$=_form]').on('keydown', '.twitter-typeahead #taper_med', function(e) {
    if(e.which == 13 || e.which == 9) {
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

/* $('#input_date').LiteTooltip({
    title: 
    '<div class="l-tip">' +
    'Start Date' +
    '</div>'
});  */
new Noty({
    text: 'Some notification text',
}).show();

// snap popup to bottom on mobile browsers
if (mobile) {
    $('.picker__frame').css({ 'bottom': '0', 'margin-bottom': '0', 'top': 'auto'});
    $('.picker__box').css({ 'border-radius': '0', 'border-bottom-width': '0'});
} else {
    $('.picker__frame').css({ 'top': '15%'});
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
        'initial'  : 'animated',
        'pinned'   : 'slideDown',
        'unpinned' : 'slideUp'
        }
    });



/* add controls to last phase
---------------------------------------------------------------------------*/
$( '.phase' ).last().initialControls();


/* Q.O.D. behavior
---------------------------------------------------------------------------*/
phaseQod();
