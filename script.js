(() => {
  "use strict";


  /* =========================================================
     01. HELPERS
     ========================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


  const getStoredNumber = (key, fallback = 0) => {
    try {
      const storedValue =
        localStorage.getItem(key);

      if (storedValue === null) {
        return fallback;
      }

      const value =
        Number(storedValue);

      return Number.isFinite(value)
        ? value
        : fallback;
    } catch {
      return fallback;
    }
  };


  const setStoredNumber = (key, value) => {
    try {
      localStorage.setItem(
        key,
        String(value)
      );
    } catch {
      /*
        Storage may be disabled or blocked.
        The website should continue working normally.
      */
    }
  };


  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );


  const hasFinePointer =
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );


  /* =========================================================
     02. PROJECT INFORMATION
     ========================================================= */

  const PROJECTS = {

    sql: {
      kicker:
        "SQL · SQLITE · DATABASE DESIGN",

      title:
        "SQL & Relational Database Portfolio",

      desc:
        "A collection of SQL and relational database work focused on querying, organising and working with structured data. I have used joins, subqueries, grouped analysis, relational keys and database design across university exercises and project work.",

      evidence: [
        [
          "QUERYING",
          "Filtering, multi-table joins, self joins, GROUP BY, HAVING and aggregate queries"
        ],
        [
          "SUBQUERIES",
          "Subqueries used within larger queries to work with grouped and calculated results"
        ],
        [
          "DATABASE DESIGN",
          "Primary keys, foreign keys, composite keys, relationships and normalisation"
        ],
        [
          "DATABASE OPERATIONS",
          "CREATE, INSERT, UPDATE, DELETE and creating tables from query results"
        ],
        [
          "R + SQLITE",
          "Used DBI and RSQLite to connect R to SQLite databases, write tables and run SQL queries"
        ]
      ],

      tags: [
        "SQL",
        "SQLITE",
        "JOINS",
        "SUBQUERIES",
        "DATABASE DESIGN",
        "DBI / RSQLITE"
      ],

      actions: [
        {
          label:
            "View SQL portfolio ↗",

          url:
            "https://github.com/VTXZenyx/sql-database-portfolio",

          type:
            "primary"
        }
      ]
    },


    r: {
      kicker:
        "R · DATA ANALYSIS · VISUALISATION",

      title:
        "R Data Analysis",

      desc:
        "Data analysis work completed in R using an Excel-based archaeological dataset. I imported, cleaned and transformed data, worked with related datasets, produced grouped summaries and created visualisations to explore patterns in the data.",

      evidence: [
        [
          "DATA IMPORT",
          "Worked with Excel data using readxl and inspected related datasets before analysis"
        ],
        [
          "CLEANING",
          "Used dplyr to select, rename, filter and transform variables and clean inconsistent text values"
        ],
        [
          "ANALYSIS",
          "Produced grouped summaries across historical periods and demographic categories"
        ],
        [
          "VISUALISATION",
          "Used ggplot2 to explore strontium isotope measurements and patterns in the data"
        ],
        [
          "DOCUMENTATION",
          "Used R Markdown to combine code, output, visualisations and written interpretation"
        ]
      ],

      tags: [
        "R",
        "RSTUDIO",
        "DPLYR",
        "GGPLOT2",
        "READXL",
        "R MARKDOWN"
      ],

      actions: [
        {
          label:
            "View R portfolio ↗",

          url:
            "https://github.com/VTXZenyx/r-data-programming-portfolio",

          type:
            "primary"
        }
      ]
    },


    waid: {
      kicker:
        "APPLICATION · BUSINESS RULES · SYSTEMS",

      title:
        "Course Enrolment Web Application",

      desc:
        "A working course-enrolment application that applies business rules through application logic. Users can log in, browse courses, enrol and withdraw while the system checks relevant enrolment conditions.",

      evidence: [
        [
          "APPLICATION",
          "Login, course browsing, enrolment and withdrawal functionality"
        ],
        [
          "BUSINESS RULES",
          "Prerequisites, course-load requirements, GPA requirements, approval requirements and timetable clashes"
        ],
        [
          "DATA",
          "Structured course and student information used within the application"
        ],
        [
          "TECHNOLOGIES",
          "HTML, CSS, Vue.js, Python through Brython and JSON"
        ],
        [
          "INFORMATION SYSTEMS",
          "Turned defined business rules and requirements into working application behaviour"
        ]
      ],

      tags: [
        "HTML",
        "CSS",
        "VUE.JS",
        "PYTHON / BRYTHON",
        "JSON",
        "BUSINESS RULES"
      ],

      actions: [
        {
          label:
            "View live app ↗",

          url:
            "https://vtxzenyx.github.io/course-enrolment-web-app/",

          type:
            "primary"
        },
        {
          label:
            "View GitHub ↗",

          url:
            "https://github.com/VTXZenyx/course-enrolment-web-app",

          type:
            "ghost"
        }
      ]
    },


    systems: {
      kicker:
        "INFORMATION SYSTEMS · ANALYSIS",

      title:
        "Business & Systems Analysis",

      desc:
        "Information Systems work focused on understanding users, stakeholders and the problems that systems are intended to solve before developing possible responses.",

      evidence: [
        [
          "USER RESEARCH",
          "Worked with user and stakeholder research, including interviews"
        ],
        [
          "ANALYSIS",
          "Analysed evidence and recurring themes to better understand problems and user needs"
        ],
        [
          "REQUIREMENTS",
          "Worked with business rules, requirements and stakeholder needs"
        ],
        [
          "PROBLEM DEFINITION",
          "Used structured problem framing before moving towards possible solutions"
        ],
        [
          "SOLUTION DEVELOPMENT",
          "Developed ideas and used prototyping and testing to refine possible responses"
        ]
      ],

      tags: [
        "USER RESEARCH",
        "STAKEHOLDERS",
        "REQUIREMENTS",
        "PROBLEM DEFINITION",
        "PROTOTYPING"
      ],

      actions: []
    }
  };


  /* =========================================================
     03. FOOTER YEAR
     ========================================================= */

  function initFooterYear() {
    const year =
      $("#year");

    if (!year) {
      return;
    }

    year.textContent =
      new Date().getFullYear();
  }


  /* =========================================================
     04. MOBILE NAVIGATION
     ========================================================= */

  function initMobileNavigation() {
    const toggle =
      $("#navToggle");

    const navigation =
      $("#primaryNav");

    if (
      !toggle ||
      !navigation
    ) {
      return;
    }


    const setOpen =
      (isOpen) => {
        navigation.classList.toggle(
          "open",
          isOpen
        );

        toggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

        toggle.setAttribute(
          "aria-label",
          isOpen
            ? "Close navigation"
            : "Open navigation"
        );
      };


    const isOpen = () =>
      navigation.classList.contains(
        "open"
      );


    toggle.addEventListener(
      "click",
      () => {
        setOpen(
          !isOpen()
        );
      }
    );


    $$(
      "a",
      navigation
    ).forEach(
      (link) => {
        link.addEventListener(
          "click",
          () => {
            setOpen(false);
          }
        );
      }
    );


    document.addEventListener(
      "click",
      (event) => {
        if (!isOpen()) {
          return;
        }

        if (
          navigation.contains(
            event.target
          ) ||
          toggle.contains(
            event.target
          )
        ) {
          return;
        }

        setOpen(false);
      }
    );


    document.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key !== "Escape" ||
          !isOpen()
        ) {
          return;
        }

        setOpen(false);

        toggle.focus();
      }
    );


    const desktopQuery =
      window.matchMedia(
        "(min-width: 821px)"
      );


    const handleDesktopChange =
      (event) => {
        if (event.matches) {
          setOpen(false);
        }
      };


    if (
      desktopQuery.addEventListener
    ) {
      desktopQuery.addEventListener(
        "change",
        handleDesktopChange
      );
    } else {
      desktopQuery.addListener(
        handleDesktopChange
      );
    }
  }


  /* =========================================================
     05. CURSOR HALO
     ========================================================= */

  function initCursorHalo() {
    const halo =
      $(".cursor-halo");

    if (!halo) {
      return;
    }


    if (
      !hasFinePointer.matches ||
      prefersReducedMotion.matches
    ) {
      halo.style.display =
        "none";

      return;
    }


    let frame = null;
    let x = 0;
    let y = 0;


    const draw =
      () => {
        halo.style.left =
          `${x}px`;

        halo.style.top =
          `${y}px`;

        frame = null;
      };


    window.addEventListener(
      "pointermove",
      (event) => {
        x =
          event.clientX;

        y =
          event.clientY;

        if (frame !== null) {
          return;
        }

        frame =
          requestAnimationFrame(
            draw
          );
      },
      {
        passive: true
      }
    );
  }


  /* =========================================================
     06. DOT-MATRIX HERO
     ========================================================= */

  function initDotHero() {
    const canvas =
      $("#dotCanvas");

    if (!canvas) {
      return;
    }


    const context =
      canvas.getContext("2d");

    if (!context) {
      return;
    }


    let width = 0;
    let height = 0;
    let dpr = 1;

    let points = [];

    let pointerX = -9999;
    let pointerY = -9999;

    let drawFrame = null;
    let resizeTimer = null;


    const drawHero =
      () => {
        context.clearRect(
          0,
          0,
          width,
          height
        );


        context.fillStyle =
          "rgba(120, 187, 255, 0.92)";


        context.beginPath();


        for (
          const point of points
        ) {
          let x =
            point.x;

          let y =
            point.y;

          let radius =
            1.7;


          if (
            hasFinePointer.matches &&
            !prefersReducedMotion.matches
          ) {
            const dx =
              x - pointerX;

            const dy =
              y - pointerY;

            const distance =
              Math.hypot(
                dx,
                dy
              );


            if (
              distance < 100
            ) {
              const strength =
                (100 - distance) /
                100;

              const force =
                strength * 20;


              x +=
                (dx /
                  (distance || 1)) *
                force;

              y +=
                (dy /
                  (distance || 1)) *
                force;


              radius +=
                strength * 0.8;
            }
          }


          context.moveTo(
            x + radius,
            y
          );

          context.arc(
            x,
            y,
            radius,
            0,
            Math.PI * 2
          );
        }


        context.fill();

        drawFrame = null;
      };


    const requestDraw =
      () => {
        if (
          drawFrame !== null
        ) {
          return;
        }

        drawFrame =
          requestAnimationFrame(
            drawHero
          );
      };


    const buildPoints =
      () => {
        const rect =
          canvas.getBoundingClientRect();


        width =
          Math.max(
            1,
            Math.round(
              rect.width
            )
          );

        height =
          Math.max(
            1,
            Math.round(
              rect.height
            )
          );


        dpr =
          Math.min(
            window.devicePixelRatio ||
              1,
            2
          );


        canvas.width =
          Math.round(
            width * dpr
          );

        canvas.height =
          Math.round(
            height * dpr
          );


        context.setTransform(
          dpr,
          0,
          0,
          dpr,
          0,
          0
        );


        const offscreen =
          document.createElement(
            "canvas"
          );

        const offscreenContext =
          offscreen.getContext(
            "2d",
            {
              willReadFrequently:
                true
            }
          );


        if (!offscreenContext) {
          return;
        }


        offscreen.width =
          width;

        offscreen.height =
          height;


        const fontSize =
          Math.min(
            width * 0.19,
            height * 0.34
          );


        offscreenContext.clearRect(
          0,
          0,
          width,
          height
        );


        offscreenContext.fillStyle =
          "#ffffff";


        offscreenContext.font =
          `800 ${fontSize}px Manrope, sans-serif`;


        offscreenContext.textAlign =
          "center";


        offscreenContext.textBaseline =
          "middle";


        offscreenContext.fillText(
          "VIRAJ",
          width / 2,
          height * 0.34
        );


        offscreenContext.fillText(
          "GANDHI",
          width / 2,
          height * 0.68
        );


        const imageData =
          offscreenContext.getImageData(
            0,
            0,
            width,
            height
          ).data;


        let step = 8;


        if (
          width < 480
        ) {
          step = 6;
        } else if (
          width < 800
        ) {
          step = 7;
        }


        const nextPoints = [];


        for (
          let y = 0;
          y < height;
          y += step
        ) {
          for (
            let x = 0;
            x < width;
            x += step
          ) {
            const alpha =
              imageData[
                (
                  y * width +
                  x
                ) *
                  4 +
                3
              ];


            if (
              alpha > 90
            ) {
              nextPoints.push({
                x,
                y
              });
            }
          }
        }


        points =
          nextPoints;


        requestDraw();
      };


    if (
      hasFinePointer.matches &&
      !prefersReducedMotion.matches
    ) {
      canvas.addEventListener(
        "pointermove",
        (event) => {
          const rect =
            canvas.getBoundingClientRect();


          pointerX =
            event.clientX -
            rect.left;

          pointerY =
            event.clientY -
            rect.top;


          requestDraw();
        },
        {
          passive: true
        }
      );


      canvas.addEventListener(
        "pointerleave",
        () => {
          pointerX =
            -9999;

          pointerY =
            -9999;

          requestDraw();
        }
      );
    }


    const rebuild =
      () => {
        clearTimeout(
          resizeTimer
        );

        resizeTimer =
          setTimeout(
            buildPoints,
            100
          );
      };


    if (
      "ResizeObserver"
      in window
    ) {
      const resizeObserver =
        new ResizeObserver(
          rebuild
        );

      resizeObserver.observe(
        canvas
      );
    } else {
      window.addEventListener(
        "resize",
        rebuild,
        {
          passive: true
        }
      );
    }


    buildPoints();


    if (
      document.fonts?.ready
    ) {
      document.fonts.ready.then(
        buildPoints
      );
    }
  }


  /* =========================================================
     07. SCROLL REVEAL
     ========================================================= */

  function initRevealAnimations() {
    const elements =
      $$(".reveal");


    if (
      prefersReducedMotion.matches ||
      !(
        "IntersectionObserver"
        in window
      )
    ) {
      elements.forEach(
        (element) => {
          element.classList.add(
            "visible"
          );
        }
      );

      return;
    }


    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                !entry.isIntersecting
              ) {
                return;
              }


              entry.target.classList.add(
                "visible"
              );


              observer.unobserve(
                entry.target
              );
            }
          );
        },
        {
          threshold: 0.08,
          rootMargin:
            "0px 0px -30px 0px"
        }
      );


    elements.forEach(
      (element) => {
        observer.observe(
          element
        );
      }
    );
  }


  /* =========================================================
     08. PROJECT MODAL
     ========================================================= */

  function initProjectModal() {
    const modal =
      $("#projectModal");

    if (!modal) {
      return;
    }


    const title =
      $("#modalTitle");

    const kicker =
      $("#modalKicker");

    const description =
      $("#modalDesc");

    const evidence =
      $("#modalEvidence");

    const tags =
      $("#modalTags");

    const actions =
      $("#modalActions");

    const closeButton =
      $(
        ".project-modal-close",
        modal
      );

    const secondaryClose =
      $("#modalCloseSecondary");

    const main =
      $("main");

    const topbar =
      $(".topbar");


    if (
      !title ||
      !kicker ||
      !description ||
      !evidence ||
      !tags ||
      !actions
    ) {
      return;
    }


    let previousFocus = null;


    const setBackgroundInert =
      (isInert) => {
        if (main) {
          main.inert =
            isInert;
        }

        if (topbar) {
          topbar.inert =
            isInert;
        }
      };


    const getFocusableElements =
      () =>
        $$(
          [
            "a[href]",
            "button:not([disabled])",
            "[tabindex]:not([tabindex='-1'])"
          ].join(","),
          modal
        ).filter(
          (element) =>
            !element.hasAttribute(
              "hidden"
            )
        );


    const closeModal =
      () => {
        if (
          !modal.classList.contains(
            "open"
          )
        ) {
          return;
        }


        modal.classList.remove(
          "open"
        );


        modal.setAttribute(
          "aria-hidden",
          "true"
        );


        document.body.style.overflow =
          "";


        setBackgroundInert(
          false
        );


        if (
          previousFocus instanceof
          HTMLElement
        ) {
          previousFocus.focus();
        }


        previousFocus = null;
      };


    const renderEvidence =
      (items) => {
        evidence.replaceChildren();


        items.forEach(
          ([label, value]) => {
            const row =
              document.createElement(
                "div"
              );

            const labelElement =
              document.createElement(
                "span"
              );

            const valueElement =
              document.createElement(
                "strong"
              );


            labelElement.textContent =
              label;

            valueElement.textContent =
              value;


            row.append(
              labelElement,
              valueElement
            );


            evidence.append(
              row
            );
          }
        );
      };


    const renderTags =
      (projectTags) => {
        tags.replaceChildren();


        projectTags.forEach(
          (tag) => {
            const tagElement =
              document.createElement(
                "span"
              );

            tagElement.textContent =
              tag;


            tags.append(
              tagElement
            );
          }
        );
      };


    const renderActions =
      (projectActions) => {
        actions.replaceChildren();


        projectActions.forEach(
          (action) => {
            const link =
              document.createElement(
                "a"
              );


            link.className =
              `button ${
                action.type ===
                "primary"
                  ? "button-primary"
                  : "button-ghost"
              } compact`;


            link.href =
              action.url;


            link.target =
              "_blank";


            link.rel =
              "noopener noreferrer";


            link.textContent =
              action.label;


            actions.append(
              link
            );
          }
        );
      };


    const openModal =
      (
        projectKey,
        trigger
      ) => {
        const project =
          PROJECTS[
            projectKey
          ];


        if (!project) {
          return;
        }


        previousFocus =
          trigger;


        kicker.textContent =
          project.kicker;


        title.textContent =
          project.title;


        description.textContent =
          project.desc;


        renderEvidence(
          project.evidence
        );


        renderTags(
          project.tags
        );


        renderActions(
          project.actions
        );


        modal.classList.add(
          "open"
        );


        modal.setAttribute(
          "aria-hidden",
          "false"
        );


        document.body.style.overflow =
          "hidden";


        setBackgroundInert(
          true
        );


        requestAnimationFrame(
          () => {
            closeButton?.focus();
          }
        );
      };


    $$(
      "[data-open-project]"
    ).forEach(
      (button) => {
        button.addEventListener(
          "click",
          () => {
            openModal(
              button.dataset
                .openProject,
              button
            );
          }
        );
      }
    );


    closeButton?.addEventListener(
      "click",
      closeModal
    );


    secondaryClose?.addEventListener(
      "click",
      closeModal
    );


    modal.addEventListener(
      "click",
      (event) => {
        if (
          event.target ===
          modal
        ) {
          closeModal();
        }
      }
    );


    document.addEventListener(
      "keydown",
      (event) => {
        if (
          !modal.classList.contains(
            "open"
          )
        ) {
          return;
        }


        if (
          event.key ===
          "Escape"
        ) {
          event.preventDefault();

          closeModal();

          return;
        }


        if (
          event.key !==
          "Tab"
        ) {
          return;
        }


        const focusable =
          getFocusableElements();


        if (
          focusable.length === 0
        ) {
          return;
        }


        const first =
          focusable[0];

        const last =
          focusable[
            focusable.length - 1
          ];


        if (
          event.shiftKey &&
          document.activeElement ===
            first
        ) {
          event.preventDefault();

          last.focus();

          return;
        }


        if (
          !event.shiftKey &&
          document.activeElement ===
            last
        ) {
          event.preventDefault();

          first.focus();
        }
      }
    );
  }


  /* =========================================================
     09. GAME TABS
     ========================================================= */

  function initGameTabs() {
    const tabs =
      $$(".game-tab");

    const panels =
      $$(".game-panel");


    if (
      tabs.length === 0 ||
      panels.length === 0
    ) {
      return;
    }


    const activateGame =
      (gameName) => {
        tabs.forEach(
          (tab) => {
            const active =
              tab.dataset.game ===
              gameName;


            tab.classList.toggle(
              "active",
              active
            );


            tab.setAttribute(
              "aria-selected",
              String(active)
            );


            tab.tabIndex =
              active
                ? 0
                : -1;
          }
        );


        panels.forEach(
          (panel) => {
            const active =
              panel.id ===
              `game-${gameName}`;


            panel.classList.toggle(
              "active",
              active
            );


            panel.hidden =
              !active;


            panel.setAttribute(
              "aria-hidden",
              String(!active)
            );
          }
        );


        document.dispatchEvent(
          new CustomEvent(
            "portfolio:gamechange",
            {
              detail: {
                game:
                  gameName
              }
            }
          )
        );
      };


    tabs.forEach(
      (
        tab,
        index
      ) => {
        const gameName =
          tab.dataset.game;


        tab.id =
          `game-tab-${gameName}`;


        const panel =
          $(
            `#game-${gameName}`
          );


        if (panel) {
          panel.setAttribute(
            "aria-labelledby",
            tab.id
          );
        }


        tab.addEventListener(
          "click",
          () => {
            activateGame(
              gameName
            );
          }
        );


        tab.addEventListener(
          "keydown",
          (event) => {
            let nextIndex = null;


            if (
              event.key ===
                "ArrowRight" ||
              event.key ===
                "ArrowDown"
            ) {
              nextIndex =
                (
                  index + 1
                ) %
                tabs.length;
            }


            if (
              event.key ===
                "ArrowLeft" ||
              event.key ===
                "ArrowUp"
            ) {
              nextIndex =
                (
                  index -
                  1 +
                  tabs.length
                ) %
                tabs.length;
            }


            if (
              event.key ===
              "Home"
            ) {
              nextIndex = 0;
            }


            if (
              event.key ===
              "End"
            ) {
              nextIndex =
                tabs.length - 1;
            }


            if (
              nextIndex ===
              null
            ) {
              return;
            }


            event.preventDefault();


            const nextTab =
              tabs[nextIndex];


            activateGame(
              nextTab.dataset.game
            );


            nextTab.focus();
          }
        );
      }
    );


    const initialGame =
      tabs.find(
        (tab) =>
          tab.classList.contains(
            "active"
          )
      )?.dataset.game ||
      tabs[0].dataset.game;


    activateGame(
      initialGame
    );
  }


  /* =========================================================
     10. REACTION GAME
     ========================================================= */

  function initReactionGame() {
    const box =
      $("#reactionBox");

    const start =
      $("#reactionStart");

    const text =
      $("#reactionText");

    const subtitle =
      $("#reactionSub");

    const bestElement =
      $("#reactionBest");


    if (
      !box ||
      !start ||
      !text ||
      !subtitle ||
      !bestElement
    ) {
      return;
    }


    const storageKey =
      "vg2026_reaction_best";


    let timer = null;
    let readyAt = 0;
    let active = false;


    let best =
      getStoredNumber(
        storageKey,
        0
      );


    bestElement.textContent =
      best > 0
        ? `${best} ms`
        : "--- ms";


    const resetRound =
      () => {
        if (timer) {
          clearTimeout(
            timer
          );
        }


        timer = null;
        active = false;
        readyAt = 0;


        box.classList.remove(
          "waiting",
          "ready"
        );


        text.textContent =
          "PRESS START";


        subtitle.textContent =
          "Wait for the signal, then click.";
      };


    start.addEventListener(
      "click",
      () => {
        if (timer) {
          clearTimeout(
            timer
          );
        }


        active = true;
        readyAt = 0;


        box.classList.remove(
          "ready"
        );


        box.classList.add(
          "waiting"
        );


        text.textContent =
          "WAIT...";


        subtitle.textContent =
          "Don't click yet.";


        timer =
          setTimeout(
            () => {
              timer = null;


              readyAt =
                performance.now();


              box.classList.remove(
                "waiting"
              );


              box.classList.add(
                "ready"
              );


              text.textContent =
                "CLICK!";


              subtitle.textContent =
                "Now!";
            },
            900 +
              Math.random() *
                2200
          );
      }
    );


    box.addEventListener(
      "click",
      () => {
        if (!active) {
          return;
        }


        if (!readyAt) {
          if (timer) {
            clearTimeout(
              timer
            );
          }


          timer = null;
          active = false;


          box.classList.remove(
            "waiting"
          );


          text.textContent =
            "TOO EARLY";


          subtitle.textContent =
            "Start another round.";


          return;
        }


        const milliseconds =
          Math.round(
            performance.now() -
              readyAt
          );


        active = false;
        readyAt = 0;


        box.classList.remove(
          "ready"
        );


        text.textContent =
          `${milliseconds} ms`;


        if (
          milliseconds < 220
        ) {
          subtitle.textContent =
            "Very quick.";
        } else if (
          milliseconds < 320
        ) {
          subtitle.textContent =
            "Nice reaction.";
        } else {
          subtitle.textContent =
            "Try another round.";
        }


        if (
          !best ||
          milliseconds < best
        ) {
          best =
            milliseconds;


          setStoredNumber(
            storageKey,
            best
          );


          bestElement.textContent =
            `${best} ms`;
        }
      }
    );


    document.addEventListener(
      "portfolio:gamechange",
      (event) => {
        if (
          event.detail?.game !==
          "reaction"
        ) {
          resetRound();
        }
      }
    );


    document.addEventListener(
      "visibilitychange",
      () => {
        if (
          document.hidden
        ) {
          resetRound();
        }
      }
    );
  }


  /* =========================================================
     11. SNAKE
     ========================================================= */

  function initSnakeGame() {
    const canvas =
      $("#snakeCanvas");

    const startButton =
      $("#snakeStart");

    const scoreElement =
      $("#snakeScore");

    const bestElement =
      $("#snakeBest");

    const snakePanel =
      $("#game-snake");


    if (
      !canvas ||
      !startButton ||
      !scoreElement ||
      !bestElement
    ) {
      return;
    }


    const context =
      canvas.getContext(
        "2d"
      );


    if (!context) {
      return;
    }


    const cells = 20;

    const storageKey =
      "vg2026_snake_best";


    let snake = [];

    let direction = {
      x: 1,
      y: 0
    };

    let nextDirection = {
      x: 1,
      y: 0
    };

    let food = {
      x: 10,
      y: 10
    };

    let loop = null;
    let running = false;

    let score = 0;


    let best =
      getStoredNumber(
        storageKey,
        0
      );


    bestElement.textContent =
      best;


    const stopLoop =
      () => {
        if (loop) {
          clearInterval(
            loop
          );

          loop = null;
        }
      };


    const pauseGame =
      () => {
        stopLoop();
      };


    const resumeGame =
      () => {
        if (
          !running ||
          loop
        ) {
          return;
        }


        loop =
          setInterval(
            step,
            110
          );
      };


    const spawnFood =
      () => {
        do {
          food = {
            x:
              Math.floor(
                Math.random() *
                  cells
              ),

            y:
              Math.floor(
                Math.random() *
                  cells
              )
          };
        } while (
          snake.some(
            (segment) =>
              segment.x ===
                food.x &&
              segment.y ===
                food.y
          )
        );
      };


    const drawSnake =
      () => {
        const cellSize =
          canvas.width /
          cells;


        context.fillStyle =
          "#06101d";


        context.fillRect(
          0,
          0,
          canvas.width,
          canvas.height
        );


        context.strokeStyle =
          "rgba(100,145,205,.06)";


        context.lineWidth =
          1;


        for (
          let index = 0;
          index <= cells;
          index++
        ) {
          context.beginPath();


          context.moveTo(
            index * cellSize,
            0
          );


          context.lineTo(
            index * cellSize,
            canvas.height
          );


          context.stroke();


          context.beginPath();


          context.moveTo(
            0,
            index * cellSize
          );


          context.lineTo(
            canvas.width,
            index * cellSize
          );


          context.stroke();
        }


        snake.forEach(
          (
            segment,
            index
          ) => {
            context.fillStyle =
              index === 0
                ? "#8ccaff"
                : "#69d7ff";


            context.fillRect(
              segment.x *
                cellSize +
                2,

              segment.y *
                cellSize +
                2,

              cellSize - 4,

              cellSize - 4
            );
          }
        );


        context.fillStyle =
          "#67e8a5";


        context.beginPath();


        context.arc(
          food.x *
            cellSize +
            cellSize / 2,

          food.y *
            cellSize +
            cellSize / 2,

          cellSize * 0.3,

          0,

          Math.PI * 2
        );


        context.fill();
      };


    const endGame =
      () => {
        stopLoop();

        running = false;


        if (
          score > best
        ) {
          best =
            score;


          setStoredNumber(
            storageKey,
            best
          );


          bestElement.textContent =
            best;
        }
      };


    function step() {
      direction =
        nextDirection;


      const head = {
        x:
          snake[0].x +
          direction.x,

        y:
          snake[0].y +
          direction.y
      };


      const hitWall =
        head.x < 0 ||
        head.y < 0 ||
        head.x >= cells ||
        head.y >= cells;


      const ateFood =
        head.x === food.x &&
        head.y === food.y;


      /*
        If food is not eaten, the tail moves away during
        this step. Excluding it prevents false collisions.
      */

      const bodyToCheck =
        ateFood
          ? snake
          : snake.slice(
              0,
              -1
            );


      const hitSelf =
        bodyToCheck.some(
          (segment) =>
            segment.x ===
              head.x &&
            segment.y ===
              head.y
        );


      if (
        hitWall ||
        hitSelf
      ) {
        endGame();

        return;
      }


      snake.unshift(
        head
      );


      if (ateFood) {
        score += 1;


        scoreElement.textContent =
          score;


        spawnFood();
      } else {
        snake.pop();
      }


      drawSnake();
    }


    const startGame =
      () => {
        stopLoop();


        snake = [
          {
            x: 6,
            y: 10
          },
          {
            x: 5,
            y: 10
          },
          {
            x: 4,
            y: 10
          }
        ];


        direction = {
          x: 1,
          y: 0
        };


        nextDirection = {
          x: 1,
          y: 0
        };


        score = 0;


        scoreElement.textContent =
          "0";


        spawnFood();

        drawSnake();


        running = true;


        loop =
          setInterval(
            step,
            110
          );
      };


    const changeDirection =
      (name) => {
        const directions = {
          up: {
            x: 0,
            y: -1
          },

          down: {
            x: 0,
            y: 1
          },

          left: {
            x: -1,
            y: 0
          },

          right: {
            x: 1,
            y: 0
          }
        };


        const newDirection =
          directions[name];


        if (!newDirection) {
          return;
        }


        const reversing =
          newDirection.x ===
            -direction.x &&
          newDirection.y ===
            -direction.y;


        if (!reversing) {
          nextDirection =
            newDirection;
        }
      };


    document.addEventListener(
      "keydown",
      (event) => {
        if (
          snakePanel &&
          !snakePanel.classList.contains(
            "active"
          )
        ) {
          return;
        }


        const activeElement =
          document.activeElement;


        if (
          activeElement instanceof
            HTMLInputElement ||
          activeElement instanceof
            HTMLTextAreaElement ||
          activeElement instanceof
            HTMLSelectElement
        ) {
          return;
        }


        const keyMap = {
          ArrowUp:
            "up",

          w:
            "up",

          W:
            "up",

          ArrowDown:
            "down",

          s:
            "down",

          S:
            "down",

          ArrowLeft:
            "left",

          a:
            "left",

          A:
            "left",

          ArrowRight:
            "right",

          d:
            "right",

          D:
            "right"
        };


        const directionName =
          keyMap[
            event.key
          ];


        if (!directionName) {
          return;
        }


        event.preventDefault();


        changeDirection(
          directionName
        );
      }
    );


    $$(
      "[data-dir]"
    ).forEach(
      (button) => {
        button.addEventListener(
          "click",
          () => {
            changeDirection(
              button.dataset.dir
            );
          }
        );
      }
    );


    startButton.addEventListener(
      "click",
      startGame
    );


    document.addEventListener(
      "portfolio:gamechange",
      (event) => {
        if (
          event.detail?.game ===
          "snake"
        ) {
          resumeGame();
        } else {
          pauseGame();
        }
      }
    );


    document.addEventListener(
      "visibilitychange",
      () => {
        if (
          document.hidden
        ) {
          pauseGame();
        } else if (
          snakePanel?.classList.contains(
            "active"
          )
        ) {
          resumeGame();
        }
      }
    );


    snake = [
      {
        x: 6,
        y: 10
      },
      {
        x: 5,
        y: 10
      },
      {
        x: 4,
        y: 10
      }
    ];


    spawnFood();

    drawSnake();
  }


  /* =========================================================
     12. SQL QUIZ
     ========================================================= */

  function initSqlQuiz() {
    const quiz =
      $("#sqlQuiz");

    const progress =
      $("#sqlProgress");

    const bestElement =
      $("#sqlBest");

    const restart =
      $("#sqlRestart");


    if (
      !quiz ||
      !progress ||
      !bestElement ||
      !restart
    ) {
      return;
    }


    const storageKey =
      "vg2026_sql_best";


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

        correct:
          1
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

        correct:
          1
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

        correct:
          2
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

        correct:
          0
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

        correct:
          0
      }
    ];


    let currentQuestion = 0;
    let score = 0;


    let best =
      Math.min(
        5,
        Math.max(
          0,
          getStoredNumber(
            storageKey,
            0
          )
        )
      );


    bestElement.textContent =
      `${best}/5`;


    const renderQuestion =
      () => {
        const current =
          questions[
            currentQuestion
          ];


        progress.textContent =
          `Question ${
            currentQuestion + 1
          } of ${
            questions.length
          }`;


        quiz.replaceChildren();


        const questionBox =
          document.createElement(
            "div"
          );


        questionBox.className =
          "sql-question";


        const code =
          document.createElement(
            "code"
          );


        code.textContent =
          current.code;


        const heading =
          document.createElement(
            "h4"
          );


        heading.textContent =
          current.question;


        const answers =
          document.createElement(
            "div"
          );


        answers.className =
          "sql-answers";


        current.answers.forEach(
          (
            answer,
            index
          ) => {
            const button =
              document.createElement(
                "button"
              );


            button.className =
              "sql-answer";


            button.type =
              "button";


            button.dataset.answer =
              String(index);


            button.textContent =
              answer;


            button.addEventListener(
              "click",
              () => {
                chooseAnswer(
                  index,
                  button
                );
              }
            );


            answers.append(
              button
            );
          }
        );


        questionBox.append(
          code,
          heading,
          answers
        );


        quiz.append(
          questionBox
        );
      };


    const finishQuiz =
      () => {
        if (
          score > best
        ) {
          best =
            score;


          setStoredNumber(
            storageKey,
            best
          );


          bestElement.textContent =
            `${best}/5`;
        }


        quiz.replaceChildren();


        const result =
          document.createElement(
            "div"
          );


        result.className =
          "sql-question";


        const heading =
          document.createElement(
            "h4"
          );


        heading.textContent =
          `You scored ${score}/5`;


        const message =
          document.createElement(
            "p"
          );


        message.textContent =
          "Small quiz, real database fundamentals.";


        result.append(
          heading,
          message
        );


        quiz.append(
          result
        );


        progress.textContent =
          "Complete";
      };


    function chooseAnswer(
      selected,
      selectedButton
    ) {
      const buttons =
        $$(
          ".sql-answer",
          quiz
        );


      buttons.forEach(
        (button) => {
          button.disabled =
            true;
        }
      );


      const correct =
        questions[
          currentQuestion
        ].correct;


      if (
        selected === correct
      ) {
        score += 1;


        selectedButton.classList.add(
          "correct"
        );
      } else {
        selectedButton.classList.add(
          "wrong"
        );


        buttons[
          correct
        ]?.classList.add(
          "correct"
        );
      }


      window.setTimeout(
        () => {
          currentQuestion += 1;


          if (
            currentQuestion >=
            questions.length
          ) {
            finishQuiz();

            return;
          }


          renderQuestion();
        },
        650
      );
    }


    restart.addEventListener(
      "click",
      () => {
        currentQuestion = 0;
        score = 0;

        renderQuestion();
      }
    );


    renderQuestion();
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


  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once: true
      }
    );
  } else {
    init();
  }

})();
