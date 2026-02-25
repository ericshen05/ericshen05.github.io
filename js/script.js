/**
 * 个人简历 - 夜间/日间模式切换 + 结构化问答弹出卡片
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("📄 个人简历已加载");

  // 初始化主题
  initTheme();

  // 获取主题切换按钮
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // 初始化FAQ手风琴效果
  initFAQ();

  // 初始化学术能力折叠效果
  initAcademyFoldable();
});

/**
 * 初始化FAQ手风琴效果
 */
function initFAQ() {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const targetId = question.getAttribute("data-target");
      const answerDiv = document.getElementById(targetId);
      const isActive = question.classList.contains("active");

      // 关闭所有其他展开项
      document
        .querySelectorAll(".faq-question.active")
        .forEach((activeQuestion) => {
          if (activeQuestion !== question) {
            activeQuestion.classList.remove("active");
            const activeTargetId = activeQuestion.getAttribute("data-target");
            const activeAnswer = document.getElementById(activeTargetId);
            if (activeAnswer) {
              activeAnswer.classList.remove("active");
            }
          }
        });

      // 切换当前项
      if (!isActive) {
        question.classList.add("active");
        answerDiv.classList.add("active");
      } else {
        question.classList.remove("active");
        answerDiv.classList.remove("active");
      }
    });
  });
}

/**
 * 初始化主题
 * 检查本地存储中的主题设置，如果没有则使用系统偏好
 */
function initTheme() {
  // 检查本地存储
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else if (savedTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    // 如果没有保存的主题，检查系统偏好
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (prefersDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }
}

/**
 * 切换主题
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  let newTheme;

  if (currentTheme === "dark") {
    newTheme = "light";
  } else {
    newTheme = "dark";
  }

  // 应用新主题
  document.documentElement.setAttribute("data-theme", newTheme);

  // 保存到本地存储
  localStorage.setItem("theme", newTheme);

  // 添加点击动画效果
  const button = document.getElementById("themeToggle");
  button.style.transform = "rotate(180deg)";
  setTimeout(() => {
    button.style.transform = "rotate(0)";
  }, 300);

  console.log(
    `🎨 主题已切换为: ${newTheme === "dark" ? "夜间模式" : "日间模式"}`,
  );
}

/**
 * 监听系统主题变化
 * 如果用户没有手动设置主题，跟随系统变化
 */
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    // 只有在用户没有手动设置过主题时才跟随系统
    if (!localStorage.getItem("theme")) {
      if (e.matches) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }
    }
  });

// 获取弹出层元素
const overlay = document.getElementById("modalOverlay");
const modal = document.getElementById("modalCard");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent"); // 现在是 modal-content-wrapper
const closeBtn = document.getElementById("modalClose");

// 设置内容时使用 modalContent
modalContent.innerHTML = answer.content;

/**
 * 初始化学术能力折叠效果
 */
function initAcademyFoldable() {
  const foldableHeader = document.getElementById("coursesHeader");

  if (foldableHeader) {
    foldableHeader.addEventListener("click", () => {
      const content = document.getElementById("coursesContent");
      const isActive = foldableHeader.classList.contains("active");

      if (!isActive) {
        foldableHeader.classList.add("active");
        content.classList.add("active");
      } else {
        foldableHeader.classList.remove("active");
        content.classList.remove("active");
      }
    });
  }
}
