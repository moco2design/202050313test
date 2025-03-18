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


// SplitType & GSAP アニメーション
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    function initAnimation() {
        // **すべての .split-text 要素を取得**
        const splitElements = document.querySelectorAll(".split-text");

        splitElements.forEach(element => {
            // **既存の SplitType を削除し、新しく適用**
            element.innerHTML = element.textContent;
            const splitText = new SplitType(element, {
                types: "chars"
            });

            let triggerStart = "top bottom"; // **発火タイミングを要素が画面下に入った瞬間に**

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
                    toggleActions: "play none none reset", // **スクロールを戻したらリセット**
                    once: false, // **スクロールを戻しても再実行**
                    scrub: false, // **true にするとスクロールに応じて徐々に発火**
                },
                onComplete: function () {
                    gsap.to(element, {
                        "--border-width": "100%", // CSS変数を変更
                        duration: 0.1,
                        ease: "power2.out",
                    });
                }
            });
        });

        // **スクロールトリガーをリフレッシュ**
        ScrollTrigger.refresh();
    }

    // **初回実行**
    initAnimation();

    // **ウィンドウリサイズ時にアニメーションを再初期化**
    window.addEventListener("resize", function () {
        // **SplitType の再適用（リサイズ時に再分割）**
        document.querySelectorAll(".split-text").forEach(element => {
            element.innerHTML = element.textContent;
        });
        initAnimation();
    });
});


//スクロールアニメーション
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    function fadeInAnimation(selector, options = {}) {
        gsap.utils.toArray(selector).forEach(target => {
            gsap.fromTo(target, {
                autoAlpha: 0,
                y: 10
            }, {
                autoAlpha: 1,
                y: 0,
                duration: options.duration || 0.6,
                ease: options.ease || "power2.out",
                scrollTrigger: {
                    trigger: target,
                    start: options.start || "bottom bottom",
                    toggleActions: "play none none none"
                }
            });
        });
    }

    // **通常のフェードイン**
    fadeInAnimation('.js-fadeIn');

    // **早めのフェードイン（-soon）**
    fadeInAnimation('.js-fadeIn-soon', {
        start: "top 80%"
    });

    // **連続ポップアップ**
    gsap.utils.toArray('.js-popUps').forEach(target => {
        var items = target.querySelectorAll(':scope > *');

        gsap.fromTo(items, {
            scale: 0.9,
            autoAlpha: 0,
            y: 20
        }, {
            scale: 1,
            autoAlpha: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.3,
            stagger: 0.1,
            scrollTrigger: {
                trigger: target,
                start: "bottom bottom",
                toggleActions: "play none none none"
            }
        });
    });

    // **早めの連続ポップアップ（-soon）**
    gsap.utils.toArray('.js-popUps-soon').forEach(target => {
        var items = target.querySelectorAll(':scope > *');

        gsap.fromTo(items, {
            scale: 0.9,
            autoAlpha: 0
        }, {
            scale: 1,
            autoAlpha: 1,
            ease: "power2.out",
            stagger: {
                each: 0.08
            },
            scrollTrigger: {
                trigger: target,
                start: "top 80%"
            }
        });
    });

    // **通常の左右フェードイン**
    function sideFadeIn(selector, startPos = "bottom bottom") {
        gsap.utils.toArray(selector).forEach(element => {
            gsap.to(element, {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: startPos,
                    toggleActions: "play none none none"
                }
            });
        });
    }

    sideFadeIn(".fadeInRight", "bottom bottom");
    sideFadeIn(".fadeInLeft", "bottom bottom");

    // **早めの左右フェードイン（-soon）**
    gsap.utils.toArray(".fadeInRight-soon").forEach(element => {
        gsap.to(element, {
            opacity: 1,
            autoAlpha: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 50%",
                toggleActions: "play none none none"
            },
            onComplete: () => {
                element.style.transform = "none"; // **translateXを解除**
            }
        });
    });

    gsap.utils.toArray(".fadeInLeft-soon").forEach(element => {
        gsap.to(element, {
            opacity: 1,
            autoAlpha: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 50%",
                toggleActions: "play none none none"
            },
            onComplete: () => {
                element.style.transform = "none"; // **translateXを解除**
            }
        });
    });

    // **下からフェードイン**
    fadeInAnimation(".fadeInUp");

    // **早めのスライドアップ＆フェードイン（-soon）**
    gsap.utils.toArray('.js-fadeInUp-soon').forEach(target => {
        gsap.to(target, {
            opacity: 1,
            visibility: "visible",
            y: 0,
            duration: 0.8,
            autoAlpha: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: target,
                start: "top 75%",
                toggleActions: "play none none none",
            }
        });
    });

    // **連続ポップイン（move）**
    let items = gsap.utils.toArray(".js-popUps-move .solution--item");

    gsap.fromTo(
        items, {
            autoAlpha: 0,
            scale: 1,
            x: (i) => (i % 2 === 0 ? -50 : 50),
            y: 20
        }, {
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            ease: "power2.out",
            duration: 0.2,
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".js-popUps-move",
                start: "top bottom",
                toggleActions: "play none none none"
            }
        }
    );
});


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