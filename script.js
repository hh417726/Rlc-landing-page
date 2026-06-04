(function () {
  const designWidth = 1920;
  const firstScreenHeight = 1080;
  const root = document.documentElement;

  function updateScale() {
    const viewportWidth = document.documentElement.clientWidth;
    const widthScale = viewportWidth / designWidth;
    const heightScale = window.innerHeight / firstScreenHeight;
    const scale = Math.min(widthScale, heightScale, 1);
    const stageLeft = Math.max((viewportWidth - designWidth * scale) / 2, 0);

    root.style.setProperty("--scale", String(scale));
    root.style.setProperty("--stage-left", `${stageLeft}px`);
  }

  function scrollToDesignY(y) {
    const scale = Number.parseFloat(getComputedStyle(root).getPropertyValue("--scale")) || 1;
    window.scrollTo({
      top: Math.max(0, y * scale),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }

  updateScale();
  window.addEventListener("resize", updateScale, { passive: true });

  document.querySelectorAll("[data-scroll-y]").forEach((control) => {
    control.addEventListener("click", () => {
      const y = Number(control.getAttribute("data-scroll-y"));
      scrollToDesignY(y);
    });
  });
})();
