(function () {
  "use strict";

  const animations = new WeakMap();

  function getSummary(details) {
    for (let i = 0; i < details.children.length; i++) {
      if (details.children[i].tagName === "SUMMARY") return details.children[i];
    }
    return null;
  }

  function clearAnimationStyles(details) {
    details.style.removeProperty("height");
    details.style.removeProperty("overflow");
  }

  function animateDetails(details, opening) {
    const summary = getSummary(details);
    if (!summary) {
      details.open = opening;
      return;
    }

    const active = animations.get(details);
    const startHeight = details.getBoundingClientRect().height;

    if (active) {
      details.style.height = startHeight + "px";
      active.animation.cancel();
      animations.delete(details);
    } else {
      details.style.height = startHeight + "px";
    }

    details.style.overflow = "hidden";
    details.open = true;

    // 同步测量开合两种自然高度，再恢复起始高度，不产生中间闪跳。
    details.style.height = "auto";
    const openHeight = details.getBoundingClientRect().height;
    details.open = false;
    const collapsedHeight = details.getBoundingClientRect().height;
    details.open = true;
    details.style.height = startHeight + "px";

    const endHeight = opening ? openHeight : collapsedHeight;
    const distance = Math.abs(endHeight - startHeight);

    if (distance < 1) {
      if (!opening) details.open = false;
      clearAnimationStyles(details);
      return;
    }

    const duration = Math.min(300, Math.max(160, distance * 0.35));
    const animation = details.animate(
      [{ height: startHeight + "px" }, { height: endHeight + "px" }],
      {
        duration: duration,
        easing: opening ? "cubic-bezier(0.16, 1, 0.3, 1)" : "cubic-bezier(0.4, 0, 1, 1)"
      }
    );
    const state = { animation: animation, opening: opening };
    animations.set(details, state);

    animation.onfinish = function () {
      if (animations.get(details) !== state) return;

      details.style.height = endHeight + "px";
      if (!opening) details.open = false;
      animation.cancel();
      animations.delete(details);
      clearAnimationStyles(details);
    };
  }

  document.addEventListener("click", function (event) {
    const target = event.target instanceof Element ? event.target : event.target.parentElement;
    const summary = target && target.closest("summary");
    const details = summary && summary.parentElement;

    if (!details || details.tagName !== "DETAILS") return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof details.animate !== "function") return;

    event.preventDefault();
    const active = animations.get(details);
    animateDetails(details, active ? !active.opening : !details.open);
  });
})();
