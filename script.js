
(() => {
  "use strict";

  // ==========================================
  // 01. HELPERS
  // ==========================================

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const reduceMotion = matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const finePointer = matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  const readBest = key => {
    try {
      const value = Number(localStorage.getItem(key));
      return Number.isFinite(value) && value > 0
        ? value
        : 0;
    } catch {
      return 0;
    }
  };

  const saveBest = (key, value) => {
    try {
      localStorage.setItem(key, String(value));
    } catch {
      // Games still work when storage is unavailable.
    }
  };

  // ==========================================
  // 02. PROJECT INFORMATION
  // ==========================================

  // These match the project buttons in index.html.
  // Research and prototypes are not presented
  // as paid commercial products.

  const PROJECTS = {
    "quotedesk": {
      "kicker": "INDUSTRIAL SOFTWARE · LOCAL PROTOTYPE",
      "title": "VEE QuoteDesk",
      "desc": "I wanted to see how much of a distributor’s quoting work could stay in one place. This local prototype uses fictional enquiries, catalogue entries, prices and stock.",
      "evidence": [
        [
          "Enquiries",
          "The original request, attachments, follow-up questions and customer replies stay on the same record."
        ],
        [
          "Matching",
          "Offline rules compare part references and technical specifications. An employee reviews potential matches and approves clarification drafts."
        ],
        [
          "Quotations",
          "Staff can edit quantities and prices, check New Zealand GST and compare revisions before approving a customer quotation. SQLite keeps the decision history."
        ]
      ],
      "tags": [
        "Python",
        "Flask",
        "Jinja",
        "SQLite"
      ],
      "actions": [
        [
          "View source ↗",
          "https://github.com/VTXZenyx/vee-parts-quote-intelligence"
        ]
      ]
    },
    "quant": {
      "kicker": "FINANCIAL RESEARCH · OFFLINE SIMULATION",
      "title": "VEE Quant Research",
      "desc": "The public research toolkit runs repeatable scenarios locally. I use it to examine the assumptions behind a simulated trade and trace discrepancies in the records.",
      "evidence": [
        [
          "Simulation",
          "A configurable screen checks spreads and price movement. A replay follows bid and ask quotes to test stop-loss and take-profit exits."
        ],
        [
          "Reconciliation",
          "An audit matches recorded fills against a normalised exchange export. Tests exercise missing records, timing and cost calculations."
        ],
        [
          "Attribution",
          "My wider AI-assisted VEE-Bitra research builds on the open-source Bitra framework by Bijective Labs. The public examples use synthetic data and run without exchange credentials."
        ]
      ],
      "tags": [
        "Python",
        "TOML",
        "unittest"
      ],
      "actions": [
        [
          "View source ↗",
          "https://github.com/VTXZenyx/vee-quant-research"
        ],
        [
          "Bitra attribution ↗",
          "https://github.com/VTXZenyx/vee-quant-research/blob/main/ATTRIBUTION.md"
        ]
      ]
    },
    "cricket": {
      "kicker": "FAN-MADE AI EXPERIMENT",
      "title": "AI Cricket Mentor",
      "desc": "Cricket gave me a reason to connect a React interface to a local language model. The app supports text chat, with optional knowledge retrieval and voice features.",
      "evidence": [
        [
          "Conversation",
          "Next.js displays the conversation as the Python backend streams responses from Qwen through Ollama."
        ],
        [
          "Reference material",
          "With Supabase configured, the backend ranks approved records by keyword and includes relevant passages in the model’s context."
        ],
        [
          "Voice",
          "Optional voice interaction uses Whisper for transcription and Fish Audio for speech output. These components need separate setup."
        ]
      ],
      "tags": [
        "Next.js",
        "FastAPI",
        "Ollama"
      ],
      "actions": [
        [
          "View source ↗",
          "https://github.com/VTXZenyx/ai-cricket-virat-kohli-app"
        ]
      ]
    },
    "r": {
      "kicker": "COURSEWORK & INDEPENDENT STUDY",
      "title": "Data Analysis & Programming",
      "desc": "I used R and SQL to clean records, plot patterns and test probability questions. Each project pairs its code with an example of the result.",
      "evidence": [
        [
          "University work",
          "I mapped fossil locations, compared strontium isotope measurements from ancient Egypt and modelled genetic inheritance and customer arrivals."
        ],
        [
          "Formula 1",
          "I used SQL joins and grouped counts in RSQLite to explore the relationship between races, circuits and their locations."
        ],
        [
          "Independent study",
          "The AI-assisted clustering exercise compares k-means, hierarchical clustering, DBSCAN and Gaussian mixtures. The displayed results were calculated in Python. The repository also includes an R implementation."
        ]
      ],
      "tags": [
        "R",
        "ggplot2",
        "RSQLite"
      ],
      "actions": [
        [
          "View source ↗",
          "https://github.com/VTXZenyx/data-analysis-and-programming"
        ]
      ]
    },
    "waid": {
      "kicker": "STUDENT ENROLMENT · LIVE DEMO",
      "title": "Course Enrolment Web Application",
      "desc": "Students can browse as a guest, sign in with a fictional account and change their enrolments. Vue handles the interface and Brython runs the Python rules in the browser.",
      "evidence": [
        [
          "Course selection",
          "Each offering shows its trimester, lecture time, overview and prerequisite. Signed-in students can enrol, review their status and withdraw."
        ],
        [
          "Approval rules",
          "The app checks lecture overlaps, prerequisites and the student’s GPA when deciding whether to admit, decline or record an enrolment for approval."
        ],
        [
          "Try it",
          "Use the public demo account Anh Nguyen with password 1254. The project includes sample data in case the external course feed is unavailable."
        ]
      ],
      "tags": [
        "Vue.js",
        "Brython",
        "JSON"
      ],
      "actions": [
        [
          "Try the live demo ↗",
          "https://vtxzenyx.github.io/course-enrolment-web-app/"
        ],
        [
          "View signed-in course feed ↗",
          "assets/course-enrolment.webp"
        ],
        [
          "View source ↗",
          "https://github.com/VTXZenyx/course-enrolment-web-app"
        ]
      ]
    },
    "sql": {
      "kicker": "UNIVERSITY DATABASE DESIGN",
      "title": "SQL & Relational Database Portfolio",
      "desc": "This collection pairs the SQL I wrote at university with diagrams and query results from my submissions. The music queries run against the supplied SQLite database.",
      "evidence": [
        [
          "Schema design",
          "I used functional dependencies to normalise student and messaging records, then defined primary keys, foreign keys and constraints."
        ],
        [
          "Queries",
          "I used joins, correlated subqueries and grouped aggregates to analyse the music catalogue. Other examples include views and student GPA calculations."
        ],
        [
          "Evidence",
          "The repository includes my draw.io diagrams, DB Browser for SQLite screenshots and the original database-design submission."
        ]
      ],
      "tags": [
        "SQL",
        "SQLite",
        "draw.io"
      ],
      "actions": [
        [
          "View source ↗",
          "https://github.com/VTXZenyx/sql-database-portfolio"
        ]
      ]
    }
  };

  // ==========================================
  // 03. FOOTER YEAR & MOBILE MENU
  // ==========================================

  const year = $("#year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const nav = $("#primaryNav");
  const navButton = $("#navToggle");

  if (nav && navButton) {
    const setMenu = open => {
      nav.classList.toggle("open", open);

      navButton.setAttribute(
        "aria-expanded",
        String(open)
      );

      navButton.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation"
      );
    };

    navButton.addEventListener("click", () => {
      setMenu(!nav.classList.contains("open"));
    });

    $$("a", nav).forEach(link => {
      link.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("click", event => {
      if (
        !nav.contains(event.target) &&
        !navButton.contains(event.target)
      ) {
        setMenu(false);
      }
    });

    document.addEventListener("keydown", event => {
      if (
        event.key === "Escape" &&
        nav.classList.contains("open")
      ) {
        setMenu(false);
        navButton.focus();
      }
    });

    const links = $$("a[href^='#']", nav);
    const sections = $$("main > section[id]");
    const topbar = nav.closest("header");
    let activeLink;
    let navFrame = 0;

    function updateLocation() {
      navFrame = 0;
      const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const threshold = Math.max((topbar?.offsetHeight || 0) + 20, Math.min(190, window.innerHeight * 0.28));
      const section = atEnd ? sections.at(-1) : sections.findLast(item => item.getBoundingClientRect().top <= threshold);
      const current = links.find(link => link.hash === `#${section?.id}`);
      if (current === activeLink) return;
      activeLink?.removeAttribute("aria-current");
      current?.setAttribute("aria-current", "location");
      activeLink = current;
    }

    function requestLocation() {
      if (!navFrame) navFrame = requestAnimationFrame(updateLocation);
    }

    window.addEventListener("scroll", requestLocation, { passive: true });
    window.addEventListener("resize", requestLocation, { passive: true });
    window.addEventListener("load", requestLocation);
    requestLocation();

    matchMedia("(min-width: 821px)")
      .addEventListener("change", event => {
        if (event.matches) {
          setMenu(false);
        }
      });
  }

  // ==========================================
  // 04. CURSOR HALO
  // ==========================================

  const halo = $(".cursor-halo");

  if (halo) {
    const updateHalo = () => {
      halo.style.display =
        finePointer.matches && !reduceMotion.matches
          ? ""
          : "none";
    };

    updateHalo();

    finePointer.addEventListener(
      "change",
      updateHalo
    );

    reduceMotion.addEventListener(
      "change",
      updateHalo
    );

    let frame = 0;

    window.addEventListener(
      "pointermove",
      event => {
        if (
          halo.style.display === "none" ||
          frame
        ) {
          return;
        }

        const { clientX, clientY } = event;

        frame = requestAnimationFrame(() => {
          halo.style.left = `${clientX}px`;
          halo.style.top = `${clientY}px`;
          frame = 0;
        });
      },
      { passive: true }
    );
  }

  // ==========================================
  // 05. ANIMATED VIRAJ GANDHI NAME
  // ==========================================

  function initDotName() {
    const canvas = $("#dotCanvas");
    const ctx = canvas?.getContext("2d");

    if (!ctx) {
      return;
    }

    let width = 0;
    let height = 0;
    let dots = [];
    let radius = 0;
    let ink;
    let frame = 0;
    let resizeTimer;
    let pointerX = -Infinity;
    let pointerY = -Infinity;

    function draw() {
      frame = 0;
      if (!dots.length) return;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = ink;
      ctx.beginPath();
      const interactive = finePointer.matches && !reduceMotion.matches;
      const reach = Math.min(95, width * 0.2);
      for (const dot of dots) {
        let { x, y } = dot;
        let dotRadius = radius;
        if (interactive) {
          const dx = x - pointerX;
          const dy = y - pointerY;
          const distance = Math.hypot(dx, dy);
          if (distance < reach) {
            const strength = 1 - distance / reach;
            const push = strength * reach * 0.19 / (distance || 1);
            x += dx * push;
            y += dy * push;
            dotRadius += strength * radius * 0.35;
          }
        }
        ctx.moveTo(x + dotRadius, y);
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
      }
      ctx.fill();
      canvas.parentElement.classList.add("dots-ready");
    }

    function requestDraw() {
      if (!frame) frame = requestAnimationFrame(draw);
    }

    function build() {
      const bounds = canvas.getBoundingClientRect();
      width = Math.round(bounds.width);
      height = Math.round(bounds.height);
      if (width < 10 || height < 10) return;

      // Sample the ink bounds so font side bearings and line boxes add no padding.
      const mask = document.createElement("canvas");
      mask.width = width;
      mask.height = height;
      const off = mask.getContext("2d", { willReadFrequently: true });
      if (!off) return;
      const words = ["VIRAJ", "GANDHI"];
      const font = size => `800 ${size}px Manrope, Arial, sans-serif`;
      off.font = font(100);
      const metrics = words.map(word => off.measureText(word));
      const inkWidth = Math.max(...metrics.map(m => m.actualBoundingBoxLeft + m.actualBoundingBoxRight));
      const inkHeight = metrics.reduce((sum, m) => sum + m.actualBoundingBoxAscent + m.actualBoundingBoxDescent, 0);
      const inset = 3;
      const gap = Math.max(6, height * 0.07);
      const fontSize = 100 * Math.min((width - inset * 2) / inkWidth, (height - gap - inset * 2) / inkHeight);
      if (!Number.isFinite(fontSize) || fontSize <= 0) return;

      off.font = font(fontSize);
      let top = Math.max(inset, (height - gap - inkHeight * fontSize / 100) / 2);
      for (const word of words) {
        const m = off.measureText(word);
        const baseline = top + m.actualBoundingBoxAscent;
        off.fillText(word, inset + m.actualBoundingBoxLeft, baseline);
        top = baseline + m.actualBoundingBoxDescent + gap;
      }

      const pixels = off.getImageData(0, 0, width, height).data;
      const step = Math.max(3, Math.round(fontSize / 27));
      radius = step * 0.36;
      dots = [];
      for (let y = inset; y < height; y += step) {
        for (let x = inset; x < width; x += step) {
          if (pixels[(y * width + x) * 4 + 3] >= 100) dots.push({ x, y });
        }
      }

      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ink = ctx.createLinearGradient(0, 0, Math.min(width, inkWidth * fontSize / 100), height);
      ink.addColorStop(0, "#c2ecff");
      ink.addColorStop(0.47, "#8acaff");
      ink.addColorStop(1, "#729cff");
      requestDraw();
    }

    canvas.addEventListener(
      "pointermove",
      event => {
        if (
          !finePointer.matches ||
          reduceMotion.matches
        ) {
          return;
        }

        const bounds = canvas.getBoundingClientRect();

        pointerX = event.clientX - bounds.left;
        pointerY = event.clientY - bounds.top;

        requestDraw();
      },
      { passive: true }
    );

    canvas.addEventListener(
      "pointerleave",
      () => {
        pointerX = pointerY = -9999;
        requestDraw();
      }
    );

    const delayedBuild = () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(build, 90);
    };

    if ("ResizeObserver" in window) {
      new ResizeObserver(delayedBuild).observe(canvas);
    } else {
      addEventListener(
        "resize",
        delayedBuild,
        { passive: true }
      );
    }

    reduceMotion.addEventListener(
      "change",
      requestDraw
    );

    finePointer.addEventListener(
      "change",
      requestDraw
    );

    build();

    document.fonts?.ready
      .then(build)
      .catch(() => {});
  }

  initDotName();

  // ==========================================
  // 06. SCROLL REVEAL
  // ==========================================

  const reveals = $$(".reveal");

  if (
    reduceMotion.matches ||
    !("IntersectionObserver" in window)
  ) {
    reveals.forEach(element => {
      element.classList.add("visible");
    });
  } else {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.06,
        rootMargin: "0px 0px -20px 0px"
      }
    );

    reveals.forEach(element => {
      observer.observe(element);
    });
    document.documentElement.classList.add("reveal-ready");

    reduceMotion.addEventListener(
      "change",
      event => {
        if (event.matches) {
          reveals.forEach(element => {
            element.classList.add("visible");
          });

          observer.disconnect();
        }
      }
    );
  }

  // ==========================================
  // 07. PROJECT DETAILS POPUP
  // ==========================================

  function initProjectDetails() {
    const modal = $("#projectModal");

    if (!modal) {
      return;
    }

    const card = $(".project-modal-card", modal);
    const closeButton = $(".project-modal-close", modal);

    let previousFocus;
    let previousOverflow;
    let background = [];

    function close() {
      if (!modal.classList.contains("open")) return;

      background.forEach(item => { item.inert = false; });
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");

      document.dispatchEvent(
        new CustomEvent(
          "portfolio:modalchange",
          { detail: { open: false } }
        )
      );

    }

    function open(key, trigger) {
      const project = PROJECTS[key];

      if (!project || modal.classList.contains("open")) {
        return;
      }

      previousFocus = trigger;
      previousOverflow = document.body.style.overflow;

      $("#modalKicker").textContent = project.kicker;
      $("#modalTitle").textContent = project.title;
      $("#modalDesc").textContent = project.desc;

      const evidence = $("#modalEvidence");
      const tags = $("#modalTags");
      const actions = $("#modalActions");

      evidence.replaceChildren();
      tags.replaceChildren();
      actions.replaceChildren();

      project.evidence.forEach(([name, detail]) => {
        const row = document.createElement("div");
        const label = document.createElement("span");
        const value = document.createElement("strong");

        label.textContent = name;
        value.textContent = detail;

        row.append(label, value);
        evidence.append(row);
      });

      project.tags.forEach(tag => {
        const chip = document.createElement("span");
        chip.textContent = tag;
        tags.append(chip);
      });

      project.actions.forEach(([label, url], index) => {
        const link = document.createElement("a");

        link.className =
          `button ${
            index === 0
              ? "button-primary"
              : "button-ghost"
          } compact`;

        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = label;

        actions.append(link);
      });

      modal.classList.add("open");

      modal.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.style.overflow = "hidden";

      card.scrollTop = 0;
      closeButton.focus({ preventScroll: true });
      background = [...document.body.children].filter(item =>
        item !== modal && !item.inert && item.matches("a, header, main, footer")
      );
      background.forEach(item => { item.inert = true; });

      document.dispatchEvent(
        new CustomEvent(
          "portfolio:modalchange",
          { detail: { open: true } }
        )
      );

    }

    document.addEventListener("click", event => {
      const trigger = event.target.closest?.(
        "[data-open-project]"
      );

      if (trigger) {
        open(trigger.dataset.openProject, trigger);
      }
    });

    closeButton.addEventListener("click", close);

    $("#modalCloseSecondary")?.addEventListener(
      "click",
      close
    );

    modal.addEventListener("click", event => {
      if (event.target === modal) {
        close();
      }
    });

    document.addEventListener("keydown", event => {
      if (!modal.classList.contains("open")) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const items = $$(
        "a[href], button:not([disabled])",
        modal
      ).filter(element =>
        element.getClientRects().length
      );

      if (!items.length) {
        event.preventDefault();
        card.focus();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  initProjectDetails();

  // ==========================================
  // 08. PLAYGROUND TABS
  // ==========================================

  function initTabs() {
    const tabs = $$(".game-tab");

    if (!tabs.length) {
      return;
    }

    function activate(name) {
      tabs.forEach(tab => {
        const selected = tab.dataset.game === name;

        tab.classList.toggle("active", selected);

        tab.setAttribute(
          "aria-selected",
          String(selected)
        );

        tab.tabIndex = selected ? 0 : -1;
      });

      $$(".game-panel").forEach(panel => {
        const selected = panel.id === `game-${name}`;

        panel.classList.toggle("active", selected);
        panel.hidden = !selected;

        panel.setAttribute(
          "aria-hidden",
          String(!selected)
        );
      });

      document.dispatchEvent(
        new CustomEvent(
          "portfolio:gamechange",
          { detail: { game: name } }
        )
      );
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        activate(tab.dataset.game);
      });

      tab.addEventListener("keydown", event => {
        let next = null;

        if (
          ["ArrowRight", "ArrowDown"].includes(event.key)
        ) {
          next = (index + 1) % tabs.length;
        }

        if (
          ["ArrowLeft", "ArrowUp"].includes(event.key)
        ) {
          next =
            (index - 1 + tabs.length) % tabs.length;
        }

        if (event.key === "Home") {
          next = 0;
        }

        if (event.key === "End") {
          next = tabs.length - 1;
        }

        if (next === null) {
          return;
        }

        event.preventDefault();

        activate(tabs[next].dataset.game);
        tabs[next].focus();
      });
    });

    activate(
      tabs.find(tab =>
        tab.classList.contains("active")
      )?.dataset.game || tabs[0].dataset.game
    );
  }

  initTabs();

  // ==========================================
  // 09. REACTION GAME
  // ==========================================

  function initReaction() {
    const box = $("#reactionBox");
    const start = $("#reactionStart");

    if (!box || !start) {
      return;
    }

    const text = $("#reactionText");
    const sub = $("#reactionSub");
    const bestLabel = $("#reactionBest");

    const key = "vg2026_reaction_best";

    let best = readBest(key);
    let state = "idle";
    let timer = 0;
    let readyAt = 0;

    bestLabel.textContent =
      best ? `${best} ms` : "No score yet";

    box.setAttribute("aria-live", "polite");

    function reset() {
      clearTimeout(timer);
      state = "idle";

      box.classList.remove(
        "waiting",
        "ready"
      );

      text.textContent = "PRESS START";

      sub.textContent =
        "Wait for the signal, then tap or press Space.";
    }

    start.addEventListener("click", () => {
      clearTimeout(timer);

      state = "waiting";

      box.classList.remove("ready");
      box.classList.add("waiting");

      text.textContent = "WAIT...";
      sub.textContent = "Wait for green.";
      box.focus({ preventScroll: true });

      timer = setTimeout(() => {
        if (state !== "waiting") {
          return;
        }

        readyAt = performance.now();
        state = "ready";

        box.classList.remove("waiting");
        box.classList.add("ready");

        text.textContent = "GO!";
        sub.textContent = "Tap or press Space now.";
      }, 900 + Math.random() * 2200);
    });

    box.addEventListener("click", () => {
      if (state === "waiting") {
        clearTimeout(timer);

        state = "finished";
        box.classList.remove("waiting");

        text.textContent = "TOO EARLY";
        sub.textContent = "Start another round.";

        return;
      }

      if (state !== "ready") {
        return;
      }

      const ms = Math.max(
        1,
        Math.round(performance.now() - readyAt)
      );

      state = "finished";
      box.classList.remove("ready");

      text.textContent = `${ms} ms`;

      sub.textContent =
        ms < 220
          ? "Very quick."
          : ms < 320
            ? "Nice reaction."
            : "Try another round.";

      if (!best || ms < best) {
        best = ms;

        bestLabel.textContent = `${best} ms`;
        saveBest(key, best);
      }
    });

    document.addEventListener(
      "portfolio:gamechange",
      event => {
        if (event.detail.game !== "reaction") {
          reset();
        }
      }
    );

    document.addEventListener(
      "portfolio:modalchange",
      event => {
        if (event.detail.open) {
          reset();
        }
      }
    );

    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) {
          reset();
        }
      }
    );
  }

  initReaction();

  // ==========================================
  // 10. SNAKE GAME
  // ==========================================

  function initSnake() {
    const canvas = $("#snakeCanvas");
    const ctx = canvas?.getContext("2d");

    const panel = $("#game-snake");
    const start = $("#snakeStart");

    if (!ctx || !panel || !start) {
      return;
    }

    const scoreLabel = $("#snakeScore");
    const bestLabel = $("#snakeBest");

    const stateLabel = $("#snakeState");
    const key = "vg2026_snake_best";
    const size = 20;
    const cell = canvas.width / size;

    const directions = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 }
    };

    let best = readBest(key);
    let score = 0;
    let food = null;

    let snake = [];
    let direction = directions.right;
    let next = directions.right;

    let locked = false;
    let playing = false;
    let timer = 0;
    let modalOpen = false;

    bestLabel.textContent = String(best);

    function stop() {
      clearInterval(timer);
      timer = 0;
    }

    function pause() {
      if (!timer) return;
      stop();
      if (stateLabel) stateLabel.textContent = "Paused. Focus the board to continue.";
    }

    function spawnFood() {
      const empty = [];

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          if (
            !snake.some(part =>
              part.x === x && part.y === y
            )
          ) {
            empty.push({ x, y });
          }
        }
      }

      food = empty.length
        ? empty[Math.floor(Math.random() * empty.length)]
        : null;

      return !!food;
    }

    function draw() {
      ctx.fillStyle = "#06101d";

      ctx.fillRect(
        0, 0,
        canvas.width,
        canvas.height
      );

      ctx.strokeStyle = "rgba(100,145,205,.065)";

      for (let i = 0; i <= size; i++) {
        ctx.beginPath();

        ctx.moveTo(i * cell, 0);
        ctx.lineTo(i * cell, canvas.height);

        ctx.moveTo(0, i * cell);
        ctx.lineTo(canvas.width, i * cell);

        ctx.stroke();
      }

      snake.forEach((part, index) => {
        ctx.fillStyle =
          index === 0
            ? "#8ccaff"
            : "#69d7ff";

        ctx.fillRect(
          part.x * cell + 2,
          part.y * cell + 2,
          cell - 4,
          cell - 4
        );
      });

      if (food) {
        ctx.fillStyle = "#67e8a5";
        ctx.beginPath();

        ctx.arc(
          food.x * cell + cell / 2,
          food.y * cell + cell / 2,
          cell * .3,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }
    }

    function finish(won = false) {
      stop();
      playing = false;

      start.textContent = won
        ? "You won! Play again"
        : "Game over. Play again";

      if (stateLabel) stateLabel.textContent = `${won ? "You won" : "Game over"}. Final score ${score}.`;
    }

    function tick() {
      direction = next;
      locked = false;

      const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
      };

      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= size ||
        head.y >= size
      ) {
        finish();
        return;
      }

      const eating =
        !!food &&
        head.x === food.x &&
        head.y === food.y;

      const body = eating
        ? snake
        : snake.slice(0, -1);

      if (
        body.some(part =>
          part.x === head.x &&
          part.y === head.y
        )
      ) {
        finish();
        return;
      }

      snake.unshift(head);

      if (eating) {
        score++;

        scoreLabel.textContent = String(score);
        if (score > best) {
          best = score;
          bestLabel.textContent = String(best);
          saveBest(key, best);
        }

        if (!spawnFood()) {
          draw();
          finish(true);
          return;
        }
      } else {
        snake.pop();
      }

      draw();
    }

    function resume() {
      if (
        playing &&
        !timer &&
        !document.hidden &&
        document.hasFocus() &&
        panel.contains(document.activeElement) &&
        !modalOpen &&
        panel.classList.contains("active")
      ) {
        timer = setInterval(tick, 110);
        if (stateLabel) stateLabel.textContent = "Game in progress.";
      }
    }

    function begin() {
      stop();

      snake = [
        { x: 6, y: 10 },
        { x: 5, y: 10 },
        { x: 4, y: 10 }
      ];

      direction = next = directions.right;

      locked = false;
      score = 0;
      playing = true;

      scoreLabel.textContent = "0";
      start.textContent = "Start / restart";

      spawnFood();
      draw();
      canvas.focus({ preventScroll: true });
      resume();
    }

    function turn(name) {
      if (
        !playing ||
        locked ||
        modalOpen ||
        !panel.classList.contains("active")
      ) {
        return;
      }

      const candidate = directions[name];

      if (!candidate) {
        return;
      }

      if (
        candidate.x === -direction.x &&
        candidate.y === -direction.y
      ) {
        return;
      }

      if (
        candidate.x === direction.x &&
        candidate.y === direction.y
      ) {
        return;
      }

      next = candidate;
      locked = true;
    }

    const keys = {
      ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
      w: "up", s: "down", a: "left", d: "right"
    };

    panel.addEventListener("keydown", event => {
      if (!timer || event.altKey || event.ctrlKey || event.metaKey) return;
      const name = keys[event.key] || keys[event.key.toLowerCase()];
      if (name) {
        event.preventDefault();
        turn(name);
      }
    });

    $$("[data-dir]", panel).forEach(button => {
      button.addEventListener("click", () => {
        if (!panel.contains(document.activeElement)) canvas.focus({ preventScroll: true });
        turn(button.dataset.dir);
      });
    });

    start.addEventListener("click", begin);
    panel.addEventListener("focusin", resume);
    panel.addEventListener("focusout", event => {
      if (!panel.contains(event.relatedTarget)) pause();
    });
    window.addEventListener("blur", pause);
    window.addEventListener("focus", resume);
    document.addEventListener("portfolio:gamechange", event => {
      if (event.detail.game === "snake") resume();
      else pause();
    });
    document.addEventListener("portfolio:modalchange", event => {
      modalOpen = event.detail.open;
      if (modalOpen) pause();
      else resume();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) pause();
      else resume();
    });

    snake = [
      { x: 6, y: 10 },
      { x: 5, y: 10 },
      { x: 4, y: 10 }
    ];

    spawnFood();
    draw();
  }

  initSnake();

  // ==========================================
  // 11. SQL QUIZ
  // ==========================================

  function initSqlQuiz() {
    const root = $("#sqlQuiz");
    const restart = $("#sqlRestart");

    if (!root || !restart) {
      return;
    }

    const progress = $("#sqlProgress");
    const bestLabel = $("#sqlBest");

    const key = "vg2026_sql_best";

    const questions = [
      {
        code:
          "SELECT * FROM customers WHERE Country = 'NZ';",

        question:
          "Which clause filters rows?",

        answers: [
          "SELECT",
          "WHERE",
          "FROM",
          "ORDER BY"
        ],

        correct: 1
      },
      {
        code:
          "SELECT Country, COUNT(*) FROM customers GROUP BY Country;",

        question:
          "What does GROUP BY do here?",

        answers: [
          "Deletes duplicate rows",
          "Creates country groups for the aggregate",
          "Sorts countries",
          "Changes the table"
        ],

        correct: 1
      },
      {
        code:
          "SELECT * FROM invoices WHERE BillingState IS NULL;",

        question:
          "What does IS NULL check?",

        answers: [
          "Zero values",
          "Empty strings only",
          "Missing / NULL values",
          "False values"
        ],

        correct: 2
      },
      {
        code:
          "SELECT c.Name, i.Total FROM customers c JOIN invoices i ON c.CustomerId = i.CustomerId;",

        question:
          "Why is JOIN used?",

        answers: [
          "To combine related rows",
          "To rename a table",
          "To remove duplicate columns",
          "To create a database"
        ],

        correct: 0
      },
      {
        code:
          "HAVING COUNT(*) > 3",

        question:
          "When is HAVING useful?",

        answers: [
          "Filtering grouped results",
          "Selecting columns",
          "Creating a table",
          "Changing a primary key"
        ],

        correct: 0
      }
    ];

    let best = Math.min(questions.length, readBest(key));
    let index = 0;
    let score = 0;

    bestLabel.textContent = `${best}/${questions.length}`;

    function finish() {
      if (score > best) {
        best = score;
        bestLabel.textContent = `${best}/${questions.length}`;
        saveBest(key, best);
      }

      const panel = document.createElement("div");
      panel.className = "sql-question";
      const heading = document.createElement("h4");
      heading.textContent = `You scored ${score}/${questions.length}`;
      heading.tabIndex = -1;
      panel.append(heading);
      root.replaceChildren(panel);
      progress.textContent = "Complete";
      heading.focus({ preventScroll: true });
    }

    function render(focusQuestion = false) {
      const item = questions[index];
      progress.textContent = `Question ${index + 1} of ${questions.length}`;

      const panel = document.createElement("div");
      panel.className = "sql-question";
      const code = document.createElement("code");
      code.textContent = item.code;
      const heading = document.createElement("h4");
      heading.textContent = item.question;
      heading.tabIndex = -1;
      heading.setAttribute("aria-describedby", "sqlProgress");
      const choices = document.createElement("div");
      choices.className = "sql-answers";

      const feedback = document.createElement("p");
      feedback.className = "sql-feedback";
      feedback.id = "sqlFeedback";
      feedback.setAttribute("role", "status");
      const next = document.createElement("button");
      next.type = "button";
      next.className = "button button-ghost compact";
      next.textContent = index === questions.length - 1 ? "See result" : "Next question";
      next.setAttribute("aria-describedby", feedback.id);
      next.hidden = true;
      next.addEventListener("click", () => {
        index++;
        if (index === questions.length) finish();
        else render(true);
      });

      item.answers.forEach((answer, i) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "sql-answer";
        button.textContent = answer;
        button.addEventListener("click", () => {
          const buttons = $$(".sql-answer", choices);
          buttons.forEach(choice => { choice.disabled = true; });
          buttons[item.correct].classList.add("correct");
          if (i === item.correct) {
            score++;
            feedback.textContent = "Correct.";
          } else {
            button.classList.add("wrong");
            feedback.textContent = `The correct answer is “${item.answers[item.correct]}”.`;
          }
          next.hidden = false;
          next.focus({ preventScroll: true });
        });
        choices.append(button);
      });

      panel.append(code, heading, choices, feedback, next);
      root.replaceChildren(panel);
      if (focusQuestion) heading.focus({ preventScroll: true });
    }

    restart.addEventListener("click", () => {
      index = 0;
      score = 0;
      render(true);
    });

    render();
  }

  initSqlQuiz();

})();
