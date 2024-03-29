"use strict";
const JSCCommon = { 
	modalCall() {
		const link = '[data-fancybox="modal"], .link-modal-js';

		Fancybox.bind(link, {
			arrows: false,
			// infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el=>{
			el.addEventListener("click", ()=>{
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		document.addEventListener("click", function (event) {
			const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
			const menu = document.querySelector(".menu-mobile--js");
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, { passive: true });
	},
	closeMenu() {
		const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		if (menu.classList.contains("active")) {
			toggle.forEach(element => element.classList.remove("on"));
			menu.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}

	},
	mobileMenu() { 
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			let catalogTargetContainer = event.target.closest('.catalog-dropdown.active'); // (1)
			if (!container && !toggle && !catalogTargetContainer) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 1200px)").matches) this.closeMenu();
		}, { passive: true });
	},

	// tabs  .
	tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;

		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})


		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask({"mask":"+9(999)999-99-99", showMaskOnHover: false}).mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				Fancybox.close();
				Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active")
			});
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	makeDDGroup() {
		let parents = document.querySelectorAll('.dd-group-js');
		for (let parent of parents) {
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;

					$(ChildHeads).each(function () {
						if (this === clickedHead) {
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function () {
								$(this).toggleClass('active');
							});
						}
						else {
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function () {
								$(this).removeClass('active');
							});
						}
					});

				});
			}
		}
	},
};
const $ = jQuery;

function eventHandler() {
	// JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	// JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.makeDDGroup();
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	// JSCCommon.animateScroll();
	
	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	// modal window

	const headerBlockSwiper = new Swiper('.headerBlock__slider--js', {
		slidesPerView: 'auto',
		spaceBetween: 32,
		loop: true,
		// breakpoints: {
		// 	575: {
		// 		slidesPerView: 2,
		// 	},
		// 	992: {
		// 		slidesPerView: 3,
		// 	}
		// },
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	const sBestSwiper = new Swiper('.sBest__slider--js', {
		slidesPerView: 1,
		spaceBetween: 32,
		loop: true,
		breakpoints: {
			575: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			}
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});


	const sBrandsSliderSwiper = new Swiper('.sBrandsSlider__slider--js', {
		slidesPerView: 'auto',
		freemode: true,
		spaceBetween: 32,
		loop: true,
	});

	// const convertImages = (query, callback) => {
	// 	const images = document.querySelectorAll(query);
	
	// 	images.forEach(image => {
	// 		fetch(image.src)
	// 		.then(res => res.text())
	// 		.then(data => {
	// 			const parser = new DOMParser();
	// 			const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');
	
	// 			if (image.id) svg.id = image.id;
	// 			if (image.className) svg.classList = image.classList;
	
	// 			image.parentNode.replaceChild(svg, image);
	// 		})
	// 		.then(callback)
	// 		.catch(error => console.error(error))
	// 	});
	// };
	// convertImages(".sBrandsSlider__item img");

	let catalogBtn = document.querySelector('.menu-item-catalog--js a');
	let catalogDropdown = document.querySelector('.catalog-dropdown');
	if (catalogBtn) {
		catalogBtn.addEventListener('click', function(event) {
			event.preventDefault();
			this.classList.toggle('active');
			if (catalogDropdown) {
				catalogDropdown.classList.toggle('active');
				document.addEventListener('mouseup', (event) => {
					let catalogContainer = event.target.closest('.catalog-dropdown.active');
					let catalogTargetBtn = event.target.closest('.menu-item-catalog--js a.active');
					let catalogTargetBackBtn = event.target.closest('.catalog-dropdown__back');
					if(!catalogContainer && !catalogTargetBtn || catalogTargetBackBtn) {
						catalogBtn.classList.remove('active');
						catalogDropdown.classList.remove('active');
					}
				});
			};
		});
	};

	var $range = $(".js-range-slider");
	var $inputFrom = $(".js-input-from");
	var $inputTo = $(".js-input-to");
	var instance;
	var min = 0;
	var max = 156668;
	var from = 0;
	var to = 0;

	$range.ionRangeSlider({
			skin: "round",
			type: "double",
			min: min,
			max: max,
			from: 890,
			to: 18090,
			onStart: updateInputs,
			onChange: updateInputs,
			onFinish: updateInputs
	});
	instance = $range.data("ionRangeSlider");

	function updateInputs (data) {
			from = data.from;
			to = data.to;

			$inputFrom.prop("value", from);
			$inputTo.prop("value", to);
	}

	$inputFrom.on("change", function () {
		var val = $(this).prop("value");
		console.log(val);
		// validate
		if (val < min) {
			val = min;
		} else if (val > to) {
			val = to;
		}
		instance.update({
			from: val
		});
		$(this).prop("value", val);
	});

	$inputTo.on("change", function () {
		var val = $(this).prop("value");
		// validate
		if (val < from) {
				val = from;
		} else if (val > max) {
				val = max;
		}
		instance.update({
				to: val
		});
		$(this).prop("value", val);
	});

	let filterDropdowns = document.querySelectorAll('.filter-dropdown--js');
	if(filterDropdowns) {
		for (let filterDropdown of filterDropdowns) {
			let filterDropdownBtn = filterDropdown.querySelector('.filter-dropdown__btn');
			filterDropdownBtn.addEventListener('click', function() {
				filterDropdown.querySelector('.filter-dropdown__dropdown-item').classList.toggle('active');
				filterDropdown.classList.toggle('active');
			})
			document.addEventListener('mouseup', (event) => {
				let filterDropdownContainerTarget = event.target.closest('.filter-dropdown.active');
				let filterDropdownBtnTarget = event.target.closest('.filter-dropdown__btn.active');
				if(!filterDropdownContainerTarget && !filterDropdownBtnTarget) {
					filterDropdown.classList.remove('active');
					filterDropdown.querySelector('.filter-dropdown__dropdown-item').classList.remove('active');
				}
			});
		}
	}

};


const sClubSwiper2 = new Swiper('.sClub__slider--js', {
	slidesPerView: 'auto',
});


const tabsSwiper = new Swiper('.tabs', {
	slidesPerView: 'auto',
});

$('.order-overview').hcSticky({
	stickTo: $('.hc-container'),
	responsive: {
		992: {
			disable: true
		}
	}
});

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

jQuery(document).ready(function($) {
	
  $('.hc-news-item').hcSticky({
    stickTo: $('.hc-container'),
		top: -280,
		responsive: {
			768: {
				disable: true
			}
		}
  });
});

let itemThumbsSlider = new Swiper(".item-thumbs-slider--js", {
	spaceBetween: 10,
	slidesPerView: 3,
	freeMode: true,
	watchSlidesProgress: true,
});

let itemSwiper = new Swiper('.item-slider--js', {
	spaceBetween: 10,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	thumbs: {
		swiper:itemThumbsSlider,
	},
});

// let fluidSlider = new Swiper(".fluid-slider--js", {
// 	spaceBetween: 32,
// 	slidesPerView: 'auto',
// 	loop: true,
// });

let opt = {
	// slidesPerView: 1,
	loop: true,
	speed: 1400,
	parallax: true,
	// scrollbar: {
	// 	el: '.swiper-scrollbar',
	// 	draggable: true,
	// },
	lazy: {
		loadPrevNext: true,
		loadPrevNextAmount: 3
	},

}

const NewsSwiper = new Swiper('.sSliderFluid__slider--js', {
	...opt,
	// navigation: {
	// 	nextEl: ' .swiper-button-next',
	// 	prevEl: ' .swiper-button-prev',
	// }
	loopedSlides: 6,
});

const NewsSwiperMd = new Swiper('.sSliderFluid__slider--md-js', {
	...opt,
	spaceBetween: 32,
	loopedSlides: 6,
});

// const NewsSwiperMd2 = new Swiper('.sNews__slider--md2-js', opt);

NewsSwiper.controller.control = [NewsSwiperMd];
NewsSwiperMd.controller.control = NewsSwiper;
// NewsSwiperMd2.controller.control = NewsSwiper;

// --------------

const NewsSwiper2 = new Swiper('.sSliderFluid__slider--js-2', {
	...opt,
	// navigation: {
	// 	nextEl: ' .swiper-button-next',
	// 	prevEl: ' .swiper-button-prev',
	// }
	loopedSlides: 6,
});

const NewsSwiperMd2 = new Swiper('.sSliderFluid__slider--md-js-2', {
	...opt,
	spaceBetween: 32,
	loopedSlides: 6,
});

// const NewsSwiperMd2 = new Swiper('.sNews__slider--md2-js', opt);

NewsSwiper2.controller.control = [NewsSwiperMd2];
NewsSwiperMd2.controller.control = NewsSwiper2;
// NewsSwiperMd2.controller.control = NewsSwiper;



var $hoverClass = $('.sSliderFluid__sliders');
var $sl = $('.sSliderFluid__slider');
$sl.on('mousedown touchstart', function (e) {
	if (e.type === 'mousedown') {
		$hoverClass.addClass('hovered');
	}
});
$sl.on('mouseup touchend', function (e) {
	if (e.type === 'mouseup') {
		$hoverClass.removeClass('hovered');
	}
});

let plugSlider = new Swiper(".sliderAutoWidth--js", {
	slidesPerView: 'auto',
	// loop: true,
});


// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }