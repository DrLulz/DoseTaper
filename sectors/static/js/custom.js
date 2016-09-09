// window.viewportUnitsBuggyfill.init();
$(document).ready(function() {

    $(window).resize(function() {
        var innerWidth = window.innerWidth;
        var innerHeight = window.innerHeight;
        $('.auto-height').css({ 'height': innerHeight + 'px' });

        if (mobile()) {
            if (innerWidth > innerHeight) {
                var landscape = true;
            } else {
                var landscape = false;
            }

            if (landscape) {
                var offset = deviceWidth - innerHeight;
            } else {
                var offset = deviceHeight - innerHeight;
            }

        }
        alert(iOS());
    });

    /*     $(window).resize(function() {
            landscape = landscape();
            alert(landscape);

            var innerWidth = window.innerWidth;
            var innerHeight = window.innerHeight;

            var deviceWidth = window.screen.width;
            var deviceHeight = window.screen.height;

            var outerWidth = window.outerWidth;
            var outerHeight = window.outerHeight;

            if (innerWidth > innerHeight) {
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
            if (landscape) {
                var offset = deviceWidth - innerHeight;
            } else {
                var offset = deviceHeight - innerHeight;
            }
            //alert(innerWidth + ' x ' + innerHeight);
            //alert(offset);
            $('.auto-height').css({ 'height': innerHeight + "px" });
        }); */
    /*     var onresizeTimeout;
        window.onresize = onresize;

        function onresize() {
            window.onresize = null;
            if (!onresizeTimeout) {
                onresizeTimeout = setTimeout(function() {
                    onresizeTimeout = null;
                    alert('resize');
                    window.onresize = onresize;
                }, 1000 / 60);
            }
        } */

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
        //responsiveHeight: 900,
        scrollOverflowOptions: {
            fadeScrollbars: true
        },
        /* afterRender: function() {}, */
        /* afterResize: function() {}, */
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
                if ($(window).width() > 543) {
                    $('#calendar').animateCss('fadeInUpBig');
                    $('#rxpad').animateCss('fadeInUpBig');
                    $('#clipboard').animateCss('fadeInUpBig');
                }
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
    var mobile = function() {
        var check = false;
        (function(a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

    var iOS = function() {

        var iDevices = [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ];

        if (!!navigator.platform) {
            while (iDevices.length) {
                if (navigator.platform === iDevices.pop()) {
                    return true; }
            }
        }

        return false;
    }
    $.fn.extend({
        animateCss: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });
});

/* flexibility - https://github.com/jonathantneal/flexibility */
