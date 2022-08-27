'use strict';
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
gsap.registerPlugin(ScrollTrigger);

// JavaScript Document
$(document).ready(function () {
    $('#top-aside').load("inc/top-aside.html");
    $('#header').load("inc/header.html");
    $('.nav-area').load("inc/nav-area.html");
    $('.full-menu').load("inc/full-menu.html");
    $('.m-menu').load("inc/m-menu.html");
    $('.footer-con').load("inc/footer.html");
    $('.page-aside').load("inc/page-aside.html");
});
window.onload = function () {
    $('body').imagesLoaded().done(function (instance) {
        console.log('image loaded!!')
        commonTween()
        init();
        // headerScroll();
        navTrigger()
    });
}
function init() {
    setTimeout(function(){
        $('#header').addClass('load')
    },500)
	gsap.to($(".float"),{
		scrollTrigger: {
			trigger: $('footer'),
			start: "0% 100%", // 앞 : 객체 , 뒤 : 페이지 전체
			end: "0% 85%",
			// markers: true,
			toggleActions: "play pause  reverse pause",
			scrub: 1,
			invalidateOnRefresh: true,
		},
		css:{bottom: '23.5rem'},
		ease:"none",
	})
	$('.family-site dt').on('click',function(){
		$('.family-site').toggleClass('active')
	})
	$('.menu-right .btn-search').on('click',function(){
		$('.search-area').toggleClass('active')
		$('html, body').toggleClass('fixed')
	})
	$('.search-area .over-bg').on('click',function(){
		$('.search-area').removeClass('active')
		$('html, body').removeClass('fixed')
	})
	$('.gnb li a').on('mouseover',function(){
        var indexNum = $('.gnb li a').index(this)
		$('.nav-area').show()
        $('.nav-area .nav-block').hide()
        $('.nav-area .nav-block').eq(indexNum).show()
        
	})
    $('.btn-all-menu').on('click',function(){
		$('.full-menu').addClass('active')
	})
    $('.full-menu .close-full button').on('click',function(){
		$('.full-menu').removeClass('active')
	})
    $('.nav-area').on('mouseleave',function(){
		$('.nav-area').hide()
        $('.nav-area .nav-block').hide()
	})
    $('.btn-m-menu').on('click',function(){
        $('.m-menu').toggleClass('active')
        $('html').toggleClass('fixed')
        return false;
    })
    $('.menu-close').on('click',function(){
        $('.m-menu').removeClass('active')
        $('html').removeClass('fixed')
        return false;
    })
    $('.tab-m li button').on('click',function(){
        var indexNum = $('.tab-m li button').index(this)
        $('.tab-m li').removeClass('active')
        $('.tab-m li').eq(indexNum).addClass('active')
        $('.tab-ui-m > *').removeClass('active')
        $('.tab-ui-m > *').eq(indexNum).addClass('active')
        
        ScrollTrigger.refresh();
        swiper.update()
    })
    $('.tab-ui-con > *').eq(0).addClass('active')
    $('.tab-ui li button').on('click',function(){
        var indexNum = $('.tab-ui li button').index(this)
        $('.tab-ui li').removeClass('active')
        $('.tab-ui li').eq(indexNum).addClass('active')
        $('.tab-ui-con > *').removeClass('active').hide()
        $('.tab-ui-con > *').eq(indexNum).css({
            "opacity":"0",
            "display":"flex",
        }).show().animate({opacity:1}).addClass('active')
        
        ScrollTrigger.refresh();
 //       swiper.update()
    })
    $('.menu-block dt ').on('click',function(){
        $(this).parent().toggleClass('active')
        $(this).parent().siblings('dl').removeClass('active')
        return false;
    })
    $('.location dl dt button').on('click',function(){
        $(this).parents('dl').siblings().removeClass('active')
        $(this).parents('dl').toggleClass('active')
        return false;
    })
    $('.location-menu dd').on('mouseleave',function(){
        $(this).parents('dl').removeClass('active')
        return false;
    })
    $('.slide-box .slide-box-head').on('click',function(){
        $(this).parent().toggleClass('active')
    })
    $('.accordion-title').on('click',function(){
        $(this).toggleClass('active')
    })
    $('.tab-style-m button').on('click',function(){
        var tabName = $(this).text()
        console.log(tabName)
        $('.tab-style-m dt span').text(tabName)
        $('.tab-style-m').removeClass('active')
    })
    $('.tab-style-m dt').on('click',function(){
        $(this).parent().toggleClass('active')
    })
    
    
    
    
    
    
    ScrollTrigger.matchMedia({
        "(min-width:851px)": function () {
            var ran = gsap.timeline ()
            .to('.obj-move',{
                x: "random(-30, 30)", 
                y: "random(-30, 30)",
                scale: "random(0.9, 1)",
                duration:3,
                ease:"none",
                repeat:-1,
                repeatRefresh:true 
            })
        },
        "(max-width:850px)": function () {
            var ran = gsap.timeline ()
            .to('.obj-move',{
                x: "random(-10, 10)", 
                y: "random(-10, 10)",
                scale: "random(0.9, 1)",
                duration:3,
                ease:"none",
                repeat:-1,
                repeatRefresh:true 
            })
        },
    })
    
    const videos = gsap.utils.toArray('.video-block video')
    videos.forEach(function(video, i) {
        ScrollTrigger.create({
            trigger: video,
            scroller: 'body',
            start: '30% center',
            end: '120% 0%',
            // markers: true,
            onEnter: () => video.play(),
            onEnterBack: () => video.play(),
            onLeave: () => video.pause(),
            onLeaveBack: () => video.pause(),
        });
    })
}

$(document).mouseup(function (e){
    var menuList = $(".location dl");
    if(menuList.has(e.target).length === 0)
    $('.location dl').removeClass('active')
})

function headerScroll() {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('#header').outerHeight();
    $(window).scroll(function (event) {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
            
        }
    }, 0);

    function hasScrolled() {
        var st = $(window).scrollTop();
        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            
            $('header').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $('header').removeClass('nav-up').addClass('nav-down');
            }
        }
        lastScrollTop = st;
        if (st <= 10) {
            $('header').addClass('nav-default')
        } else {
            $('header').removeClass('nav-default')
        }
    }
}
function commonTween() {
    var ran = gsap.timeline ()
    .to('.move',{
        x: "random(-50, 50)", 
        y: "random(-50, 50)",
        scale: "random(0.8, 1)",
        opacity: "random(0.3, 1)",
        duration:5,
        ease:"none",
        repeat:-1,
        repeatRefresh:true 
    })
    $('.fade').each(function (e) {
        let text = $(this)
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 0%%", // 앞 : 객체 , 뒤 : 페이지 전체
                // scrub: true, //스크롤에 반응 (없으면 자동재생)
                // markers: true,
                toggleActions: "play complete none none",
            },
        });
        upmotion.to(text, 2, {
            opacity: 1,
            //            ease: "power3.out",
            onComplete: function () {

            }
        })

    })
    $('.slide-down').each(function (e) {
        let text = $(this)
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                //                scrub: true, //스크롤에 반응 (없으면 자동재생)
                //                markers: true,
                toggleActions: "play complete none none",
            },
        });
        upmotion.from(text, 1, {
            y: -50,
            opacity: 0,
            //            ease: "power3.out",
            onComplete: function () {

            }
        })

    })
    $('.slide-up, .sub-title').each(function (e) {
        let text = $(this).wrapInner('<div class="over-text-con"></div>')
        let target = text.find('.over-text-con')
        gsap.set(target, {
            y:40,
            opacity: 0,
        })
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "top 85%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "top 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                //scrub: true, //스크롤에 반응 (없으면 자동재생)
                //markers: true,
                toggleActions: "play none none reverse",
            },
        });
        upmotion.to($(this), 0, {
            opacity: 1,
        })
        upmotion.to(target, 1, {
            y:0,
            opacity: 1,
            ease: "power3.out",
        })

    })
    ScrollTrigger.matchMedia({
        "(min-width:851px)": function () {
            $('.left-slide').each(function (e) {
                let text = $(this)
                const leftMotion = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(this),
                        start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                        end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                                        scrub: true, //스크롤에 반응 (없으면 자동재생)
                        //markers: true,
                        toggleActions: "play pause pause reverse",
                    },
                });
                gsap.set(text, {
                    x: '-200px',
                    opacity: 0,
                    onComplete: function () {
        
                    }
                })
                leftMotion.to(text, 1, {
                    x: '0',
                    opacity: 1,
                    ease: 'power3.out'
                })
            })
        },
        "(max-width:850px)": function () {
            $('.left-slide').each(function (e) {
                let text = $(this)
                const leftMotion = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(this),
                        start: "0% 100%", // 앞 : 객체 , 뒤 : 페이지 전체
                        end: "0% 50%", // 앞 : 객체 , 뒤 : 페이지 전체
                                        scrub: true, //스크롤에 반응 (없으면 자동재생)
                        //markers: true,
                        toggleActions: "play pause pause reverse",
                    },
                });
                gsap.set(text, {
                    x: '-200px',
                    opacity: 0,
                    onComplete: function () {
        
                    }
                })
                leftMotion.to(text, 1, {
                    x: '0',
                    opacity: 1,
                    ease: 'power3.out'
                })
            })
        },
    })
    ScrollTrigger.matchMedia({
        "(min-width:851px)": function () {
            $('.right-slide').each(function (e) {
                let text = $(this)
                const leftMotion = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(this),
                        start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                        end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                                        scrub: true, //스크롤에 반응 (없으면 자동재생)
                        //markers: true,
                        toggleActions: "play pause pause reverse",
                    },
                });
                gsap.set(text, {
                    x: '200px',
                    opacity: 0,
                    onComplete: function () {
        
                    }
                })
                leftMotion.to(text, 1, {
                    x: '0',
                    opacity: 1,
                    ease: 'power3.out'
                })
            })
        },
        "(max-width:850px)": function () {
            $('.right-slide').each(function (e) {
                let text = $(this)
                const leftMotion = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(this),
                        start: "0% 100%", // 앞 : 객체 , 뒤 : 페이지 전체
                        end: "0% 50%", // 앞 : 객체 , 뒤 : 페이지 전체
                                        scrub: true, //스크롤에 반응 (없으면 자동재생)
                        // markers: true,
                        toggleActions: "play pause pause reverse",
                    },
                });
                gsap.set(text, {
                    x: '200px',
                    opacity: 0,
                    onComplete: function () {
        
                    }
                })
                leftMotion.to(text, 1, {
                    x: '0',
                    opacity: 1,
                    ease: 'power3.out'
                })
            })
        },
    })
    
    $('.over-text-wrap').each(function (e) {
        $(this).find(' > *').addClass('over-text').wrapInner('<span class="over-text-con"></span>')
        let text = $(this).find('.over-text-con')
        const textmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                //                scrub: true, //스크롤에 반응 (없으면 자동재생)
                //                markers: true,
                toggleActions: "play complete none none",
            },
        });
        textmotion.to(text, 0.5, {
            y: 0,
            stagger: 0.3,
            opacity: 1,
            //            ease: "power2.inOut",
            onComplete: function () {

            }
        })
    })
    $('.up-slide-stagger > *').each(function (e) {
        var stagger = $(this)
        gsap.from(stagger, {
            scrollTrigger: {
                trigger: $(this),
                start: "0 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                // scrub: true, //스크롤에 반응 (없으면 자동재생)
                // markers: true,
                toggleActions: "play none none reverse",
            },
            y: 40,
            opacity:0,
            stagger: 0.1,
            ease: 'Power1.easeOut'
        })
    })

}

function mobileProxy() {
    ScrollTrigger.matchMedia({
        "(min-width:769px)": function () {
            //pc
        },
        "(max-width:768px)": function () {
            

        },

    })
}





function navTrigger() {
    $('.navTrigger').on('click', function () {
        // $(this).toggleClass('active');
        // $('.m-menu').toggleClass('active')
        // $('html').toggleClass('fixed')
        // $('#header').removeClass('nav-down')
        $('html').toggleClass('fixed');
        $(this).toggleClass('active');
        $('.m-menu').toggleClass('active')
        $('#header').removeClass('nav-down')
        if ($('.m-menu').hasClass('active')) {
            gsap.set($('.m-menu li'), {
                x: '-50%',
                opacity:0,
            })
            gsap.to($('.m-menu li'), 0.4, {
                stagger: 0.1,
                delay: 0.2,
                x: 0,
                opacity: 1,
                ease: 'Power1.easeOut'
            })
        } 
    });
}



function openLayer(selector, href) {
    var flag = selector,
        target = href;
    flag = $(flag);
    flag.load(href, function () {
        $(this).show();
        $(this).find('.modal').show().addClass('scroll')
        $('.overlay').show();
        //        $('body').css('overflow','hidden');
    });
    //    $('body').addClass('scroll')
    return false;
}

function closeLayer(no) {
    var no = no;
    if (no) {
        $('#popup' + no).removeClass('show').hide().removeAttr('style');
    } else {
        $('.popup-wrap').empty()
        $('.popup-wrap').removeAttr('style').hide();
        $('.overlay').hide().removeAttr('style');
        //        $('body').css('overflow','').removeAttr('style');
    }
    //    $('body').removeClass('fixed')
}

function openModal(number) {
    $('.overlay').show();
    $('.modal-inside' + '.' + number).show();
    return false;
}

function closeModal(no) {
    $('.overlay').hide();
    $('.modal-inside').hide();
}

function counter() {
    var counter = {
        var: 0
    };
    var tal = document.getElementById("cx1");

    TweenMax.to(counter, 3, {
        var: 1000000,
        onUpdate: function () {
            tal.innerHTML = numberWithCommas(Math.ceil(counter.var));
        },
        ease: 'Power4.easeOut'
    });

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}