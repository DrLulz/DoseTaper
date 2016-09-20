$(document).ready(function() {

    /* Fullpage
    ---------------------------------------------------------------------------*/
    $('#fullpage').fullpage({
        anchors: ['00', '01'],
        sectionsColor: ['#393939', '#393939'],
        //fixedElements: 'nav',
        verticalCentered: false,
        //fitToSectionDelay: 100,
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


    /* Ham Icon
    ---------------------------------------------------------------------------*/
    var ham = $('#ham_icon');
    var overlay = $('.overlay');
    ham.add(overlay).click(function(e) {
        e.preventDefault();
        ham.toggleClass('active');
        overlay.fadeToggle(200);
        $(window).on("resize", resetMenu);
        $('.ham-icon > .line').toggleClass('line-active');

    });

    function resetMenu() {
        if ((overlay.is(":visible")) && ($(window).width() > 768)) {
            overlay.fadeToggle(200);
            ham.toggleClass('active');
            $(window).off("resize", resetMenu);
        }
    };


});
