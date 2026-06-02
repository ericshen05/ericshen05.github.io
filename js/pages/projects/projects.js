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

function getScrollContainer() {
  return document.querySelector(".projects-container");
}

function getSections() {
  return [...document.querySelectorAll(".project-section")];
}

function getSectionTop(section) {
  const container = getScrollContainer();
  if (!container || !section) return 0;
  return section.offsetTop - container.offsetTop;
}

function getCurrentSectionIndex() {
  const container = getScrollContainer();
  const sections = getSections();
  if (!container || !sections.length) return 0;

  const scrollTop = container.scrollTop;
  const threshold = container.clientHeight * 0.35;
  let current = 0;

  sections.forEach((section, index) => {
    if (scrollTop + threshold >= getSectionTop(section)) {
      current = index;
    }
  });

  return current;
}

function scrollToSection(index) {
  const container = getScrollContainer();
  const sections = getSections();
  if (!container || !sections[index]) return;

  container.scrollTo({
    top: getSectionTop(sections[index]),
    behavior: "smooth",
  });
}

function initFullScreenScroll() {
  const container = getScrollContainer();
  const sections = getSections();
  const progressDots = document.querySelectorAll(".progress-dot");

  if (!container || !sections.length) return;

  container.addEventListener("scroll", () => {
    const currentIndex = getCurrentSectionIndex();

    progressDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    updateArrowsState(currentIndex, sections.length);
  });
}

function initProgressIndicators() {
  const progressDots = document.querySelectorAll(".progress-dot");
  if (!progressDots.length || !getScrollContainer()) return;

  progressDots.forEach((dot, index) => {
    dot.addEventListener("click", () => scrollToSection(index));
  });
}

function initNavigationArrows() {
  const upArrow = document.getElementById("navUp");
  const downArrow = document.getElementById("navDown");
  const sections = getSections();

  if (!upArrow || !downArrow || !getScrollContainer()) return;

  upArrow.addEventListener("click", () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex > 0) scrollToSection(currentIndex - 1);
  });

  downArrow.addEventListener("click", () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < sections.length - 1) scrollToSection(currentIndex + 1);
  });

  updateArrowsState(0, sections.length);
}

function updateArrowsState(currentIndex, totalSections) {
  const upArrow = document.getElementById("navUp");
  const downArrow = document.getElementById("navDown");

  if (!upArrow || !downArrow) return;

  upArrow.classList.toggle("disabled", currentIndex === 0);
  downArrow.classList.toggle("disabled", currentIndex === totalSections - 1);
}

document.addEventListener("keydown", (e) => {
  if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

  const container = getScrollContainer();
  const sections = getSections();
  if (!container || !sections.length) return;

  e.preventDefault();
  const currentIndex = getCurrentSectionIndex();

  if (e.key === "ArrowDown" && currentIndex < sections.length - 1) {
    scrollToSection(currentIndex + 1);
  } else if (e.key === "ArrowUp" && currentIndex > 0) {
    scrollToSection(currentIndex - 1);
  }
});

function initScrollIndicators() {
  const indicators = document.querySelectorAll(".scroll-indicator");
  const sections = getSections();

  if (!indicators.length || !getScrollContainer()) return;

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      if (indicator.classList.contains("top")) {
        scrollToSection(0);
        return;
      }

      const section = indicator.closest(".project-section");
      const currentIndex = sections.indexOf(section);
      if (currentIndex >= 0 && currentIndex < sections.length - 1) {
        scrollToSection(currentIndex + 1);
      }
    });
  });
}

function initCarousels() {
  const carousels = document.querySelectorAll(".carousel");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const slides = carousel.querySelectorAll(".carousel-slide");
    const dots = carousel.querySelectorAll(".carousel-dots .dot");

    if (!track || !slides.length) return;

    let currentIndex = 0;
    const slideCount = slides.length;

    const updateCarousel = (index) => {
      let nextIndex = index;
      if (nextIndex < 0) nextIndex = slideCount - 1;
      if (nextIndex >= slideCount) nextIndex = 0;

      currentIndex = nextIndex;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    };

    dots.forEach((dot, index) => {
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        updateCarousel(index);
      });
    });

    let autoplayInterval;

    const startAutoplay = () => {
      autoplayInterval = setInterval(() => {
        updateCarousel(currentIndex + 1);
      }, 5000);
    };

    const stopAutoplay = () => {
      clearInterval(autoplayInterval);
    };

    if (!prefersReducedMotion && !isCoarsePointer) {
      carousel.addEventListener("mouseenter", stopAutoplay);
      carousel.addEventListener("mouseleave", startAutoplay);
      startAutoplay();
    }

    updateCarousel(0);
  });
}
