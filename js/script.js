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

// カウントアップ
document.addEventListener("DOMContentLoaded", function () {
    function animateCountUp() {
        document.querySelectorAll(".count-num").forEach(target => {
            const targetValue = parseInt(target.dataset.count) || 2000; // `data-count` 属性 or デフォルト2000
            const duration = 1000; // 1秒
            const startTime = performance.now();

            function updateCount(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1); // 0 〜 1 に制限
                target.innerHTML = Math.floor(progress * targetValue); // 小数を防ぐ

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    target.innerHTML = targetValue; // 最終値をセット
                }
            }

            requestAnimationFrame(updateCount);
        });
    }

    function setupScrollTrigger() {
        const countElements = document.querySelectorAll(".count-num");

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCountUp();
                    observer.unobserve(entry.target); // **1回だけ実行**
                }
            });
        }, {
            threshold: 0.8
        }); // **80% 画面内に入ったら発火**

        countElements.forEach(element => observer.observe(element));
    }

    setupScrollTrigger();
});

// SVG アニメーション
document.addEventListener("DOMContentLoaded", function () {
    function animateSVGPath(path) {
        const length = path.getTotalLength(); // 線の長さを取得
        path.style.strokeDasharray = length; // 線の長さを適用
        path.style.strokeDashoffset = length; // 最初は見えない状態
        path.style.transition = "none"; // アニメーション前にリセット

        let startTime;

        function drawPath(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / 1000, 1); // 1秒で完了
            path.style.strokeDashoffset = length * (1 - progress);

            if (progress < 1) {
                requestAnimationFrame(drawPath);
            } else {
                // 塗りを適用（じわっと変化）
                path.style.transition = "fill 1s ease-in-out"; // 塗りのトランジション
                path.style.fill = "rgb(58, 156, 255)";
            }
        }

        requestAnimationFrame(drawPath);
    }

    function setupSVGAnimation() {
        const svgPaths = document.querySelectorAll(".svg-message path");

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    svgPaths.forEach(path => animateSVGPath(path));
                    observer.disconnect(); // **1回だけ実行**
                }
            });
        }, {
            threshold: 0.8
        }); // **80% 画面内に入ったら発火**

        document.querySelectorAll(".message-title-en").forEach(el => observer.observe(el));
    }

    setupSVGAnimation();
});


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
                    once: true, // **スクロールを戻しても再実行**
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
    function observeElements(selector, options = {}) {
        const elements = document.querySelectorAll(selector);
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active"); // **アニメーション開始**
                    observer.unobserve(entry.target); // **一度だけ実行**
                }
            });
        }, {
            threshold: options.threshold || 0.5
        });

        elements.forEach(element => observer.observe(element));
    }

    // **単体フェードイン**
    observeElements(".js-fadeIn");
    observeElements(".js-fadeIn-soon", {
        threshold: 0.8
    });

    // **左右フェードイン**
    observeElements(".fadeInRight");
    observeElements(".fadeInRight-soon", {
        threshold: 0.8
    });
    observeElements(".fadeInLeft");
    observeElements(".fadeInLeft-soon", {
        threshold: 0.8
    });

    // **スライドアップフェードイン**
    observeElements(".fadeInUp");
    observeElements(".js-fadeInUp-soon", {
        threshold: 0.8
    });

    // **連続ポップアップ**
    function observeStaggered(selector, delay = 100) {
        const elements = document.querySelectorAll(selector);
        const observer = new IntersectionObserver(entries => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("active");
                    }, index * delay);
                    observer.unobserve(entry.target); // **一度だけ実行**
                }
            });
        }, {
            threshold: 0.5
        });

        elements.forEach(element => observer.observe(element));
    }

    observeStaggered(".js-popUps > *", 100);
    observeStaggered(".js-popUps-soon > *", 80);
    observeStaggered(".js-popUps-move .solution--item", 200);
});




//帯アニメーション①
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".text__ribbon",
            start: "top 80%", // `.text__ribbon` が画面の80%に到達したら発火
            toggleActions: "play none none none",
        }
    });

    var firstBg = document.querySelectorAll('.text__ribbon-bg'), // 最初の帯
        word = document.querySelectorAll('.text__ribbon-item'), // テキスト
        whiteBg = document.querySelectorAll('.white-bg'); // 文字の背景として残す

    tl.to(firstBg, {
            duration: 0.2, // 背景の拡張を少し遅く
            scaleX: 1,
        })

        // 文字の不透明度を 0 のままにして、`firstBg` が隠れている状態で出現
        .set(word, {
            opacity: 1
        })

        // 背景を閉じる（`firstBg` のみ閉じる）+ `whiteBg` 同時スライドイン
        .to(firstBg, {
            duration: 0.3,
            scaleX: 0,
        })

        .to(whiteBg, {
            duration: 0.2,
            opacity: 1,
        }, "-=0.5"); // `firstBg` の閉じる動きと同時に `whiteBg` を表示
});

// 帯アニメーション②
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // **`.text__first-bg` などの初期状態を明示的に指定**
    gsap.set([".text__first-bg", ".text__second-bg", ".text__third-bg"], {
        scaleX: 0
    });

    gsap.set(".text__word", {
        opacity: 0
    });

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".profile-detail", // 🔹 発火の基準となる要素
            start: "top 75%", // 画面の75%に達したら発火
            toggleActions: "play none none none",
        }
    });

    tl.to(".text__first-bg", {
            duration: 0.1,
            scaleX: 1,
        })
        .to(".text__second-bg", {
            duration: 0.1,
            scaleX: 1,
        })
        .to(".text__third-bg", {
            duration: 0.1,
            scaleX: 1,
        })
        .to(".text__word", {
            duration: 0.2,
            opacity: 1,
        }, "-=0.2") // 🔹 文字の表示を少し遅らせる
        .to(".text__first-bg", {
            duration: 0.2,
            scaleX: 0,
        })
        .to(".text__second-bg", {
            duration: 0.2,
            scaleX: 0,
        })
        .to(".text__third-bg", {
            duration: 0.2,
            scaleX: 0,
        });
});


//帯アニメーション③
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // **初期状態を設定**
    gsap.set([".bottom__first-bg", ".bottom__second-bg"], {
        scaleX: 0
    });
    gsap.set(".bottom___word", {
        opacity: 0
    });
    gsap.set(".bottom__white-bg", {
        opacity: 0
    });

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-section-message", // 🔹 発火の基準となる要素
            start: "top 75%", // 画面の75%に達したら発火
            toggleActions: "play none none none",
        }
    });

    tl.to(".bottom__first-bg", {
            duration: 0.2,
            scaleX: 1,
        })
        .to(".bottom__second-bg", {
            duration: 0.2,
            scaleX: 1,
        })
        // **`.bottom___word` の opacity を変更（アニメーション中に現れる）**
        .to(".bottom___word", {
            duration: 0.1,
            opacity: 1,
        }, "-=0.2") // 🔹 文字の表示を少し遅らせる
        // **背景を閉じる**
        .to(".bottom__first-bg", {
            duration: 0.2,
            scaleX: 0,
        })
        .to(".bottom__second-bg", {
            duration: 0.2,
            scaleX: 0,
        })
        // **`.bottom__white-bg` を表示して、文字の背景として残す**
        .to(".bottom__white-bg", {
            duration: 0.2,
            opacity: 1,
        }, "-=0.5"); // `.bottom__first-bg` の閉じる動きと同時に発火
});