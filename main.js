$(document).ready(function() {

    //mobile menu
    $(".menu-btn").click(function() {
        $(".menu-wrap").slideToggle(300);
        $(this).toggleClass("on");
        $('body').toggleClass("menu-open");
        return false;
    });

    function adjustStyle(width) {
        width = parseInt(width);
        if (width > 700) {
            if (typeof $(".three-column-box").data("ui-accordion") != "undefined") {
                $(".three-column-box").accordion("destroy");
            }
            if (typeof $(".numbered-blocks").data("ui-accordion") != "undefined") {
                $(".numbered-blocks").accordion("destroy");
            }
            if (typeof $(".numbered-blocks").data("ui-accordion") != "undefined") {
                $(".four-column-box").accordion("destroy");
            }
        }
        if (width < 1200) {
            $(".header .menu").addClass("accordion");
            $(".header .menu > li > a").addClass("opener");
            $(".header .menu li > .sub-menu").addClass("slide");
        }
        if (width < 700) {
            $(".footer .footer-columns").addClass("accordion");
            $(".footer .footer-columns h3").addClass("opener");
            $(".footer .footer-columns ul").addClass("slide");
            $(".three-column-box").accordion({
                heightStyle: "content",
                collapsible: true
            });
            $(".numbered-blocks").accordion({
                heightStyle: "content",
                active: 1,
                collapsible: true
            });
            $(".four-column-box").accordion({
                heightStyle: "content",
                collapsible: true
            });
        }
    }
    $(function() {
        adjustStyle($(this).width());
        $(window).resize(function() {
            adjustStyle($(this).width());
        });
    });

    var btnMore = function() {
        if ($(window).width() < 700) {
            var review_full = $('.text_review').html();
            var review_full1 = $('.text_review');
            var height = $('.text_review').height();
            if (review_full.length > 241) {
                var review = review_full.substring(0, 241);
                $(review_full1).html(review);
                height = $(review_full1).height();
                $(review_full1).html(review_full);
            }

            $('.text_review').readmore({
                speed: 100,
                collapsedHeight: height,
                moreLink: '<a href="#" class="read-more">Read more</a>',
                lessLink: '<a href="#" class="read-less">Read less</a>'
            });
        } else {
            $('.text_review').readmore('destroy');
        }
    }

    btnMore();
    window.onresize = function() {
        btnMore();
    }

    //image to bg
    $('.blog-slider .blog-img').each(function() {
        $(this).css('background-image', 'url(' + $(this).find('> img').attr('src') + ')').find('> img').hide();
    });

    //flipper mobile
    $(".services-list li").click(function() {
        $(".services-list li").removeClass("active");
        $(this).addClass("active");
        return false;
    });

    //show form
    $(".vacancy-page .show-form a").click(function() {
        $(".form-wrap").slideDown(500);
        $('.form-wrap').addClass("form-open");
        $(".vacancy-page .show-form").hide();
        $('html, body').animate({
            scrollTop: $(".form-wrap").offset().top
        }, 500);
        return false;
    });

    //accordion
    jQuery(function() {
        initAccordion();
    });

    function initAccordion() {
        jQuery('.accordion').slideAccordion({
            opener: '.opener',
            slider: '.slide',
            collapsible: true,
            animSpeed: 500
        });
        jQuery('ul.multilevel-accordion').slideAccordion({
            opener: '.opener',
            slider: '.slide',
            collapsible: true,
            animSpeed: 300
        });
    }

    ;
    (function($) {
        $.fn.slideAccordion = function(opt) {
            // default options
            var options = $.extend({
                addClassBeforeAnimation: false,
                activeClass: 'active',
                opener: '.opener',
                slider: '.slide',
                animSpeed: 300,
                collapsible: true,
                event: 'click'
            }, opt);

            return this.each(function() {
                // options
                var accordion = $(this);
                var items = accordion.find(':has(' + options.slider + ')');

                items.each(function() {
                    var item = $(this);
                    var opener = item.find(options.opener);
                    var slider = item.find(options.slider);
                    opener.bind(options.event, function(e) {
                        if (!slider.is(':animated')) {
                            if (item.hasClass(options.activeClass)) {
                                if (options.collapsible) {
                                    slider.slideUp(options.animSpeed, function() {
                                        hideSlide(slider);
                                        item.removeClass(options.activeClass);
                                    });
                                }
                            } else {
                                // show active
                                var levelItems = item.siblings('.' + options.activeClass);
                                var sliderElements = levelItems.find(options.slider);
                                item.addClass(options.activeClass);
                                showSlide(slider).hide().slideDown(options.animSpeed);

                                // collapse others
                                sliderElements.slideUp(options.animSpeed, function() {
                                    levelItems.removeClass(options.activeClass);
                                    hideSlide(sliderElements);
                                });
                            }
                        }
                        e.preventDefault();
                    });
                    if (item.hasClass(options.activeClass)) showSlide(slider);
                    else hideSlide(slider);
                });
            });
        };

        // accordion slide visibility
        var showSlide = function(slide) {
            return slide.css({
                position: '',
                top: '',
                left: '',
                width: ''
            });
        };
        var hideSlide = function(slide) {
            return slide.show().css({
                position: 'absolute',
                top: -9999,
                left: -9999,
                width: slide.width()
            });
        };
    }(jQuery));

    //parallax
    $('.parallaxie').parallaxie({
        speed: 1
    });
    if (navigator.userAgent.match(/Trident\/7\./)) { // if IE
        $('body').on("mousewheel", function() {
            event.preventDefault();
            var wheelDelta = event.wheelDelta;
            var currentScrollPosition = window.pageYOffset;
            window.scrollTo(0, currentScrollPosition - wheelDelta);
        });
    }

    //circles main
    $('.circle').circleProgress({
        animation: {
            duration: 3000,
            easing: "circleProgressEasing"
        }
    });

    $('.circle.c1').circleProgress({
        value: 1
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('p').html(Math.round(800 * progress) + '<i>Projects <br> completed</i>');
    });

    $('.circle.c2').circleProgress({
        value: 1
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('p').html(Math.round(250 * progress) + '<i>Physical <br> devices</i>');
    });

    $('.circle.c3').circleProgress({
        value: 1
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('p').html(Math.round(160 * progress) + '<i>Qa <br> Engineers</i>');
    });

    $('.circle.c4').circleProgress({
        value: 1
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('p').html(Math.round(17 * progress) + '<i>Years of <br> experience</i>');
    });

    //progress 1
    $('.progress-l .circle.c1').circleProgress({
        value: 1
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('p').html(Math.round(180 * progress) + '<i>QA <br> engineers</i>');
    });

    $('.progress-l .circle.c2').circleProgress({
        value: 1
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('p').html(Math.round(17 * progress) + '<i>Years of <br> experience</i>');
    });

    $('.progress-l .circle.c3').circleProgress({
        value: 1
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('p').html(Math.round(4 * progress) + '<i>Offices in <br> Ukraine</i>');
    });

    $('.progress-l .circle.c4').circleProgress({
        value: 1
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('p').html(Math.round(4 * progress) + '<i>average period of work <br> in the company</i>');
    });

    //progress 2
    $('.progress-2 .circle.c1').circleProgress({
        value: 1
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('p').html(Math.round(800 * progress) + '<i>Projects <br> completed</i>');
    });

    $('.progress-2 .circle.c2').circleProgress({
        value: 1
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('p').html(Math.round(250 * progress) + '<i>Physical <br> devices</i>');
    });

    $('.progress-2 .circle.c3').circleProgress({
        value: 1
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('p').html(Math.round(100 * progress) + '<i>Qa <br> Engineers</i>');
    });

    $('.progress-2 .circle.c4').circleProgress({
        value: 1
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('p').html(Math.round(18 * progress) + '<i>Years of <br> experience</i>');
    });

    // black-white effect
    $('.grayscale').gray();

    //awards slider
    $('.awards-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.awards-slider-info',
        arrows: false,
        dots: false,
        infinite: true,
        focusOnSelect: true,
        centerPadding: '0',
        responsive: [{
            breakpoint: 700,
            settings: {
                slidesToShow: 1,
                centerMode: true,
                centerPadding: '80px'
            }
        }]
    });
    $('.awards-slider-info').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: true,
        asNavFor: '.awards-slider'
    });


    //awards slider
    $('.stories-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: true,
        asNavFor: '.stories-slider-nav'
    });
    $('.stories-slider-nav').slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        asNavFor: '.stories-slider',
        dots: false,
        arrows: false,
        centerMode: true,
        centerPadding: '100px',
        focusOnSelect: true,
        responsive: [{
                breakpoint: 1800,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    centerPadding: '38px'
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '38px'
                }
            }
        ]
    });

    //reviews slider
    $('.reviews-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: true,
        asNavFor: '.reviews-slider-nav'
    });
    $('.reviews-slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.reviews-slider',
        dots: false,
        arrows: true,
        centerMode: true,
        centerPadding: '0',
        focusOnSelect: true,
        infinite: true,
        responsive: [{
                breakpoint: 1200,
                settings: {
                    centerPadding: '38px',
                    arrows: false
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    centerPadding: '36px'
                }
            }
        ]
    });
    //blog slider
    $('.blog-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        responsive: [{
                breakpoint: 1200,
                settings: {
                    centerMode: true,
                    centerPadding: '38px',
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 700,
                settings: {
                    centerMode: true,
                    centerPadding: '36px',
                    slidesToShow: 1
                }
            }
        ]
    });

    //services-slider-mobile
    $('.services-slider-mobile').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.services-slider-mobile-info',
        arrows: false,
        dots: false,
        infinite: true,
        centerMode: true,
        focusOnSelect: true,
        centerPadding: '36px'
    });
    $('.services-slider-mobile-info').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: true,
        asNavFor: '.services-slider-mobile'
    });

    //Flexible Business Models slider
    $('.business-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 1,
        arrows: false,
        dots: false,
        responsive: [{
            breakpoint: 700,
            settings: {
                centerMode: true,
                centerPadding: '36px',
                slidesToShow: 1
            }
        }]
    });

    //awards slider
    $('.flip-slider').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 1,
        arrows: false,
        dots: false,
        centerMode: true,
        centerPadding: '120px',
        responsive: [{
                breakpoint: 1201,
                settings: {
                    centerMode: true,
                    centerPadding: '48px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 700,
                settings: {
                    centerMode: true,
                    centerPadding: '36px',
                    slidesToShow: 1
                }
            }
        ]
    });

    //tabs
    $('body').find('.tab').hide();
    var activeItem = $($('.tab-nav .active > a').attr('href'));
    activeItem.show();
    $('.tab-nav a').click(function() {
        if (!$(this).parent().hasClass('active')) {
            $(this).parent().addClass('active').siblings('li').removeClass('active');
            activeItem = $($(this).attr('href'));
            activeItem.fadeIn(400).siblings('.tab').hide();
        }
        return false;
    });

    //add file
    var inputs = document.querySelectorAll('.inputfile');
    Array.prototype.forEach.call(inputs, function(input) {
        var label = input.nextElementSibling,
            labelVal = label.innerHTML;

        input.addEventListener('change', function(e) {
            var fileName = '';
            if (this.files && this.files.length > 1)
                fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
            else
                fileName = e.target.value.split('\\').pop();

            if (fileName)
                label.querySelector('span').innerHTML = fileName;
            else
                label.innerHTML = labelVal;
        });
    });

    // add animation for all bloks
    $('.effect').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated fadeInUp',
        offset: 100
    });
    $('.business-left').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated bounceInLeft',
        offset: 100
    });
    $('.business-right').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated bounceInRight',
        offset: 100
    });
    $('.business-center').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated bounceInUp',
        offset: 100
    });
});
