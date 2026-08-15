(() => {
  "use strict";

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  const getStoredNumber = (key) => {
    try {
      return Number(localStorage.getItem(key)) || 0;
    } catch {
      return 0;
    }
  };

  const setStoredNumber = (key, value) => {
    try {
      localStorage.setItem(key, String(value));
    } catch {
      // The site still works if browser storage is unavailable.
    }
  };


  // ---------------------------------------------------------------------------
  // Project data
  // ---------------------------------------------------------------------------

  const PROJECTS = {
    waid: {
      kicker: "APPLICATION DEVELOPMENT / WAID",
      title: "WAID Business Rules Application",
      desc:
        "Built a working web application using HTML, CSS and Python/Brython, turning business rules into an interactive interface.",
      evidence: [
        ["ROLE", "Application development"],
        ["TOOLS", "HTML, CSS, Python/Brython"],
        ["FOCUS", "Business rules → working interface"]
      ],
      tags: ["HTML", "CSS", "PYTHON", "BRYTHON"]
    },

    netflix: {
      kicker: "DATA ANALYSIS / PYTHON",
      title: "Netflix Data Analysis",
      desc:
        "Used Python to explore a dataset of more than 8,000 Netflix titles, find patterns in the data and communicate the results visually.",
      evidence: [
        ["DATA", "8,000+ titles"],
        ["TOOLS", "Pandas, NumPy, Matplotlib"],
        ["FOCUS", "Cleaning, exploration, visual explanation"]
      ],
      tags: ["PYTHON", "PANDAS", "NUMPY", "MATPLOTLIB"]
    },

    sql: {
      kicker: "DATABASES / SQL",
      title: "SQL & Database Design",
      desc:
        "Worked with relational databases, DDL, joins, aggregates, subqueries, normalisation and data integrity while learning how structured data is designed and queried.",
      evidence: [
        ["QUERYING", "Joins, aggregates, subqueries"],
        ["DESIGN", "DDL and normalisation"],
        ["QUALITY", "Data integrity"]
      ],
      tags: ["SQL", "DDL", "DATABASES", "JOINS"]
    },

    r: {
      kicker: "DATA & PROGRAMMING / R",
      title: "R Data Analysis & Programming",
      desc:
        "Used R and RStudio to work with data structures, filtering, functions, transformations and grouped analysis while building my programming and data skills.",
      evidence: [
        ["TOOLS", "R, RStudio"],
        ["SKILLS", "Filtering, functions, grouped analysis"],
        ["STATUS", "Continuing to build experience"]
      ],
      tags: ["R", "RSTUDIO", "DATA", "PROGRAMMING"]
    },

    systems: {
      kicker: "INFORMATION SYSTEMS / SYSTEMS THINKING",
      title: "Systems Thinking & Stakeholder Analysis",
      desc:
        "Used systems thinking, stakeholder analysis and problem framing to understand how people, organisations and technology interact before jumping straight to a solution.",
      evidence: [
        ["METHODS", "Stakeholders, boundaries, feedback"],
        ["FOCUS", "People, technology, data and processes"],
        ["APPROACH", "Understand the problem first"]
      ],
      tags: [
        "INFORMATION SYSTEMS",
        "STAKEHOLDERS",
        "SYSTEMS",
        "PROBLEM FRAMING"
      ]
    }
  };


  // ---------------------------------------------------------------------------
  // Clock + footer year
  // ---------------------------------------------------------------------------

  function initClock() {
    const clock = $("#clock");
    const year = $("#year");

    if (year) {
      year.textContent = new Date().getFullYear();
    }

    if (!clock) return;

    const updateClock = () => {
      const now = new Date();

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");

      clock.textContent = `${hours}:${minutes}`;
    };

    updateClock();

    setInterval(updateClock, 1000);
  }


  // ---------------------------------------------------------------------------
  // Cursor halo
  // ---------------------------------------------------------------------------

  function initCursorHalo() {
    const halo = $(".cursor-halo");

    const reducedMotion = matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!halo || reducedMotion) return;

    let targetX = innerWidth / 2;
    let targetY = innerHeight / 2;

    let currentX = targetX;
    let currentY = targetY;

    addEventListener("mousemove", (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    });

    const animate = () => {
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;

      halo.style.left = `${currentX}px`;
      halo.style.top = `${currentY}px`;

      requestAnimationFrame(animate);
    };

    animate();
  }


  // ---------------------------------------------------------------------------
  // Dot-matrix VIRAJ GANDHI hero
  // ---------------------------------------------------------------------------

  function initDotHero() {
    const canvas = $("#dotCanvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let dots = [];
    let isVisible = true;
    let resizeTimer;

    const mouse = {
      x: -9999,
      y: -9999
    };


    canvas.addEventListener("mousemove", (event) => {
      const rect = canvas.getBoundingClientRect();

      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    });


    canvas.addEventListener("mouseleave", () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });


    const buildDots = () => {
      const rect = canvas.getBoundingClientRect();

      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));

      const dpr = Math.min(devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);


      const offscreen = document.createElement("canvas");

      offscreen.width = width;
      offscreen.height = height;

      const offCtx = offscreen.getContext("2d");

      if (!offCtx) return;


      const fontSize = Math.min(
        width * 0.215,
        height * 0.36
      );


      offCtx.fillStyle = "#fff";

      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";

      offCtx.font = `800 ${fontSize}px Arial, sans-serif`;

      offCtx.fillText(
        "VIRAJ",
        width / 2,
        height * 0.39
      );

      offCtx.fillText(
        "GANDHI",
        width / 2,
        height * 0.69
      );


      const imageData = offCtx.getImageData(
        0,
        0,
        width,
        height
      ).data;


      const gap = width < 700 ? 7 : 8;

      dots = [];


      for (let y = gap; y < height; y += gap) {

        for (let x = gap; x < width; x += gap) {

          const alphaIndex =
            (Math.floor(y) * width + Math.floor(x)) * 4 + 3;


          if (imageData[alphaIndex] > 100) {

            dots.push({
              baseX: x,
              baseY: y,
              phase: Math.random() * Math.PI * 2
            });

          }

        }

      }

    };


    const drawDots = (time) => {

      if (isVisible) {

        const rect = canvas.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;


        ctx.clearRect(
          0,
          0,
          width,
          height
        );


        for (const dot of dots) {

          const dx = dot.baseX - mouse.x;
          const dy = dot.baseY - mouse.y;

          const distance = Math.hypot(dx, dy);

          const influence =
            Math.max(
              0,
              1 - distance / 135
            );


          const repel = influence * 16;

          const angle =
            Math.atan2(dy, dx);


          const x =
            dot.baseX +
            Math.cos(angle) * repel +
            Math.sin(
              time * 0.00075 + dot.phase
            ) * 0.65;


          const y =
            dot.baseY +
            Math.sin(angle) * repel +
            Math.cos(
              time * 0.00082 + dot.phase
            ) * 0.65;


          const horizontalMix =
            dot.baseX /
            Math.max(width, 1);


          const alpha =
            0.68 +
            influence * 0.25;


          ctx.fillStyle =
            horizontalMix < 0.48

              ? `rgba(77, 141, 255, ${alpha})`

              : `rgba(104, 220, 255, ${alpha - 0.04})`;


          ctx.beginPath();

          ctx.arc(
            x,
            y,
            1.15 + influence * 1.25,
            0,
            Math.PI * 2
          );

          ctx.fill();

        }

      }


      requestAnimationFrame(drawDots);
    };


    addEventListener("resize", () => {

      clearTimeout(resizeTimer);

      resizeTimer =
        setTimeout(
          buildDots,
          120
        );

    });


    const hero = $(".hero");


    if (
      hero &&
      "IntersectionObserver" in window
    ) {

      const observer =
        new IntersectionObserver(
          ([entry]) => {

            isVisible =
              entry?.isIntersecting ??
              true;

          }
        );


      observer.observe(hero);

    }


    buildDots();

    requestAnimationFrame(drawDots);
  }


  // ---------------------------------------------------------------------------
  // Scroll reveal animations
  // ---------------------------------------------------------------------------

  function initRevealAnimations() {
    const revealItems = $$(".reveal");


    if (!("IntersectionObserver" in window)) {

      revealItems.forEach((item) =>
        item.classList.add("visible")
      );

      return;

    }


    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) return;


            entry.target.classList.add(
              "visible"
            );


            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.1
        }
      );


    revealItems.forEach((item) =>
      observer.observe(item)
    );
  }


  // ---------------------------------------------------------------------------
  // Project modal
  // ---------------------------------------------------------------------------

  function initProjectModal() {
    const modal =
      $("#projectModal");

    if (!modal) return;


    const kicker =
      $("#modalKicker");

    const title =
      $("#modalTitle");

    const description =
      $("#modalDesc");

    const evidence =
      $("#modalEvidence");

    const tags =
      $("#modalTags");

    const primaryClose =
      $(".project-modal-close");

    const secondaryClose =
      $("#modalCloseSecondary");


    let lastTrigger = null;


    const openProject = (
      projectKey,
      trigger
    ) => {

      const project =
        PROJECTS[projectKey];

      if (!project) return;


      lastTrigger =
        trigger || null;


      if (kicker) {
        kicker.textContent =
          project.kicker;
      }


      if (title) {
        title.textContent =
          project.title;
      }


      if (description) {
        description.textContent =
          project.desc;
      }


      if (evidence) {

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

      }


      if (tags) {

        tags.innerHTML =
          project.tags
            .map(
              (tag) =>
                `<span>${tag}</span>`
            )
            .join("");

      }


      modal.classList.add(
        "open"
      );


      modal.setAttribute(
        "aria-hidden",
        "false"
      );


      document.body.style.overflow =
        "hidden";


      primaryClose?.focus();

    };


    const closeProject = () => {

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


      lastTrigger?.focus();

    };


    $$("[data-open-project]")
      .forEach((button) => {

        button.addEventListener(
          "click",
          () => {

            openProject(
              button.dataset.openProject,
              button
            );

          }
        );

      });


    primaryClose?.addEventListener(
      "click",
      closeProject
    );


    secondaryClose?.addEventListener(
      "click",
      closeProject
    );


    modal.addEventListener(
      "click",
      (event) => {

        if (event.target === modal) {
          closeProject();
        }

      }
    );


    addEventListener(
      "keydown",
      (event) => {

        if (event.key === "Escape") {
          closeProject();
        }

      }
    );
  }


  // ---------------------------------------------------------------------------
  // Game tabs
  // ---------------------------------------------------------------------------

  function initGameTabs() {
    const tabs =
      $$(".game-tab");

    const panels =
      $$(".game-panel");


    tabs.forEach((tab) => {

      tab.addEventListener(
        "click",
        () => {

          tabs.forEach((item) => {

            item.classList.remove(
              "active"
            );

            item.setAttribute(
              "aria-selected",
              "false"
            );

          });


          panels.forEach((panel) =>
            panel.classList.remove(
              "active"
            )
          );


          tab.classList.add(
            "active"
          );


          tab.setAttribute(
            "aria-selected",
            "true"
          );


          const panel =
            $(
              `#game-${tab.dataset.game}`
            );


          panel?.classList.add(
            "active"
          );

        }
      );

    });
  }


  // ---------------------------------------------------------------------------
  // Reaction game
  // ---------------------------------------------------------------------------

  function initReactionGame() {
    const box =
      $("#reactionBox");

    const text =
      $("#reactionText");

    const subtext =
      $("#reactionSub");

    const startButton =
      $("#reactionStart");

    const bestDisplay =
      $("#reactionBest");


    if (
      !box ||
      !text ||
      !subtext ||
      !startButton ||
      !bestDisplay
    ) {
      return;
    }


    const BEST_KEY =
      "vg2026_reaction_best";


    let state =
      "idle";

    let timerId =
      null;

    let startTime =
      0;

    let bestTime =
      getStoredNumber(
        BEST_KEY
      );


    if (bestTime) {
      bestDisplay.textContent =
        `${bestTime} ms`;
    }


    const setBoxState = (
      className,
      heading,
      message
    ) => {

      box.className =
        className;

      text.textContent =
        heading;

      subtext.textContent =
        message;

    };


    startButton.addEventListener(
      "click",
      () => {

        clearTimeout(
          timerId
        );


        state =
          "waiting";


        setBoxState(
          "reaction-box waiting",
          "WAIT...",
          "Do not click yet."
        );


        const delay =
          1400 +
          Math.random() * 2600;


        timerId =
          setTimeout(
            () => {

              state =
                "ready";


              startTime =
                performance.now();


              setBoxState(
                "reaction-box go",
                "CLICK!",
                "NOW"
              );

            },
            delay
          );

      }
    );


    box.addEventListener(
      "click",
      () => {

        if (state === "waiting") {

          clearTimeout(
            timerId
          );


          state =
            "idle";


          setBoxState(
            "reaction-box early",
            "TOO EARLY",
            "Try another round."
          );


          return;

        }


        if (state !== "ready") {
          return;
        }


        const reactionTime =
          Math.round(
            performance.now() -
            startTime
          );


        state =
          "idle";


        let message =
          "You can beat that.";


        if (reactionTime < 200) {

          message =
            "Very quick.";

        } else if (
          reactionTime < 250
        ) {

          message =
            "Fast.";

        } else if (
          reactionTime < 320
        ) {

          message =
            "Nice.";

        }


        setBoxState(
          "reaction-box",
          `${reactionTime} ms`,
          message
        );


        if (
          !bestTime ||
          reactionTime < bestTime
        ) {

          bestTime =
            reactionTime;


          bestDisplay.textContent =
            `${bestTime} ms`;


          setStoredNumber(
            BEST_KEY,
            bestTime
          );

        }

      }
    );
  }


  // ---------------------------------------------------------------------------
  // Snake
  // ---------------------------------------------------------------------------

  function initSnakeGame() {
    const canvas =
      $("#snakeCanvas");

    const scoreDisplay =
      $("#snakeScore");

    const bestDisplay =
      $("#snakeBest");

    const startButton =
      $("#snakeStart");


    if (
      !canvas ||
      !scoreDisplay ||
      !bestDisplay ||
      !startButton
    ) {
      return;
    }


    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;


    const BEST_KEY =
      "vg2026_snake_best";


    const CELL =
      15;

    const COLS =
      canvas.width / CELL;

    const ROWS =
      canvas.height / CELL;

    const SPEED =
      95;


    const DIRECTIONS = {

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


    let snake = [];

    let direction = {
      ...DIRECTIONS.right
    };

    let nextDirection = {
      ...direction
    };

    let food = {
      x: 20,
      y: 12
    };

    let timerId =
      null;

    let score =
      0;

    let running =
      false;

    let bestScore =
      getStoredNumber(
        BEST_KEY
      );


    bestDisplay.textContent =
      bestScore;


    const createSnake = () => [
      {
        x: 10,
        y: 10
      },
      {
        x: 9,
        y: 10
      },
      {
        x: 8,
        y: 10
      }
    ];


    const createFood = () => {

      let nextFood;


      do {

        nextFood = {

          x:
            Math.floor(
              Math.random() *
              COLS
            ),

          y:
            Math.floor(
              Math.random() *
              ROWS
            )

        };

      } while (
        snake.some(
          (segment) =>
            segment.x ===
              nextFood.x &&
            segment.y ===
              nextFood.y
        )
      );


      return nextFood;
    };


    const drawGrid = () => {

      ctx.strokeStyle =
        "rgba(77, 141, 255, 0.055)";


      for (
        let x = 0;
        x < canvas.width;
        x += CELL
      ) {

        ctx.beginPath();

        ctx.moveTo(
          x,
          0
        );

        ctx.lineTo(
          x,
          canvas.height
        );

        ctx.stroke();

      }


      for (
        let y = 0;
        y < canvas.height;
        y += CELL
      ) {

        ctx.beginPath();

        ctx.moveTo(
          0,
          y
        );

        ctx.lineTo(
          canvas.width,
          y
        );

        ctx.stroke();

      }

    };


    const drawGame = (
      gameOver = false
    ) => {

      ctx.fillStyle =
        "#050d19";


      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );


      drawGrid();


      snake.forEach(
        (segment, index) => {

          ctx.fillStyle =
            index === 0
              ? "#9bd0ff"
              : "#4d8dff";


          ctx.fillRect(

            segment.x *
              CELL +
              1,

            segment.y *
              CELL +
              1,

            CELL - 2,

            CELL - 2

          );

        }
      );


      ctx.fillStyle =
        "#68dcff";


      ctx.fillRect(

        food.x *
          CELL +
          2,

        food.y *
          CELL +
          2,

        CELL - 4,

        CELL - 4

      );


      if (!gameOver) return;


      ctx.fillStyle =
        "rgba(3, 8, 16, 0.78)";


      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );


      ctx.textAlign =
        "center";


      ctx.fillStyle =
        "#eef5ff";


      ctx.font =
        "700 30px monospace";


      ctx.fillText(

        "GAME OVER",

        canvas.width / 2,

        canvas.height / 2 - 5

      );


      ctx.fillStyle =
        "#87a3c8";


      ctx.font =
        "500 14px monospace";


      ctx.fillText(

        "Press START / RESET to try again",

        canvas.width / 2,

        canvas.height / 2 + 28

      );

    };


    const saveBestScore = () => {

      if (
        score <= bestScore
      ) {
        return;
      }


      bestScore =
        score;


      bestDisplay.textContent =
        bestScore;


      setStoredNumber(
        BEST_KEY,
        bestScore
      );

    };


    const stopGame = () => {

      clearInterval(
        timerId
      );


      running =
        false;


      saveBestScore();


      drawGame(true);

    };


    const tick = () => {

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

        head.x >= COLS ||

        head.y >= ROWS;


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

        stopGame();

        return;

      }


      snake.unshift(
        head
      );


      const ateFood =

        head.x ===
          food.x &&

        head.y ===
          food.y;


      if (ateFood) {

        score += 1;


        scoreDisplay.textContent =
          score;


        food =
          createFood();

      } else {

        snake.pop();

      }


      drawGame();
    };


    const resetGame = () => {

      snake =
        createSnake();


      direction = {
        ...DIRECTIONS.right
      };


      nextDirection = {
        ...direction
      };


      score =
        0;


      running =
        true;


      food =
        createFood();


      scoreDisplay.textContent =
        "0";


      clearInterval(
        timerId
      );


      timerId =
        setInterval(
          tick,
          SPEED
        );


      drawGame();
    };


    const changeDirection = (
      newDirection
    ) => {

      if (
        !running ||
        !newDirection
      ) {
        return;
      }


      const isReverse =

        newDirection.x +
          direction.x ===
        0 &&

        newDirection.y +
          direction.y ===
        0;


      if (isReverse) return;


      nextDirection =
        newDirection;

    };


    startButton.addEventListener(
      "click",
      resetGame
    );


    document.addEventListener(
      "keydown",
      (event) => {

        const keyboardDirections = {

          ArrowUp:
            DIRECTIONS.up,

          ArrowDown:
            DIRECTIONS.down,

          ArrowLeft:
            DIRECTIONS.left,

          ArrowRight:
            DIRECTIONS.right

        };


        const newDirection =
          keyboardDirections[
            event.key
          ];


        if (
          !newDirection ||
          !running
        ) {
          return;
        }


        event.preventDefault();


        changeDirection(
          newDirection
        );

      }
    );


    $$("[data-dir]")
      .forEach((button) => {

        button.addEventListener(
          "click",
          () => {

            changeDirection(
              DIRECTIONS[
                button.dataset.dir
              ]
            );

          }
        );

      });


    snake =
      createSnake();


    drawGame();
  }


  // ---------------------------------------------------------------------------
  // SQL quiz
  // ---------------------------------------------------------------------------

  function initSqlQuiz() {

    const QUESTIONS = [

      {
        question:
          "Which keyword is used to retrieve rows from a table?",

        answers: [
          "SELECT",
          "DELETE",
          "DROP",
          "ALTER"
        ],

        correct: 0
      },


      {
        question:
          "Which clause filters rows before they are returned?",

        answers: [
          "GROUP BY",
          "WHERE",
          "ORDER BY",
          "HAVING"
        ],

        correct: 1
      },


      {
        question:
          "Which command adds a new row to a table?",

        answers: [
          "UPDATE",
          "CREATE",
          "INSERT",
          "JOIN"
        ],

        correct: 2
      },


      {
        question:
          "Which JOIN keeps every row from the left table?",

        answers: [
          "INNER JOIN",
          "LEFT JOIN",
          "CROSS JOIN",
          "SELF JOIN"
        ],

        correct: 1
      },


      {
        question:
          "Which function counts rows?",

        answers: [
          "SUM()",
          "AVG()",
          "COUNT()",
          "MAX()"
        ],

        correct: 2
      }

    ];


    const questionNumber =
      $("#sqlNo");

    const questionText =
      $("#sqlQuestion");

    const answers =
      $("#sqlAnswers");

    const feedback =
      $("#sqlFeedback");

    const nextButton =
      $("#sqlNext");

    const scoreDisplay =
      $("#sqlScore");

    const bestDisplay =
      $("#sqlBest");


    if (
      !questionNumber ||
      !questionText ||
      !answers ||
      !feedback ||
      !nextButton ||
      !scoreDisplay ||
      !bestDisplay
    ) {
      return;
    }


    const BEST_KEY =
      "vg2026_sql_best";


    let currentIndex =
      0;

    let score =
      0;

    let answered =
      false;

    let finished =
      false;

    let bestScore =
      getStoredNumber(
        BEST_KEY
      );


    bestDisplay.textContent =
      bestScore;


    const renderQuestion = () => {

      const current =
        QUESTIONS[
          currentIndex
        ];


      questionNumber.textContent =
        currentIndex + 1;


      questionText.textContent =
        current.question;


      answers.innerHTML =
        "";


      feedback.textContent =
        "";


      nextButton.disabled =
        true;


      nextButton.textContent =
        "Next question";


      answered =
        false;


      finished =
        false;


      current.answers.forEach(
        (answer, answerIndex) => {

          const button =
            document.createElement(
              "button"
            );


          button.type =
            "button";


          button.textContent =
            answer;


          button.addEventListener(
            "click",
            () => {

              if (answered) {
                return;
              }


              answered =
                true;


              [...answers.children]
                .forEach(
                  (
                    answerButton,
                    index
                  ) => {

                    if (
                      index ===
                      current.correct
                    ) {

                      answerButton.classList.add(
                        "correct"
                      );

                    }

                  }
                );


              if (
                answerIndex ===
                current.correct
              ) {

                score += 1;


                scoreDisplay.textContent =
                  score;


                feedback.textContent =
                  "Correct.";

              } else {

                button.classList.add(
                  "wrong"
                );


                feedback.textContent =
                  `Not quite. Correct answer: ${current.answers[current.correct]}.`;

              }


              nextButton.disabled =
                false;

            }
          );


          answers.appendChild(
            button
          );

        }
      );

    };


    const finishQuiz = () => {

      finished =
        true;


      questionText.textContent =
        `Finished — ${score}/5`;


      answers.innerHTML =
        "";


      feedback.textContent =
        score ===
        QUESTIONS.length

          ? "Perfect run."

          : "Restart and try for 5/5.";


      nextButton.textContent =
        "Restart quiz";


      nextButton.disabled =
        false;


      if (
        score > bestScore
      ) {

        bestScore =
          score;


        bestDisplay.textContent =
          bestScore;


        setStoredNumber(
          BEST_KEY,
          bestScore
        );

      }

    };


    const restartQuiz = () => {

      currentIndex =
        0;


      score =
        0;


      scoreDisplay.textContent =
        "0";


      renderQuestion();

    };


    nextButton.addEventListener(
      "click",
      () => {

        if (finished) {

          restartQuiz();

          return;

        }


        if (!answered) {
          return;
        }


        if (
          currentIndex <
          QUESTIONS.length - 1
        ) {

          currentIndex += 1;

          renderQuestion();

        } else {

          finishQuiz();

        }

      }
    );


    renderQuestion();
  }


  // ---------------------------------------------------------------------------
  // Start everything
  // ---------------------------------------------------------------------------

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


  init();

})();
