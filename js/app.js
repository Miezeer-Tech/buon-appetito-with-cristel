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

  function recipeCard(recipe, featured) {
    var card = el("article", {
      class: "card card-recipe" + (featured ? " is-featured" : ""),
      id: recipe.id
    });

    var imgWrap = el("div", { class: "card-media" });
    var img = el("img", {
      src: recipe.image,
      alt: recipe.imageAlt,
      width: "900",
      height: "1125",
      loading: featured ? "eager" : "lazy",
      decoding: "async"
    });
    imgWrap.appendChild(img);

    var body = el("div", { class: "card-body" });
    body.appendChild(el("p", { class: "eyebrow" }, [
      el("span", { class: "badge", text: recipe.titlePrefix || "Sample dish" })
    ]));
    body.appendChild(el("h3", { text: recipe.title }));
    var meta = el("p", { class: "card-meta" });
    meta.appendChild(el("span", { text: recipe.time + (recipe.timeNote ? " · " + recipe.timeNote : "") }));
    if (recipe.diet) {
      meta.appendChild(el("span", { "aria-hidden": "true", text: " · " }));
      meta.appendChild(el("span", { text: recipe.diet }));
    }
    body.appendChild(meta);
    body.appendChild(el("p", { text: recipe.excerpt }));
    var btn = el("button", {
      class: "btn btn-secondary",
      type: "button",
      text: "View sample layout",
      "data-recipe": recipe.id
    });
    btn.addEventListener("click", function () { openRecipe(recipe.id); });
    body.appendChild(btn);

    card.appendChild(imgWrap);
    card.appendChild(body);
    return card;
  }

  function renderRecipes(section, mountId, featuredFirst) {
    var mount = document.getElementById(mountId);
    if (!mount) return;
    var list = (data.recipes || []).filter(function (r) { return r.section === section; });
    if (!list.length) {
      mount.appendChild(el("p", { class: "empty", text: "Recipes will appear here once they are added to js/data.js." }));
      return;
    }
    var grid = el("div", { class: "grid" + (featuredFirst ? " grid-featured" : "") });
    list.forEach(function (recipe, i) {
      grid.appendChild(recipeCard(recipe, featuredFirst && i === 0));
    });
    mount.appendChild(grid);
  }

  function lookCard(look) {
    var card = el("article", { class: "card card-look", id: look.id });
    var imgWrap = el("div", { class: "card-media" });
    imgWrap.appendChild(el("img", {
      src: look.image,
      alt: look.imageAlt,
      width: "900",
      height: "1125",
      loading: "lazy",
      decoding: "async"
    }));
    var body = el("div", { class: "card-body" });
    body.appendChild(el("p", { class: "eyebrow" }, [
      el("span", { class: "badge", text: look.titlePrefix || "Sample look" })
    ]));
    body.appendChild(el("h3", { text: look.title }));
    body.appendChild(el("p", { text: look.note }));
    var list = el("ul", { class: "look-items" });
    (look.items || []).forEach(function (item) {
      var li = el("li");
      var link = el("a", {
        class: "btn btn-secondary shop-btn",
        href: item.href || "#",
        "data-affiliate": item.affiliate || "placeholder",
        text: "Shop the look: " + item.name
      });
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
    body.appendChild(el("p", { class: "disclosure", text: "Affiliate disclosure: shop buttons are placeholders for now. When live, some links may be affiliate links, which means we may earn a commission at no extra cost to you." }));
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
    var grid = el("div", { class: "grid" });
    list.forEach(function (look) { grid.appendChild(lookCard(look)); });
    mount.appendChild(grid);
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

  renderRecipes("showcase", "recipes-grid", true);
  renderRecipes("quick", "quick-grid", false);
  renderRecipes("vegan", "vegan-grid", false);
  renderLooks();
  setupNav();
  setupForm();
  setupCurrentSection();
})();
