
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
    quotedesk: {
      kicker: "VEE AI SOFTWARE · PYTHON · FLASK · SQLITE",
      title: "VEE QuoteDesk",

      desc:
        "A working local prototype for organising technical enquiries and preparing quotations for industrial parts distributors. It combines catalogue candidates, technical checks, employee-approved clarification drafts, simulated stock and prices, and quotation review. I'm using it to learn how reliable software could support a real business workflow.",

      evidence: [
        [
          "ENQUIRIES",
          "Organises simulated incoming requests and their attachments in a local workspace."
        ],
        [
          "PRODUCT MATCHING",
          "Uses text-based catalogue evidence and seeded product information. Photos can be reviewed manually; automatic image recognition is not built in."
        ],
        [
          "TECHNICAL CHECKS",
          "Flags missing or conflicting specifications and prepares clarification questions for human approval."
        ],
        [
          "QUOTES",
          "Uses fictional inventory and prices with editable quotations, revisions and 15% New Zealand GST."
        ],
        [
          "REVIEW & HISTORY",
          "Keeps employee approvals, quotation versions and audit records."
        ],
        [
          "STATUS",
          "Local prototype with synthetic data, not a live customer, email or ERP integration."
        ]
      ],

      tags: [
        "PYTHON",
        "FLASK",
        "SQLITE",
        "QUOTATIONS",
        "TESTING"
      ],

      actions: [
        [
          "View VEE QuoteDesk ↗",
          "https://github.com/VTXZenyx/vee-parts-quote-intelligence"
        ]
      ]
    },

    quant: {
      kicker: "PYTHON · QUANTITATIVE RESEARCH · RISK",
      title: "VEE Quant Research",

      desc:
        "My independent quantitative trading research and software engineering project. The public Python toolkit explores repeatable screening, fee-aware risk checks, simulated execution, record reconciliation and automated tests. I want to understand what survives careful evaluation, not claim that a backtest proves profitability.",

      evidence: [
        [
          "RESEARCH",
          "Repeatable offline market screening and structured trading scenarios."
        ],
        [
          "RISK & COSTS",
          "Checks risk/reward assumptions, fees and stop-loss or take-profit coverage."
        ],
        [
          "SIMULATION",
          "Experiments with synthetic execution and forward-shadow workflows without live trading."
        ],
        [
          "AUDITING",
          "Reconciles local records and normalised demonstration exchange exports."
        ],
        [
          "TESTING",
          "Automated tests examine behaviour and edge cases."
        ],
        [
          "STATUS",
          "Experimental research; no verified profitable record or live-trading service."
        ]
      ],

      tags: [
        "PYTHON",
        "QUANT RESEARCH",
        "RISK",
        "SIMULATION",
        "TESTING"
      ],

      actions: [
        [
          "View VEE Quant Research ↗",
          "https://github.com/VTXZenyx/vee-quant-research"
        ]
      ]
    },

    cricket: {
      kicker: "PERSONAL PROJECT · AI · VOICE",
      title: "AI Cricket Mentor",

      desc:
        "A fan-made AI application combining a Next.js interface, a FastAPI backend, local language-model responses, document-backed information and optional voice features. Building it helped me understand how the components of an AI application connect.",

      evidence: [
        [
          "LOCAL AI",
          "Experiments with Ollama and Qwen for local inference."
        ],
        [
          "CONVERSATION",
          "Streams generated responses from backend to frontend."
        ],
        [
          "KNOWLEDGE",
          "Uses document-backed keyword matching, not vector search."
        ],
        [
          "VOICE",
          "Optional speech recognition and voice output need their own setup."
        ],
        [
          "STATUS",
          "Experimental personal project, not an official or deployed production service."
        ]
      ],

      tags: [
        "PYTHON",
        "FASTAPI",
        "REACT",
        "OLLAMA",
        "VOICE"
      ],

      actions: [
        [
          "View AI Cricket Mentor ↗",
          "https://github.com/VTXZenyx/ai-cricket-virat-kohli-app"
        ]
      ]
    },

    r: {
      kicker: "DATA SCIENCE · R · SQL",
      title: "Data Analysis & Programming",

      desc:
        "My R and SQL analysis portfolio brings together university work and an AI-assisted clustering exploration. It includes fossil maps, isotope data, Formula 1 records, simulations and unsupervised learning experiments.",

      evidence: [
        [
          "FOSSILS",
          "Exploring geographic patterns in dinosaur fossil data."
        ],
        [
          "ANCIENT EGYPT",
          "Cleaning and interpreting isotope measurements with R."
        ],
        [
          "FORMULA 1",
          "Querying connected racing data with SQL."
        ],
        [
          "SIMULATIONS",
          "Exploring probability through sampling and repeated experiments."
        ],
        [
          "CLUSTERING",
          "Comparing unsupervised approaches on synthetic data in an AI-assisted extension."
        ]
      ],

      tags: [
        "R",
        "DPLYR",
        "GGPLOT2",
        "SQL",
        "STATISTICS"
      ],

      actions: [
        [
          "View data projects ↗",
          "https://github.com/VTXZenyx/data-analysis-and-programming"
        ]
      ]
    },

    waid: {
      kicker: "WEB APPLICATION · VUE · BUSINESS RULES",
      title: "Course Enrolment Web Application",

      desc:
        "A browser-based demonstration for browsing courses, enrolling and withdrawing. I turned prerequisites, course-load and GPA requirements, and timetable clashes into application checks. The demo uses sample accounts and course data rather than real university authentication.",

      evidence: [
        [
          "USER FLOW",
          "Demonstration login, course browsing, enrolment and withdrawals."
        ],
        [
          "VALIDATION",
          "Prerequisite, course-load, GPA-related and timetable checks."
        ],
        [
          "TECHNOLOGY",
          "HTML, CSS, Vue.js, Brython/Python and JSON."
        ],
        [
          "STATUS",
          "Working demonstration, not a connected student administration system."
        ]
      ],

      tags: [
        "HTML",
        "CSS",
        "VUE.JS",
        "BRYTHON",
        "JSON"
      ],

      actions: [
        [
          "Try the live demo ↗",
          "https://vtxzenyx.github.io/course-enrolment-web-app/"
        ],
        [
          "View source ↗",
          "https://github.com/VTXZenyx/course-enrolment-web-app"
        ]
      ]
    },

    sql: {
      kicker: "SQL · SQLITE · DATABASE DESIGN",
      title: "SQL & Relational Database Portfolio",

      desc:
        "Exercises and projects exploring SQL queries, relational structure and database design. I enjoy turning connected tables into clear answers and learning how reliable data models support applications.",

      evidence: [
        [
          "QUERYING",
          "Filters, joins, self-joins, grouping, HAVING and aggregates."
        ],
        [
          "SUBQUERIES",
          "Nested queries and calculations using multiple tables."
        ],
        [
          "DESIGN",
          "Primary and foreign keys, relationships and normalisation."
        ],
        [
          "OPERATIONS",
          "CREATE, INSERT, UPDATE and DELETE exercises."
        ],
        [
          "R INTEGRATION",
          "Working with SQLite from R using DBI and RSQLite."
        ]
      ],

      tags: [
        "SQL",
        "SQLITE",
        "JOINS",
        "DATABASE DESIGN",
        "RSQLITE"
      ],

      actions: [
        [
          "View SQL portfolio ↗",
          "https://github.com/VTXZenyx/sql-database-portfolio"
        ]
      ]
    },

    systems: {
      kicker: "INFORMATION SYSTEMS · USER RESEARCH",
      title: "Business & Systems Analysis",

      desc:
        "In a university group project, we explored why students can find it difficult to reconnect after meeting in class. Our 'See You Next Tutorial' concept brought together research, prototyping, testing and feedback. It reminded me that understanding users matters before choosing technology.",

      evidence: [
        [
          "RESEARCH",
          "Exploring student experiences and recurring problems."
        ],
        [
          "PROBLEM",
          "Focusing on the barriers to following up after an initial interaction."
        ],
        [
          "PROTOTYPE",
          "Designing a simple invitation and meeting flow."
        ],
        [
          "TESTING",
          "Revising designs after feedback."
        ],
        [
          "STATUS",
          "University coursework, not a commercial application."
        ]
      ],

      tags: [
        "USER RESEARCH",
        "REQUIREMENTS",
        "PROTOTYPING",
        "TESTING"
      ],

      actions: []
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
    let points = [];
    let frame = 0;

    let pointerX = -9999;
    let pointerY = -9999;
    let resizeTimer;

    function draw() {
      frame = 0;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(128, 197, 255, 0.96)";
      ctx.beginPath();

      for (const point of points) {
        let { x, y, radius } = point;

        if (
          finePointer.matches &&
          !reduceMotion.matches
        ) {
          const dx = x - pointerX;
          const dy = y - pointerY;
          const distance = Math.hypot(dx, dy);

          if (distance < 105) {
            const strength =
              (105 - distance) / 105;

            x +=
              (dx / (distance || 1)) *
              strength * 21;

            y +=
              (dy / (distance || 1)) *
              strength * 21;

            radius += strength * 0.8;
          }
        }

        ctx.moveTo(x + radius, y);

        ctx.arc(
          x,
          y,
          radius,
          0,
          Math.PI * 2
        );
      }

      ctx.fill();
    }

    const requestDraw = () => {
      if (!frame) {
        frame = requestAnimationFrame(draw);
      }
    };

    function build() {
      width = Math.round(
        canvas.getBoundingClientRect().width
      );

      height = Math.round(
        canvas.getBoundingClientRect().height
      );

      if (width < 10 || height < 10) {
        return;
      }

      const ratio = Math.min(
        devicePixelRatio || 1,
        2
      );

      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);

      ctx.setTransform(
        ratio, 0, 0, ratio, 0, 0
      );

      const offscreen = document.createElement("canvas");

      offscreen.width = width;
      offscreen.height = height;

      const off = offscreen.getContext(
        "2d",
        { willReadFrequently: true }
      );

      if (!off) {
        return;
      }

      off.textAlign = "center";
      off.textBaseline = "middle";
      off.fillStyle = "white";

      let fontSize = Math.min(
        width * 0.205,
        height * 0.35
      );

      for (let i = 0; i < 20; i++) {
        off.font =
          `800 ${fontSize}px Manrope, sans-serif`;

        if (
          Math.max(
            off.measureText("VIRAJ").width,
            off.measureText("GANDHI").width
          ) <= width * 0.94
        ) {
          break;
        }

        fontSize *= 0.95;
      }

      off.fillText(
        "VIRAJ",
        width / 2,
        height * 0.32
      );

      off.fillText(
        "GANDHI",
        width / 2,
        height * 0.69
      );

      const pixels = off.getImageData(
        0, 0, width, height
      ).data;

      const step =
        width < 480 ? 6 :
        width < 800 ? 7 : 8;

      const next = [];

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          if (
            pixels[(y * width + x) * 4 + 3] > 100
          ) {
            next.push({
              x,
              y,
              radius: width < 480 ? 1.45 : 1.7
            });
          }
        }
      }

      points = next;
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

    const background = [
      $("main"),
      $(".topbar"),
      $(".site-footer")
    ];

    function close() {
      if (!modal.classList.contains("open")) {
        return;
      }

      modal.classList.remove("open");

      modal.setAttribute(
        "aria-hidden",
        "true"
      );

      document.body.style.overflow =
        previousOverflow || "";

      background.forEach(item => {
        if (item) {
          item.inert = false;
        }
      });

      document.dispatchEvent(
        new CustomEvent(
          "portfolio:modalchange",
          { detail: { open: false } }
        )
      );

      if (previousFocus?.isConnected) {
        previousFocus.focus();
      }
    }

    function open(key, trigger) {
      const project = PROJECTS[key];

      if (!project) {
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

      background.forEach(item => {
        if (item) {
          item.inert = true;
        }
      });

      card.scrollTop = 0;

      document.dispatchEvent(
        new CustomEvent(
          "portfolio:modalchange",
          { detail: { open: true } }
        )
      );

      closeButton.focus();
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
      best ? `${best} ms` : "--- ms";

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
        "Wait for the signal, then click.";
    }

    start.addEventListener("click", () => {
      clearTimeout(timer);

      state = "waiting";

      box.classList.remove("ready");
      box.classList.add("waiting");

      text.textContent = "WAIT...";
      sub.textContent = "Don't click yet.";

      timer = setTimeout(() => {
        if (state !== "waiting") {
          return;
        }

        readyAt = performance.now();
        state = "ready";

        box.classList.remove("waiting");
        box.classList.add("ready");

        text.textContent = "CLICK!";
        sub.textContent = "Now!";
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

      if (score > best) {
        best = score;

        bestLabel.textContent = String(best);
        saveBest(key, best);
      }
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
        !modalOpen &&
        panel.classList.contains("active")
      ) {
        timer = setInterval(tick, 110);
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

    document.addEventListener("keydown", event => {
      if (
        !playing ||
        modalOpen ||
        !panel.classList.contains("active")
      ) {
        return;
      }

      if (
        document.activeElement?.matches(
          "input, textarea, select, [contenteditable], [role='tab']"
        )
      ) {
        return;
      }

      const keys = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        s: "down",
        a: "left",
        d: "right"
      };

      const name =
        keys[event.key] ||
        keys[event.key.toLowerCase()];

      if (name) {
        event.preventDefault();
        turn(name);
      }
    });

    $$("[data-dir]", panel).forEach(button => {
      button.addEventListener("click", () => {
        turn(button.dataset.dir);
      });
    });

    start.addEventListener("click", begin);

    document.addEventListener(
      "portfolio:gamechange",
      event => {
        if (event.detail.game === "snake") {
          resume();
        } else {
          stop();
        }
      }
    );

    document.addEventListener(
      "portfolio:modalchange",
      event => {
        modalOpen = event.detail.open;

        if (modalOpen) {
          stop();
        } else {
          resume();
        }
      }
    );

    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) {
          stop();
        } else {
          resume();
        }
      }
    );

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

    let best = Math.min(5, readBest(key));
    let index = 0;
    let score = 0;
    let answered = false;
    let timer = 0;

    bestLabel.textContent = `${best}/5`;

    root.setAttribute("aria-live", "polite");

    function finish() {
      if (score > best) {
        best = score;
        saveBest(key, best);

        bestLabel.textContent = `${best}/5`;
      }

      root.replaceChildren();

      const panel = document.createElement("div");
      panel.className = "sql-question";

      const heading = document.createElement("h4");
      heading.textContent = `You scored ${score}/5`;

      const message = document.createElement("p");
      message.textContent =
        "Real SQL fundamentals. Give it another go if you like.";

      panel.append(heading, message);
      root.append(panel);

      progress.textContent = "Complete";
    }

    function select(choice, button) {
      if (answered) {
        return;
      }

      answered = true;

      const buttons = $$(".sql-answer", root);

      buttons.forEach(item => {
        item.disabled = true;
      });

      const correct = questions[index].correct;

      if (choice === correct) {
        score++;
        button.classList.add("correct");
      } else {
        button.classList.add("wrong");
        buttons[correct].classList.add("correct");
      }

      timer = setTimeout(() => {
        timer = 0;
        index++;

        if (index >= questions.length) {
          finish();
        } else {
          render();
        }
      }, 650);
    }

    function render() {
      answered = false;
      root.replaceChildren();

      const item = questions[index];

      progress.textContent =
        `Question ${index + 1} of ${questions.length}`;

      const panel = document.createElement("div");
      panel.className = "sql-question";

      const code = document.createElement("code");
      code.textContent = item.code;

      const heading = document.createElement("h4");
      heading.textContent = item.question;

      const choices = document.createElement("div");
      choices.className = "sql-answers";

      item.answers.forEach((answer, i) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "sql-answer";
        button.textContent = answer;

        button.addEventListener("click", () => {
          select(i, button);
        });

        choices.append(button);
      });

      panel.append(code, heading, choices);
      root.append(panel);
    }

    restart.addEventListener("click", () => {
      clearTimeout(timer);

      index = 0;
      score = 0;

      render();
    });

    render();
  }

  initSqlQuiz();

})();
