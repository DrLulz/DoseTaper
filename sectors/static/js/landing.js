$(document).ready(function() {
    if (mobile) {
        $('img#logo.svg').css({ width: '42px', padding: '0' });
    }
    /* Fullpage
    ---------------------------------------------------------------------------*/
    $('#fullpage').fullpage({
        anchors: ['00', '01', '02'],
        sectionsColor: ['#393939', '#FDFDFD', '#FDFDFD'],
        scrollOverflow: true,
        scrollOverflowOptions: { fadeScrollbars: true },
        verticalCentered: false,
        normalScrollElements: '.overlay',
        onLeave: function(index, nextIndex, direction) {


            // Going to section01
            if (index == 1 && direction == 'down') {
                $('.navbar').animate({
                    height: 60,
                    backgroundColor: 'rgb(248, 242, 237)',
                    borderBottomColor: 'rgb(221, 216, 206)'
                });
                $('#logo').animate({ padding: 0 });
                $('.nav-link, .nav-link:hover').animate({ color: '#555' }).toggleClass('nav-dark');
                $('.ham-icon > .line').addClass('line-dark');
            }


            // Going to section00
            if (index == 2 && direction == 'up') {
                $('.navbar').animate({
                    height: 120,
                    backgroundColor: 'transparent',
                    borderBottomColor: 'transparent'
                });
                $('#logo').animate({ padding: 10 });
                $('.nav-link, .nav-link:hover').animate({ color: '#FFF' }).toggleClass('nav-dark');
                $('.ham-icon > .line').removeClass('line-dark');
            }


            // Going to section02
            if (index == 2 && direction == 'down') {}
        }
    });

    // So section02 doesnt jump
    $(window).resize(function() {
        if ($(window).width() > 666) {
            var height = window.innerHeight - 60;
            $('#section02 .container').height(height);
        } else {
            $('#section02 .container').height('100%');
        }
    });

    /* Ham Icon
    ---------------------------------------------------------------------------*/
    var ham = $('#ham_icon');
    var overlay = $('.overlay');
    ham.add(overlay).click(function(e) {
        e.preventDefault();
        overlay.toggleMenu();
        ham.toggleClass('active');
        $('.ham-icon > .line').toggleClass('line-active');
        $(window).on('resize', resetMenu);
    });

    function resetMenu() {
        if ((overlay.css('opacity') == 1) && ($(window).width() > 768)) {
            overlay.toggleMenu();
            ham.toggleClass('active');
            $('.ham-icon > .line').toggleClass('line-active');
            $(window).off('resize', resetMenu);
        }
    };

});

/* f(x)
---------------------------------------------------------------------------*/
$.fn.toggleMenu = function() {
    if (this.css('opacity') == 0) {
        this.visibilityToggle().animateOpacity();
    } else {
        this.animateOpacity().visibilityToggle();
    }
};

$.fn.visibilityToggle = function() {
    return this.css('visibility', function(i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible';
    });
};

$.fn.animateOpacity = function() {
    var value = (this.css('opacity') == 0) ? '1' : '0';
    return this.animate({ opacity: value }, 200);
};
