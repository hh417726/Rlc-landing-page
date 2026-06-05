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
  const showcasePrev = document.querySelector('[data-carousel-dir="prev"]');
  const showcaseNext = document.querySelector('[data-carousel-dir="next"]');

  if (showcaseTrack && showcasePrev && showcaseNext) {
    const slots = Array.from(showcaseTrack.querySelectorAll("[data-showcase-slot]"));
    const showcaseItems = [
      {
        nodeId: "459:1074",
        src: "./assets/showcase-5.png",
        alt: "挑戰打卡審核畫面",
        text: "參與真實世界挑戰任務，完成指定目標並提交照片或影片驗證，透過評核即可獲得獎勵。",
      },
      {
        nodeId: "485:1403",
        src: "./assets/showcase-6.png",
        alt: "挑戰社群分享畫面",
        text: "分享你的挑戰歷程、生活點滴與精彩瞬間，與其他挑戰者交流互動，獲得更多靈感與成長動力。",
      },
      {
        nodeId: "513:1432",
        src: "./assets/showcase-7.png",
        alt: "積分兌換好禮畫面",
        text: "透過完成挑戰累積積分，兌換各類精選商品與實用好禮，讓每一次努力都能獲得真實回報。",
      },
      {
        nodeId: "516:1475",
        src: "./assets/showcase-8.png",
        alt: "每日挑戰任務畫面",
        text: "每日更新多元真實人生挑戰任務，涵蓋生活、運動、學習及探索等主題，讓成長變得更有趣。",
      },
      {
        nodeId: "516:1502",
        src: "./assets/showcase-9.png",
        alt: "會員等級成長畫面",
        text: "累積經驗值提升會員等級，解鎖更多專屬權益、高級挑戰任務及豐富獎勵，見證自己的成長歷程。",
      },
      {
        nodeId: "516:1556",
        src: "./assets/showcase-10.png",
        alt: "個人資料成長數據畫面",
        text: "管理個人資料、查看挑戰紀錄、追蹤積分與等級進度，隨時掌握自己的挑戰成果與成長數據。",
      },
    ];
    let activeIndex = 0;

    function updateShowcase() {
      if (slots.length === 0 || showcaseItems.length === 0) {
        return;
      }

      slots.forEach((slot, slotIndex) => {
        const item = showcaseItems[(activeIndex + slotIndex) % showcaseItems.length];
        const phone = slot.querySelector(".showcase-phone");
        const image = slot.querySelector(".showcase-phone-screen img");
        const text = slot.querySelector("p");

        if (phone) {
          phone.setAttribute("data-node-id", item.nodeId);
        }
        if (image) {
          image.setAttribute("src", item.src);
          image.setAttribute("alt", item.alt);
        }
        if (text) {
          text.textContent = item.text;
        }
      });
    }

    showcasePrev.addEventListener("click", () => {
      activeIndex = (activeIndex - 1 + showcaseItems.length) % showcaseItems.length;
      updateShowcase();
    });

    showcaseNext.addEventListener("click", () => {
      activeIndex = (activeIndex + 1) % showcaseItems.length;
      updateShowcase();
    });

    updateShowcase();
  }
})();
