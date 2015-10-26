/*global $*/

$(function () {
	'use strict';

	/*--- Smooth Scrolling ---*/
	$('a[href*=#]:not([href=#])').click(function () {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});

	var date  = new Date(),
      $nav = $('nav.top-nav'),
	    navChildren = $('.nav-links li').children(), // Get all li children
	    links = [];
	
	/*--- Set Copyright year ---*/
	$('.yr-now').html(date.getFullYear().toString());
	
	for (var i = 0; i < navChildren.length; i++) {
		var link = navChildren[i],
			href = $(link).attr('href');
		links.push(href);
	}
	
	
	
	$('a[href="#home"]').addClass("active");

	$(window).scroll(function () {

		var	scrollPos = $(window).scrollTop(),
			showPosition = $('#about').offset().top, // Point to show got-to-top arrow
			windowHeight = $(window).height();

		/*--- Sticky nav bar ---*/
		if (scrollPos >= $('.brand').height()) {
			$nav.addClass("no-pad");
		} else {
			$nav.removeClass("no-pad");
		}
		
		if (scrollPos >= ($('.az-intro').offset().top) - 90) {
			$nav.addClass("opaque");
		} else {
			$nav.removeClass("opaque");
		}

		/*--- Show/hide go to top lonk ---*/
		if (scrollPos >= showPosition) {
			$('.az-go-top').css('display', 'block');
		} else {
			$('.az-go-top').css('display', 'none');
		}
		
		/*---- Active nav element ----*/
		for (var i = 0; i < links.length; i++) {
			var href = links[i],
				secPosition = $(href).offset().top - 200, // Offset of the section from the top
				secHeight = $(href).outerHeight(); // height of hte section
			
			if (scrollPos >= secPosition && scrollPos < (secPosition + secHeight)) {
				$('a[href="' + href + '"]').addClass("active");
			} else {
				$('a[href="' + href + '"]').removeClass("active");
			}
			
		}
		
	});


	/*--- Awesome form ---*/
	$('.az-contact-form .field-group .text-input').focusout(function () {
		if ($(this).val() === "") {
			$(this).removeClass('has-value');
		} else {
			$(this).addClass('has-value');
		}
	});

	/*--- Send email ---*/
	$('#send').click(function () {
		$.ajax({
			type: "POST",
			url: "https://mandrillapp.com/api/1.0/messages/send.json",
			data: {
				'key': 'gAWCzKHFlMGphDmMdsZoqA',
				'message': {
					'from_email': $("#email").val(),
					'to': [ {
						'email': 'buzzme46@gmail.com',
						'type': 'to'
					} ],
					'autotext': 'true',
					'subject': 'from: ' + $("#name").val(),
					'html': $("#message").val()
				}
			}
		}).done(function (response) {
			//console.log(response);
			if (response[0].status === "sent") {
				$("#name, #email, #message").val("");
			}
		});
	});

	
});