/**
 * 项目页面 - 全屏吸附滚动
 */

document.addEventListener("DOMContentLoaded", () => {
  initFullScreenScroll();
  initProgressIndicators();
  initNavigationArrows();
  initScrollIndicators();
  initCarousels();
});

function initFullScreenScroll() {
  const container = document.querySelector(".projects-container");
  const sections = document.querySelectorAll(".project-section");
  const progressDots = document.querySelectorAll(".progress-dot");

  if (!container || !sections.length) return;

  // 监听滚动事件，更新进度指示器
  container.addEventListener("scroll", () => {
    const scrollPosition = container.scrollTop;
    const windowHeight = window.innerHeight;
    const currentIndex = Math.round(scrollPosition / windowHeight);

    // 更新进度点
    progressDots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });

    // 更新导航箭头状态
    updateArrowsState(currentIndex, sections.length);
  });
}

function initProgressIndicators() {
  const progressDots = document.querySelectorAll(".progress-dot");
  const container = document.querySelector(".projects-container");
  if (!progressDots.length || !container) return;

  progressDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const targetPosition = index * window.innerHeight;
      container.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });
}

function initNavigationArrows() {
  const upArrow = document.getElementById("navUp");
  const downArrow = document.getElementById("navDown");
  const container = document.querySelector(".projects-container");
  const sections = document.querySelectorAll(".project-section");

  if (!upArrow || !downArrow || !container) return;

  upArrow.addEventListener("click", () => {
    const currentScroll = container.scrollTop;
    const targetScroll = currentScroll - window.innerHeight;

    if (targetScroll >= 0) {
      container.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  });

  downArrow.addEventListener("click", () => {
    const currentScroll = container.scrollTop;
    const maxScroll = (sections.length - 1) * window.innerHeight;
    const targetScroll = currentScroll + window.innerHeight;

    if (targetScroll <= maxScroll) {
      container.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  });

  // 初始状态
  updateArrowsState(0, sections.length);
}

function updateArrowsState(currentIndex, totalSections) {
  const upArrow = document.getElementById("navUp");
  const downArrow = document.getElementById("navDown");

  if (!upArrow || !downArrow) return;

  if (currentIndex === 0) {
    upArrow.classList.add("disabled");
  } else {
    upArrow.classList.remove("disabled");
  }

  if (currentIndex === totalSections - 1) {
    downArrow.classList.add("disabled");
  } else {
    downArrow.classList.remove("disabled");
  }
}

// 键盘控制
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();

    const container = document.querySelector(".projects-container");
    const sections = document.querySelectorAll(".project-section");
    const currentScroll = container.scrollTop;
    const currentIndex = Math.round(currentScroll / window.innerHeight);

    if (e.key === "ArrowDown" && currentIndex < sections.length - 1) {
      container.scrollTo({
        top: (currentIndex + 1) * window.innerHeight,
        behavior: "smooth",
      });
    } else if (e.key === "ArrowUp" && currentIndex > 0) {
      container.scrollTo({
        top: (currentIndex - 1) * window.innerHeight,
        behavior: "smooth",
      });
    }
  }
});

/**
 * 初始化向下滑动箭头功能
 */
function initScrollIndicators() {
  const indicators = document.querySelectorAll(".scroll-indicator");
  const container = document.querySelector(".projects-container");
  const sections = document.querySelectorAll(".project-section");

  if (!indicators.length || !container) return;

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      // 如果是向上箭头（最后一个项目）
      if (indicator.classList.contains("top")) {
        // 滚动到顶部
        container.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        // 向下滚动到下一个项目
        const nextIndex = index + 1;
        if (nextIndex < sections.length) {
          const targetPosition = nextIndex * window.innerHeight;
          container.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });
}

/**
 * 初始化轮播图功能
 */
function initCarousels() {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const slides = carousel.querySelectorAll(".carousel-slide");
    const prevBtn = carousel.querySelector(".carousel-btn.prev");
    const nextBtn = carousel.querySelector(".carousel-btn.next");
    const dots = carousel.querySelectorAll(".carousel-dots .dot");

    if (!track || !slides.length) return;

    let currentIndex = 0;
    const slideCount = slides.length;

    // 更新轮播位置
    const updateCarousel = (index) => {
      // 确保索引在有效范围内
      if (index < 0) index = slideCount - 1;
      if (index >= slideCount) index = 0;

      currentIndex = index;

      // 移动轨道
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // 更新指示点
      dots.forEach((dot, i) => {
        if (i === currentIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    };

    // 下一张
    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        updateCarousel(currentIndex + 1);
      });
    }

    // 上一张
    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        updateCarousel(currentIndex - 1);
      });
    }

    // 点击指示点
    dots.forEach((dot, index) => {
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        updateCarousel(index);
      });
    });

    // 自动轮播（可选）
    let autoplayInterval;

    const startAutoplay = () => {
      autoplayInterval = setInterval(() => {
        updateCarousel(currentIndex + 1);
      }, 5000);
    };

    const stopAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    };

    // 鼠标悬停时暂停自动轮播
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);

    // 启动自动轮播（如果需要）
    startAutoplay();

    // 初始化第一张
    updateCarousel(0);
  });
}

