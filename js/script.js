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