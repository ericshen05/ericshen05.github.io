/**
 * 关于页面专属JS
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("📄 关于页面已加载");

  // 可以添加一些页面特定的交互
  initAboutAnimations();
});

function initAboutAnimations() {
  // 简单的滚动显示动画
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // 观察所有卡片
  document.querySelectorAll(".team-member, .info-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });
}
