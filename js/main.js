/**
 * THE BRUNCH BREAK — comportamiento del sitio estático.
 * Sin build step: pensado para abrirse tal cual o servirse con cualquier
 * servidor estático. GSAP/ScrollTrigger/Lenis son una capa de mejora
 * progresiva (se cargan por CDN en el <head>); si no cargan (sin
 * conexión), el sitio sigue siendo 100% funcional y visible gracias al
 * motor de reveal basado en IntersectionObserver.
 */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

  /* ---------------- Split text en palabras ---------------- */
  function splitIntoWords(el) {
    var text = el.textContent.trim();
    var words = text.split(/\s+/);
    el.textContent = "";
    el.classList.add("split-words");
    words.forEach(function (word) {
      var wrap = document.createElement("span");
      wrap.className = "split-word";
      var inner = document.createElement("span");
      inner.textContent = word;
      wrap.appendChild(inner);
      el.appendChild(wrap);
    });
    return Array.prototype.slice.call(el.querySelectorAll(".split-word"));
  }

  /* Letras individuales que caen desde arriba (Hero) */
  function splitIntoFallingLetters(el) {
    var nodes = Array.prototype.slice.call(el.childNodes);
    el.textContent = "";
    el.classList.add("split-fall");
    var letters = [];
    nodes.forEach(function (node) {
      if (node.nodeName === "BR") {
        el.appendChild(document.createElement("br"));
        return;
      }
      var text = node.textContent || "";
      Array.prototype.forEach.call(text, function (ch) {
        if (ch === " ") {
          var space = document.createElement("span");
          space.className = "fall-space";
        space.textContent = " ";
          el.appendChild(space);
          return;
        }
        var span = document.createElement("span");
        span.className = "fall-letter";
        span.textContent = ch;
        span.style.setProperty("--rot", (Math.random() * 60 - 30).toFixed(1) + "deg");
        el.appendChild(span);
        letters.push(span);
      });
    });
    return letters;
  }

  function initSplitText() {
    document.querySelectorAll("[data-split]").forEach(function (el) {
      if (el.dataset.split === "fall") {
        var letters = splitIntoFallingLetters(el);
        letters.forEach(function (letter, i) {
          setTimeout(function () {
            letter.classList.add("is-visible");
          }, 300 + i * 40);
        });
        return;
      }

      var words = splitIntoWords(el);
      if (el.dataset.split === "load") {
        words.forEach(function (word, i) {
          setTimeout(function () {
            word.classList.add("is-visible");
          }, 250 + i * 55);
        });
      } else {
        observeSplitGroup(el, words);
      }
    });
  }

  var splitObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (!entry.isIntersecting) return;
              var words = entry.target.__words || [];
              words.forEach(function (word, i) {
                setTimeout(function () {
                  word.classList.add("is-visible");
                }, i * 55);
              });
              splitObserver.unobserve(entry.target);
            });
          },
          { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
        )
      : null;

  function observeSplitGroup(el, words) {
    if (!splitObserver) {
      words.forEach(function (w) {
        w.classList.add("is-visible");
      });
      return;
    }
    el.__words = words;
    splitObserver.observe(el);
  }

  /* ---------------- Reveal genérico on-scroll ---------------- */
  function initReveal() {
    document.documentElement.classList.add("js");

    document.querySelectorAll(".stagger").forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        child.style.setProperty("--i", i);
      });
    });

    var targets = document.querySelectorAll(".reveal, .reveal-scale, .reveal-left, .reveal-right, .story-underline");
    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    targets.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---------------- Header + menú móvil ---------------- */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var toggle = document.querySelector(".nav-toggle");
    var mobileMenu = document.querySelector(".mobile-menu");
    if (!toggle || !mobileMenu) return;

    function openMenu() {
      mobileMenu.classList.add("is-open");
      document.body.style.overflow = "hidden";
      toggle.setAttribute("aria-expanded", "true");
    }
    function closeMenu() {
      mobileMenu.classList.remove("is-open");
      document.body.style.overflow = "";
      toggle.setAttribute("aria-expanded", "false");
    }
    toggle.addEventListener("click", openMenu);
    mobileMenu.querySelectorAll("[data-menu-close]").forEach(function (btn) {
      btn.addEventListener("click", closeMenu);
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  /* ---------------- Barra de progreso de scroll ---------------- */
  function initScrollProgress() {
    var bar = document.getElementById("scroll-progress");
    if (!bar) return;
    function update() {
      var scrollTop = window.scrollY;
      var height = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (height > 0 ? scrollTop / height : 0) + ")";
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------------- Cursor personalizado ---------------- */
  function initCursor() {
    var dot = document.getElementById("cursor-dot");
    if (!dot || isCoarsePointer || prefersReducedMotion) return;

    document.addEventListener("mousemove", function (e) {
      var target = e.target.closest("[data-cursor]");
      var size = target ? 52 : 10;
      dot.style.width = size + "px";
      dot.style.height = size + "px";
      dot.style.transform =
        "translate(" + (e.clientX - size / 2) + "px," + (e.clientY - size / 2) + "px)";
    });
  }

  /* ---------------- Botones magnéticos ---------------- */
  function initMagnetic() {
    if (isCoarsePointer || prefersReducedMotion) return;
    document.querySelectorAll("[data-magnetic]").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var b = el.getBoundingClientRect();
        var mx = e.clientX - (b.left + b.width / 2);
        var my = e.clientY - (b.top + b.height / 2);
        el.style.transform = "translate(" + mx * 0.28 + "px," + my * 0.28 + "px)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "translate(0,0)";
      });
    });
  }

  /* ---------------- Consentimiento de cookies (opt-in) ---------------- */
  var COOKIE_KEY = "tbb-cookie-consent";

  function initCookieConsent() {
    var banner = document.getElementById("cookie-banner");
    if (!banner) return;

    if (!localStorage.getItem(COOKIE_KEY)) {
      banner.classList.add("is-visible");
    }

    function save(analytics) {
      localStorage.setItem(
        COOKIE_KEY,
        JSON.stringify({ necessary: true, analytics: analytics, timestamp: Date.now() })
      );
      banner.classList.remove("is-visible");
    }

    var acceptBtn = banner.querySelector("[data-cookie-accept]");
    var rejectBtn = banner.querySelector("[data-cookie-reject]");
    var customizeBtn = banner.querySelector("[data-cookie-customize]");
    var saveBtn = banner.querySelector("[data-cookie-save]");
    var prefs = banner.querySelector(".cookie-prefs");
    var analyticsCheckbox = banner.querySelector("[data-cookie-analytics]");

    if (acceptBtn) acceptBtn.addEventListener("click", function () { save(true); });
    if (rejectBtn) rejectBtn.addEventListener("click", function () { save(false); });
    if (customizeBtn && prefs) {
      customizeBtn.addEventListener("click", function () {
        prefs.classList.toggle("is-visible");
      });
    }
    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        save(!!(analyticsCheckbox && analyticsCheckbox.checked));
      });
    }
  }

  /* ---------------- Formulario de contacto (mailto) ---------------- */
  function initContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]').value;
      var email = form.querySelector('[name="email"]').value;
      var message = form.querySelector('[name="message"]').value;
      var target = form.dataset.contactEmail || "info@thebrunchbreak.com";
      var subject = encodeURIComponent("Contacto web — " + name);
      var body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      window.location.href = "mailto:" + target + "?subject=" + subject + "&body=" + body;

      var success = form.querySelector(".form-success");
      if (success) success.classList.add("is-visible");
    });
  }

  /* ---------------- Tilt 3D del Hero (sigue al cursor) ---------------- */
  function initHeroTilt() {
    if (isCoarsePointer || prefersReducedMotion) return;
    var hero = document.querySelector(".hero");
    var layer = document.querySelector("[data-tilt-layer]");
    if (!hero || !layer) return;

    hero.addEventListener("mousemove", function (e) {
      var b = hero.getBoundingClientRect();
      var px = (e.clientX - b.left) / b.width - 0.5;
      var py = (e.clientY - b.top) / b.height - 0.5;
      layer.style.transform =
        "rotateY(" + (px * 6) + "deg) rotateX(" + (py * -6) + "deg)";
    });
    hero.addEventListener("mouseleave", function () {
      layer.style.transform = "rotateY(0deg) rotateX(0deg)";
    });
  }

  /* ---------------- Tarjetas 3D al pasar el cursor ----------------
     Reimplementación en JS/CSS puro (sin React) del "3D Card Effect" de
     Aceternity UI: la tarjeta gira en perspectiva siguiendo el cursor y,
     gracias a transform-style:preserve-3d (ver css/styles.css), sus
     elementos internos con translateZ "flotan" a distinta profundidad. */
  function init3DCards() {
    if (isCoarsePointer || prefersReducedMotion) return;
    document.querySelectorAll(".tilt-3d").forEach(function (card) {
      function setTilt(rx, ry) {
        card.style.transform = "perspective(1000px) rotateX(" + rx + "deg) rotateY(" + ry + "deg)";
      }
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width - 0.5;
        var py = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt(py * -12, px * 12);
      });
      card.addEventListener("mouseleave", function () {
        setTilt(0, 0);
      });
    });
  }

  /* ---------------- Lenis + GSAP (mejora progresiva) ---------------- */
  function initSmoothScrollAndGsap() {
    if (prefersReducedMotion) return;

    if (window.Lenis) {
      var lenis = new window.Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.1 });
      if (window.gsap && window.ScrollTrigger) {
        lenis.on("scroll", window.ScrollTrigger.update);
        window.gsap.ticker.add(function (time) {
          lenis.raf(time * 1000);
        });
        window.gsap.ticker.lagSmoothing(0);
      } else {
        requestAnimationFrame(function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        });
      }
    }

    if (window.gsap && window.ScrollTrigger) {
      var gsap = window.gsap;
      gsap.registerPlugin(window.ScrollTrigger);

      var heroSection = document.querySelector(".hero");
      var heroPaper = document.querySelector("[data-hero-paper]");
      var heroTilt = document.querySelector("[data-tilt-layer]");
      var heroHint = document.querySelector(".scroll-hint");
      var isDesktopForPin = window.matchMedia("(min-width: 768px)").matches;

      if (heroSection && heroPaper && isDesktopForPin) {
        // Pinea el Hero (position:fixed vía GSAP) durante 1 altura de
        // pantalla de scroll. pinSpacing:false es la clave: no reserva
        // espacio extra, así que Historia (la sección siguiente en el
        // documento) sigue su flujo normal y empieza a subir desde el
        // primer scroll — como el Hero está fijo debajo, se ve literalmente
        // subir y cubrirlo por encima (ver .story-cover, con z-index mayor).
        window.ScrollTrigger.create({
          trigger: heroSection,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: false,
        });
        // Mientras dura ese tramo, el vídeo hace un zoom lento (efecto de
        // scroll).
        gsap.to(heroPaper, {
          scale: 1.12,
          ease: "none",
          scrollTrigger: { trigger: heroSection, start: "top top", end: "+=100%", scrub: 0.35 },
        });
        if (heroTilt) {
          gsap.to(heroTilt, {
            opacity: 0,
            scale: 0.8,
            ease: "none",
            scrollTrigger: { trigger: heroSection, start: "top top", end: "+=45%", scrub: 0.3 },
          });
        }
        if (heroHint) {
          gsap.to(heroHint, {
            opacity: 0,
            ease: "none",
            scrollTrigger: { trigger: heroSection, start: "top top", end: "+=20%", scrub: 0.3 },
          });
        }
      } else if (heroSection && heroTilt) {
        gsap.to(heroTilt, {
          opacity: 0,
          y: -60,
          scale: 0.94,
          ease: "none",
          scrollTrigger: { trigger: heroSection, start: "top top", end: "bottom top", scrub: true },
        });
      }

      document.querySelectorAll(".stack-card").forEach(function (card) {
        gsap.fromTo(
          card,
          { scale: 1, opacity: 1 },
          {
            scale: 0.94,
            opacity: 0.75,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top top+=96", end: "+=280", scrub: true },
          }
        );
      });

      var storyPortrait = document.querySelector("[data-story-portrait]");
      var storySection = document.querySelector("[data-story-section]");
      if (storyPortrait && storySection) {
        gsap.fromTo(
          storyPortrait,
          { scale: 1.08, rotate: -2 },
          {
            scale: 1,
            rotate: 1.5,
            ease: "none",
            scrollTrigger: {
              trigger: storySection,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      }

      // El texto bajo el título de Historia se va oscureciendo Y engordando
      // LETRA A LETRA, en orden, como si se fuera "leyendo" a la vez que
      // se hace scroll — no el párrafo entero a la vez. El font-weight
      // variable de Inter (ver <link> de Google Fonts, wght@400..700)
      // permite que ese engordado se vea como una transición fluida.
      function splitIntoPlainLetters(el) {
        var text = el.textContent;
        el.textContent = "";
        var letters = [];
        Array.prototype.forEach.call(text, function (ch) {
          var span = document.createElement("span");
          span.textContent = ch;
          el.appendChild(span);
          letters.push(span);
        });
        return letters;
      }

      document.querySelectorAll("#story .story-block .lead").forEach(function (p) {
        var letters = splitIntoPlainLetters(p);

        // Termina de ponerse todo en negro justo cuando el párrafo está un
        // poco por encima del centro de la pantalla ("top 40%"), no tras
        // una distancia de scroll fija — así se consume más rápido.
        var tl = gsap.timeline({
          scrollTrigger: {
            trigger: p,
            start: "top bottom",
            end: "top 40%",
            scrub: 0.5,
          },
        });
        tl.fromTo(
          letters,
          { color: "rgba(28,23,18,0.12)", fontWeight: 400 },
          { color: "#1c1712", fontWeight: 700, ease: "none", stagger: 1 }
        );
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initSplitText();
    initReveal();
    initHeader();
    initScrollProgress();
    initCursor();
    initMagnetic();
    initCookieConsent();
    initContactForm();
    initHeroTilt();
    init3DCards();
    initSmoothScrollAndGsap();
  });
})();
