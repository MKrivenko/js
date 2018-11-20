var file_labels = [], svg;
$(document).ready(function () {
	$('input[name="first-name"]').on('change', function() {
		var $elem = $(this), value = $elem.val();
		$elem.val(value.charAt(0).toUpperCase() + value.substr(1));
	});

	$('.read-later').click(function (e) {
        e.preventDefault();
		var $actual_form = $(this).closest('.post').find('.ReadLater');
		$actual_form.show();
		$(document).mouseup(function (e){
			var div = $(".wpcf7-form");
			if (!div.is(e.target)
			    && div.has(e.target).length === 0) {
				$actual_form.hide();
			}
		});
    });

     $('.wpcf7 .close').click(function (e) {
         e.preventDefault();
         $(this).closest('.ReadLater').hide();
     });

    //search input
    var searchInput = document.querySelector("input[type='search']");

    if (searchInput)
    {
        searchInput.addEventListener("keydown", function (event) {
            if (event.keyCode == 13) {
                $(".search-link").click();
            }
        });
    }

  $(".search-link").on('click', function() {
    var search = $('.aside-search input[type="search"]').val();
    if (validateSearchBox(search)) {
        $(".searchform input#s").val(search);
        $("input#searchsubmit").click();
    }
  });
    //img to bg
    $('.main .blog .list li .img-holder').each(function () {
        $(this).css('background-image', 'url(' + $(this).find('> img').attr('src') + ')').find('> img').hide();
    });

    $('.author-foto').each(function () {
        $(this).css('background-image', 'url(' + $(this).find('> img').attr('src') + ')').find('> img').hide();
    });

    //mobile menu
    /*$(".menu-btn").click(function () {
        $(".menu").slideToggle(300);
        $(this).toggleClass("on");
        $(".header .search .search-field").removeClass('active');
        return false;
    });*/

    //search button
    $(".header .search-link").click(function () {
        $(".header .search .search-field").toggleClass('active');
        if ($(window).width() < 1230) {
            $(".menu").slideUp(300);
            $(".menu-btn").removeClass("on");
        }
        return false;
    });
    $(document).on("click", function (event) {
        var $trigger = $(".header .search .search-field");
        if ($trigger !== event.target && !$trigger.has(event.target).length) {
            $(".header .search .search-field").removeClass('active');
        }
    });

    //tabs
    $('body').find('.tab').hide();
    var activeItem = $($('.tab-nav .active > a').attr('href'));
    activeItem.show();
    $('.tab-nav a').click(function () {
        if (!$(this).parent().hasClass('active')) {
            $(this).parent().addClass('active').siblings('li').removeClass('active');
            activeItem = $($(this).attr('href'));
            activeItem.fadeIn(400).siblings('.tab').hide();
        }
        return false;
    });

    $( "#tabs" ).tabs({
        collapsible: true,
        active: false
    });
	
	var tab = window.location.hash;
	if($('a[href="' + tab + '"]').length){
		$('a[href="' + tab + '"]').click();
	}
    // append plus symbol to every list item that has children
    $.each($('.menu li'), function (index, value) {
        if ($(this).children('ul').length > 0 || $(this).children('div').length > 0) {
            $(this).append($('<span class="arrow"></span>'));
        }
    });

    if ($(window).width() < 1230) {
        $('.menu').wrap('<div class="overflow"></div>');
        $(document).on('click', function(e) {
          if (!$(e.target).closest(".menu").length && !$(e.target).closest(".menu-btn").length) {
            $('.menu').removeClass('open').slideUp(250);
            $('.menu-btn').removeClass('on');
            bgScrolling();
          }
          e.stopPropagation();
        });
    }
    // fix non-scrolling overflow issue on mobile devices
    $(window).on('load resize', function () {

        // check to see if there are one or less slides
        if ($('.expertises-slider .slick-dots li').length == 1) {

            // remove arrows
            $('.slick-dots').hide();

        }
        var hh = $('.header').innerHeight(); // height of header
            vph = $(window).height() - hh;
        $('.overflow').css('height', vph);
    });

    // global variables
    var menu = $('.overflow > ul');
    var bg = $('html, body');

    // toggle background scrolling
    function bgScrolling() {
        // if menu has toggled class... *
        if (menu.hasClass('open')) {
            // * disable background scrolling
            bg.css({
                'overflow-y': 'hidden',
                'height': 'auto'
            });
        // if menu does not have toggled class... *
        } else {
            // * enable background scrolling
            bg.css({
                'overflow-y': 'visible',
                'height': '100%'
            });
        }
    }

    $('.menu-btn').on('click', function (e) {
        e.preventDefault();
        // activate toggles
        menu.slideToggle(250);
        menu.toggleClass('open');
        $(this).toggleClass("on");
        bgScrolling();
    });

    // list item click events

    $('.arrow').on('click', function (e) {
        e.preventDefault();
        active_item = ('.active_item');
        if (!$(this).parent().hasClass('active_item')){
            if (!$(this).closest('.sub-menu').length ){
                $('.menu ul').slideUp();
                $('.menu li').removeClass('active_item');
                $('.arrow').removeClass('rotate');
            }
            if($(this).closest('.sub-menu').find('.active_item').length){
                $(this).closest('.sub-menu').find('.active_item').find('.sub-menu').slideUp();
                $(this).closest('.sub-menu').find('.active_item').children('.arrow').removeClass('rotate');
                $(this).closest('.sub-menu').find('.active_item').removeClass('active_item');
            }
            $(this).prev('ul').slideDown(250);
            $(this).parent().addClass('active_item');
            $(this).addClass('rotate');
        } else {
            if (!$(this).closest('.sub-menu').length ){
                $('.menu ul').slideUp();
                $('.menu li').removeClass('active_item');
                $('.arrow').removeClass('rotate');
            }
            $(this).prev('ul').slideUp(250);
            $(this).parent().removeClass('active_item');
            $(this).removeClass('rotate');
        }
    });

    //parallax
    $('.parallaxie').parallaxie({
        speed: 1
    });
    if (navigator.userAgent.match(/Trident\/7\./)) { // if IE
        $('body').on("mousewheel", function () {
            event.preventDefault();
            var wheelDelta = event.wheelDelta;
            var currentScrollPosition = window.pageYOffset;
            window.scrollTo(0, currentScrollPosition - wheelDelta);
        });
    }

    //circles
    $('.circle').circleProgress({
        value: 1,
        size: 145,
        thickness: 4,
        startAngle: -Math.PI / 2,
        fill: {
            color: "#ef4136"
        },
        emptyFill: 'rgba(255,255,255, 0.7)',
        animation: {
            duration: 3000,
            easing: "circleProgressEasing"
        }
    });

    var circleNumber1 = $('.circle-number-1').text();
    var circleNumber2 = $('.circle-number-2').text();
    var circleNumber3 = $('.circle-number-3').text();
    var circleNumber4 = $('.circle-number-4').text();

    var circleText1 = $('.circle-text-1').text();
    var circleText2 = $('.circle-text-2').text();
    var circleText3 = $('.circle-text-3').text();
    var circleText4 = $('.circle-text-4').text();

	/*circleNumber1 = 900;
	circleNumber2 = 500;
	circleNumber3 = 300;
	circleNumber4 = 17;

     circleText1 = 'Completed <br> projects';
     circleText2 = 'Happy <br> Clients';
     circleText3 = 'Dedicated <br> Engineers';
     circleText4 = 'Years in <br> Business';*/


    $('.circle.c1').circleProgress({
        value: 1
    }).on('circle-animation-progress', function (event, progress) {
        $(this).find('p').html(Math.round(circleNumber1 * progress) + '<i>'+ circleText1 +'</i>');
    });

    $('.circle.c2').circleProgress({
        value: 1
    }).on('circle-animation-progress', function (event, progress) {
        $(this).find('p').html(Math.round(circleNumber2 * progress) + '<i>'+ circleText2 +'</i>');
    });

    $('.circle.c3').circleProgress({
        value: 1
    }).on('circle-animation-progress', function (event, progress) {
        $(this).find('p').html(Math.round(circleNumber3 * progress) + '<i>'+ circleText3 +'</i>');
    });

    $('.circle.c4').circleProgress({
        value: 1
    }).on('circle-animation-progress', function (event, progress) {
        $(this).find('p').html(Math.round(circleNumber4 * progress) + '<i>'+ circleText4 +'</i>');
    });
    if ($(".circle-list").length) {

        var progress1 = document.getElementById("progressBar1");
        var progress2 = document.getElementById("progressBar2");
        var progress3 = document.getElementById("progressBar3");
        var progress4 = document.getElementById("progressBar4");
        setTimeout(
                function () {
                    progress1.style.width = "100%";
                    progress2.style.width = "100%";
                    progress3.style.width = "100%";
                    progress4.style.width = "100%";
                    /*progress1.style.backgroundColor = "green";*/
                }
        , 50);
    }

    //awards slider
    $('.awards-slider').slick({
        slidesToShow: 9,
        slidesToScroll: 1,
        asNavFor: '.awards-slider-info',
        arrows: true,
        dots: false,
        infinite: true,
        centerMode: true,
        focusOnSelect: true,
        centerPadding: '0',
        responsive: [
            {
                breakpoint: 1230,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    $('.awards-slider-info').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: true,
        asNavFor: '.awards-slider'
    });

    //clients slider
    $('.clients-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.clients-slider-info',
        arrows: false,
        dots: false,
        infinite: true,
        centerMode: true,
        focusOnSelect: true,
        centerPadding: '0',
        asNavFor: '.clients-slider-info',
        responsive: [
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    arrows: true,
                    centerPadding: '30px'
                }
            }
        ]
    });
    $('.clients-slider-info').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: true,
        asNavFor: '.clients-slider',
        adaptiveHeight: true
    });
    $('.clients-slider-info.clients-slider-mobile').slick({
        slidesToShow: 11
    });
    $('.clients-slider-gallery').slick({
        slidesToShow: 2,
        autoplay: true
    });

    //reviews slider
    $('.reviews-slider').slick({
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
        dots: true,
        infinite: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    //study-desktop slider
    $('.study-desktop-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.study-desktop-slider-img',
        arrows: true,
        dots: true,
        infinite: true,
        focusOnSelect: true,
        centerPadding: '0',
        vertical: true
    });
    $('.study-desktop-slider-img').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        vertical: false,
        dots: false,
        fade: true,
        asNavFor: '.study-desktop-slider',
        /*dotsClass: 'custom_paging',
         customPaging: function (slider, i) {
         console.log(slider);
         return (i + 1) + '/' + slider.slideCount;
         },*/
        responsive: [
            {
                breakpoint: 1230,
                settings: {
                    arrows: true
                }
            },
            {
                breakpoint: 700,
                settings: {
                    arrows: true,
                    dots: true
                }
            }
        ]
    });

    //blog slider
    $('.blog-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
//        dots: true,
		dots: false,
        infinite: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1230,
                settings: {
                    slidesToShow: 2,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    dots: true,
                    slidesToShow: 1
                }
            }
        ]
    });

    
    //  EXPERTISES SLIDER
    // the event needs to be run before slick is initialized
    $('.expertises-slider').on('init', function (event, slick, direction) {
        // check to see if there are one or less slides
        if ($('.expertises-slider .slick-dots li').length == 1) {
            // remove arrows
            $('.slick-dots').hide();
        }
    });
    $('.expertises-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        infinite: true,
        adaptiveHeight: true,
        asNavFor: '.dots-slider',
        responsive: [
            {
                breakpoint: 1230,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    // Navigation for the expertises-slider instead of the slider dots
    $('.dots-slider').slick({
        slidesToShow: 1,
        variableWidth: true,
        arrows: false,
        asNavFor: '.expertises-slider',
        focusOnSelect: true
    });
    // EXPERTISES SLIDER END
    

    //cooperation-types slider
    $('.cooperation-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        infinite: false,
        adaptiveHeight: false,
        variableWidth: false,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1230,
                settings: {
                    slidesToShow: 3,
                    dots: false
                }
            },
            {
                breakpoint: 767,
                settings: {
                    dots: false,
                    centerMode: true,
                    centerPadding: '6%',
                    slidesToShow: 1
                }
            }
        ]
    });

    //partners-lists slider
    $('.partners-list-mobile').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        infinite: true,
        adaptiveHeight: true,
        customPaging: function (slider, i) {
            //var thumb = $(slider.$slides[i]).data();
            return '<p>'+i+'</p>';
        },
    });

  //trusted-by-slider

  $('.trusted-by-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    infinite: false,
    adaptiveHeight: false,
    variableWidth: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1230,
        settings: {
          slidesToShow: 1,
          dots: false,
          centerPadding: '6%',
          centerMode: true
        }
      },
      {
        breakpoint: 750,
        settings: {
          dots: true,
          centerMode: true,
          centerPadding: '6%',
          slidesToShow: 1
        }
      }
    ]
  });

  //clients slider
    $('.paper-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        centerPadding: '0',
        responsive: [
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '48px'
                }
            }
        ]
    });
    // cases drop down
    $("#drop-down-categories").click( function () {
        $(this).toggleClass("closed", 200);
    });

    $(".cases-filters li a").click(function (e) {
        //e.preventDefault();
        if ($(e.target).class === "active-filter") return;
        $(".cases-filters li a.active-filter").removeClass("active-filter");
        $(e.target).addClass("active-filter");
        var category = $(e.target).text();
        $("#drop-down-categories").text(category);
    });


    //top-inner-slider
     $('.top-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      arrows: true,
      dots: true
    });

     $('.post-image').each(function() {
      $(this).css('background-image', 'url(' + $(this).find('> a > img').attr('src') + ')').find('> a > img').hide();
     });

    //input file
/*
    var fileInput = document.querySelector(".input-file"),
            button = document.querySelector(".input-file-trigger"),
            the_return = document.querySelector(".file-return");

    if (button)
            {
                button.addEventListener("keydown", function (event) {
                    if (event.keyCode == 13 || event.keyCode == 32) {
                        fileInput.focus();
                    }
                });
                button.addEventListener("click", function (event) {
                    fileInput.focus();
                    return false;
                });
            }
    if (fileInput)
    {
        fileInput.addEventListener("change", function (event) {
            the_return.innerHTML = '<span>' + this.value.replace(/C:\\fakepath\\/i, '') + '</span>';
            $("file-return").toggleClass('asdas');
            if ($(window).width() > 700) {
                $(".main .contact-us .add-file").addClass('added');
            }
            ;
        });
    }
*/
    // black-white effect
    $('.my-grayscale-class').gray();

    //textarea autoheight
    jQuery.each(jQuery('textarea[data-autoresize]'), function () {
        var offset = this.offsetHeight - this.clientHeight;

        var resizeTextarea = function (el) {
            jQuery(el).css('height', 'auto').css('height', el.scrollHeight + offset);
        };
        jQuery(this).on('keyup input', function () {
            resizeTextarea(this);
        }).removeAttr('data-autoresize');
    });

    if ($(".main .cooperation-wrap").length)
    {
        var targetOffset = $(".main .cooperation-wrap").offset().top;
    }

    var $w = $(window).scroll(function () {
        if ($w.scrollTop() > targetOffset) {
            $('.main .cooperation .list li .content').css({"top": "0"});
        } else {

        }
    });
    $(".cookies-settings").click(function () {
        $(".privacyPreference").attr("style", "display: flex");
    });
    $(".closePrivacy").click(function () {
        $(".privacyPreference").attr("style", "display: none");
    });
    $(".menu.privacy > li").click(function () {
        $(".tabPrivacy, .menu.privacy > li").removeClass("active");
        $("." + $(this).attr("id")).addClass("active");
        $(this).addClass("active");
    });

    $(".cookies-submit").click(function () {
        $(".cookies-footer").attr("style", "display:none;");
        $.cookie('AlertBoxOk', 'ok', {expires: 20 * 365});
    });

    $(".saveButton button").click(function () {
        var valueToPush = new Array();
        $("section.toogle-cookie input").not(':checked').each(function () {
            var value = $(this).val().split("|");
            var catName = $(this).attr("data-category");
            valueToPush.push({[catName]: value});
        });
        $.cookie('AlertBox', JSON.stringify(valueToPush), {expires: 20 * 365});
        $(".privacyPreference").attr("style", "display: none;");
    });

    if ($.cookie('AlertBox')) {
        var keys = JSON.parse($.cookie('AlertBox')).map(function (value) {
            var key = Object.keys(value);
            return Array.isArray(key) ? key[0] : key;
        });
        $.each((keys), function (i, value) {
            $("input[data-category='" + value + "']").prop('checked', false);
        });
    }

    if (/Edge/.test(navigator.userAgent)) {
        $('body').on("mousewheel", function () {
            event.preventDefault();
            var wd = event.wheelDelta;
            var csp = window.pageYOffset;
            window.scrollTo(0, csp - wd);
        });
    }

    $(".testimonials .show-more-button").on('click', function (e) {
        e.preventDefault();
        var thisBlock = $(this);
        thisBlock.find("span").hide();
        thisBlock.find("p").show();
        var testimonialNumber = $('.testimonial').last().data('testimonial-number');
        var testimonialAmount = $('.testimonials-list').data('testimonial-number');
        var data = {
            action: 'get_next_testimonials',
            whatever: 1234,
            lastNumber: testimonialNumber
        };

        jQuery.post(myajax.url, data, function (response) {
            $('.testimonials-list').append(response);
            thisBlock.find("p").hide();
            var newTestimonialNumber = $('.testimonial').last().data('testimonial-number');
            if(newTestimonialNumber < testimonialAmount)
            {
                thisBlock.find("span").show();
            }

        });

    });

   if($('.testimonial-form').length)
   {

      $("#testimonial-send-btn").click(function() {
            $(".wpcf7-form-control.wpcf7-submit.publish-testimonial-btn").click();
        });

	// clients-testimotional
	function changePreviewName() {
		var firstName = $('#firstName').val() || 'First name';
		var laststName = $('#lastName').val() || 'Last name';
		 $('.testimonial-client-info .client-name').text(firstName + ' ' + laststName);
	 }

	 function changePreviewcompany() {
		var companyName = $('#companyName').val() || 'Company Name';
		var position = $('#position').val() || 'Position';
		$('.testimonial-client-info .client-company').text(companyName + ', ' + position);
	}

	$('#firstName').on('input', function () {
		changePreviewName();
	});
	$('#lastName').on('input', function () {
		changePreviewName();
	});
	$('#companyName').on('input', function () {
		changePreviewcompany();
	});
	$('#position').on('input', function () {
		changePreviewcompany();
	});
    }

    // Wrap the complex cta-block if the text is too long
    var complexBlock = $('.cta-complex');
    $.each(complexBlock, function() {
        if ($(this).height() > 260) {
            $(this).addClass('cta-complex-wrap');
        }
    });
    
    $(".alphabet").click(function() {
      var letter = $(this).text();
      if (letter == "All") {
        $(".filtered-group").attr("style", "display: block;");
      }else{
        $(".filtered-group").attr("style", "display: none;");
        $("#tabs-"+letter).attr("style", "display: block;");
      }
      $(".filter-list > li").removeClass("ui-state-active");
      $(this).parent().addClass("ui-state-active");
    });

});

function goToForm() {
	var $tab_link = $('ul[role="tablist"] li:first a');
	if($tab_link.length && !$($tab_link.attr('href')).is(":visible")){
		$tab_link.click();
	}
    $('html, body').animate({
        scrollTop: $("div.contact-us").offset().top
    }, 1000);
}

function validateSearchBox(search){
    $(".aside-search .error").hide();
    var hasError = false;
    var searchReg = /^[a-zA-Z0-9- ]+$/;
    if(search == '') {
        $(".aside-search .error").text('Please enter a search term.');
        hasError = true;
    } else if(!searchReg.test(search)) {
        $(".aside-search .error").text('Enter valid text.');
        hasError = true;
    } else if($.trim(search).length < 3) {
        $(".aside-search .error").text('Search box must contain at least 3 letters.');
        hasError = true;
    }
    if(hasError == true) {
        $(".aside-search .error").show()
        return false;
    }
    return true;
}

// $(document).ready(function () {

//     $('.slick-initialized').slick({
//         infinite: true,
//         slidesToShow: 3,
//       });
// });
function readMoreTestimonial($container)
{
	if($container.hasClass("read-more")){ // When clicking on Read less
		$container.removeClass("read-more");
        $container.find('.comas-after').hide();
        $container.find('.less').hide();
        $container.find('.more').show();
		$container.find('.comas').show();
	} else { // When clicking on Read more
		$container.addClass("read-more");
        $container.find('.comas-after').show();
        $container.find('.less').show();
        $container.find('.more').hide();
		$container.find('.comas').hide();
	}
	//$container.find("a").hide();
}

jQuery(function(){
	$.each($('input.agree_'), function(key, value){
		$(value).click();
	});
	var inputs = document.querySelectorAll( '.add-file [type="file"]' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var elem_name = $(input).attr('name'),
			label = document.querySelector('.add-file label[for="' + elem_name + '"]'),
			labelVal = ((label.length)? label.innerHTML: ''),
			$image_container = $('.testimonial-preview .' + elem_name), 
			accepted_type = $(input).attr('accept') ;	
		setUpKillFile(elem_name);
		input.addEventListener( 'change', function( e )
		{
			var fileName = '', is_valid_type = false, message, ext, size = 0, max_size = 20 * 1024 * 1024;
			$(input).parent().siblings('.error').remove();

			if( this.files && this.files.length > 1 ){
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			} else {
				fileName = e.target.value.split( '\\' ).pop();
				size = this.files[0].size;
			}
			if(!size || size > max_size){
				message = 'File is too big, choose another one'
			}
			if(accepted_type){
				var parts = fileName.split('.'),
					ext = parts[parts.length - 1];
				is_valid_type = accepted_type.split(',').includes("." + ext);
				if(!is_valid_type){
					message = 'File is not valid, choose another one';
				}
			} else {
				message = 'File is not valid, choose another one';
			} 
			
			if(fileName && !message){
				label.innerHTML = fileName;
				var reader = new FileReader();
				reader.onload = function(event) {
					if($image_container.length){
						var image_html = '<div style="width:100%; height:100%; z-index:50; ';
						image_html += 'background:url('  + event.target.result + '); ';
						image_html += 'background-size: cover !important; ';
						image_html += 'background-repeat: no-repeat !important; ';
						image_html += 'background-position: 50% 50% !important;" ';
						image_html += '>';
						image_html += '</div>';
						$image_container.html(image_html);
						return event;
					} else {
						$('div.file-return-wrap p.file-return').html('<span>' + fileName + '</span>');
						$('.add-file').addClass('added');
						
						svg = createSVG(ext, size);
						$('.add-file label.input-file-trigger').css("background","url('" + svg(0)	+ "') 20px center no-repeat");
						return event;
					}
				}
				reader.readAsDataURL(input.files[0]);
			} else {
				input.value = '';
				return errorMessage(label, labelVal, message);
			}
		});
	});

});
function errorMessage(label, labelVal, message)
{
	$(label).siblings('span.error').remove();
	label.innerHTML = labelVal;
	$('<span class="error">' + message + '</span>').insertAfter(label);
}

function setUpKillFile(elem_name)
{
	var $kill_file = $('span.kill-file.' + elem_name),
		$label = $('label[for="' + elem_name + '"]'),
		$file_input = $('#' + $label.attr('for')),
		label_html = $label.html(),
		kill_file_html = label_html;
		
	file_labels[file_labels.length] = {
		label:$label,
		label_html:label_html
	};
	if($kill_file.length){
		$kill_file.on('click', function(){
			$label.html(kill_file_html);
			$kill_file.hide();
			$file_input.val('');
			$('.preview-header div.'+ elem_name +' div').remove();
			$label.siblings('.error').remove();
			return false;
		});
		$file_input.on('change', function(){
			$kill_file.show();
		});
	} else {
		$(".main .contact-us .add-file .close").click(function () {
			$file_input.val('');
			$(".main .contact-us .add-file .file-return span").hide();
			$(".main .contact-us .add-file").removeClass('added');
			$('.add-file label.input-file-trigger').css("background","");
			$label.html(kill_file_html);
			$label.siblings('.error').remove();
			return false;
		});
	}
}
function readURL(input) {

	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function(e) {
			$('.header-preview .logo-preview').css('background', 'url(' + e.target.result + ')');
			$('.header-preview .logo-preview img').hide();
		}
		reader.readAsDataURL(input.files[0]);
	}
}
function createSVG(ext, size)
{
	return function(percent){
		var max_fill = 46, html = 'data:image/svg+xml;base64,', svg ='';
		
		svg += '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="74" viewBox="0 0 48 74">';
		svg += '<g fill="none" fill-rule="evenodd">';
		svg += '    <path fill="#FFF" fill-rule="nonzero" d="M32.914 0H.5v60h47V14.586L32.914 0zm.586 3.414L44.086 14H33.5V3.414zM2.5 58V2h29v14h14v42h-43z"/>';
		svg += '    <path stroke="#FFF" d="M.5 67.5h46v6H.5z"/>';
		svg += '    <path fill="#0F0" d="M.5 68.5h' + Math.round(max_fill * percent / 100) + 'v4H.5z"/>';
		svg += '    <text fill="#FFF" font-family="LucidaGrande, Lucida Grande" font-size="12">';
		svg += '        <tspan x="11.074" y="34">.' + ext + '</tspan> <tspan x="7.629" y="49" font-size="8">' + getReadableFileSizeString(size) + '</tspan>';
		svg += '    </text>';
		svg += '</g>';
		svg += '</svg>';
		return html + btoa(svg);
	}
}
function getReadableFileSizeString(size)
{
	var kilo = 1024, names = ['b', 'kb', 'mb', 'gb'];
	for (var i = 0; i < names.length; i++) {
		if (size >= kilo){
			size /= kilo;
		} else {
			break;
		}
	}
	return size.toFixed(2) + ' ' + names[i];
}