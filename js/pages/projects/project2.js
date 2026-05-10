/**
 * Project 02 — Mathematical modeling showcase: tabs, accordions, scroll reveal, KaTeX.
 */
(function () {
  function initKatex() {
    if (typeof renderMathInElement === "undefined") return;
    renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\(", right: "\\)", display: false },
      ],
      ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
      strict: false,
    });
  }
  initKatex();

  const tabs = document.querySelectorAll(".p2-tab");
  const panels = document.querySelectorAll(".p2-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-panel");
      tabs.forEach((t) => {
        t.classList.toggle("active", t === tab);
        t.setAttribute("aria-selected", String(t === tab));
      });
      panels.forEach((p) => p.classList.toggle("active", p.id === target));
    });
  });

  document.querySelectorAll(".p2-model").forEach((block) => {
    const head = block.querySelector(".p2-model-head");
    head.addEventListener("click", () => {
      block.classList.toggle("open");
    });
  });

  const reduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduced) {
    const revealEls = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8%", threshold: 0.06 },
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) =>
      el.classList.add("is-visible"),
    );
  }
})();
