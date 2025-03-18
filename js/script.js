//画像の遅延読み込み
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("img").forEach(img => {
        img.setAttribute("loading", "lazy");
    });
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





// カウントアップ
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    function animateCountUp() {
        gsap.utils.toArray(".count-num").forEach(target => {
            gsap.fromTo(target, {
                innerHTML: 0
            }, {
                innerHTML: target.dataset.count || 2000, // `data-count` 属性の値 or デフォルト2000
                duration: 1, // カウントアップの時間
                ease: "power2.out",
                scrollTrigger: {
                    trigger: target,
                    start: "top 80%", // 画面の80%に達したら開始
                    toggleActions: "play none none none"
                },
                snap: {
                    innerHTML: 1
                }, // 数値を整数に丸める
                onUpdate: function () {
                    target.innerHTML = Math.floor(target.innerHTML); // 小数を防ぐ
                }
            });
        });
    }

    animateCountUp();
});




// SVG アニメーション
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // SVG の各パス要素を取得
    const svgPaths = document.querySelectorAll(".svg-message path");

    // 初期設定: stroke-dasharray と stroke-dashoffset を設定
    gsap.set(svgPaths, {
        strokeDasharray: (i, target) => target.getTotalLength(),
        strokeDashoffset: (i, target) => target.getTotalLength(),
        fill: "transparent"
    });

    // アニメーション
    gsap.to(svgPaths, {
        strokeDashoffset: 0,
        stagger: 0.2, // 順番に描かれるように
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".message-title-en", // **発火するトリガーを指定**
            start: "top 80%", // 画面の80%に達したら開始
            toggleActions: "play none none none",
        },
        onComplete: () => {
            // 塗りつぶしを適用
            gsap.to(".svg-message path", {
                fill: "rgb(58, 156, 255)",
                duration: 0.7,
                ease: "power2.out"
            });
        }
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