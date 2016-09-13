// window.viewportUnitsBuggyfill.init();

$(document).ready(function() {


    /* Webapp
    ---------------------------------------------------------------------------*/
    // height / width without top UI
    // window.screen.availHeight
    // window.screen.availWidth

    // determines whether full-screen mode (Boolean)
    // window.navigator.standalone
    // alert(window.navigator.standalone);


    $('#fullpage').fullpage({
        easing: 'linear',
        anchors: ['00', '01', '02'],
        sectionsColor: ['rgba(255, 255, 255, 0)', '#FFF', '#FFF'],
        //css3: false,
        //autoScrolling: false,
        //verticalCentered: true,
        //fitToSection: true,
        //normalScrollElements: '.card-deck',
        scrollOverflow: true,
        //continuousVertical: true,
        //responsiveHeight: 900,
        scrollOverflowOptions: {
            fadeScrollbars: true
        },
        /* afterRender: function() {}, */
        /* afterResize: function() {$.fn.fullpage.reBuild();}, */
        onLeave: function(index, nextIndex, direction) {
            // Going to section01
            if (index == 1 && direction == 'down') {
                $(".navbar .container").animate({ height: 40 }, 100, 'linear');
                $(".navbar").animate({
                    backgroundColor: jQuery.Color("#ddd8ce").transition("transparent", 0.4),
                    borderBottomColor: jQuery.Color("#ddd8ce").transition("transparent", 0)
                }, 400, 'easeInOutCubic');

                $(".navbar").animate({ backgroundColor: "#F8F2ED" }, 1000);

                $(".nav-item .nav-link, .nav-item .nav-link:hover").animate({ color: jQuery.Color("#555") }, 400, 'linear');
                $(".hamburger-icon .line").animate({
                    backgroundColor: jQuery.Color("#555").transition("transparent", 0)
                }, 400, 'easeInOutCubic');
                $(".nav-item .nav-link").toggleClass('nav-dark');
                $('#laptop').animateCss('fadeInUpBig');
            }
            // Going to section00
            if (index == 2 && direction == 'up') {
                $(".navbar .container").animate({ height: 98 }, 100, 'linear');
                $(".navbar").animate({
                    backgroundColor: jQuery.Color("#ddd8ce").transition("transparent", 1),
                    borderBottomColor: jQuery.Color("#ddd8ce").transition("transparent", 1)
                }, 400, 'linear');
                $(".nav-item .nav-link, .nav-item .nav-link:hover").animate({ color: jQuery.Color("#fff") }, 400, 'linear');
                $(".hamburger-icon .line").animate({
                    backgroundColor: jQuery.Color("#ecf0f1").transition("transparent", 0)
                }, 400, 'easeInOutCubic');
                $(".nav-item .nav-link").toggleClass('nav-dark');
            }
            // Going to section02
            if (index == 2 && direction == 'down') {
                if (!$(window).width() < 568) {
                    $('#calendar').animateCss('fadeInUpBig');
                    $('#rxpad').animateCss('fadeInUpBig');
                    $('#clipboard').animateCss('fadeInUpBig');
                }
            }
        }
    });

    // Hack to enable iScroll when setting height of .card-wrapper with js
    $(window).resize(function() {
        if ($(window).width() > 567) {
            var height = window.innerHeight - 58;
            $('#section02 .container').css({ 'height': height + 'px' });
        } else {
            $('#section02 .container').css({ 'height': '' });
        }
/*         if (window.navigator.standalone) {
            webapp();
        } */

    });

     var webapp = function() {
        var landscape = orientation(window.innerWidth, window.innerHeight);
        var width = window.screen.availWidth;
        var height = window.screen.availHeight;
        if (landscape) {
            //$('[id^=section0] .container').css({ 'height': width + 'px' });
            $('#section00 .container.vc-100').css({ 'height': width + 'px' });
        } else {
            $('#section00 .container.vc-100').css({ 'height': height + 'px' });
        }
    };

    var navHeightUpdate = function() {
        $('.fp-tableCell:not(#section00 .fp-tableCell)').prepend($('<div class="fp-placeholder"></div>'));
        $('.fp-placeholder').css('height', 58);
    };
    navHeightUpdate();

    var ham_icon = $('.hamburger-icon');
    ham_icon.click(function() {
        $(".overlay").fadeToggle(200);
        ham_icon.toggleClass('active');
        $(window).on("resize", resetMenu);
        var color = $('.hamburger-icon .line').css("backgroundColor");
        resetHam();
        return false;
    });

    $('.overlay').on('click', function() {
        $(".overlay").fadeToggle(200);
        ham_icon.toggleClass('active');
        if ($('.nav-item .nav-link').hasClass('nav-dark')) {
            $('.hamburger-icon .line').css('background-color', '#555');
        }
    });

    $('.menu a').on('click', function() {
        $(".overlay").fadeToggle(200);
        ham_icon.toggleClass('active');
    });

    // Functions

    var resetMenu = function() {
        if (($('.overlay').is(":visible")) && ($(window).width() > 767)) {
            $(".overlay").fadeToggle(200);
            ham_icon.toggleClass('active');
            $(window).off("resize", resetMenu);
            resetHam();
        }
    };
    var resetHam = function() {
        if (ham_icon.hasClass('active')) {
            $('.hamburger-icon .line').css('background-color', '#ecf0f1');
        } else if ($('.nav-item .nav-link').hasClass('nav-dark')) {
            $('.hamburger-icon .line').css('background-color', '#555');
        } else {
            // Clicking off overlay on section00
            $('.hamburger-icon .line').css('background-color', '#ecf0f1');
        }
    };

    $.fn.extend({
        animateCss: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });

    var orientation = function(w, h) {
        if (w > h) {
            if ($('body').hasClass('portrait')) {
                $('body').removeClass('portrait').addClass('landscape');
            } else if (!$('body').hasClass('portrait')) {
                $('body').addClass('landscape');
            }
            var landscape = true;
        } else {
            if ($('body').hasClass('landscape')) {
                $('body').removeClass('landscape').addClass('portrait');
            } else if (!$('body').hasClass('landscape')) {
                $('body').addClass('portrait');
            }
            var landscape = false;
        }
        return landscape;
    };

});
