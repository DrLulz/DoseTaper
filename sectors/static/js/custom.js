$(document).ready(function() {
    $('#fullpage').fullpage({
        easing: 'linear',
        anchors: ['00', '01', '02'],
        //sectionsColor: ['rgba(255, 255, 255, 0)', '#4BBFC3'],
        //css3: false,
        //autoScrolling: false,
        //verticalCentered: true,
        //fitToSection: true,
        normalScrollElements: '.card-deck',
        onLeave: function(index, nextIndex, direction) {
            // after leaving Introduction
            if (index == 1 && direction == 'down') {
                $(".navbar .container").animate({ height: 40 }, 100, 'linear');
                $(".navbar").animate({
                    backgroundColor: jQuery.Color("#ddd8ce").transition("transparent", 0.4),
                    //backgroundColor: jQuery.Color("#F8F2ED").transition("transparent", 0),
                    borderBottomColor: jQuery.Color("#ddd8ce").transition("transparent", 0)
                }, 400, 'easeInOutCubic');

                $(".navbar").animate({ backgroundColor: "#F8F2ED" }, 1000);

                $(".nav-item .nav-link, .nav-item .nav-link:hover").animate({ color: jQuery.Color("#555") }, 400, 'linear');
                $(".hamburger-icon .line").animate({
                    backgroundColor: jQuery.Color("#555").transition("transparent", 0)
                }, 400, 'easeInOutCubic');
                $(".nav-item .nav-link").toggleClass('nav-dark');
                //$('#blister_pack').addClass('animated fadeInUpBig');
                $('#blister_pack').animateCss('fadeInUpBig');
            }
            // going to Introduction
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
            if (index == 2 && direction == 'down') {
                //var section02_height = ($('div.fp-tableCell').height()) - 58;
                //var section02_height = window.innerHeight - 58;
                //var section02_height = ($('#section02').height()) - 58;
                var section02_height = $(window).height() - 78;
                //alert(section02_height);
                $('div.card-deck').height(section02_height);
                //if ($(window).width() < 545) {
                    //alert($(window).width());
                    //alert(section02_height + 'px');
                    //$('div.card-deck').css({ 'height': section02_height + "px" });
                    //$('div.card-deck').height(section02_height + 'px');
                //} else {
                    //alert('More than 960');
                //}
            }
        }
    });

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
    });

    $('.menu a').on('click', function() {
        $(".overlay").fadeToggle(200);
        ham_icon.toggleClass('active');
    });



    //$('.landing, .lead').animateCss('fadeInUp');



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
});

/* flexibility - https://github.com/jonathantneal/flexibility
---------------------------------------------------------------------------*/
/* function supportsFlexBox() {
    var test = document.createElement('test');

    test.style.display = 'flex';

    return test.style.display === 'flex';
}

if (supportsFlexBox()) {
    // Modern Flexbox is supported
} else {
    flexibility(document.documentElement);
}

var onresizeTimeout;

window.onresize = onresize;

function onresize() {
    window.onresize = null;

    if (!onresizeTimeout) {
        onresizeTimeout = setTimeout(function() {
            onresizeTimeout = null;

            flexibility(container);

            window.onresize = onresize;
        }, 1000 / 60);
    }
}
 */
