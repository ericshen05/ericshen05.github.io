/**
 * 首页专属交互逻辑（不包含全局主题逻辑）
 */

document.addEventListener("DOMContentLoaded", () => {
  initFAQ();
  initAcademyFoldable();
});

function initFAQ() {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const targetId = question.getAttribute("data-target");
      const answerDiv = document.getElementById(targetId);
      const isActive = question.classList.contains("active");

      document.querySelectorAll(".faq-question.active").forEach((activeQuestion) => {
        if (activeQuestion === question) return;
        activeQuestion.classList.remove("active");
        const activeTargetId = activeQuestion.getAttribute("data-target");
        const activeAnswer = document.getElementById(activeTargetId);
        if (activeAnswer) {
          activeAnswer.classList.remove("active");
        }
      });

      if (!answerDiv) return;
      question.classList.toggle("active", !isActive);
      answerDiv.classList.toggle("active", !isActive);
    });
  });
}

function initAcademyFoldable() {
  const foldableHeader = document.getElementById("coursesHeader");
  const content = document.getElementById("coursesContent");

  if (!foldableHeader || !content) return;

  foldableHeader.addEventListener("click", () => {
    const isActive = foldableHeader.classList.contains("active");
    foldableHeader.classList.toggle("active", !isActive);
    content.classList.toggle("active", !isActive);
  });
}
