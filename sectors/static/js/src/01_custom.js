
var mobile = mobile();

if (mobile) {
    $('img#logo.svg').css({ width: '42px', padding: '0' });
    $('#section00 .content').css({ 'padding-top': '0'});
    $('#section00 .container').css({ 'padding-bottom': '0'});
}

/* Ham Icon
---------------------------------------------------------------------------*/
/* <html ontouchend="this.onclick=touchFix">
function touchFix() {
    var el = this;
    var par = el.parentNode;
    var next = el.nextSibling;
    par.removeChild(el);
    setTimeout(function() {par.insertBefore(el, next);}, 0)
}; */



var ham = $('#ham_icon');
var overlay = $('.overlay');

function touchFix() {
    if (mobile && !ham.hasClass('active')) {
        ham.addClass('notransform');
    } else if (mobile && ham.hasClass('active')) {
        ham.removeClass('notransform');
    }
};

ham.add(overlay).click(function(e) {
    overlay.toggleClass('active');
    if ( $('#navigation').hasClass('slideDown') ) {
        $('#navigation').removeClass('slideDown');
    };
    $('body').toggleClass('overflow');
    $('.overlay-inner').viewportDimensions();
    overlay.toggleMenu();
    ham.toggleClass('active');
    touchFix();
    $('.ham-icon > .line').toggleClass('line-active');
    $(window).on('resize', resetMenu);
});


/* login
---------------------------------------------------------------------------*/
var $form_modal = $('.cd-user-modal'),
    $form_login = $form_modal.find('#cd-login'),
    $form_signup = $form_modal.find('#cd-signup'),
    $form_forgot_password = $form_modal.find('#cd-reset-password'),
    $form_modal_tab = $('.cd-switcher'),
    $tab_login = $form_modal_tab.children('li').eq(0).children('a'),
    $tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
    $forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
    $back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
    $main_nav = $('.login-nav');

//open modal
$main_nav.on('click', function(event) {
    $form_modal.addClass('is-visible');
    if ( $('#navigation').hasClass('slideDown') ) {
        $('#navigation').removeClass('slideDown');
    };
    login_selected();
});

//close modal
$('.cd-user-modal').on('click', function(event) {
    if ($(event.target).is($form_modal) || $(event.target).is('.cd-close-form')) {
        $form_modal.removeClass('is-visible');
    }
});
//close modal when clicking the esc keyboard button
$(document).keyup(function(event) {
    if (event.which == '27') {
        $form_modal.removeClass('is-visible');
    }
});

//switch from a tab to another
$form_modal_tab.on('click', function(event) {
    event.preventDefault();
    ($(event.target).is($tab_login)) ? login_selected(): signup_selected();
});

//hide or show password
$('.hide-password').on('click', function() {
    var $this = $(this),
        $password_field = $this.prev('input');

    ('password' == $password_field.attr('type')) ? $password_field.attr('type', 'text'): $password_field.attr('type', 'password');
    ('Hide' == $this.text()) ? $this.text('Show'): $this.text('Hide');
    //focus and move cursor to the end of input field
    $password_field.putCursorAtEnd();
});

//show forgot-password form 
$forgot_password_link.on('click', function(event) {
    event.preventDefault();
    forgot_password_selected();
});

//back to login from the forgot-password form
$back_to_login_link.on('click', function(event) {
    event.preventDefault();
    login_selected();
});

//REMOVE THIS - it's just to show error messages
$form_login.find('input[type="submit"]').on('click', function(event) {
    event.preventDefault();
    $form_login.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
});
$form_signup.find('input[type="submit"]').on('click', function(event) {
    event.preventDefault();
    $form_signup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
});


//IE9 placeholder fallback
//credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
/*     if (!Modernizr.input.placeholder) {
        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.val(input.attr('placeholder'));
            }
        }).blur();
        $('[placeholder]').parents('form').submit(function() {
            $(this).find('[placeholder]').each(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            })
        });
    } */


/* headroom
/* https://github.com/WickyNilliams/headroom.js
----------------------------------------------------------------------------
----------------------------------------------------------------------------
---------------------------------------------------------------------------*/
if (! $('#fullpage').length ) {
    $('nav').headroom({
        'tolerance': 5,
        'offset': 205,
        'classes': {
            'initial': 'animated',
            'pinned': 'slideDown',
            'unpinned': 'slideUp'
        }
    });
}

/*--------------------------------------------------------------------------
  --------------------------------------------------------------------------
  *
  *                                Mobile
  *
  --------------------------------------------------------------------------
---------------------------------------------------------------------------*/


/* fastclick for standalone apps
---------------------------------------------------------------------------*/
isIos = function () {
    // Reference: http://stackoverflow.com/questions/9038625/detect-if-device-is-ios#answer-9039885
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

isRunningStandalone = function () {
    // Bullet proof way to check if iOS standalone
    var isRunningiOSStandalone = window.navigator.standalone;

    // Reliable way (in newer browsers) to check if Android standalone.
    // http://stackoverflow.com/questions/21125337/how-to-detect-if-web-app-running-standalone-on-chrome-mobile#answer-34516083
    var isRunningAndroidStandalone = window.matchMedia('(display-mode: standalone)').matches;

    return isRunningiOSStandalone || isRunningAndroidStandalone;
};

if (isIos() && isRunningStandalone()) {
    // Initialize Fast Click
    // Even with the latest webkit updates, unfortunatley iOS standalone apps still have the 350ms click delay,
    // so we need to bring in fastclick to alleviate this.
    // See http://stackoverflow.com/questions/39951945/ios-standalone-app-300ms-click-delay
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            FastClick.attach(document.body);
        }, false);
    }
}

/* remove hover on mobile results page
---------------------------------------------------------------------------*/
if (mobile && $('#results').length) {
    console.log('remove class')
    $('table').removeClass('table-hover');
}

/* utils
---------------------------------------------------------------------------*/

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