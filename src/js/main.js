// Custom scripts

//prealoder
window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 10);
}

// Мобильное меню бургер
function burgerMenu() {
  const burger = document.querySelector('.burger')
  const menu = document.querySelector('.menu')
  const body = document.querySelector('body')
  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      menu.classList.add('active')
      burger.classList.add('active-burger')
      body.classList.add('locked')
    } else {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
  // Вот тут мы ставим брейкпоинт навбара
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
}
burgerMenu()


// Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.
function fixedNav() {
  const nav = document.querySelector('nav')

  // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
  const breakpoint = 1
  if (window.scrollY >= breakpoint) {
    nav.classList.add('fixed__nav')
  } else {
    nav.classList.remove('fixed__nav')
  }
}
window.addEventListener('scroll', fixedNav);


// dropdown submennu function

/**
 * Object for creating click-triggered navigation submenus
 *
 * Latest version, Issues, etc: https://github.com/mrwweb/clicky-menus
 *
 * Thanks for the inspiration:
 * 		- https://www.lottejackson.com/learning/a-reusable-javascript-toggle-pattern
 * 		- https://codepen.io/lottejackson/pen/yObQRM
 */

(function() {

	'use strict';

	const ClickyMenus = function( menu ) {

		// DOM element(s)
		let	container = menu.parentElement,
			currentMenuItem,
			i,
			len;

		this.init = function() {
			menuSetup();
			document.addEventListener( 'click', closeOpenMenu );
		}


		/*===================================================
		=            Menu Open / Close Functions            =
		===================================================*/
		function toggleOnMenuClick( e ) {

			const button = e.currentTarget;

			// close open menu if there is one
			if ( currentMenuItem && button !== currentMenuItem ) {
				toggleSubmenu( currentMenuItem );
			}

			toggleSubmenu( button );

		};

		function toggleSubmenu( button ) {

			const submenu = document.getElementById( button.getAttribute( 'aria-controls' ) );

			if ( 'true' === button.getAttribute( 'aria-expanded' ) ) {

				button.setAttribute( 'aria-expanded', false );
				submenu.setAttribute( 'aria-hidden', true );
				currentMenuItem = false;

			} else {

				button.setAttribute( 'aria-expanded', true );
				submenu.setAttribute( 'aria-hidden', false );
				preventOffScreenSubmenu( submenu );
				currentMenuItem = button;

			}

		};

		function preventOffScreenSubmenu( submenu ) {

			const 	screenWidth =	window.innerWidth ||
									document.documentElement.clientWidth ||
									document.body.clientWidth,
					parent = submenu.offsetParent,
					menuLeftEdge = parent.getBoundingClientRect().left,
					menuRightEdge = menuLeftEdge + submenu.offsetWidth;

			if ( menuRightEdge + 32 > screenWidth ) { // adding 32 so it's not too close
				submenu.classList.add( 'sub-menu--right' );
			}

		}

		function closeOnEscKey(e) {

			if(	27 === e.keyCode ) {

				// we're in a submenu item
				if( null !== e.target.closest('ul[aria-hidden="false"]') ) {
					currentMenuItem.focus();
					toggleSubmenu( currentMenuItem );

				// we're on a parent item
				} else if ( 'true' === e.target.getAttribute('aria-expanded') ) {
					toggleSubmenu( currentMenuItem );
				}

			}

		}

		function closeOpenMenu( e ) {

			if ( currentMenuItem && ! e.target.closest( '#' + container.id ) ) {
				toggleSubmenu( currentMenuItem );
			}

		};

		/*===========================================================
		=            Modify Menu Markup & Bind Listeners            =
		=============================================================*/
		function menuSetup() {

			menu.classList.remove('no-js');

			menu.querySelectorAll('ul').forEach( ( submenu ) => {

				const menuItem = submenu.parentElement;

				if ( 'undefined' !== typeof submenu ) {

					let button = convertLinkToButton( menuItem );

					setUpAria( submenu, button );

					// bind event listener to button
					button.addEventListener( 'click', toggleOnMenuClick );
					menu.addEventListener( 'keyup', closeOnEscKey );

				}

			});

		};

		/**
		 * Why do this? See https://justmarkup.com/articles/2019-01-21-the-link-to-button-enhancement/
		 */
		function convertLinkToButton( menuItem ) {

			const 	link = menuItem.getElementsByTagName( 'a' )[0],
					linkHTML = link.innerHTML,
					linkAtts = link.attributes,
					button = document.createElement( 'button' );

			if( null !== link ) {

				// set button content and attributes
				button.innerHTML = linkHTML.trim();
				for( i = 0, len = linkAtts.length; i < len; i++ ) {
					let attr = linkAtts[i];
					if( 'href' !== attr.name ) {
						button.setAttribute( attr.name, attr.value );
					}
				}

				menuItem.replaceChild( button, link );

			}

			return button;

		}

		function setUpAria( submenu, button ) {

			const submenuId = submenu.getAttribute( 'id' );

			let id;
			if( null === submenuId ) {
				id = button.textContent.trim().replace(/\s+/g, '-').toLowerCase() + '-submenu';
			} else {
				id = menuItemId + '-submenu';
			}

			// set button ARIA
			button.setAttribute( 'aria-controls', id );
			button.setAttribute( 'aria-expanded', false );

			// set submenu ARIA
			submenu.setAttribute( 'id', id );
			submenu.setAttribute( 'aria-hidden', true );

		}

	}

	/* Create a ClickMenus object and initiate menu for any menu with .clicky-menu class */
	document.addEventListener('DOMContentLoaded', function(){
		const menus = document.querySelectorAll( '.clicky-menu' );

		menus.forEach( menu => {

			let clickyMenu = new ClickyMenus(menu);
			clickyMenu.init();

		});
	});

}());


const animItems = document.querySelectorAll('.anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('active');
			} else {
				if (!animItem.classList.contains('anim-no-hide')) {
					animItem.classList.remove('active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
};

// анимация для страницы budget

function budgetPage() {
  const sectionBudget = document.querySelector('.budget')

  if (!sectionBudget) {
    return null
  }

  else {
    const budgetElement = document.querySelectorAll('.budget-show')
    var   elementNum = 0; 
    budgetElement.forEach(element => {
      setTimeout(() => 
      // element.style.opacity = "1", 500 + elementNum,
      element.style.transform = "translateX(0%)", 500 + elementNum);
      elementNum += 200
    });

  }
}

budgetPage();

// Аккордеон
function accordion() {
  const items = document.querySelectorAll('.accordion__item-trigger')
  items.forEach(item => {
      item.addEventListener('click', () => {
          const parent = item.parentNode
          if (parent.classList.contains('accordion__item-active')) {
              parent.classList.remove('accordion__item-active')
          } else {
              document
                  .querySelectorAll('.accordion__item')
                  .forEach(child => child.classList.remove('accordion__item-active'))   
              parent.classList.add('accordion__item-active')
          }
      })
  })
}
accordion();

// анимация для страницы teach

function teachPage() {
  const sectionTeach= document.querySelector('.teach')

  if (!sectionTeach) {
    return null
  }

  else {
    const budgetElement = document.querySelectorAll('.teach-show')
    const budgetElementBottom = document.querySelectorAll('.teach-show-bottom')
    var   elementNum = 0; 
    budgetElement.forEach(element => {
      setTimeout(() => 
      element.style.transform = "translateX(0%)", 700 + elementNum);
      elementNum += 200
    });

    budgetElementBottom.forEach(element => {
      setTimeout(() => 
      element.style.transform = "translateY(0%)", 700 + elementNum);
      elementNum += 200
    })

  }
}

teachPage();

// анимация для страницы teach

function directionWorksPage() {
  const sectionTeach= document.querySelector('.direction-works')

  if (!directionWorksPage) {
    return null
  }

  else {
    const budgetElement = document.querySelectorAll('.direction-works-show')
    var   elementNum = 0; 
    budgetElement.forEach(element => {
      setTimeout(() => 
      element.style.transform = "translateX(0%)", 700 + elementNum);
      elementNum += 200
    });

  }
}

directionWorksPage();

function blogPage() {
  const container = document.querySelector('.our-graduates')

  if (!container) {
    return null
  }

  var swiperBlogPage = new Swiper('.blog-slider', {
  spaceBetween: 30,
  effect: 'fade',
  loop: true,
  mousewheel: {
    invert: false,
  },
  // autoHeight: true,
  pagination: {
    el: '.blog-slider__pagination',
    clickable: true,
  }
});
}

blogPage ();


function ourLifeSlider() {
  const container = document.querySelector('.our-life')

  if (!container) {
    return null
  }
  
  let swiperSliderSimpleA = new Swiper('.slider-simple-a.swiper-container', {
    navigation: {
        nextEl: '.swiper-container.slider-simple-a .slider-next',
        prevEl: '.swiper-container.slider-simple-a .slider-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    loop: true,
    grabCursor: true,
    autoplay: {
        delay: 5000,
    },
    spaceBetween: 20,
    slidesPerView: 'auto',
   

    centeredSlides: true,
    speed: 600,
    // centeredSlidesBounds: true,
});
}

ourLifeSlider();

function progressPage() {
  const container = document.querySelector('.progress')

  if (!container) {
    return neull
  }

  let SwiperTop = new Swiper('.swiper--top', {
    spaceBetween: 0,
    centeredSlides: true,
    speed: 6000,
    autoplay: {
      delay: 1,
    },
    loop: true,
    slidesPerView:'auto',
    allowTouchMove: false,
    disableOnInteraction: true
  });

  let SwiperMiddle = new Swiper('.swiper--middle', {
    spaceBetween: 0,
    centeredSlides: true,
    speed: 6000,
    autoplay: {
      delay: 1,
    },
    loop: true,
    slidesPerView:'auto',
    allowTouchMove: false,
    disableOnInteraction: true
  });
  
  let SwiperBottom = new Swiper('.swiper--bottom', {
    spaceBetween: 0,
    centeredSlides: true,
    speed: 6000,
    autoplay: {
      delay: 1,
      reverseDirection: true
    },
    loop: true,
    loopedSlides: 4,
    slidesPerView:'auto',
    allowTouchMove: false,
    disableOnInteraction: true
  });
  
}

progressPage();