(function () {
  "use strict";

  function initCircleGallery() {
    var root = document.getElementById("circleGallery");
    var stage = document.getElementById("circleStage");
    if (!root || !stage) return;

    var items = Array.prototype.slice.call(stage.children);
    var n = items.length;
    if (!n) return;

    var angleStep = 360 / n;
    var itemWidth = stage.getBoundingClientRect().width || 260;
    var radius = Math.round((itemWidth / 2) / Math.tan(Math.PI / n));

    items.forEach(function (item, i) {
      item.style.transform = "rotateY(" + (i * angleStep) + "deg) translateZ(" + radius + "px)";
    });

    var currentAngle = 0;
    var isDragging = false;
    var startX = 0;
    var startAngle = 0;

    function setAngle(angle) {
      currentAngle = angle;
      stage.style.transform = "rotateY(" + currentAngle + "deg)";
    }

    function onPointerDown(e) {
      isDragging = true;
      root.classList.add("is-dragging");
      startX = ("touches" in e ? e.touches[0].clientX : e.clientX);
      startAngle = currentAngle;
    }
    function onPointerMove(e) {
      if (!isDragging) return;
      var x = ("touches" in e ? e.touches[0].clientX : e.clientX);
      var deltaX = x - startX;
      setAngle(startAngle + deltaX * 0.35);
    }
    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      root.classList.remove("is-dragging");
      var snapped = Math.round(currentAngle / angleStep) * angleStep;
      setAngle(snapped);
    }

    root.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    root.addEventListener("touchstart", onPointerDown, { passive: true });
    root.addEventListener("touchmove", onPointerMove, { passive: true });
    root.addEventListener("touchend", onPointerUp);

    var prevBtn = root.querySelector(".circle-gallery-nav.prev");
    var nextBtn = root.querySelector(".circle-gallery-nav.next");
    if (prevBtn) prevBtn.addEventListener("click", function () { setAngle(Math.round(currentAngle / angleStep) * angleStep - angleStep); });
    if (nextBtn) nextBtn.addEventListener("click", function () { setAngle(Math.round(currentAngle / angleStep) * angleStep + angleStep); });

    window.addEventListener("resize", function () {
      var w = stage.getBoundingClientRect().width || itemWidth;
      if (Math.abs(w - itemWidth) > 2) {
        itemWidth = w;
        radius = Math.round((itemWidth / 2) / Math.tan(Math.PI / n));
        items.forEach(function (item, i) {
          item.style.transform = "rotateY(" + (i * angleStep) + "deg) translateZ(" + radius + "px)";
        });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCircleGallery);
  } else {
    initCircleGallery();
  }
})();
