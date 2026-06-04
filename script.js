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

  const showcaseTrack = document.querySelector(".showcase-track");
  const showcaseViewport = document.querySelector(".showcase-viewport");
  const showcasePrev = document.querySelector('[data-carousel-dir="prev"]');
  const showcaseNext = document.querySelector('[data-carousel-dir="next"]');

  if (showcaseTrack && showcaseViewport && showcasePrev && showcaseNext) {
    const pages = Array.from(showcaseTrack.children);
    let activePage = 0;

    function updateShowcase() {
      if (pages.length === 0) {
        return;
      }

      const pageWidth = showcaseViewport.clientWidth;
      const maxPage = Math.max(0, pages.length - 1);

      activePage = Math.min(activePage, maxPage);
      showcaseTrack.style.transform = `translateX(${-activePage * pageWidth}px)`;
      showcasePrev.disabled = activePage === 0;
      showcaseNext.disabled = activePage === maxPage;
    }

    showcasePrev.addEventListener("click", () => {
      if (activePage > 0) {
        activePage -= 1;
        updateShowcase();
      }
    });

    showcaseNext.addEventListener("click", () => {
      const maxPage = Math.max(0, pages.length - 1);
      if (activePage < maxPage) {
        activePage += 1;
        updateShowcase();
      }
    });

    updateShowcase();
    window.addEventListener("resize", updateShowcase, { passive: true });
  }
})();
