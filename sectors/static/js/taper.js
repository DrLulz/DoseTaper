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
    });

    if (mobile) {
        $('.picker__frame').css({ 'bottom': '0', 'margin-bottom': '0', 'top': 'auto'});
        $('.picker__box').css({ 'border-radius': '0', 'border-bottom-width': '0'});
    } else {
        $('.picker__frame').css({ 'top': '15%'});
    }


/*     $(window).resize(function() {
        if ($(window).width() > 768) {
            $('.dose-param').css({ 'padding-bottom': '0'});
        } else {
            $('.dose-param').css({ 'padding-bottom': '30px'});
        }
    }); */
});