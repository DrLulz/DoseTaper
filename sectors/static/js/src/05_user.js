
$('.collapse').on('show.bs.collapse', function (e) {
    var icon = $(this).parent().find('.user-left .fa');
    icon.removeClass('fa-caret-right').addClass('fa-caret-down');
})
.on('hide.bs.collapse', function () {
    var icon = $(this).parent().find('.user-left .fa');
    icon.removeClass('fa-caret-down').addClass('fa-caret-right');
});
/* pickadate
/* https://github.com/amsul/pickadate.js
----------------------------------------------------------------------------
----------------------------------------------------------------------------
---------------------------------------------------------------------------*/
$.fn.userDatePicker = function() {
    
    var $date_field = $(this),
        $date_icon = $(this).parent().children('.input-group-addon'),
        picker_class = $(this).attr('id') + '_picker';

    $date_field.pickadate({
        //format: 'mmmm dd, yyyy',
        format: 'mm/dd/yyyy',
        today: '<i class="fa fa-crosshairs" aria-hidden="true"></i>',
        clear: '',
        close: '<i class="fa fa-times" aria-hidden="true"></i>',
        formatSubmit: 'yyyy-mm-dd',
        hiddenName: true,
        onStart: function () {
            //var date = new Date();
            var date = new Date(2016,11,31);
            this.set('select', [date.getFullYear(), date.getMonth(), date.getDate()]);
        },
        onClose: function(e) {
            $date_field.text(this.get());
            $('.cal-wrapper').removeClass('cal-hover');
            $(document.activeElement).blur();
        },
    }),
    picker_open_close = $(this).pickadate( 'picker' );

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

    $date_field.text(picker_open_close.get());

};

$('[id$="_date"]').each(function(e) {
    var $this = $(this),
        $icon = $this.parent().children('.input-group-addon').children('.fa-calendar-o');

    $this.userDatePicker();

    $this.add($icon).on('mouseover mouseout', function() {
        $this.add($icon).toggleClass('cal-hover');
    });

});
