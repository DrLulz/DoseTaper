$(document).ready(function() {

    /* Fullpage
    ---------------------------------------------------------------------------*/
    $('#fullpage').fullpage({
        anchors: ['00', '01', '02'],
        sectionsColor: ['#393939', '#FDFDFD', '#FDFDFD'],
        scrollOverflow: true,
        scrollOverflowOptions: { fadeScrollbars: true },
        verticalCentered: false,
        normalScrollElements: '.overlay, .overlay-inner',
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
                if (!mobile) {
                    $('#logo').animate({ padding: 10 });
                }
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
    var overlay_inner = $('.overlay-inner');
    ham.add(overlay).add(overlay_inner).click(function(e) {
        e.preventDefault();
        $('.overlay-inner').viewportDimensions();
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

$.fn.viewportDimensions = function() {
    return this.height(window.innerHeight).width(window.innerWidth);
};