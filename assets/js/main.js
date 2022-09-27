gsap.registerPlugin(ScrollTrigger)
;(function($){

	let mobailDevaice = $(window).innerWidth() < 991;
	let navItem = $(".hero-area .nav__item");
	var logoLine = $(".header-logo .logo-line");
	var logoItem = $(".header-logo .logo-item");


	gsap.set(logoLine, {
	  drawSVG:"0%"
	})
	let logoTl = gsap.timeline({paused:true});

	logoTl
	.to(logoItem, {
	  opacity:0,
	  stagger:{
	    amount:0.3,
	    from:"end"
	  },
	  duration:0.5,
	  ease:"expo.inOut"
	})
	.to(logoLine, {
		drawSVG:"100%",
		ease:"expo.inOut"
	}, "-=0.2")

	logoTl.reverse();

	
	// $("[data-name='move-orbs']").each(function() {
	// 	$(this).wrap('<g class="move-orbs"></g>');
	// });

	// let orbsTl = gsap.timeline({
	// 	paused:true
	// });
	// orbsTl
	// .to(Ords1, {
	// 	y:0,
	// 	duration:0.5,
	// 	stagger:0.2
	// })

	// orbsTl.play();

	navItem.each(function() {

		let linkItem = $(this).find('a.link-item');
		let pageItem = $(linkItem.attr('href')); 
		let singleDuration = 1;
		let currentItem = $(this); 
		let currentItemHeight = $(this).innerHeight(); 
		let siblingsItem = $(this).siblings();
		let title = $(this).find('.title');
		let ItemsText = siblingsItem.find('.title .word'); 
		let earthWrapper = $(this).find('.earth-wrapper'); 

		let earthWrapperTopOffset = earthWrapper.offset().top;
		let earthWrapperLeftOffset = earthWrapper.offset().left;
		let earthWrapperWidth = earthWrapper.innerWidth();  

		let textLoop = pageItem.find('.text-loog-wrap p');
		pageItem.find('.text-loog-wrap').append(`<p>${textLoop.html()}</p>`);
		let textLoogTl = gsap.timeline({
			repeat: -1,
			defaults:{
				duration:50,
				ease:"none"
			}
		})
		// Set Style

		if(mobailDevaice){ 
			currentItem.css({
				width: currentItem.innerWidth()+'px',
				height: currentItem.innerHeight()+'px', 
			});
			gsap.set(currentItem.find(".content-wrapper"), {
				height: currentItem.find(".content-wrapper").innerWidth(),
				width: currentItem.find(".content-wrapper").innerWidth()
			})
		}

		if(textLoop){
			gsap.set(pageItem.find('.text-loog-wrap p'), { 
				x:"-50vw"
			})
			textLoogTl.to(pageItem.find('.text-loog-wrap p'), {  
				xPercent:-100
			}, "<")
			textLoogTl.pause(); 
		}
		textLoogTl.pause();
		gsap.set(pageItem.find('.fadeUpDown'), {
			y:100,
			autoAlpha:0
		})
		// Timeline Style
		let navTl = gsap.timeline({
			paused:false,
			defaults:{
				duration:0.5,
				ease:'power2.inOut'
			},
			onComplete:()=>{
				setTimeout(function(){
					ScrollTrigger.refresh();
				}, 50) 

				// ScrollTrigger
				if(mobailDevaice){
					$(".page-section-item").each(function(index, el) {
						let getNav = $("a[href='#"+$(this).attr('id')+"']").closest('.nav__item');
						let getMap = getNav.find('.earth-wrapper');
						let getTitle = getNav.find('.title');
						let getSection = $(this).find('.page-content-wrap');
						let transformVal = getSection.innerHeight() - $(window).innerHeight();
						console.log(getTitle)
						gsap.to(getTitle, {
							y:-100,
							autoAlpha:0,
							ease:"none",
							scrollTrigger:{ 
								trigger:getSection,
								scroller:el,
								start:"top top",
								end:"+=150", 
								// markers:true,
								scrub:true
							}
						})
						gsap.to(getMap, {
							y:-transformVal,
							scrollTrigger:{ 
								trigger:getSection,
								scroller:el,
								start:"top top",
								end:`+=${transformVal}`,
								// markers:true,
								scrub:true
							}
						})
						
					});

				}

			}, 
			onReverseComplete:()=>{
				ScrollTrigger.refresh();
			},
			onStart:()=>{
				$(".page-section-item").scrollTop(0); 
			}

		})
		if(mobailDevaice){
			navTl
			.set(".hero-area", {minHeight:"auto", height:"100vh"})
		} 
		navTl
		.set(currentItem, {height:currentItemHeight})
		.set(earthWrapper, {
			left:earthWrapperLeftOffset,
			top:earthWrapperTopOffset,
			'position':'fixed',
			width:earthWrapperWidth
		}, "<")
		if(mobailDevaice){
			navTl
			.set(currentItem.find(".content-wrapper"), {
				top:currentItem.find(".content-wrapper").offset().top,
				left:currentItem.find(".content-wrapper").offset().left,
				height: currentItem.find(".content-wrapper").innerWidth(),
				width: currentItem.find(".content-wrapper").innerWidth(),
				position:"absolute"
			}, "<")
			.set(currentItem, {position:"static"}, "<")
		}
		navTl
		.to(ItemsText, { 
			yPercent:110, 
			stagger:{
				amount:0.2,
				from:"end"
			}
		}, "<")
		.to(siblingsItem, {
			autoAlpha:0,
		}, "<")
		.to(earthWrapper, { 
			width:!mobailDevaice ? '110vw' : "1128vw",
			left:!mobailDevaice ? '11vw' : "-118vw", 
			duration:singleDuration
		}, "<")
		.to(title, {
			top:!mobailDevaice ? 40 : "50vw", 
			bottom:!mobailDevaice ? 'auto' : "",  
			left:'11vw',
			fontSize:!mobailDevaice ? "4.6875vw" : "12vw",
			lineHeight:!mobailDevaice ? "4.6875vw" : "12vw", 
			duration:singleDuration
		}, "<") 
		.set(linkItem, {
			'display':'none' 
		}, "<") 
		if(mobailDevaice){ 
			navTl
			.to(currentItem.find(".content-wrapper"), {
				height:"100%",
				width:"100%",
				left:0,
				top:0
			}, "<")
		}
		if($(this).hasClass("business-law")){ 
			navTl
			.to(earthWrapper, {
				top:!mobailDevaice ? "-20vw" : "-151vw",
				duration:singleDuration
			}, "<")
			if(!mobailDevaice){
				navTl
				.to(currentItem, {  
					width:'90vw',
					left:'10vw',
					height:"100%",
					duration:singleDuration
				}, "<")
			}
		}else{
			navTl
			.to(earthWrapper, {
				top:!mobailDevaice ? "-35vw" : "-151vw",
				duration:singleDuration
			}, "<") 
			if(!mobailDevaice){
				navTl 
				.to(currentItem, { 
					width:'90vw',
					left:'10vw',
					bottom:'auto',
					top:0,
					height:"100%",
					duration:singleDuration 
				}, "<");
			}
		}
		navTl
		.set(pageItem, {
			'display':'block'
		}, "<")
		.to(pageItem.find('.fadeUpDown'), {
			y:0,
			autoAlpha:1,
			stagger:{
				amount:0.2
			},
			duration:0.8,
			ease:'power2.out',
			onComplete:()=>{
				if(textLoop){
					textLoogTl.play(); 
				}
			},
			onReverseComplete:()=>{
				if(textLoop){
					textLoogTl.pause();
				}
			}  
			
		}, "-=0.3") 
		// Click Item
		navTl.reverse();
		let thiNav = $(this);
		linkItem.click(function() {
			thiNav.addClass("active");
			navTl.reversed(!navTl.reversed()); 
			logoTl.reversed(!logoTl.reversed()); 
			pageItem.toggleClass('active-page');
		});

		$(".header-logo").click(function() { 
			thiNav.removeClass("active");
			$('.page-section-item.active-page').removeClass('active-page');  
			if(!navTl.reversed()){
				navTl.reversed(!navTl.reversed()); 
				setTimeout(function(){
					logoTl.reversed(!logoTl.reversed()); 
				}, 1000)
			}
		});

	});

	// POPUP SCRIPT
	gsap.set(".popup-item", { 
		y:20, autoAlpha:0, display:"none"
	})

	gsap.set('.popup-item .fadeUp', {
		y:20,
		autoAlpha:0
	})
	gsap.set('.popup-item .icon', {
		rotation:390
	})

	$('.open-popup').on('click', function(e) {
		e.preventDefault();

		var getPopup = $($(this).attr('href'));
		if(getPopup[0]){ 
			var getActiveSection = $(".page-section-item.active-page");
			$('body').addClass('overflow-hidden'); 
			getPopup.addClass('active'); 
			gsap.set(getPopup, {
				display:"block"
			})
			gsap.to(getActiveSection, { 
				y:20, autoAlpha:0,
				duration:0.5
			})
			gsap.to(getPopup, { 
				y:0, autoAlpha:1,
				duration:0.5
			}, "-=0.3") 
			gsap.to('.popup-item.active .fadeUp', {
				y:0,
				autoAlpha:1,
				stagger:0.1,
				duration:0.5,
				delay:0.5,
				ease:"power2.easeIn"
			})
			gsap.to('.popup-item .icon', {
				rotation:0,delay:0.2, duration:1
			});

			if(mobailDevaice){
				gsap.to($(".nav__item.active .title"), {
					autoAlpha:1,
					y:0 
				})	
			}
 
		}

	});

	$('.popup-item .btn__close').on('click', function() { 
		ScrollTrigger.refresh(); 
		var activePopup = $(this).closest('.popup-item');
		var getActiveSection = $(".page-section-item.active-page");
		$('body').removeClass('overflow-hidden'); 
		
		gsap.to(activePopup, { 
			y:20, autoAlpha:0,
			duration:0.5
		})
		gsap.to(getActiveSection, { 
			y:0, autoAlpha:1,
			duration:0.5
		}, "-=0.3")
		gsap.to('.popup-item.active .fadeUp', { 
			y:20,
			autoAlpha:0,
			stagger:0.1,
			duration:0.5,
		})
		gsap.to('.popup-item .icon', {
			rotation:390
		})
		gsap.set(activePopup, {
				display:"none",
				delay:0.5
			})
		activePopup.removeClass('active'); 

	});


	$(".open-child-popup").on('click', function(event) {
		event.preventDefault();
		var getActivePopup = $(".popup-item.active");
		var getChildPopup = $($(this).attr('href'));
		if(getChildPopup[0]){ 
			gsap.set(getChildPopup, { 
				display:"block"
			})
			gsap.to(getActivePopup, {
				y:20,
				autoAlpha:0
			})
			gsap.to(getChildPopup, { 
				y:0,
				autoAlpha:1
			})
		}
	});
	$(".btn__close_clild").on('click', function(event) {
		event.preventDefault();
		var getActivePopup = $(".popup-item.active");
		var getChildPopup = $(this).closest('.popup-item');
		gsap.to(getActivePopup, {
			y:0,
			autoAlpha:1
		})
		gsap.to(getChildPopup, { 
			y:20,
			autoAlpha:0
		})
		gsap.set(getChildPopup, { 
				display:"none",
				delay:0.5
			})
	});



	// INNER CONTENT 
	gsap.set([".inner-content-popup .fadeUp",".inner-content-popup"], {
		y:100,
		autoAlpha:0 
	})
	gsap.set(".inner-content-popup", {
		display:"none"
	})
	$(".open-inner-content").on('click', function(event) {
		event.preventDefault();
		var getInnerPopup = $($(this).attr('href'));
		if(getInnerPopup[0]){
			gsap.set(".inner-content-popup", {
				display:"block"
			})
			gsap.to(getInnerPopup, {
				autoAlpha:1,
				y:0
			})
			gsap.to(".popup-backdrop", {
				autoAlpha:1
			})
			gsap.to(getInnerPopup.find(".fadeUp"), {
				autoAlpha:1,
				y:0,
				stagger:{
					amount:0.2
				},
				duration:0.8,
				ease:'power2.out',
				delay:0.3
			})
		}
	});

	$(".btn__close_inner_popup").on('click', function() { 
		var activePopup = $(this).closest('.inner-content-popup');
		gsap.to(activePopup, {
			autoAlpha:0,
			y:100
		})
		gsap.to(".popup-backdrop", { 
			autoAlpha:0
		})
		gsap.to(activePopup.find(".fadeUp"), { 
			autoAlpha:0,
			y:100,
			stagger:{
				amount:0.2
			},
			duration:0.8
		})
		gsap.set(".inner-content-popup", {
			display:"none",
			delay:0.5
		})
	});


})(jQuery);