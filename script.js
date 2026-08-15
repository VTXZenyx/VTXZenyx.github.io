(() => {
  "use strict";

  const projects = {
    waid: {
      kicker: "APPLICATION DEVELOPMENT / WAID",
      title: "WAID Business Rules Application",
      desc: "Built a working application using HTML, CSS and Python/Brython. The project converted business rules into a usable system rather than leaving them as written requirements.",
      evidence: [["ROLE","Application development"],["TOOLS","HTML, CSS, Python/Brython"],["FOCUS","Business rules → working interface"]],
      tags: ["HTML","CSS","PYTHON","BRYTHON"]
    },
    netflix: {
      kicker: "DATA ANALYSIS / PYTHON",
      title: "Netflix Data Analysis",
      desc: "Used Python to analyse a dataset containing more than 8,000 titles. The work involved organising data, exploring patterns and creating visual outputs that made the findings easier to understand.",
      evidence: [["DATA","8,000+ titles"],["TOOLS","Pandas, NumPy, Matplotlib"],["FOCUS","Cleaning, exploration, visual explanation"]],
      tags: ["PYTHON","PANDAS","NUMPY","MATPLOTLIB"]
    },
    sql: {
      kicker: "DATABASES / SQL",
      title: "SQL & Database Design",
      desc: "Worked with structured data using SQL queries and database concepts. The project evidence includes joins, aggregates, subqueries, normalisation and data integrity.",
      evidence: [["QUERYING","Joins, aggregates, subqueries"],["DESIGN","Normalisation"],["QUALITY","Data integrity"]],
      tags: ["SQL","DATABASES","JOINS","NORMALISATION"]
    },
    r: {
      kicker: "DATA202 / R",
      title: "R Data Analysis & Programming",
      desc: "Used R and RStudio to work with data structures, filtering, transformations, functions and grouped analysis. This section can grow as more DATA202 work is completed.",
      evidence: [["TOOLS","R, RStudio"],["SKILLS","Filtering, functions, grouped analysis"],["STATUS","Developing further capability"]],
      tags: ["R","RSTUDIO","DATA","ANALYSIS"]
    },
    systems: {
      kicker: "INFORMATION SYSTEMS / SYSTEMS THINKING",
      title: "Systems Thinking & Stakeholder Analysis",
      desc: "Applied stakeholder analysis, system boundaries, feedback relationships and problem framing to understand complex problems before recommending solutions.",
      evidence: [["METHODS","Stakeholders, boundaries, feedback"],["FOCUS","People, technology, data and processes"],["APPROACH","Evidence before assumptions"]],
      tags: ["INFORMATION SYSTEMS","STAKEHOLDERS","SYSTEMS","PROBLEM FRAMING"]
    }
  };

  const qs = (s, p=document) => p.querySelector(s);
  const qsa = (s, p=document) => [...p.querySelectorAll(s)];

  const clock = qs("#clock");
  qs("#year").textContent = new Date().getFullYear();
  const tick = () => {
    const d = new Date();
    clock.textContent = `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
  };
  tick(); setInterval(tick,1000);

  const halo = qs(".cursor-halo");
  if (halo && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let tx=innerWidth/2,ty=innerHeight/2,cx=tx,cy=ty;
    addEventListener("mousemove",e=>{tx=e.clientX;ty=e.clientY;});
    const loop=()=>{cx+=(tx-cx)*.07;cy+=(ty-cy)*.07;halo.style.left=`${cx}px`;halo.style.top=`${cy}px`;requestAnimationFrame(loop);};
    loop();
  }

  const canvas = qs("#dotCanvas");
  if (canvas) {
    const ctx=canvas.getContext("2d");
    let dots=[],mouse={x:-9999,y:-9999},visible=true;
    canvas.addEventListener("mousemove",e=>{const r=canvas.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;});
    canvas.addEventListener("mouseleave",()=>{mouse={x:-9999,y:-9999};});
    const build=()=>{
      const r=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2),w=Math.max(1,Math.floor(r.width)),h=Math.max(1,Math.floor(r.height));
      canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
      const off=document.createElement("canvas");off.width=w;off.height=h;const o=off.getContext("2d");
      const fs=Math.min(w*.215,h*.36);o.fillStyle="#fff";o.textAlign="center";o.textBaseline="middle";o.font=`800 ${fs}px Arial,sans-serif`;o.fillText("VIRAJ",w/2,h*.39);o.fillText("GANDHI",w/2,h*.69);
      const data=o.getImageData(0,0,w,h).data,gap=w<700?7:8;dots=[];
      for(let y=gap;y<h;y+=gap)for(let x=gap;x<w;x+=gap){if(data[(Math.floor(y)*w+Math.floor(x))*4+3]>100)dots.push({bx:x,by:y,p:Math.random()*Math.PI*2});}
    };
    let rt;addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(build,120);});build();
    const hero=qs(".hero"); if(hero && "IntersectionObserver" in window){new IntersectionObserver(e=>{visible=e[0]?.isIntersecting??true;}).observe(hero);}
    const draw=t=>{if(visible){const r=canvas.getBoundingClientRect();ctx.clearRect(0,0,r.width,r.height);for(const d of dots){const dx=d.bx-mouse.x,dy=d.by-mouse.y,dist=Math.sqrt(dx*dx+dy*dy),inf=Math.max(0,1-dist/135),rep=inf*16,ang=Math.atan2(dy,dx),x=d.bx+Math.cos(ang)*rep+Math.sin(t*.00075+d.p)*.65,y=d.by+Math.sin(ang)*rep+Math.cos(t*.00082+d.p)*.65,m=d.bx/Math.max(r.width,1),a=.68+inf*.25;ctx.fillStyle=m<.48?`rgba(77,141,255,${a})`:`rgba(104,220,255,${a-.04})`;ctx.beginPath();ctx.arc(x,y,1.15+inf*1.25,0,Math.PI*2);ctx.fill();}}requestAnimationFrame(draw);};
    requestAnimationFrame(draw);
  }

  if ("IntersectionObserver" in window) {
    const ro=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");ro.unobserve(e.target);}}),{threshold:.1});qsa(".reveal").forEach(el=>ro.observe(el));
  } else qsa(".reveal").forEach(el=>el.classList.add("visible"));

  const modal=qs("#projectModal"),mk=qs("#modalKicker"),mt=qs("#modalTitle"),md=qs("#modalDesc"),me=qs("#modalEvidence"),mta=qs("#modalTags");
  const openProject=key=>{const p=projects[key];if(!p)return;mk.textContent=p.kicker;mt.textContent=p.title;md.textContent=p.desc;me.innerHTML=p.evidence.map(([a,b])=>`<div><span>${a}</span><strong>${b}</strong></div>`).join("");mta.innerHTML=p.tags.map(t=>`<span>${t}</span>`).join("");modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";};
  const closeProject=()=>{modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";};
  qsa("[data-open-project]").forEach(b=>b.addEventListener("click",()=>openProject(b.dataset.openProject)));qs(".project-modal-close").addEventListener("click",closeProject);qs("#modalCloseSecondary").addEventListener("click",closeProject);modal.addEventListener("click",e=>{if(e.target===modal)closeProject();});

  qsa(".game-tab").forEach(tab=>tab.addEventListener("click",()=>{qsa(".game-tab").forEach(t=>{t.classList.remove("active");t.setAttribute("aria-selected","false")});qsa(".game-panel").forEach(p=>p.classList.remove("active"));tab.classList.add("active");tab.setAttribute("aria-selected","true");qs(`#game-${tab.dataset.game}`).classList.add("active");}));

  const rb=qs("#reactionBox"),rtxt=qs("#reactionText"),rsub=qs("#reactionSub"),rstart=qs("#reactionStart"),rbest=qs("#reactionBest");
  let rstate="idle",rtimer=null,rtime=0,bestR=Number(localStorage.getItem("vg2026_reaction_best"))||0;if(bestR)rbest.textContent=`${bestR} ms`;
  rstart.addEventListener("click",()=>{clearTimeout(rtimer);rstate="waiting";rb.className="reaction-box waiting";rtxt.textContent="WAIT...";rsub.textContent="Do not click yet.";rtimer=setTimeout(()=>{rstate="ready";rb.className="reaction-box go";rtxt.textContent="CLICK!";rsub.textContent="NOW";rtime=performance.now();},1400+Math.random()*2600);});
  rb.addEventListener("click",()=>{if(rstate==="waiting"){clearTimeout(rtimer);rstate="idle";rb.className="reaction-box early";rtxt.textContent="TOO EARLY";rsub.textContent="Try another round.";}else if(rstate==="ready"){const ms=Math.round(performance.now()-rtime);rstate="idle";rb.className="reaction-box";rtxt.textContent=`${ms} ms`;rsub.textContent=ms<200?"Very quick.":ms<250?"Fast.":ms<320?"Nice.":"You can beat that.";if(!bestR||ms<bestR){bestR=ms;localStorage.setItem("vg2026_reaction_best",String(ms));rbest.textContent=`${ms} ms`;}}});

  const sc=qs("#snakeCanvas"),ss=qs("#snakeScore"),sb=qs("#snakeBest"),sst=qs("#snakeStart");
  if(sc){const c=sc.getContext("2d"),CELL=15,COLS=sc.width/CELL,ROWS=sc.height/CELL;let snake=[{x:10,y:10},{x:9,y:10},{x:8,y:10}],dir={x:1,y:0},next={...dir},food={x:20,y:12},timer=null,score=0,running=false,best=Number(localStorage.getItem("vg2026_snake_best"))||0;sb.textContent=best;
    const randomFood=()=>{let f;do{f={x:Math.floor(Math.random()*COLS),y:Math.floor(Math.random()*ROWS)}}while(snake.some(s=>s.x===f.x&&s.y===f.y));return f;};
    const draw=(over=false)=>{const w=sc.width,h=sc.height;c.fillStyle="#050d19";c.fillRect(0,0,w,h);c.strokeStyle="rgba(77,141,255,.055)";for(let x=0;x<w;x+=CELL){c.beginPath();c.moveTo(x,0);c.lineTo(x,h);c.stroke()}for(let y=0;y<h;y+=CELL){c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke()}snake.forEach((s,i)=>{c.fillStyle=i===0?"#9bd0ff":"#4d8dff";c.fillRect(s.x*CELL+1,s.y*CELL+1,CELL-2,CELL-2)});c.fillStyle="#68dcff";c.fillRect(food.x*CELL+2,food.y*CELL+2,CELL-4,CELL-4);if(over){c.fillStyle="rgba(3,8,16,.78)";c.fillRect(0,0,w,h);c.fillStyle="#eef5ff";c.font="700 30px monospace";c.textAlign="center";c.fillText("GAME OVER",w/2,h/2-5);c.fillStyle="#87a3c8";c.font="500 14px monospace";c.fillText("Press START / RESET to try again",w/2,h/2+28)}};
    const stop=()=>{clearInterval(timer);running=false;if(score>best){best=score;localStorage.setItem("vg2026_snake_best",String(best));sb.textContent=best}draw(true)};
    const tickSnake=()=>{dir=next;const head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};if(head.x<0||head.y<0||head.x>=COLS||head.y>=ROWS||snake.some(s=>s.x===head.x&&s.y===head.y)){stop();return}snake.unshift(head);if(head.x===food.x&&head.y===food.y){score++;ss.textContent=score;food=randomFood()}else snake.pop();draw()};
    const reset=()=>{snake=[{x:10,y:10},{x:9,y:10},{x:8,y:10}];dir={x:1,y:0};next={...dir};food=randomFood();score=0;ss.textContent="0";running=true;clearInterval(timer);timer=setInterval(tickSnake,95);draw()};
    const change=d=>{if(!running||!d)return;if(d.x+dir.x===0&&d.y+dir.y===0)return;next=d};sst.addEventListener("click",reset);document.addEventListener("keydown",e=>{const m={ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0}};if(!m[e.key]||!running)return;e.preventDefault();change(m[e.key])});qsa("[data-dir]").forEach(b=>b.addEventListener("click",()=>change({up:{x:0,y:-1},down:{x:0,y:1},left:{x:-1,y:0},right:{x:1,y:0}}[b.dataset.dir])));draw();}

  const questions=[{q:"Which keyword is used to retrieve rows from a table?",a:["SELECT","DELETE","DROP","ALTER"],c:0},{q:"Which clause filters rows before they are returned?",a:["GROUP BY","WHERE","ORDER BY","HAVING"],c:1},{q:"Which command adds a new row to a table?",a:["UPDATE","CREATE","INSERT","JOIN"],c:2},{q:"Which JOIN keeps every row from the left table?",a:["INNER JOIN","LEFT JOIN","CROSS JOIN","SELF JOIN"],c:1},{q:"Which function counts rows?",a:["SUM()","AVG()","COUNT()","MAX()"],c:2}];
  const qno=qs("#sqlNo"),qq=qs("#sqlQuestion"),qa=qs("#sqlAnswers"),qf=qs("#sqlFeedback"),qn=qs("#sqlNext"),qscore=qs("#sqlScore"),qbest=qs("#sqlBest");let qi=0,score=0,answered=false,finished=false,bestQ=Number(localStorage.getItem("vg2026_sql_best"))||0;qbest.textContent=bestQ;
  const renderQ=()=>{const item=questions[qi];qno.textContent=qi+1;qq.textContent=item.q;qa.innerHTML="";qf.textContent="";qn.disabled=true;qn.textContent="Next question";answered=false;finished=false;item.a.forEach((ans,i)=>{const b=document.createElement("button");b.type="button";b.textContent=ans;b.addEventListener("click",()=>{if(answered)return;answered=true;[...qa.children].forEach((x,j)=>{if(j===item.c)x.classList.add("correct")});if(i===item.c){score++;qscore.textContent=score;qf.textContent="Correct."}else{b.classList.add("wrong");qf.textContent=`Not quite. Correct answer: ${item.a[item.c]}.`}qn.disabled=false});qa.appendChild(b)});};
  const finishQ=()=>{finished=true;qq.textContent=`Finished — ${score}/5`;qa.innerHTML="";qf.textContent=score===5?"Perfect run.":"Restart and try for 5/5.";qn.textContent="Restart quiz";qn.disabled=false;if(score>bestQ){bestQ=score;localStorage.setItem("vg2026_sql_best",String(bestQ));qbest.textContent=bestQ}};
  qn.addEventListener("click",()=>{if(finished){qi=0;score=0;qscore.textContent="0";renderQ();return}if(!answered)return;if(qi<questions.length-1){qi++;renderQ()}else finishQ()});renderQ();

  addEventListener("keydown",e=>{if(e.key==="Escape")closeProject();});
})();
