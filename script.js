
(() => {
  "use strict";

  /* =========================================================
     01. SHARED HELPERS
     ========================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  function readNumber(key, fallback = 0) {
    try {
      const raw = localStorage.getItem(key);

      if (raw === null) {
        return fallback;
      }

      const value = Number(raw);

      return Number.isFinite(value) && value >= 0
        ? value
        : fallback;
    } catch {
      return fallback;
    }
  }

  function saveNumber(key, value) {
    try {
      localStorage.setItem(key, String(value));
    } catch {
      // Games continue working if storage is unavailable.
    }
  }

  /* =========================================================
     02. PROJECT INFORMATION
     ========================================================= */

  const PROJECTS = {
    sql: {
      kicker: "SQL · SQLITE · DATABASE DESIGN",

      title: "SQL & Relational Database Portfolio",

      desc:
        "This is a collection of the SQL and database work I've done while learning how to organise, query and understand relational data. I particularly like how a query can turn several connected tables into an answer that's actually useful.",

      evidence: [
        [
          "QUERYING",
          "Filtering, multi-table joins, self joins, grouping, HAVING and aggregate functions."
        ],
        [
          "SUBQUERIES",
          "Building nested queries and working with calculated or grouped results."
        ],
        [
          "DATABASE DESIGN",
          "Relationships, primary and foreign keys, composite keys and normalisation."
        ],
        [
          "DATABASE OPERATIONS",
          "Using CREATE, INSERT, UPDATE and DELETE in database exercises."
        ],
        [
          "R + SQLITE",
          "Connecting R to SQLite with DBI and RSQLite to work with database tables."
        ]
      ],

      tags: [
        "SQL",
        "SQLITE",
        "JOINS",
        "SUBQUERIES",
        "DATABASE DESIGN",
        "RSQLITE"
      ],

      actions: [
        {
          label: "View SQL portfolio ↗",
          url: "https://github.com/VTXZenyx/sql-database-portfolio",
          primary: true
        }
      ]
    },

    r: {
      kicker: "R · SQL · DATA202",

      title: "Data Analysis & Programming",

      desc:
        "This is where I've put together work from DATA202 and an additional AI-assisted clustering exploration. It's a mix of R, SQL, data cleaning, visualisations and simulations. I wanted one place where I could look back at what I've learned and share the code behind it.",

      evidence: [
        [
          "DINOSAUR FOSSILS",
          "Working with fossil data and exploring geographic patterns through visualisation."
        ],
        [
          "ANCIENT EGYPT",
          "Importing, cleaning and analysing isotope data, then interpreting the results in R."
        ],
        [
          "FORMULA 1 SQL",
          "Working with related tables and SQL queries to answer questions about racing data."
        ],
        [
          "PROBABILITY",
          "Using R sampling and simulations to explore probability and repeated experiments."
        ],
        [
          "CLUSTERING",
          "An AI-assisted extension exploring unsupervised learning and comparing clustering methods."
        ],
        [
          "DOCUMENTATION",
          "R Markdown, source code and supporting project notes published on GitHub."
        ]
      ],

      tags: [
        "R",
        "DPLYR",
        "GGPLOT2",
        "SQL",
        "SIMULATION",
        "R MARKDOWN"
      ],

      actions: [
        {
          label: "Explore DATA202 projects ↗",
          url: "https://github.com/VTXZenyx/data-analysis-and-programming",
          primary: true
        }
      ]
    },

    systems: {
      kicker: "INFORMATION SYSTEMS · USER RESEARCH",

      title: "Business & Systems Analysis",

      desc:
        "In INFO203, I worked on a question that came up in student life: how do you keep a good first interaction going? My group's idea became 'See you next tutorial', a small prototype for following up with someone after class. The project taught me that understanding people comes before designing a solution.",

      evidence: [
        [
          "RESEARCH",
          "Explored students' experiences through interviews and looked for recurring needs."
        ],
        [
          "PROBLEM",
          "Focused on hesitation around following up after meeting someone and practical barriers to making plans."
        ],
        [
          "IDEAS",
          "Compared alternative concepts before choosing 'See you next tutorial'."
        ],
        [
          "PROTOTYPING",
          "Designed an invite flow with editable wording, tutorial choices and meeting details."
        ],
        [
          "USER TESTING",
          "Tested prototype versions, reviewed feedback and refined the flow and statuses."
        ]
      ],

      tags: [
        "USER RESEARCH",
        "STAKEHOLDERS",
        "REQUIREMENTS",
        "PROTOTYPING",
        "TESTING"
      ],

      actions: []
    },

    waid: {
      kicker: "WEB APP · BUSINESS RULES",

      title: "Course Enrolment Web Application",

      desc:
        "I built a course enrolment application where students can sign in, browse courses, enrol and withdraw. The interesting part for me was translating real enrolment rules into checks that the application can make, instead of just building the screens.",

      evidence: [
        [
          "USER FLOW",
          "Login, course browsing, enrolment and withdrawal."
        ],
        [
          "VALIDATION",
          "Prerequisites, course-load limits, GPA requirements and timetable-clash checks."
        ],
        [
          "STRUCTURED DATA",
          "Student and course information used to drive what the app shows and allows."
        ],
        [
          "TOOLS",
          "HTML, CSS, Vue.js, Python through Brython and JSON."
        ],
        [
          "SYSTEMS THINKING",
          "Turning requirements and business rules into application behaviour."
        ]
      ],

      tags: [
        "HTML",
        "CSS",
        "VUE.JS",
        "BRYTHON",
        "JSON",
        "BUSINESS RULES"
      ],

      actions: [
        {
          label: "Open live application ↗",
          url: "https://vtxzenyx.github.io/course-enrolment-web-app/",
          primary: true
        },
        {
          label: "View source on GitHub ↗",
          url: "https://github.com/VTXZenyx/course-enrolment-web-app",
          primary: false
        }
      ]
    },

    cricket: {
      kicker: "PERSONAL PROJECT · AI · VOICE",

      title: "AI Cricket Mentor",

      desc:
        "I wanted to see how far I could take a cricket-themed AI idea beyond a normal chatbot. The project explores a local language model, conversation, knowledge retrieval and voice input and output. It's a practical way for me to understand what the pieces of an AI application actually do.",

      evidence: [
        [
          "LOCAL AI",
          "Exploring language-model inference through a local setup."
        ],
        [
          "CONVERSATION",
          "Handling prompts and generating streaming responses."
        ],
        [
          "VOICE",
          "Connecting speech recognition and voice output to an assistant interface."
        ],
        [
          "LEARNING",
          "Understanding how application components connect, including their limitations."
        ],
        [
          "STATUS",
          "Personal project documented in the GitHub repository; not presented as a production service."
        ]
      ],

      tags: [
        "AI",
        "PYTHON",
        "LOCAL LLM",
        "VOICE",
        "PERSONAL PROJECT"
      ],

      actions: [
        {
          label: "View AI Cricket Mentor ↗",
          url: "https://github.com/VTXZenyx/ai-cricket-virat-kohli-app",
          primary: true
        }
      ]
    },

    trading: {
      kicker: "PLANNED PROJECT · AI · MARKET ANALYSIS",

      title: "AI Trading Analyser",

      desc:
        "This is an idea I'm still researching. I used to follow markets and trade quite a bit when I was younger, and both winning and losing trades taught me a lot. Now I want to explore whether an AI tool can help me work through market data more carefully, rather than just making a decision from a chart alone.",

      evidence: [
        [
          "CHARTS",
          "Plan to analyse hourly candles, trends, price levels, volume and technical indicators."
        ],
        [
          "RESEARCH",
          "Plan to check relevant news, posts on X and potentially prediction-market information with timestamps and source checks."
        ],
        [
          "DECISIONS",
          "Explore long, short and no-trade assessments with reasons for each decision."
        ],
        [
          "RISK",
          "Plan to evaluate entries, stop-losses, take-profit levels and position sizing with clear risk limits."
        ],
        [
          "TESTING FIRST",
          "Start with historical tests and paper trading, including fees and losing trades, before considering real money."
        ],
        [
          "STATUS",
          "Concept and research stage. There is no completed trading bot or verified profit record yet."
        ]
      ],

      tags: [
        "PLANNING",
        "AI",
        "CANDLESTICKS",
        "NEWS",
        "RISK",
        "PAPER TRADING"
      ],

      actions: []
    }
  };

  /* =========================================================
     03. FOOTER YEAR
     ========================================================= */

  function initFooterYear() {
    const year = $("#year");

    if (year) {
      year.textContent = String(new Date().getFullYear());
    }
  }

  /* =========================================================
     04. MOBILE NAVIGATION
     ========================================================= */

  function initMobileNavigation() {
    const toggle = $("#navToggle");
    const nav = $("#primaryNav");

    if (!toggle || !nav) {
      return;
    }

    const isOpen = () =>
      nav.classList.contains("open");

    function setOpen(open) {
      nav.classList.toggle("open", open);
      nav.classList.remove("is-open");

      toggle.setAttribute(
        "aria-expanded",
        String(open)
      );

      toggle.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation"
      );
    }

    toggle.addEventListener("click", () => {
      setOpen(!isOpen());
    });

    $$("a", nav).forEach(link => {
      link.addEventListener("click", () => {
        setOpen(false);
      });
    });

    document.addEventListener("click", event => {
      if (
        isOpen() &&
        !nav.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    const desktop = window.matchMedia(
      "(min-width: 821px)"
    );

    const desktopChanged = event => {
      if (event.matches) {
        setOpen(false);
      }
    };

    if (desktop.addEventListener) {
      desktop.addEventListener(
        "change",
        desktopChanged
      );
    } else {
      desktop.addListener(desktopChanged);
    }
  }

  /* =========================================================
     05. CURSOR HALO
     ========================================================= */

  function initCursorHalo() {
    const halo = $(".cursor-halo");

    if (!halo) {
      return;
    }

    let frame = 0;
    let x = 0;
    let y = 0;

    function syncVisibility() {
      halo.style.display =
        finePointer.matches && !reducedMotion.matches
          ? ""
          : "none";
    }

    syncVisibility();

    finePointer.addEventListener?.(
      "change",
      syncVisibility
    );

    reducedMotion.addEventListener?.(
      "change",
      syncVisibility
    );

    window.addEventListener(
      "pointermove",
      event => {
        if (halo.style.display === "none") {
          return;
        }

        x = event.clientX;
        y = event.clientY;

        if (frame) {
          return;
        }

        frame = requestAnimationFrame(() => {
          halo.style.left = `${x}px`;
          halo.style.top = `${y}px`;
          frame = 0;
        });
      },
      { passive: true }
    );
  }

  /* =========================================================
     06. ANIMATED DOT-MATRIX NAME
     ========================================================= */

  function initDotHero() {
    const canvas = $("#dotCanvas");
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) {
      return;
    }

    let width = 0;
    let height = 0;
    let points = [];

    let pointerX = -9999;
    let pointerY = -9999;

    let drawFrame = 0;
    let resizeTimer = 0;

    function draw() {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle =
        "rgba(128, 197, 255, 0.96)";

      ctx.beginPath();

      for (const point of points) {
        let x = point.x;
        let y = point.y;
        let radius = point.radius;

        if (
          finePointer.matches &&
          !reducedMotion.matches
        ) {
          const dx = x - pointerX;
          const dy = y - pointerY;
          const distance = Math.hypot(dx, dy);

          if (distance < 105) {
            const strength =
              (105 - distance) / 105;

            const push = strength * 21;

            x += (dx / (distance || 1)) * push;
            y += (dy / (distance || 1)) * push;

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
      drawFrame = 0;
    }

    function scheduleDraw() {
      if (!drawFrame) {
        drawFrame = requestAnimationFrame(draw);
      }
    }

    function build() {
      const rect = canvas.getBoundingClientRect();

      width = Math.round(rect.width);
      height = Math.round(rect.height);

      if (width < 10 || height < 10) {
        return;
      }

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      const offscreen =
        document.createElement("canvas");

      offscreen.width = width;
      offscreen.height = height;

      const off = offscreen.getContext(
        "2d",
        { willReadFrequently: true }
      );

      if (!off) {
        return;
      }

      let fontSize = Math.min(
        width * 0.205,
        height * 0.35
      );

      off.textAlign = "center";
      off.textBaseline = "middle";
      off.fillStyle = "#fff";

      // Make both names fit on smaller screens.
      for (let attempt = 0; attempt < 20; attempt++) {
        off.font =
          `800 ${fontSize}px Manrope, sans-serif`;

        const nameWidth = Math.max(
          off.measureText("VIRAJ").width,
          off.measureText("GANDHI").width
        );

        if (nameWidth <= width * 0.94) {
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
        0,
        0,
        width,
        height
      ).data;

      const step =
        width < 480
          ? 6
          : width < 800
            ? 7
            : 8;

      const nextPoints = [];

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const alpha =
            pixels[(y * width + x) * 4 + 3];

          if (alpha > 100) {
            nextPoints.push({
              x,
              y,
              radius: width < 480 ? 1.45 : 1.7
            });
          }
        }
      }

      points = nextPoints;
      scheduleDraw();
    }

    function scheduleBuild() {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(build, 90);
    }

    canvas.addEventListener(
      "pointermove",
      event => {
        if (
          !finePointer.matches ||
          reducedMotion.matches
        ) {
          return;
        }

        const rect =
          canvas.getBoundingClientRect();

        pointerX =
          event.clientX - rect.left;

        pointerY =
          event.clientY - rect.top;

        scheduleDraw();
      },
      { passive: true }
    );

    canvas.addEventListener(
      "pointerleave",
      () => {
        pointerX = -9999;
        pointerY = -9999;
        scheduleDraw();
      }
    );

    reducedMotion.addEventListener?.(
      "change",
      scheduleDraw
    );

    finePointer.addEventListener?.(
      "change",
      scheduleDraw
    );

    if ("ResizeObserver" in window) {
      new ResizeObserver(
        scheduleBuild
      ).observe(canvas);
    } else {
      window.addEventListener(
        "resize",
        scheduleBuild,
        { passive: true }
      );
    }

    build();

    if (document.fonts?.ready) {
      document.fonts.ready
        .then(build)
        .catch(() => {});
    }
  }

  /* =========================================================
     07. SCROLL REVEAL
     ========================================================= */

  function initRevealAnimations() {
    const elements = $$(".reveal");

    if (!elements.length) {
      return;
    }

    if (
      reducedMotion.matches ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach(element => {
        element.classList.add("visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.06,
        rootMargin: "0px 0px -20px 0px"
      }
    );

    elements.forEach(element => {
      observer.observe(element);
    });

    reducedMotion.addEventListener?.(
      "change",
      event => {
        if (event.matches) {
          elements.forEach(element => {
            element.classList.add("visible");
          });

          observer.disconnect();
        }
      }
    );
  }

  /* =========================================================
     08. PROJECT DETAILS MODAL
     ========================================================= */

  function initProjectModal() {
    const modal = $("#projectModal");

    if (!modal) {
      return;
    }

    const card = $(".project-modal-card", modal);
    const kicker = $("#modalKicker");
    const title = $("#modalTitle");
    const description = $("#modalDesc");
    const evidence = $("#modalEvidence");
    const tags = $("#modalTags");
    const actions = $("#modalActions");

    const closeButton = $(
      ".project-modal-close",
      modal
    );

    const secondaryClose = $(
      "#modalCloseSecondary"
    );

    const main = $("main");
    const topbar = $(".topbar");
    const footer = $(".site-footer");

    if (
      !card ||
      !title ||
      !kicker ||
      !description ||
      !evidence ||
      !tags ||
      !actions ||
      !closeButton
    ) {
      return;
    }

    let previousFocus = null;
    let previousOverflow = "";

    /*
      The updated HTML already has buttons for SQL,
      Business & Systems Analysis and Course Enrolment.

      Add matching detail buttons for the other three
      projects without changing their GitHub links.
    */

    const newProjectKeys = new Map([
      ["Data Analysis & Programming", "r"],
      ["AI Cricket Mentor", "cricket"],
      ["AI Trading Analyser", "trading"]
    ]);

    $$(".project-grid .project-card").forEach(
      projectCard => {
        const projectName = $(
          ".project-title-row h3",
          projectCard
        )?.textContent.trim();

        const projectKey =
          newProjectKeys.get(projectName);

        const actionArea = $(
          ".project-actions",
          projectCard
        );

        if (
          !projectKey ||
          !actionArea ||
          $("[data-open-project]", actionArea)
        ) {
          return;
        }

        const button =
          document.createElement("button");

        button.type = "button";
        button.className = "text-button";
        button.dataset.openProject = projectKey;
        button.textContent = "Project details →";

        actionArea.prepend(button);
      }
    );

    function setInert(value) {
      for (const element of [
        main,
        topbar,
        footer
      ]) {
        if (element) {
          element.inert = value;
        }
      }
    }

    function focusables() {
      return $$(
        "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])",
        modal
      ).filter(element =>
        element.getClientRects().length &&
        !element.closest("[hidden]")
      );
    }

    function closeModal() {
      if (!modal.classList.contains("open")) {
        return;
      }

      modal.classList.remove("open");

      modal.setAttribute(
        "aria-hidden",
        "true"
      );

      document.body.style.overflow =
        previousOverflow;

      setInert(false);

      document.dispatchEvent(
        new CustomEvent(
          "portfolio:modalchange",
          {
            detail: { open: false }
          }
        )
      );

      if (previousFocus?.isConnected) {
        previousFocus.focus();
      }

      previousFocus = null;
    }

    function openModal(key, trigger) {
      const project =
        Object.prototype.hasOwnProperty.call(
          PROJECTS,
          key
        )
          ? PROJECTS[key]
          : null;

      if (!project) {
        return;
      }

      previousFocus = trigger;

      previousOverflow =
        document.body.style.overflow;

      kicker.textContent = project.kicker;
      title.textContent = project.title;
      description.textContent = project.desc;

      evidence.replaceChildren();
      tags.replaceChildren();
      actions.replaceChildren();

      for (const [label, value] of project.evidence) {
        const row =
          document.createElement("div");

        const labelElement =
          document.createElement("span");

        const valueElement =
          document.createElement("strong");

        labelElement.textContent = label;
        valueElement.textContent = value;

        row.append(
          labelElement,
          valueElement
        );

        evidence.append(row);
      }

      for (const tag of project.tags) {
        const chip =
          document.createElement("span");

        chip.textContent = tag;
        tags.append(chip);
      }

      for (const action of project.actions) {
        const link =
          document.createElement("a");

        link.className =
          `button ${
            action.primary
              ? "button-primary"
              : "button-ghost"
          } compact`;

        link.href = action.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = action.label;

        actions.append(link);
      }

      modal.classList.add("open");

      modal.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.style.overflow =
        "hidden";

      setInert(true);
      card.scrollTop = 0;

      document.dispatchEvent(
        new CustomEvent(
          "portfolio:modalchange",
          {
            detail: { open: true }
          }
        )
      );

      closeButton.focus();
    }

    document.addEventListener(
      "click",
      event => {
        const trigger =
          event.target.closest?.(
            "[data-open-project]"
          );

        if (trigger) {
          openModal(
            trigger.dataset.openProject,
            trigger
          );
        }
      }
    );

    closeButton.addEventListener(
      "click",
      closeModal
    );

    secondaryClose?.addEventListener(
      "click",
      closeModal
    );

    modal.addEventListener(
      "click",
      event => {
        if (event.target === modal) {
          closeModal();
        }
      }
    );

    document.addEventListener(
      "keydown",
      event => {
        if (!modal.classList.contains("open")) {
          return;
        }

        if (event.key === "Escape") {
          event.preventDefault();
          closeModal();
          return;
        }

        if (event.key !== "Tab") {
          return;
        }

        const items = focusables();

        if (!items.length) {
          event.preventDefault();
          card.focus();
          return;
        }

        const first = items[0];
        const last = items[items.length - 1];
        const current = document.activeElement;

        if (
          event.shiftKey &&
          (
            current === first ||
            !modal.contains(current)
          )
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          (
            current === last ||
            !modal.contains(current)
          )
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    );
  }

  /* =========================================================
     09. PLAYGROUND GAME TABS
     ========================================================= */

  function initGameTabs() {
    const tabs = $$(".game-tab");
    const panels = $$(".game-panel");

    if (!tabs.length || !panels.length) {
      return;
    }

    function activate(name) {
      tabs.forEach(tab => {
        const selected =
          tab.dataset.game === name;

        tab.classList.toggle(
          "active",
          selected
        );

        tab.setAttribute(
          "aria-selected",
          String(selected)
        );

        tab.tabIndex = selected ? 0 : -1;
      });

      panels.forEach(panel => {
        const selected =
          panel.id === `game-${name}`;

        panel.classList.toggle(
          "active",
          selected
        );

        panel.hidden = !selected;

        panel.setAttribute(
          "aria-hidden",
          String(!selected)
        );
      });

      document.dispatchEvent(
        new CustomEvent(
          "portfolio:gamechange",
          {
            detail: { game: name }
          }
        )
      );
    }

    tabs.forEach((tab, index) => {
      const panel = $(
        `#game-${tab.dataset.game}`
      );

      if (!tab.id) {
        tab.id = `tab-${tab.dataset.game}`;
      }

      if (panel) {
        panel.setAttribute(
          "aria-labelledby",
          tab.id
        );
      }

      tab.addEventListener("click", () => {
        activate(tab.dataset.game);
      });

      tab.addEventListener(
        "keydown",
        event => {
          let next = null;

          if (
            event.key === "ArrowRight" ||
            event.key === "ArrowDown"
          ) {
            next = (index + 1) % tabs.length;
          }

          if (
            event.key === "ArrowLeft" ||
            event.key === "ArrowUp"
          ) {
            next =
              (index - 1 + tabs.length) %
              tabs.length;
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
        }
      );
    });

    const initialGame =
      tabs.find(tab =>
        tab.classList.contains("active")
      )?.dataset.game ||
      tabs[0].dataset.game;

    activate(initialGame);
  }

  /* =========================================================
     10. REACTION GAME
     ========================================================= */

  function initReactionGame() {
    const box = $("#reactionBox");
    const start = $("#reactionStart");
    const text = $("#reactionText");
    const subtitle = $("#reactionSub");
    const bestElement = $("#reactionBest");

    if (
      !box ||
      !start ||
      !text ||
      !subtitle ||
      !bestElement
    ) {
      return;
    }

    const key = "vg2026_reaction_best";

    let best = Math.round(readNumber(key));
    let state = "idle";
    let timeout = 0;
    let readyAt = 0;

    bestElement.textContent =
      best ? `${best} ms` : "--- ms";

    box.setAttribute(
      "aria-live",
      "polite"
    );

    function reset() {
      clearTimeout(timeout);

      timeout = 0;
      state = "idle";
      readyAt = 0;

      box.classList.remove(
        "waiting",
        "ready"
      );

      text.textContent = "PRESS START";

      subtitle.textContent =
        "Wait for the signal, then click.";
    }

    start.addEventListener(
      "click",
      () => {
        clearTimeout(timeout);

        state = "waiting";
        readyAt = 0;

        box.classList.remove("ready");
        box.classList.add("waiting");

        text.textContent = "WAIT...";

        subtitle.textContent =
          "Don't click yet.";

        timeout = setTimeout(
          () => {
            timeout = 0;

            if (state !== "waiting") {
              return;
            }

            readyAt = performance.now();
            state = "ready";

            box.classList.remove("waiting");
            box.classList.add("ready");

            text.textContent = "CLICK!";
            subtitle.textContent = "Now!";
          },
          900 + Math.random() * 2200
        );
      }
    );

    box.addEventListener(
      "click",
      () => {
        if (state === "waiting") {
          clearTimeout(timeout);

          timeout = 0;
          state = "finished";

          box.classList.remove("waiting");

          text.textContent = "TOO EARLY";

          subtitle.textContent =
            "Start another round.";

          return;
        }

        if (state !== "ready") {
          return;
        }

        const milliseconds = Math.max(
          1,
          Math.round(
            performance.now() - readyAt
          )
        );

        state = "finished";
        readyAt = 0;

        box.classList.remove("ready");

        text.textContent =
          `${milliseconds} ms`;

        subtitle.textContent =
          milliseconds < 220
            ? "Very quick."
            : milliseconds < 320
              ? "Nice reaction."
              : "Try another round.";

        if (
          !best ||
          milliseconds < best
        ) {
          best = milliseconds;

          saveNumber(key, best);

          bestElement.textContent =
            `${best} ms`;
        }
      }
    );

    document.addEventListener(
      "portfolio:gamechange",
      event => {
        if (event.detail?.game !== "reaction") {
          reset();
        }
      }
    );

    document.addEventListener(
      "portfolio:modalchange",
      event => {
        if (event.detail?.open) {
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

  /* =========================================================
     11. SNAKE GAME
     ========================================================= */

  function initSnakeGame() {
    const canvas = $("#snakeCanvas");
    const start = $("#snakeStart");
    const scoreElement = $("#snakeScore");
    const bestElement = $("#snakeBest");
    const panel = $("#game-snake");

    const ctx = canvas?.getContext("2d");

    if (
      !canvas ||
      !ctx ||
      !start ||
      !scoreElement ||
      !bestElement ||
      !panel
    ) {
      return;
    }

    const grid = 20;
    const cell = canvas.width / grid;
    const key = "vg2026_snake_best";

    let best = Math.round(readNumber(key));
    let score = 0;
    let snake = [];

    let food = {
      x: 10,
      y: 10
    };

    let direction = {
      x: 1,
      y: 0
    };

    let nextDirection = {
      x: 1,
      y: 0
    };

    let turnLocked = false;
    let running = false;
    let interval = 0;
    let modalOpen = false;

    bestElement.textContent = String(best);

    function stopClock() {
      clearInterval(interval);
      interval = 0;
    }

    function spawnFood() {
      const free = [];

      for (let y = 0; y < grid; y++) {
        for (let x = 0; x < grid; x++) {
          if (
            !snake.some(segment =>
              segment.x === x &&
              segment.y === y
            )
          ) {
            free.push({ x, y });
          }
        }
      }

      if (!free.length) {
        return false;
      }

      food = free[
        Math.floor(Math.random() * free.length)
      ];

      return true;
    }

    function draw() {
      ctx.fillStyle = "#06101d";

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      ctx.strokeStyle =
        "rgba(100,145,205,.065)";

      ctx.lineWidth = 1;

      for (let i = 0; i <= grid; i++) {
        ctx.beginPath();

        ctx.moveTo(i * cell, 0);
        ctx.lineTo(i * cell, canvas.height);

        ctx.moveTo(0, i * cell);
        ctx.lineTo(canvas.width, i * cell);

        ctx.stroke();
      }

      snake.forEach((segment, index) => {
        ctx.fillStyle =
          index ? "#69d7ff" : "#8ccaff";

        ctx.fillRect(
          segment.x * cell + 2,
          segment.y * cell + 2,
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
          cell * 0.3,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }
    }

    function finish(won = false) {
      stopClock();
      running = false;

      start.textContent = won
        ? "You won! Play again"
        : "Game over. Play again";

      if (score > best) {
        best = score;

        bestElement.textContent =
          String(best);

        saveNumber(key, best);
      }
    }

    function tick() {
      direction = nextDirection;
      turnLocked = false;

      const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
      };

      const hitWall =
        head.x < 0 ||
        head.y < 0 ||
        head.x >= grid ||
        head.y >= grid;

      const eating =
        head.x === food.x &&
        head.y === food.y;

      /*
        The tail moves away unless food is eaten.
        Excluding the tail prevents false collisions.
      */

      const body = eating
        ? snake
        : snake.slice(0, -1);

      const hitBody = body.some(
        segment =>
          segment.x === head.x &&
          segment.y === head.y
      );

      if (hitWall || hitBody) {
        finish();
        return;
      }

      snake.unshift(head);

      if (eating) {
        score += 1;

        scoreElement.textContent =
          String(score);

        if (!spawnFood()) {
          food = null;
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
        !running ||
        interval ||
        document.hidden ||
        modalOpen ||
        !panel.classList.contains("active")
      ) {
        return;
      }

      interval = setInterval(tick, 110);
    }

    function begin() {
      stopClock();

      snake = [
        { x: 6, y: 10 },
        { x: 5, y: 10 },
        { x: 4, y: 10 }
      ];

      direction = {
        x: 1,
        y: 0
      };

      nextDirection = {
        x: 1,
        y: 0
      };

      turnLocked = false;
      score = 0;

      scoreElement.textContent = "0";
      start.textContent = "Start / restart";

      spawnFood();
      draw();

      running = true;
      resume();
    }

    const directions = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 }
    };

    function changeDirection(name) {
      if (!running || turnLocked) {
        return;
      }

      const next = directions[name];

      if (!next) {
        return;
      }

      const reversing =
        next.x === -direction.x &&
        next.y === -direction.y;

      const same =
        next.x === direction.x &&
        next.y === direction.y;

      if (reversing || same) {
        return;
      }

      nextDirection = next;
      turnLocked = true;
    }

    document.addEventListener(
      "keydown",
      event => {
        if (
          !panel.classList.contains("active") ||
          !running ||
          modalOpen
        ) {
          return;
        }

        const focused = document.activeElement;

        if (
          focused?.matches(
            "input, textarea, select, [contenteditable='true'], [role='tab']"
          )
        ) {
          return;
        }

        const keyMap = {
          ArrowUp: "up",
          ArrowDown: "down",
          ArrowLeft: "left",
          ArrowRight: "right",

          w: "up",
          W: "up",
          s: "down",
          S: "down",

          a: "left",
          A: "left",
          d: "right",
          D: "right"
        };

        const name = keyMap[event.key];

        if (!name) {
          return;
        }

        event.preventDefault();

        changeDirection(name);
      }
    );

    $$("[data-dir]", panel).forEach(button => {
      button.addEventListener(
        "click",
        () => {
          changeDirection(
            button.dataset.dir
          );
        }
      );
    });

    start.addEventListener("click", begin);

    document.addEventListener(
      "portfolio:gamechange",
      event => {
        if (event.detail?.game === "snake") {
          resume();
        } else {
          stopClock();
        }
      }
    );

    document.addEventListener(
      "portfolio:modalchange",
      event => {
        modalOpen =
          Boolean(event.detail?.open);

        if (modalOpen) {
          stopClock();
        } else {
          resume();
        }
      }
    );

    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) {
          stopClock();
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

  /* =========================================================
     12. SQL QUIZ
     ========================================================= */

  function initSqlQuiz() {
    const quiz = $("#sqlQuiz");
    const progress = $("#sqlProgress");
    const bestElement = $("#sqlBest");
    const restart = $("#sqlRestart");

    if (
      !quiz ||
      !progress ||
      !bestElement ||
      !restart
    ) {
      return;
    }

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
          "Sorts countries alphabetically",
          "Changes the original table"
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
          "Missing or NULL values",
          "False values"
        ],

        correct: 2
      },
      {
        code:
          "SELECT c.Name, i.Total FROM customers c JOIN invoices i ON c.CustomerId = i.CustomerId;",

        question:
          "Why is the JOIN used?",

        answers: [
          "To combine related rows from two tables",
          "To rename a table",
          "To remove duplicate columns",
          "To create a new database"
        ],

        correct: 0
      },
      {
        code:
          "HAVING COUNT(*) > 3",

        question:
          "When is HAVING especially useful?",

        answers: [
          "Filtering grouped or aggregate results",
          "Choosing which columns to display",
          "Creating a new table",
          "Changing a primary key"
        ],

        correct: 0
      }
    ];

    const key = "vg2026_sql_best";

    let best = Math.min(
      5,
      Math.round(readNumber(key))
    );

    let index = 0;
    let score = 0;
    let pending = 0;
    let answered = false;

    bestElement.textContent = `${best}/5`;

    quiz.setAttribute(
      "aria-live",
      "polite"
    );

    function render() {
      answered = false;
      quiz.replaceChildren();

      const item = questions[index];

      progress.textContent =
        `Question ${index + 1} of ${questions.length}`;

      const box =
        document.createElement("div");

      box.className = "sql-question";

      const code =
        document.createElement("code");

      code.textContent = item.code;

      const heading =
        document.createElement("h4");

      heading.textContent = item.question;

      const answers =
        document.createElement("div");

      answers.className = "sql-answers";

      item.answers.forEach(
        (answer, answerIndex) => {
          const button =
            document.createElement("button");

          button.type = "button";
          button.className = "sql-answer";
          button.textContent = answer;

          button.addEventListener(
            "click",
            () => {
              selectAnswer(
                answerIndex,
                button
              );
            }
          );

          answers.append(button);
        }
      );

      box.append(
        code,
        heading,
        answers
      );

      quiz.append(box);
    }

    function finish() {
      if (score > best) {
        best = score;

        saveNumber(key, best);

        bestElement.textContent =
          `${best}/5`;
      }

      quiz.replaceChildren();

      const box =
        document.createElement("div");

      box.className = "sql-question";

      const heading =
        document.createElement("h4");

      heading.textContent =
        `You scored ${score}/5`;

      const message =
        document.createElement("p");

      message.textContent =
        "Small quiz, real database fundamentals. Give it another go if you want.";

      box.append(
        heading,
        message
      );

      quiz.append(box);

      progress.textContent = "Complete";
    }

    function selectAnswer(selected, button) {
      if (answered) {
        return;
      }

      answered = true;

      const buttons = $$(
        ".sql-answer",
        quiz
      );

      buttons.forEach(item => {
        item.disabled = true;
      });

      const correct =
        questions[index].correct;

      if (selected === correct) {
        score += 1;

        button.classList.add("correct");
      } else {
        button.classList.add("wrong");

        buttons[correct]?.classList.add(
          "correct"
        );
      }

      pending = setTimeout(
        () => {
          pending = 0;
          index += 1;

          if (index >= questions.length) {
            finish();
          } else {
            render();
          }
        },
        650
      );
    }

    restart.addEventListener(
      "click",
      () => {
        clearTimeout(pending);

        pending = 0;
        index = 0;
        score = 0;

        render();
      }
    );

    render();
  }

  /* =========================================================
     13. INITIALISE WEBSITE
     ========================================================= */

  function init() {
    initFooterYear();
    initMobileNavigation();
    initCursorHalo();
    initDotHero();
    initRevealAnimations();
    initProjectModal();
    initGameTabs();
    initReactionGame();
    initSnakeGame();
    initSqlQuiz();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
    );
  } else {
    init();
  }
})();
