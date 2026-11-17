(function () {
  "use strict";

  var data = window.CRISTEL_DATA || { recipes: [], looks: [] };

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        var val = attrs[key];
        if (val === null || val === undefined || val === false) return;
        if (key === "class") node.className = val;
        else if (key === "text") node.textContent = val;
        else if (key === "html") node.innerHTML = val;
        else if (key.indexOf("on") === 0 && typeof val === "function") {
          node.addEventListener(key.slice(2), val);
        } else {
          node.setAttribute(key, val === true ? "" : val);
        }
      });
    }
    (children || []).forEach(function (child) {
      if (child) node.appendChild(child);
    });
    return node;
  }

  function recipeMeta(recipe) {
    var meta = el("p", { class: "card-meta" });
    meta.appendChild(el("span", { text: recipe.time + (recipe.timeNote ? " · " + recipe.timeNote : "") }));
    if (recipe.diet) {
      meta.appendChild(el("span", { "aria-hidden": "true", class: "dot", text: "·" }));
      meta.appendChild(el("span", { text: recipe.diet }));
    }
    return meta;
  }

  function recipeButton(recipe) {
    var btn = el("button", {
      class: "link-btn",
      type: "button",
      "data-recipe": recipe.id,
      "aria-label": "View sample layout: " + recipe.title
    }, [el("span", { text: "View sample layout" }), el("span", { class: "arrow", "aria-hidden": "true", text: "→" })]);
    btn.addEventListener("click", function () { openRecipe(recipe.id); });
    return btn;
  }

  function recipeCard(recipe, variant, index) {
    var card = el("article", {
      class: "dish dish-" + variant + " reveal",
      id: recipe.id
    });
    var imgWrap = el("div", { class: "dish-media" });
    imgWrap.appendChild(el("img", {
      src: recipe.image,
      srcset: recipe.imageSmall ? recipe.imageSmall + " 800w, " + recipe.image + " 1400w" : null,
      sizes: recipe.imageSmall ? "(max-width: 899px) 92vw, 58vw" : null,
      alt: recipe.imageAlt,
      width: "900",
      height: "1125",
      loading: "lazy",
      decoding: "async"
    }));
    var body = el("div", { class: "dish-body" });
    if (variant === "index") {
      body.appendChild(el("span", { class: "dish-num", "aria-hidden": "true", text: "0" + (index + 1) }));
    }
    body.appendChild(el("p", { class: "eyebrow-row" }, [
      el("span", { class: "badge", text: recipe.titlePrefix || "Sample dish" })
    ]));
    body.appendChild(el("h3", { text: recipe.title }));
    body.appendChild(recipeMeta(recipe));
    body.appendChild(el("p", { class: "dish-excerpt", text: recipe.excerpt }));
    body.appendChild(recipeButton(recipe));
    card.appendChild(imgWrap);
    card.appendChild(body);
    return card;
  }

  function renderRecipes(section, mountId, variant) {
    var mount = document.getElementById(mountId);
    if (!mount) return;
    var list = (data.recipes || []).filter(function (r) { return r.section === section; });
    if (!list.length) {
      mount.appendChild(el("p", { class: "empty", text: "Recipes will appear here once they are added to js/data.js." }));
      return;
    }
    var grid = el("div", { class: "dishes dishes-" + variant });
    list.forEach(function (recipe, i) {
      grid.appendChild(recipeCard(recipe, i === 0 && variant === "editorial" ? "feature" : variant, i));
    });
    mount.appendChild(grid);
  }

  function lookCard(look, index) {
    var card = el("article", { class: "look reveal", id: look.id });
    var imgWrap = el("div", { class: "look-media" });
    imgWrap.appendChild(el("img", {
      src: look.image,
      alt: look.imageAlt,
      width: "900",
      height: "1125",
      loading: "lazy",
      decoding: "async"
    }));
    imgWrap.appendChild(el("span", { class: "look-num", "aria-hidden": "true", text: "Look " + (index + 1) }));
    var body = el("div", { class: "look-body" });
    body.appendChild(el("p", { class: "eyebrow-row" }, [
      el("span", { class: "badge badge-light", text: look.titlePrefix || "Sample look" })
    ]));
    body.appendChild(el("h3", { text: look.title }));
    body.appendChild(el("p", { text: look.note }));
    var list = el("ul", { class: "look-items" });
    (look.items || []).forEach(function (item) {
      var li = el("li");
      var link = el("a", {
        class: "shop-btn",
        href: item.href || "#",
        "data-affiliate": item.affiliate || "placeholder"
      }, [
        el("span", { class: "shop-label", text: "Shop the look" }),
        el("span", { class: "shop-name", text: item.name }),
        el("span", { class: "arrow", "aria-hidden": "true", text: "→" })
      ]);
      link.addEventListener("click", function (ev) {
        if (!item.href || item.href === "#") {
          ev.preventDefault();
          announce("This shop link is a placeholder. Affiliate URLs can be added in js/data.js when a partnership is ready.");
        }
      });
      li.appendChild(link);
      list.appendChild(li);
    });
    body.appendChild(list);
    card.appendChild(imgWrap);
    card.appendChild(body);
    return card;
  }

  function renderLooks() {
    var mount = document.getElementById("looks-grid");
    if (!mount) return;
    var list = data.looks || [];
    if (!list.length) {
      mount.appendChild(el("p", { class: "empty", text: "Looks will appear here once they are added to js/data.js." }));
      return;
    }
    var grid = el("div", { class: "looks" });
    list.forEach(function (look, i) { grid.appendChild(lookCard(look, i)); });
    mount.appendChild(grid);
    mount.appendChild(el("p", { class: "disclosure", text: "Affiliate disclosure: shop buttons are placeholders for now. When live, some links may be affiliate links, which means we may earn a commission at no extra cost to you." }));
  }

  var dialog, dialogTitle, dialogBody, lastFocus;

  function ensureDialog() {
    if (dialog) return dialog;
    dialog = document.getElementById("recipe-dialog");
    dialogTitle = document.getElementById("recipe-dialog-title");
    dialogBody = document.getElementById("recipe-dialog-body");
    dialog.addEventListener("click", function (ev) {
      if (ev.target === dialog) closeRecipe();
    });
    document.getElementById("recipe-dialog-close").addEventListener("click", closeRecipe);
    dialog.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") closeRecipe();
    });
    return dialog;
  }

  function openRecipe(id) {
    var recipe = (data.recipes || []).find(function (r) { return r.id === id; });
    if (!recipe) return;
    ensureDialog();
    lastFocus = document.activeElement;
    dialogTitle.textContent = (recipe.titlePrefix ? recipe.titlePrefix + ": " : "") + recipe.title;
    dialogBody.innerHTML = "";
    dialogBody.appendChild(el("img", {
      src: recipe.image,
      alt: recipe.imageAlt,
      width: "900",
      height: "1125"
    }));
    dialogBody.appendChild(el("p", { class: "badge-row" }, [
      el("span", { class: "badge", text: "Recipe coming soon — sample layout" })
    ]));
    dialogBody.appendChild(el("p", { text: recipe.excerpt }));
    dialogBody.appendChild(el("p", { class: "card-meta", text: recipe.time + (recipe.timeNote ? " · " + recipe.timeNote : "") + (recipe.diet ? " · " + recipe.diet : "") }));
    if (recipe.credit) dialogBody.appendChild(el("p", { class: "credit", text: recipe.credit }));
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    document.getElementById("recipe-dialog-close").focus();
  }

  function closeRecipe() {
    if (!dialog) return;
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function announce(message) {
    var live = document.getElementById("live-region");
    if (!live) return;
    live.textContent = "";
    window.setTimeout(function () { live.textContent = message; }, 50);
  }

  function setupNav() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      if (open) {
        var header = document.getElementById("site-header");
        if (header) nav.style.setProperty("--nav-top", Math.max(0, header.getBoundingClientRect().bottom) + "px");
      }
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });

    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  function setupForm() {
    var form = document.getElementById("join-form");
    if (!form) return;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      announce("This preview form is not connected yet. Nothing was sent.");
      var status = document.getElementById("form-status");
      if (status) {
        status.hidden = false;
        status.textContent = "This preview form is not connected yet. Nothing was sent. When the site is live, this is where you’ll join the table.";
      }
    });
  }

  function setupCurrentSection() {
    var links = Array.prototype.slice.call(document.querySelectorAll("#site-nav a[href^='#']"));
    var sections = links
      .map(function (link) { return document.querySelector(link.getAttribute("href")); })
      .filter(Boolean);
    if (!("IntersectionObserver" in window) || !sections.length) return;
    var observer = new IntersectionObserver(function (entries) {
      var visible = entries.filter(function (e) { return e.isIntersecting; });
      if (!visible.length) return;
      var top = visible.sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
      links.forEach(function (link) {
        var active = link.getAttribute("href") === "#" + top.target.id;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] });
    sections.forEach(function (sec) { observer.observe(sec); });
  }


  /* ------------------------------------------------------------------
   * CATERING INQUIRIES
   * TODO: CATERING_EMAIL NEEDS THE REAL BOOKING ADDRESS.
   * The site is static (no backend), so the form opens a pre-filled email.
   * Until this is changed from the placeholder below, submitting the form
   * shows an "Inquiries open soon" message instead of opening email.
   * Example: var CATERING_EMAIL = "catering@yourdomain.com";
   * ------------------------------------------------------------------ */
  var CATERING_EMAIL = "REPLACE_WITH_CATERING_EMAIL";

  function cateringEmailReady() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CATERING_EMAIL) && CATERING_EMAIL.indexOf("REPLACE_WITH") === -1;
  }

  function setupCatering() {
    var form = document.getElementById("catering-inquiry");
    if (!form) return;
    var status = document.getElementById("catering-status");

    function setError(input, show) {
      var err = document.getElementById(input.id + "-err");
      input.setAttribute("aria-invalid", show ? "true" : "false");
      if (err) err.hidden = !show;
    }

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var name = form.elements.name, email = form.elements.email, type = form.elements.event_type;
      var bad = [];
      setError(name, !name.value.trim()); if (!name.value.trim()) bad.push(name);
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      setError(email, !emailOk); if (!emailOk) bad.push(email);
      setError(type, !type.value); if (!type.value) bad.push(type);
      if (bad.length) {
        bad[0].focus();
        announce("Please check the highlighted fields.");
        return;
      }

      if (!cateringEmailReady()) {
        status.hidden = false;
        status.className = "form-status field-full is-soon";
        status.textContent = "Inquiries open soon. Catering requests aren’t connected yet. Please check back shortly, and thank you for thinking of Cristel for your event.";
        announce("Inquiries open soon. Nothing was sent.");
        return;
      }

      var v = function (n) { return (form.elements[n].value || "").trim() || "—"; };
      var subject = "Catering inquiry: " + v("event_type") + (v("event_date") !== "—" ? " on " + v("event_date") : "");
      var body = [
        "Name: " + v("name"),
        "Email: " + v("email"),
        "Phone: " + v("phone"),
        "Event date: " + v("event_date"),
        "Event type: " + v("event_type"),
        "Guest count: " + v("guests"),
        "Location: " + v("location"),
        "",
        "About the event:",
        v("message")
      ].join("\n");
      window.location.href = "mailto:" + CATERING_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      status.hidden = false;
      status.className = "form-status field-full";
      status.textContent = "Your email app should open with your request filled in. Press send there to reach Cristel’s catering inbox.";
    });
  }

  function setupReveal() {
    var items = document.querySelectorAll(".reveal");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (n) { n.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (n) { io.observe(n); });
  }

  function setupHeader() {
    var header = document.getElementById("site-header");
    if (!header) return;
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 24); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  renderRecipes("showcase", "recipes-grid", "editorial");
  renderRecipes("quick", "quick-grid", "index");
  renderRecipes("vegan", "vegan-grid", "arch");
  renderLooks();
  setupNav();
  setupForm();
  setupCatering();
  setupCurrentSection();
  setupReveal();
  setupHeader();
})();
