//画像の遅延読み込み
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("img").forEach(img => {
        img.setAttribute("loading", "lazy");
    });
});


//ループスライド
document.addEventListener("DOMContentLoaded", function () {
    const swiperConfigs = [{
            selector: ".swiper-loop01",
            slidesPerView: "auto",
            speed: 30000
        },
        {
            selector: ".swiper-loop01-2",
            slidesPerView: "auto",
            speed: 30000,
            reverse: true
        },
        {
            selector: ".swiper-loop01-3",
            slidesPerView: "auto",
            speed: 30000
        },
        {
            selector: ".swiper-loop02",
            slidesPerView: 1,
            speed: 20000
        },
        {
            selector: ".swiper-loop03",
            slidesPerView: 1,
            speed: 20000
        },
        {
            selector: ".swiper-loop04",
            slidesPerView: 1,
            speed: 20000
        },
        {
            selector: ".swiper-loop05",
            slidesPerView: 1,
            speed: 20000
        }
    ];

    swiperConfigs.forEach(config => {
        new Swiper(config.selector, {
            loop: true,
            slidesPerView: config.slidesPerView,
            speed: config.speed,
            allowTouchMove: false,
            autoplay: {
                delay: 0,
                reverseDirection: config.reverse || false // 逆方向スライドの設定
            }
        });
    });

    console.log("All Swipers initialized successfully!");
});

//reason-carousel
document.addEventListener("DOMContentLoaded", function () {
    const swiperConfigs = [{
            selector: ".swiper-reason",
            pagination: ".swiper-reason-pagination",
            next: ".swiper-button-next.r01",
            prev: ".swiper-button-prev.r01"
        },
        {
            selector: ".swiper-reason02",
            pagination: ".swiper-reason02-pagination",
            next: ".swiper-button-next.r02",
            prev: ".swiper-button-prev.r02"
        },
        {
            selector: ".swiper-reason03",
            pagination: ".swiper-reason03-pagination",
            next: ".swiper-button-next.r03",
            prev: ".swiper-button-prev.r03"
        }
    ];

    swiperConfigs.forEach(config => {
        const swiperInstance = new Swiper(config.selector, {
            loop: true,
            speed: 1500,
            autoplay: false,
            pagination: {
                el: config.pagination,
                clickable: true
            },
            navigation: {
                nextEl: config.next,
                prevEl: config.prev
            }
        });

        console.log(`Swiper initialized for ${config.selector}:`, swiperInstance);
    });

    console.log("All Swipers initialized successfully!");
});


//voice-carousel
document.addEventListener("DOMContentLoaded", function () {
    var mySwiper = new Swiper('.swiper-container', {
        spaceBetween: 0,
        slidesPerView: 1.4,
        loop: true,
        loopAdditionalSlides: 1,
        centeredSlides: true,
        navigation: {
            nextEl: '.swiper-button-next.voice',
            prevEl: '.swiper-button-prev.voice'
        },
        pagination: {
            el: ".swiper-pagination.voice",
            clickable: true,
        },
    });
});

//FAQ
window.onload = function () {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", function () {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                }
            });

            item.classList.toggle("active");
        });
    });
};


document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    function initAnimation() {
        // **.split-text の要素を取得**
        const splitElements = document.querySelectorAll(".split-text");

        splitElements.forEach(element => {
            // **SplitType を再適用**
            element.innerHTML = element.textContent;
            const splitText = new SplitType(element, {
                types: "chars"
            });

            let triggerStart = "top bottom"; // **発火タイミング**

            gsap.to(splitText.chars, {
                y: 0,
                opacity: 1,
                stagger: 0.02,
                duration: 0.2,
                ease: "power2.out",
                startAt: {
                    y: 50,
                    opacity: 0
                },
                scrollTrigger: {
                    trigger: element,
                    start: triggerStart,
                    toggleActions: "play none none reset", // **戻ったらリセット**
                    scrub: 0.5, // **スムーズに再生**
                }
            });
        });

        ScrollTrigger.refresh();
    }

    initAnimation();

    // **ウィンドウリサイズ時にアニメーションを再適用**
    window.addEventListener("resize", function () {
        document.querySelectorAll(".split-text").forEach(element => {
            element.innerHTML = element.textContent;
        });
        initAnimation();
    });
});


// **スクロールアニメーション**
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    function fadeInAnimation(selector, options = {}) {
        gsap.utils.toArray(selector).forEach(target => {
            gsap.from(target, {
                autoAlpha: 0,
                y: 10,
                duration: options.duration || 0.8,
                ease: options.ease || "power2.out",
                scrollTrigger: {
                    trigger: target,
                    start: options.start || "top bottom-=50",
                    toggleActions: "play none none none",
                    scrub: 0.5
                }
            });
        });
    }

    fadeInAnimation('.js-fadeIn');
    fadeInAnimation('.js-fadeIn-soon', {
        start: "top 90%"
    });

    // **連続ポップアップ**
    ScrollTrigger.batch(".js-popUps, .js-popUps-soon", {
        interval: 0.2,
        batchMax: 2,
        onEnter: batch => gsap.to(batch, {
            scale: 1,
            autoAlpha: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.4,
            stagger: 0.2
        }),
        start: "top bottom-=100",
        scrub: 0.5
    });

    // **左右フェードイン**
    ScrollTrigger.batch(".fadeInRight, .fadeInLeft, .fadeInRight-soon, .fadeInLeft-soon", {
        interval: 0.2,
        batchMax: 2,
        onEnter: batch => gsap.to(batch, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out"
        }),
        start: "top 75%",
        scrub: 0.5
    });

    fadeInAnimation(".fadeInUp");
    fadeInAnimation(".js-fadeInUp-soon", {
        start: "top 75%"
    });

    // **連続ポップイン（move）**
    ScrollTrigger.batch(".js-popUps-move .solution--item", {
        interval: 0.2,
        batchMax: 2,
        onEnter: batch => gsap.to(batch, {
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            ease: "power2.out",
            duration: 0.2,
            stagger: 0.2
        }),
        start: "top bottom",
        scrub: 0.5
    });
});

// **カウントアップ**
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".count-num").forEach(target => {
        gsap.fromTo(target, {
            innerHTML: 0
        }, {
            innerHTML: target.dataset.count || 2000,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: target,
                start: "top 80%",
                toggleActions: "play none none none",
                scrub: 0.5
            },
            snap: {
                innerHTML: 1
            },
            onUpdate: function () {
                target.innerHTML = Math.floor(target.innerHTML);
            }
        });
    });
});

// **帯アニメーション**
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.batch(".text__ribbon, .profile-detail, .about-section-message", {
        interval: 0.2,
        batchMax: 1,
        onEnter: batch => {
            gsap.to(batch, {
                scaleX: 1,
                duration: 0.3
            });

            gsap.to(".text__ribbon-item, .text__word, .bottom___word", {
                opacity: 1,
                duration: 0.3,
                delay: 0.1
            });

            gsap.to(batch, {
                scaleX: 0,
                duration: 0.3,
                delay: 0.3
            });
        },
        start: "top 75%",
        scrub: 0.5
    });
});

// **SVG アニメーション**
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(".svg-message path", {
        strokeDasharray: (i, target) => target.getTotalLength(),
        strokeDashoffset: (i, target) => target.getTotalLength(),
        fill: "transparent"
    });

    gsap.to(".svg-message path", {
        strokeDashoffset: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".message-title-en",
            start: "top 80%",
            toggleActions: "play none none none",
            scrub: 0.5
        },
        onComplete: () => {
            gsap.to(".svg-message path", {
                fill: "rgb(58, 156, 255)",
                duration: 0.7,
                ease: "power2.out"
            });
        }
    });
});