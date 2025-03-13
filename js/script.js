//reason-carousel
document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll(".carousel-container");

    carousels.forEach((carousel) => {
        const carouselId = carousel.getAttribute("data-carousel"); // 各カルーセルのIDを取得
        const track = carousel.querySelector(".carousel-track");
        const slides = carousel.querySelectorAll(".carousel-slide");
        const prevBtn = carousel.querySelector(".prev");
        const nextBtn = carousel.querySelector(".next");
        const indicatorContainer = document.querySelector(`.carousel-indicators[data-carousel="${carouselId}"]`);
        const dots = indicatorContainer ? indicatorContainer.querySelectorAll(".dot") : [];

        let currentIndex = 0;
        const totalSlides = slides.length;
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID;

        function updateCarousel() {
            const offset = -currentIndex * 100;
            track.style.transition = "transform 0.3s ease-in-out";
            track.style.transform = `translateX(${offset}%)`;

            if (dots.length > 0) {
                dots.forEach((dot, index) => {
                    dot.classList.toggle("active", index === currentIndex);
                });
            }
        }

        function moveSlide(direction) {
            currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
            updateCarousel();
        }

        nextBtn.addEventListener("click", () => moveSlide(1));
        prevBtn.addEventListener("click", () => moveSlide(-1));

        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener("click", () => {
                    currentIndex = index;
                    updateCarousel();
                });
            });
        }

        // **フリック・スワイプ操作対応**
        function touchStart(event) {
            isDragging = true;
            startPos = event.touches ? event.touches[0].clientX : event.clientX;
            prevTranslate = currentTranslate;
            animationID = requestAnimationFrame(animation);
            track.style.transition = "none";
        }

        function touchMove(event) {
            if (!isDragging) return;
            const currentPosition = event.touches ? event.touches[0].clientX : event.clientX;
            currentTranslate = prevTranslate + currentPosition - startPos;
            track.style.transform = `translateX(${currentTranslate}px)`;
        }

        function touchEnd() {
            cancelAnimationFrame(animationID);
            isDragging = false;

            const movedBy = currentTranslate - prevTranslate;

            if (movedBy < -50) {
                moveSlide(1);
            } else if (movedBy > 50) {
                moveSlide(-1);
            } else {
                updateCarousel();
            }
        }

        function animation() {
            if (isDragging) {
                requestAnimationFrame(animation);
            }
        }

        track.addEventListener("touchstart", touchStart);
        track.addEventListener("touchmove", touchMove);
        track.addEventListener("touchend", touchEnd);
        track.addEventListener("mousedown", touchStart);
        track.addEventListener("mousemove", touchMove);
        track.addEventListener("mouseup", touchEnd);
        track.addEventListener("mouseleave", touchEnd);

        updateCarousel(); // 初期表示を更新
    });
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
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
});

//FAQ
document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", function () {
            // 他のFAQを閉じる
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                }
            });

            // 現在のFAQを開閉する
            item.classList.toggle("active");
        });
    });
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

            let triggerStart = window.innerWidth < 768 ? "top 90%" : "top 85%";

            gsap.to(splitText.chars, {
                y: 0,
                opacity: 1,
                stagger: 0.03,
                duration: 0.3,
                ease: "power3.out",
                startAt: {
                    y: 50,
                    opacity: 0
                },
                scrollTrigger: {
                    trigger: element,
                    start: triggerStart,
                    toggleActions: "play none none none",
                },
                onComplete: function () {
                    gsap.to(element, {
                        "--border-width": "100%", // CSS変数を変更
                        duration: 0.2,
                        ease: "power3.out",
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


//pop up
/*フェードインアニメーション*/
gsap.utils.toArray('.js-fadeIn').forEach(target => {
    gsap.fromTo(target, {
        autoAlpha: 0, // 最初は透明
        y: 10 // 少し下に配置
    }, {
        autoAlpha: 1, // フェードイン
        y: 0, // 元の位置に移動
        duration: 1, // 1秒でアニメーション
        delay: 0.2, // 0.2秒遅延
        ease: "power3.out", // ふわっとした動き
        scrollTrigger: {
            trigger: target,
            start: 'top 50%'
        }
    });
});


/*連続ポップインアップアニメーション*/
gsap.utils.toArray('.js-popUps').forEach(target => {
    var targets = target.querySelectorAll(':scope > *'); // target の直下にある要素を取得

    gsap.fromTo(targets, {
        scale: 0.9,
        autoAlpha: 0,
        y: 20 // 下から少し上がる動きを追加
    }, {
        scale: 1,
        autoAlpha: 1,
        y: 0,
        ease: "power3.out",
        stagger: {
            each: 0.5, // 各要素が 0.2秒間隔で順番に出現
            from: "start" // **上の要素から順にアニメーション**
        },
        scrollTrigger: {
            trigger: target,
            start: "top 70%", // 画面の 50% に来たら発火
            toggleActions: "play none none none"
        }
    });
});

/*ポップインアニメーション*/
gsap.utils.toArray('.js-popUp').forEach(target => {
    gsap.to(target, {
        scale: 1,
        autoAlpha: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: target,
            start: 'bottom bottom'
        }
    })
});


//fade  soon
gsap.utils.toArray('.js-fadeIn-soon').forEach(target => {
    gsap.to(target, {
        autoAlpha: 1,
        scrollTrigger: {
            trigger: target,
            start: 'top bottom-=100'
        }
    })
});

gsap.utils.toArray('.js-popUp-soon').forEach(target => {
    gsap.to(target, {
        scale: 1,
        autoAlpha: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: target,
            start: 'top bottom-=100',
        }
    });
});

// **新しいフェードイン＆スライドアップ（画像が少し見えたら発火）**
gsap.utils.toArray('.js-fadeInUp-soon').forEach(target => {
    gsap.to(target, {
        opacity: 1,
        visibility: "visible",
        y: 0,
        duration: 2,
        autoAlpha: 1,
        ease: "back.out(2.7)",
        scrollTrigger: {
            trigger: target,
            start: 'top bottom-=300',
            toggleActions: "play none none none"
        }
    });
});

/* **連続ポップインアップアニメーション** */
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // `js-popUps` 内の `.solution--item` を取得
    let items = gsap.utils.toArray(".js-popUps-move .solution--item");

    gsap.fromTo(
        items,
        // **初期状態**
        {
            autoAlpha: 0, // 透明
            scale: 1, // 少し縮小
            x: (i) => (i === items.length - 1 ? 0 : i % 2 === 0 ? -100 : 100), // **最後の要素だけ `x: 0` にする**
            y: (i) => (i === items.length - 1 ? 100 : 0), // **最後の要素だけ `y: 100`**
        },
        // **アニメーション**
        {
            autoAlpha: 1, // 表示
            scale: 1, // 拡大
            x: 0, // 左右位置を元に戻す
            y: 0, // 下からの移動を元に戻す
            ease: "power3.out",
            duration: 1.2,
            stagger: 0.5, // 0.3秒ごとに順番に表示
            scrollTrigger: {
                trigger: ".js-popUps-move",
                start: "top 50%", // トップが画面の50%に来たら発火
                toggleActions: "play none none none",
            },
        }
    );
});

/*連続ポップインアップアニメーション-soon*/
gsap.utils.toArray('.js-popUps-soon').forEach(target => {
    var targets = target.querySelectorAll(':scope > *'); //targetの直下に要素を取得
    gsap.fromTo(targets, {
        scale: .9,
        autoAlpha: 0
    }, {
        scale: 1,
        autoAlpha: 1,
        delay: .2,
        ease: "back.out(1.7)",
        stagger: {
            each: .08
        },
        scrollTrigger: {
            trigger: target,
            start: 'top center'
        }
    })
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
            duration: 0.4, // 背景の拡張を少し遅く
            scaleX: 1,
            ease: "power2.out"
        })

        // 文字の不透明度を 0 のままにして、`firstBg` が隠れている状態で出現
        .set(word, {
            opacity: 1
        })

        // 背景を閉じる（`firstBg` のみ閉じる）+ `whiteBg` 同時スライドイン
        .to(firstBg, {
            duration: 0.5,
            scaleX: 0,
            ease: "power3.inOut"
        })

        .to(whiteBg, {
            duration: 0.5,
            opacity: 1,
            ease: "power2.out"
        }, "-=0.5"); // `firstBg` の閉じる動きと同時に `whiteBg` を表示
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
                duration: .5, // カウントアップの時間
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
            duration: 0.4,
            scaleX: 1,
            ease: "power2.out"
        })
        .to(".text__second-bg", {
            duration: 0.4,
            scaleX: 1,
            ease: "power2.out"
        })
        .to(".text__third-bg", {
            duration: 0.4,
            scaleX: 1,
            ease: "power2.out"
        })
        .to(".text__word", {
            duration: 0.3,
            opacity: 1,
            ease: "power2.out"
        }, "-=0.2") // 🔹 文字の表示を少し遅らせる
        .to(".text__first-bg", {
            duration: 0.4,
            scaleX: 0,
            ease: "power3.inOut"
        })
        .to(".text__second-bg", {
            duration: 0.4,
            scaleX: 0,
            ease: "power3.inOut"
        })
        .to(".text__third-bg", {
            duration: 0.4,
            scaleX: 0,
            ease: "power3.inOut"
        });
});



// 右からフェードイン
document.addEventListener("DOMContentLoaded", function () {
    gsap.utils.toArray(".fadeInRight").forEach(function (element) {
        gsap.to(element, {
            opacity: 1,
            x: 0, // 右からの移動を 0 に
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 70%",
                toggleActions: "play none none none"
            }
        });
    });

    // 左からフェードイン
    gsap.utils.toArray(".fadeInLeft").forEach(function (element) {
        gsap.to(element, {
            opacity: 1,
            x: 0, // 左からの移動を 0 に
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 70%",
                toggleActions: "play none none none"
            }
        });
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
            duration: 0.4,
            scaleX: 1,
            ease: "power2.out"
        })
        .to(".bottom__second-bg", {
            duration: 0.4,
            scaleX: 1,
            ease: "power2.out"
        })
        // **`.bottom___word` の opacity を変更（アニメーション中に現れる）**
        .to(".bottom___word", {
            duration: 0.3,
            opacity: 1,
            ease: "power2.out"
        }, "-=0.2") // 🔹 文字の表示を少し遅らせる
        // **背景を閉じる**
        .to(".bottom__first-bg", {
            duration: 0.4,
            scaleX: 0,
            ease: "power3.inOut"
        })
        .to(".bottom__second-bg", {
            duration: 0.4,
            scaleX: 0,
            ease: "power3.inOut"
        })
        // **`.bottom__white-bg` を表示して、文字の背景として残す**
        .to(".bottom__white-bg", {
            duration: 0.5,
            opacity: 1,
            ease: "power2.out"
        }, "-=0.5"); // `.bottom__first-bg` の閉じる動きと同時に発火
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