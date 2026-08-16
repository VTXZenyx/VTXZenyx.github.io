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
    const value = Number(localStorage.getItem(key));

    return Number.isFinite(value)
      ? value
      : fallback;
  };

  const setStoredNumber = (key, value) => {
    try {
      localStorage.setItem(key, String(value));
    } catch {
      /* localStorage may be blocked by the browser */
    }
  };


  /* =========================================================
     02. PROJECT INFORMATION
     ========================================================= */

  const PROJECTS = {
    waid: {
      kicker: "APPLICATION DEVELOPMENT · 2026",

      title: "Course Enrolment Web App",

      desc:
        "A working web application that turns course-enrolment business rules into interactive application logic. Students can log in, browse courses, enrol or drop courses, and receive feedback when prerequisites, timetable clashes or approval rules affect an enrolment.",

      evidence: [
        [
          "WHAT I BUILT",
          "Login, course browsing, enrol/drop actions and status feedback"
        ],
        [
          "BUSINESS LOGIC",
          "Prerequisites, timetable clashes, approval-required enrolments and course limits"
        ],
        [
          "DATA",
          "External course/student JSON with fallback sample data"
        ],
        [
          "TOOLS",
          "HTML, CSS, Vue.js and Python through Brython"
        ]
      ],

      tags: [
        "HTML",
        "CSS",
        "VUE.JS",
        "PYTHON / BRYTHON",
        "JSON"
      ],

      actions: [
        [
          "View live app ↗",
          "https://vtxzenyx.github.io/course-enrolment-web-app/",
          "primary"
        ],
        [
          "View GitHub ↗",
          "https://github.com/VTXZenyx/course-enrolment-web-app",
          "ghost"
        ]
      ]
    },


    sql: {
      kicker: "SQL · SQLITE · DATABASE DESIGN",

      title: "SQL & Relational Database Portfolio",

      desc:
        "A portfolio of my university database work, organised by topic. It includes SQL query files, relational database design, normalisation work, database evidence and practical work completed using SQLite and DB Browser for SQLite.",

      evidence: [
        [
          "QUERYING",
          "Filtering, multi-table joins, GROUP BY, HAVING and aggregate analysis"
        ],
        [
          "ADVANCED SQL",
          "Nested and correlated subqueries, self joins and date/time functions"
        ],
        [
          "DATABASE DESIGN",
          "Functional dependencies, normalisation, primary keys, foreign keys and composite keys"
        ],
        [
          "OPERATIONS",
          "DDL/DML, transactions, ACID concepts and SQL views"
        ],
        [
          "TOOLS",
          "SQLite, DB Browser for SQLite and Draw.io"
        ]
      ],

      tags: [
        "SQL",
        "SQLITE",
        "DB BROWSER",
        "SUBQUERIES",
        "NORMALISATION",
        "TRANSACTIONS"
      ],

      actions: [
        [
          "View SQL portfolio ↗",
          "https://github.com/VTXZenyx/sql-database-portfolio",
          "primary"
        ]
      ]
    },


    r: {
      kicker: "R · RSTUDIO · R MARKDOWN",

      title: "R Programming & Data Analysis",

      desc:
        "University work using R and RStudio for programming and data analysis. I use R Markdown to combine executable code with written explanations and am continuing to develop my skills as I work with more datasets and analysis tasks.",

      evidence: [
        [
          "TOOLS",
          "R, RStudio and R Markdown"
        ],
        [
          "PROGRAMMING",
          "Vectors, indexing, logical filtering, matrices and debugging"
        ],
        [
          "DATA",
          "Missing values and working with CSV datasets"
        ],
        [
          "CURRENT FOCUS",
          "Continuing to develop my R programming and data-analysis skills"
        ]
      ],

      tags: [
        "R",
        "RSTUDIO",
        "R MARKDOWN",
        "CSV"
      ],

      actions: []
    },


    systems: {
      kicker: "INFORMATION SYSTEMS",

      title: "Systems Thinking & Stakeholder Analysis",

      desc:
        "Systems and business-analysis work where I looked at stakeholders, relationships, system boundaries, feedback and trade-offs before jumping straight to a solution.",

      evidence: [
        [
          "FOCUS",
          "People, processes, technology and system context"
        ],
        [
          "METHODS",
          "Stakeholder analysis, systems thinking and problem framing"
        ],
        [
          "GOAL",
          "Understand the problem clearly before designing a response"
        ]
      ],

      tags: [
        "STAKEHOLDERS",
        "SYSTEMS",
        "PROBLEM FRAMING"
      ],

      actions: []
    }
  };


  /* =========================================================
     03. LOCAL TIME + FOOTER YEAR
     ========================================================= */

  function initClock() {
    const clock = $("#clock");
    const year = $("#year");

    if (year) {
      year.textContent =
        new Date().getFullYear();
    }

    const updateClock = () => {
      if (!clock) return;

      try {
        clock.textContent =
          new Intl.DateTimeFormat(
            "en-NZ",
            {
              timeZone: "Pacific/Auckland",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false
            }
          ).format(new Date());
      } catch {
        clock.textContent =
          new Date().toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit"
            }
          );
      }
    };

    updateClock();

    setInterval(
      updateClock,
      30_000
    );
  }


  /* =========================================================
     04. CURSOR HALO
     ========================================================= */

  function initCursorHalo() {
    const halo =
      $(".cursor-halo");

    if (!halo) return;

    window.addEventListener(
      "pointermove",
      (event) => {
        halo.style.left =
          `${event.clientX}px`;

        halo.style.top =
          `${event.clientY}px`;
      },
      {
        passive: true
      }
    );
  }


  /* =========================================================
     05. DOT-MATRIX HERO
     ========================================================= */

  function initDotHero() {
    const canvas =
      $("#dotCanvas");

    if (!canvas) return;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;


    let width = 0;
    let height = 0;
    let dpr = 1;

    let points = [];

    let mouseX = -9999;
    let mouseY = -9999;

    let animationFrame = null;


    function buildPoints() {
      const rect =
        canvas.getBoundingClientRect();

      dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      width = Math.max(
        1,
        Math.floor(rect.width)
      );

      height = Math.max(
        1,
        Math.floor(rect.height)
      );


      canvas.width =
        width * dpr;

      canvas.height =
        height * dpr;


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

      const offCtx =
        offscreen.getContext("2d");


      if (!offCtx) return;


      offscreen.width =
        width;

      offscreen.height =
        height;


      const fontSize =
        Math.min(
          width * 0.19,
          height * 0.34
        );


      offCtx.clearRect(
        0,
        0,
        width,
        height
      );

      offCtx.fillStyle =
        "#ffffff";

      offCtx.font =
        `800 ${fontSize}px Manrope, sans-serif`;

      offCtx.textAlign =
        "center";

      offCtx.textBaseline =
        "middle";


      offCtx.fillText(
        "VIRAJ",
        width / 2,
        height * 0.34
      );

      offCtx.fillText(
        "GANDHI",
        width / 2,
        height * 0.68
      );


      const image =
        offCtx.getImageData(
          0,
          0,
          width,
          height
        );

      const data =
        image.data;

      const step =
        width < 650
          ? 7
          : 8;


      points = [];


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
            data[
              (y * width + x) *
              4 +
              3
            ];

          if (alpha > 80) {
            points.push({
              x,
              y
            });
          }
        }
      }
    }


    function drawHero() {
      ctx.clearRect(
        0,
        0,
        width,
        height
      );


      for (
        const point of points
      ) {
        let x =
          point.x;

        let y =
          point.y;


        const dx =
          x - mouseX;

        const dy =
          y - mouseY;

        const distance =
          Math.hypot(
            dx,
            dy
          );


        if (distance < 90) {
          const force =
            ((90 - distance) / 90) *
            19;

          x +=
            (dx / (distance || 1)) *
            force;

          y +=
            (dy / (distance || 1)) *
            force;
        }


        const glow =
          ctx.createRadialGradient(
            x,
            y,
            0,
            x,
            y,
            4
          );


        glow.addColorStop(
          0,
          "rgba(130,196,255,.96)"
        );

        glow.addColorStop(
          1,
          "rgba(50,116,255,.08)"
        );


        ctx.fillStyle =
          glow;

        ctx.beginPath();

        ctx.arc(
          x,
          y,
          2.05,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }


      animationFrame =
        requestAnimationFrame(
          drawHero
        );
    }


    canvas.addEventListener(
      "pointermove",
      (event) => {
        const rect =
          canvas.getBoundingClientRect();

        mouseX =
          event.clientX -
          rect.left;

        mouseY =
          event.clientY -
          rect.top;
      }
    );


    canvas.addEventListener(
      "pointerleave",
      () => {
        mouseX = -9999;
        mouseY = -9999;
      }
    );


    let resizeTimer;

    window.addEventListener(
      "resize",
      () => {
        clearTimeout(
          resizeTimer
        );

        resizeTimer =
          setTimeout(
            buildPoints,
            120
          );
      }
    );


    if (document.fonts?.ready) {
      document.fonts.ready.then(
        buildPoints
      );
    }


    buildPoints();
    drawHero();


    window.addEventListener(
      "beforeunload",
      () => {
        if (animationFrame) {
          cancelAnimationFrame(
            animationFrame
          );
        }
      }
    );
  }


  /* =========================================================
     06. SCROLL REVEAL
     ========================================================= */

  function initRevealAnimations() {
    const elements =
      $$(".reveal");


    if (
      !(
        "IntersectionObserver"
        in window
      )
    ) {
      elements.forEach(
        (element) =>
          element.classList.add(
            "visible"
          )
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
          threshold: 0.12
        }
      );


    elements.forEach(
      (element) =>
        observer.observe(
          element
        )
    );
  }


  /* =========================================================
     07. PROJECT MODAL
     ========================================================= */

  function initProjectModal() {
    const modal =
      $("#projectModal");

    if (!modal) return;


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


    let previousFocus = null;


    function closeModal() {
      modal.classList.remove(
        "open"
      );

      modal.setAttribute(
        "aria-hidden",
        "true"
      );

      document.body.style.overflow =
        "";


      if (previousFocus) {
        previousFocus.focus();
      }
    }


    function openModal(
      projectKey,
      trigger
    ) {
      const project =
        PROJECTS[projectKey];

      if (!project) return;


      previousFocus =
        trigger;


      kicker.textContent =
        project.kicker;

      title.textContent =
        project.title;

      description.textContent =
        project.desc;


      evidence.innerHTML =
        project.evidence
          .map(
            ([label, value]) => `
              <div>
                <span>${label}</span>
                <strong>${value}</strong>
              </div>
            `
          )
          .join("");


      tags.innerHTML =
        project.tags
          .map(
            (tag) =>
              `<span>${tag}</span>`
          )
          .join("");


      actions.innerHTML =
        project.actions
          .map(
            (
              [
                label,
                url,
                type
              ]
            ) => `
              <a
                class="button ${
                  type === "primary"
                    ? "button-primary"
                    : "button-ghost"
                } compact"
                href="${url}"
                target="_blank"
                rel="noreferrer"
              >
                ${label}
              </a>
            `
          )
          .join("");


      modal.classList.add(
        "open"
      );

      modal.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.style.overflow =
        "hidden";


      $(
        ".project-modal-close",
        modal
      )?.focus();
    }


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


    $(
      ".project-modal-close"
    )?.addEventListener(
      "click",
      closeModal
    );


    $(
      "#modalCloseSecondary"
    )?.addEventListener(
      "click",
      closeModal
    );


    modal.addEventListener(
      "click",
      (event) => {
        if (
          event.target === modal
        ) {
          closeModal();
        }
      }
    );


    document.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key ===
            "Escape" &&
          modal.classList.contains(
            "open"
          )
        ) {
          closeModal();
        }
      }
    );
  }


  /* =========================================================
     08. GAME TABS
     ========================================================= */

  function initGameTabs() {
    const tabs =
      $$(".game-tab");

    const panels =
      $$(".game-panel");


    tabs.forEach(
      (button) => {
        button.addEventListener(
          "click",
          () => {
            tabs.forEach(
              (tab) => {
                const active =
                  tab === button;

                tab.classList.toggle(
                  "active",
                  active
                );

                tab.setAttribute(
                  "aria-selected",
                  active
                    ? "true"
                    : "false"
                );
              }
            );


            panels.forEach(
              (panel) => {
                panel.classList.toggle(
                  "active",
                  panel.id ===
                    `game-${button.dataset.game}`
                );
              }
            );
          }
        );
      }
    );
  }


  /* =========================================================
     09. REACTION GAME
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
      best
        ? `${best} ms`
        : "--- ms";


    start.addEventListener(
      "click",
      () => {
        clearTimeout(timer);

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
        if (!active) return;


        if (!readyAt) {
          clearTimeout(timer);

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


        box.classList.remove(
          "ready"
        );


        text.textContent =
          `${milliseconds} ms`;


        if (
          milliseconds < 250
        ) {
          subtitle.textContent =
            "Very quick.";
        } else if (
          milliseconds < 350
        ) {
          subtitle.textContent =
            "Nice reaction.";
        } else {
          subtitle.textContent =
            "Try again.";
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
  }


  /* =========================================================
     10. SNAKE
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


    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;


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

    let score = 0;

    let best =
      getStoredNumber(
        storageKey,
        0
      );


    bestElement.textContent =
      best;


    function spawnFood() {
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
    }


    function drawSnake() {
      const cellSize =
        canvas.width /
        cells;


      ctx.fillStyle =
        "#06101d";

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );


      ctx.strokeStyle =
        "rgba(100,145,205,.06)";


      for (
        let index = 0;
        index <= cells;
        index++
      ) {
        ctx.beginPath();

        ctx.moveTo(
          index * cellSize,
          0
        );

        ctx.lineTo(
          index * cellSize,
          canvas.height
        );

        ctx.stroke();


        ctx.beginPath();

        ctx.moveTo(
          0,
          index * cellSize
        );

        ctx.lineTo(
          canvas.width,
          index * cellSize
        );

        ctx.stroke();
      }


      snake.forEach(
        (
          segment,
          index
        ) => {
          ctx.fillStyle =
            index === 0
              ? "#8ccaff"
              : "#69d7ff";


          ctx.fillRect(
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


      ctx.fillStyle =
        "#67e8a5";

      ctx.beginPath();

      ctx.arc(
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

      ctx.fill();
    }


    function endGame() {
      clearInterval(loop);

      loop = null;


      if (score > best) {
        best =
          score;

        setStoredNumber(
          storageKey,
          best
        );


        bestElement.textContent =
          best;
      }
    }


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


      const hitSelf =
        snake.some(
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


      const ateFood =
        head.x === food.x &&
        head.y === food.y;


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


    function startGame() {
      clearInterval(loop);


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


      loop =
        setInterval(
          step,
          110
        );
    }


    function changeDirection(
      name
    ) {
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
    }


    document.addEventListener(
      "keydown",
      (event) => {
        /*
          Only capture gaming keys while
          the Snake tab is actually open.

          This prevents arrow keys/WASD
          from interfering with normal
          page scrolling and navigation.
        */

        if (
          snakePanel &&
          !snakePanel.classList.contains(
            "active"
          )
        ) {
          return;
        }


        const activeTag =
          document.activeElement
            ?.tagName
            ?.toLowerCase();


        if (
          activeTag === "input" ||
          activeTag ===
            "textarea"
        ) {
          return;
        }


        const keyMap = {
          ArrowUp: "up",
          w: "up",
          W: "up",

          ArrowDown: "down",
          s: "down",
          S: "down",

          ArrowLeft: "left",
          a: "left",
          A: "left",

          ArrowRight: "right",
          d: "right",
          D: "right"
        };


        const directionName =
          keyMap[event.key];


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


    /*
      Initial non-moving board.
      The game starts only after
      the user presses Start.
    */

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
     11. SQL QUIZ
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

        correct: 1
      },


      {
        code:
          "SELECT Country, COUNT(*) FROM customers GROUP BY Country;",

        question:
          "What does GROUP BY do here?",

        answers: [
          "Deletes duplicates",
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
          "Why is the JOIN used?",

        answers: [
          "To combine related rows from two tables",
          "To rename a table",
          "To delete duplicate columns",
          "To make a new database"
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
          "Choosing columns",
          "Creating a table",
          "Changing a primary key"
        ],

        correct: 0
      }
    ];


    let currentQuestion = 0;
    let score = 0;

    let best =
      getStoredNumber(
        storageKey,
        0
      );


    bestElement.textContent =
      `${best}/5`;


    function renderQuestion() {
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


      quiz.innerHTML = `
        <div class="sql-question">

          <code>
            ${current.code}
          </code>

          <h4>
            ${current.question}
          </h4>

          <div class="sql-answers">

            ${current.answers
              .map(
                (
                  answer,
                  index
                ) => `
                  <button
                    class="sql-answer"
                    type="button"
                    data-answer="${index}"
                  >
                    ${answer}
                  </button>
                `
              )
              .join("")}

          </div>

        </div>
      `;


      $$(
        ".sql-answer",
        quiz
      ).forEach(
        (button) => {
          button.addEventListener(
            "click",
            () => {
              chooseAnswer(
                Number(
                  button.dataset
                    .answer
                ),
                button
              );
            }
          );
        }
      );
    }


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


      setTimeout(
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


    function finishQuiz() {
      if (score > best) {
        best =
          score;

        setStoredNumber(
          storageKey,
          best
        );


        bestElement.textContent =
          `${best}/5`;
      }


      quiz.innerHTML = `
        <div class="sql-question">

          <h4>
            You scored ${score}/5
          </h4>

          <p>
            Small quiz, real database fundamentals.
          </p>

        </div>
      `;


      progress.textContent =
        "Complete";
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
     12. INITIALISE WEBSITE
     ========================================================= */

  function init() {
    initClock();

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
      init
    );
  } else {
    init();
  }
})();