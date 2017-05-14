
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



if (mobile && $('#results').length) {
    console.log('remove class')
    $('table').removeClass('table-hover');
}



// jQuery’s hasClass and removeClass on steroids
// by Nikita Vasilyev
// https://github.com/NV/jquery-regexp-classes
(function(removeClass) {

    jQuery.fn.removeClass = function( value ) {
        if ( value && typeof value.test === "function" ) {
            for ( var i = 0, l = this.length; i < l; i++ ) {
                var elem = this[i];
                if ( elem.nodeType === 1 && elem.className ) {
                    var classNames = elem.className.split( /\s+/ );

                    for ( var n = classNames.length; n--; ) {
                        if ( value.test(classNames[n]) ) {
                            classNames.splice(n, 1);
                        }
                    }
                    elem.className = jQuery.trim( classNames.join(" ") );
                }
            }
        } else {
            removeClass.call(this, value);
        }
        return this;
    }

})(jQuery.fn.removeClass);