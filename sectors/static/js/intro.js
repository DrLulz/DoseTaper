/* Fullpage
---------------------------------------------------------------------------*/
var animation_name = 'animated fadeInUpBig';
var animation_end = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

$('#fullpage').fullpage({
    anchors: ['00', '01', '02', '03'],
    sectionsColor: ['#393939', '#FDFDFD', '#FDFDFD', '#FDFDFD'],
    scrollOverflow: true,
    scrollOverflowOptions: { fadeScrollbars: true },
    verticalCentered: false,
    //bigSectionsDestination: top,
    navigation: true,
    normalScrollElements: '.overlay, .overlay-inner, .cd-user-modal',
    //css3: false,
    scrollingSpeed: 1000,
    onLeave: function(i, nextIndex, d) {
        //var leavingSection = $(this);
        //console.log('index = ' + index);
        //console.log('nextIndex = ' + nextIndex);
        //console.log('direction = ' + direction);
        //console.log('leavingSection = ' + leavingSection);

        if (nextIndex == 1) {
            $('.navbar').animate({
                height: 120,
                backgroundColor: 'transparent',
                borderBottomColor: 'transparent'
            });
            if (!mobile) {
                $('#logo').animate({ padding: 10 });
            }
            $('.nav-link, .nav-link:hover').animate({ color: '#FFFFFF' }).toggleClass('nav-dark');
            $('.ham-icon > .line').removeClass('line-dark');


        }

        if (!(nextIndex == 1) && !(i == 2 || i == 3 || i == 4)) {
            $('.navbar').animate({
                height: 60,
                backgroundColor: '#F8F2ED',
                borderBottomColor: '#DDD8CE'
            });
            $('#logo').animate({ padding: 0 });
            $('.nav-link, .nav-link:hover').animate({ color: '#5C5C5C' }).toggleClass('nav-dark');
            $('.ham-icon > .line').addClass('line-dark');
        }

        // Going to section00
        if (i == 2 && d == 'up') {}
        // Going to section01
        if (i == 1 && d == 'down') {
            $('#laptop').addClass(animation_name)
                .one(animation_end, function(){ 
                    $(this).removeClass(animation_name);
            });
        }
        // Going to section02
        if (i == 2 && d == 'down') {
            $('#calendar, #rxpad, #clipboard').addClass(animation_name)
                .one(animation_end, function(){ 
                    $(this).removeClass(animation_name);
            });
        }
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