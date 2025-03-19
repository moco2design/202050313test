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


// SplitType & GSAP アニメーション
document.addEventListener("DOMContentLoaded", function () {
    function initTextAnimation() {
        const splitElements = document.querySelectorAll(".split-text");

        splitElements.forEach(element => {
            const nodes = Array.from(element.childNodes); // **子ノード（テキスト+タグ）を取得**
            element.innerHTML = ""; // **元の内容をクリア**

            nodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    // **通常のテキストを1文字ずつ分割**
                    node.textContent.split("").forEach(char => {
                        const span = document.createElement("span");
                        span.textContent = char;
                        span.classList.add("char"); // **アニメーション用クラス**
                        element.appendChild(span);
                    });
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    // **タグ内の文字も分割**
                    const spanWrapper = document.createElement("span");
                    spanWrapper.className = node.className; // **元のクラスを適用**
                    node.innerHTML.split("").forEach(char => {
                        const span = document.createElement("span");
                        span.textContent = char;
                        span.classList.add("char");
                        spanWrapper.appendChild(span);
                    });
                    element.appendChild(spanWrapper);
                }
            });

            const chars = element.querySelectorAll(".char"); // **アニメーション対象の文字**

            // **IntersectionObserver で監視**
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        chars.forEach((char, index) => {
                            setTimeout(() => {
                                char.style.opacity = "1";
                                char.style.transform = "translateY(0)";
                            }, index * 20); // **20msずつ遅延**
                        });

                        // **最後の文字が表示された後に下線を伸ばす**
                        setTimeout(() => {
                            element.style.setProperty("--border-width", "100%");
                        }, chars.length * 20);

                        observer.unobserve(entry.target); // **1回のみ実行**
                    }
                });
            }, {
                threshold: 0.1
            });

            observer.observe(element);
        });
    }

    // **初回実行**
    initTextAnimation();
});




//帯アニメーション①
document.addEventListener("DOMContentLoaded", function () {
    const ribbons = document.querySelectorAll(".text__ribbon");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const ribbon = entry.target;
                ribbon.classList.add("active"); // **アニメーション開始**

                // **0.2秒後に縮小アニメーション**
                setTimeout(() => {
                    ribbon.querySelector(".text__ribbon-bg").classList.add("shrink");
                }, 200);

                // **観察を終了**
                observer.unobserve(ribbon);
            }
        });
    }, {
        threshold: 0.4
    });

    ribbons.forEach(ribbon => observer.observe(ribbon));
});


// 帯アニメーション②
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".profile-detail");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                section.classList.add("active"); // **アニメーション開始**

                // **0.4秒後に縮小アニメーション**
                setTimeout(() => {
                    section.querySelector(".text__first-bg").classList.add("shrink");
                    section.querySelector(".text__second-bg").classList.add("shrink");
                    section.querySelector(".text__third-bg").classList.add("shrink");
                }, 400);

                // **一度発火したら再観察しない**
                observer.unobserve(section);
            }
        });
    }, {
        threshold: 0.5
    });

    sections.forEach(section => observer.observe(section));
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