// Cabinet de Avocat Lixandru Elena — interactions

(function () {
  "use strict";

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Reveal on scroll
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // Testimonial carousel
  var slides = document.querySelectorAll(".testimonial");
  if (slides.length) {
    var dotsWrap = document.querySelector(".testimonial-dots");
    var idx = 0;
    var timer = null;

    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Recenzia " + (i + 1));
      dot.addEventListener("click", function () { show(i); restart(); });
      dotsWrap.appendChild(dot);
    });
    var dots = dotsWrap.querySelectorAll("button");

    function show(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach(function (s, j) { s.classList.toggle("active", j === idx); });
      dots.forEach(function (d, j) { d.classList.toggle("active", j === idx); });
    }

    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(function () { show(idx + 1); }, 7000);
    }

    var prev = document.querySelector(".testimonial-prev");
    var next = document.querySelector(".testimonial-next");
    if (prev) prev.addEventListener("click", function () { show(idx - 1); restart(); });
    if (next) next.addEventListener("click", function () { show(idx + 1); restart(); });

    show(0);
    restart();
  }
})();
