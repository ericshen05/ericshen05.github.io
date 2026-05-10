function copyCurrentUrl(btn) {
  // 获取当前网址
  const currentUrl = window.location.href;

  // 使用现代clipboard API复制
  navigator.clipboard
    .writeText(currentUrl)
    .then(function () {
      // 找到或创建提示元素
      let tooltip = btn.querySelector(".copy-tooltip");

      // 如果按钮内没有提示元素，创建临时提示
      if (!tooltip) {
        tooltip = document.createElement("span");
        tooltip.className = "copy-tooltip";
        tooltip.textContent = "已成功复制网址";
        btn.appendChild(tooltip);
      }

      // 显示提示
      tooltip.classList.add("show");

      // 2秒后隐藏提示
      setTimeout(function () {
        tooltip.classList.remove("show");
      }, 2000);
    })
    .catch(function (err) {
      console.error("复制失败:", err);
      // 降级方案：使用传统方法
      fallbackCopyText(currentUrl, btn);
    });
}

const tipErrorBtn = document.getElementById("tiperror");
if (tipErrorBtn) {
  tipErrorBtn.addEventListener("click", function () {
    let tooltip = this.querySelector(".tooltip-err");
    tooltip.classList.add("show");

    setTimeout(function () {
      tooltip.classList.remove("show");
    }, 2000);
  });
}
