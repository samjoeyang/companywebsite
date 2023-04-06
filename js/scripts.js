/*!
* Start Bootstrap - Agency v6.0.4 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using anime.js
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').on('click', function () {
        if (
            location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ?
                target :
                $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                anime({
                    targets: 'html, body',
                    scrollTop: target.offset().top - 72,
                    duration: 1000,
                    easing: 'easeInOutExpo'
                });
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").on('click', function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 74,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).on('scroll', navbarCollapse);


    // $("sendMessageButton").on('click',function(){

    //     data = {
    //         subject: "New Message from website",
    //         text_content: "联系人："+('name').val()+" | 电子邮件："+$('email').val()+" | 联系电话："+$('phone').val()+" | 维权内容："+$('message').val(),
    //         html_content: "<a href='{{ request.scheme }}://{{ request.get_host}}/case/feedback/1/' target='_blank'>点击查看</a>"
    //     }
    //     $.ajax({
    //         type:"post",
    //         url:'/case/sendmail/',
    //         data:data,
    //         success:function(xhr){
    //             console.log(xhr)
    //         },
    //         error:function(xhr){ 
    //             console.log(xhr)
    //         }
    //     });
    // });

})(jQuery); // End of use strict
