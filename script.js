(function () {
      "use strict";

      /* ---------------- theme toggle ---------------- */
      var root = document.documentElement;
      var stored = localStorage.getItem("cnb-theme");
      var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      var initial = stored || (prefersLight ? "light" : "dark");
      root.setAttribute("data-theme", initial);

      var toggle = document.getElementById("theme-toggle");
      if (toggle) {
            toggle.addEventListener("click", function () {
                  var current = root.getAttribute("data-theme") === "light" ? "dark" : "light";
                  root.setAttribute("data-theme", current);
                  localStorage.setItem("cnb-theme", current);
            });
      }

      /* ---------------- mobile nav ---------------- */
      var burger = document.getElementById("nav-burger");
      var links = document.getElementById("nav-links");
      if (burger && links) {
            burger.addEventListener("click", function () {
                  links.classList.toggle("is-open");
            });
            links.querySelectorAll("a").forEach(function (a) {
                  a.addEventListener("click", function () { links.classList.remove("is-open"); });
            });
      }

      /* ---------------- scroll reveal ---------------- */
      var items = document.querySelectorAll(".reveal");
      if ("IntersectionObserver" in window) {
            var io = new IntersectionObserver(function (entries) {
                  entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                              entry.target.classList.add("is-visible");
                              io.unobserve(entry.target);
                        }
                  });
            }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
            items.forEach(function (el) { io.observe(el); });
      } else {
            items.forEach(function (el) { el.classList.add("is-visible"); });
      }

      /* ---------------- current year ---------------- */
      var year = document.getElementById("year");
      if (year) { year.textContent = new Date().getFullYear(); }
})();
