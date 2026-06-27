/* ============================================================
   CDS 2026 (IMA) Study Planner — script.js
   All state is persisted to localStorage. No frameworks.
   ============================================================ */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     1. SYLLABUS DATA
     Each week has 7 days. Each day has a list of topics tagged
     with a subject: 'maths' | 'english' | 'gk'.
     Day 7 of every week is a Revision day + Weekly Goals.
  --------------------------------------------------------- */
  const WEEKS = [
    {
      week: 1, range: "Days 1-7",
      days: [
        { name: "Mon", topics: [["maths","Number System"],["english","Parts of Speech"],["gk","Indus Valley Civilization"]] },
        { name: "Tue", topics: [["maths","HCF & LCM"],["english","Noun"],["gk","Vedic Age"]] },
        { name: "Wed", topics: [["maths","Simplification"],["english","Pronoun"],["gk","Jainism"]] },
        { name: "Thu", topics: [["maths","Percentage (Basics)"],["english","Verb"],["gk","Buddhism"]] },
        { name: "Fri", topics: [["maths","Percentage (Problems)"],["english","Adjective"],["gk","Mauryan Empire"]] },
        { name: "Sat", topics: [["maths","Ratio & Proportion"],["english","Adverb"],["gk","Gupta Empire"]] },
        { name: "Sun", revision:true, topics: [["maths","Maths Revision"],["english","English Revision"],["gk","GK Revision"],["maths","Mini Mock Test"]] },
      ]
    },
    {
      week: 2, range: "Days 8-14",
      days: [
        { name: "Mon", topics: [["maths","Profit & Loss"],["english","Articles"],["gk","Delhi Sultanate"]] },
        { name: "Tue", topics: [["maths","Simple Interest"],["english","Prepositions"],["gk","Khilji Dynasty"]] },
        { name: "Wed", topics: [["maths","Compound Interest"],["english","Conjunctions"],["gk","Tughlaq Dynasty"]] },
        { name: "Thu", topics: [["maths","Average"],["english","Subject Verb Agreement"],["gk","Mughal Empire"]] },
        { name: "Fri", topics: [["maths","Profit, Loss & Discount"],["english","Error Spotting"],["gk","Akbar"]] },
        { name: "Sat", topics: [["maths","Mixture & Alligation"],["english","Grammar Practice"],["gk","Bhakti Movement"]] },
        { name: "Sun", revision:true, topics: [["maths","Maths Revision"],["english","English Revision"],["gk","GK Revision"],["maths","Weekly Mock Test"]] },
      ]
    },
    {
      week: 3, range: "Days 15-21",
      days: [
        { name: "Mon", topics: [["maths","Time & Work"],["english","Tenses (Introduction)"],["gk","Revolt of 1857"]] },
        { name: "Tue", topics: [["maths","Pipes & Cisterns"],["english","Present Tense"],["gk","Formation of INC"]] },
        { name: "Wed", topics: [["maths","Time & Distance"],["english","Past Tense"],["gk","Moderate Leaders"]] },
        { name: "Thu", topics: [["maths","Boats & Streams"],["english","Future Tense"],["gk","Extremist Leaders"]] },
        { name: "Fri", topics: [["maths","Problems on Trains"],["english","Active Voice"],["gk","Partition of Bengal"]] },
        { name: "Sat", topics: [["maths","Practice Set"],["english","Passive Voice"],["gk","Swadeshi Movement"]] },
        { name: "Sun", revision:true, topics: [["maths","Maths Revision"],["english","English Revision"],["gk","GK Revision"],["maths","Weekly Mock Test"]] },
      ]
    },
    {
      week: 4, range: "Days 22-28",
      days: [
        { name: "Mon", topics: [["maths","Algebraic Expressions"],["english","Direct & Indirect Speech"],["gk","Gandhiji in South Africa"]] },
        { name: "Tue", topics: [["maths","Linear Equations"],["english","Narration Practice"],["gk","Champaran Movement"]] },
        { name: "Wed", topics: [["maths","Simultaneous Equations"],["english","Synonyms"],["gk","Non-Cooperation Movement"]] },
        { name: "Thu", topics: [["maths","Quadratic Equations"],["english","Antonyms"],["gk","Civil Disobedience Movement"]] },
        { name: "Fri", topics: [["maths","Factorization"],["english","One Word Substitution"],["gk","Round Table Conference"]] },
        { name: "Sat", topics: [["maths","Algebra Practice"],["english","Idioms & Phrases"],["gk","Quit India Movement"]] },
        { name: "Sun", revision:true, topics: [["maths","Maths Revision"],["english","English Revision"],["gk","GK Revision"],["maths","Weekly Mock Test"]] },
      ]
    },
    {
      week: 5, range: "Days 29-35",
      days: [
        { name: "Mon", topics: [["maths","Trigonometric Ratios"],["english","Reading Comprehension"],["gk","Preamble"]] },
        { name: "Tue", topics: [["maths","Standard Angles"],["english","Cloze Test"],["gk","Fundamental Rights (Part 1)"]] },
        { name: "Wed", topics: [["maths","Trig Identities"],["english","Vocabulary Practice"],["gk","Fundamental Rights (Part 2)"]] },
        { name: "Thu", topics: [["maths","Heights & Distances"],["english","Error Spotting Practice"],["gk","DPSP"]] },
        { name: "Fri", topics: [["maths","Trigonometry Practice"],["english","Grammar Practice"],["gk","Fundamental Duties"]] },
        { name: "Sat", topics: [["maths","Mixed Problems"],["english","Practice Set"],["gk","Polity Revision"]] },
        { name: "Sun", revision:true, topics: [["maths","Maths Revision"],["english","English Revision"],["gk","GK Revision"],["maths","Full Length Mock"]] },
      ]
    },
    {
      week: 6, range: "Days 36-42",
      days: [
        { name: "Mon", topics: [["maths","Lines & Angles"],["english","Practice Set"],["gk","Parliament"]] },
        { name: "Tue", topics: [["maths","Triangles"],["english","Practice Set"],["gk","President"]] },
        { name: "Wed", topics: [["maths","Similar Triangles"],["english","Practice Set"],["gk","Prime Minister"]] },
        { name: "Thu", topics: [["maths","Circle"],["english","Practice Set"],["gk","Supreme Court"]] },
        { name: "Fri", topics: [["maths","Quadrilaterals"],["english","Practice Set"],["gk","High Court"]] },
        { name: "Sat", topics: [["maths","Geometry Practice"],["english","Practice Set"],["gk","Constitutional Bodies"]] },
        { name: "Sun", revision:true, topics: [["maths","Maths Revision"],["english","English Revision"],["gk","GK Revision"],["maths","Weekly Mock Test"]] },
      ]
    },
    {
      week: 7, range: "Days 43-49",
      days: [
        { name: "Mon", topics: [["maths","Mensuration (Area)"],["english","Practice Set"],["gk","Indian Rivers"]] },
        { name: "Tue", topics: [["maths","Mensuration (Volume)"],["english","Practice Set"],["gk","Mountains"]] },
        { name: "Wed", topics: [["maths","Surface Area & Volume"],["english","Practice Set"],["gk","Climate"]] },
        { name: "Thu", topics: [["maths","Cylinder & Cone"],["english","Practice Set"],["gk","Soils"]] },
        { name: "Fri", topics: [["maths","Sphere"],["english","Practice Set"],["gk","Agriculture"]] },
        { name: "Sat", topics: [["maths","Mensuration Mixed"],["english","Practice Set"],["gk","Minerals"]] },
        { name: "Sun", revision:true, topics: [["maths","Maths Revision"],["english","English Revision"],["gk","GK Revision"],["maths","Weekly Mock Test"]] },
      ]
    },
    {
      week: 8, range: "Days 50-60",
      days: [
        { name: "Mon", topics: [["maths","Statistics (Mean)"],["english","Practice Set"],["gk","Physics: Motion"]] },
        { name: "Tue", topics: [["maths","Median"],["english","Practice Set"],["gk","Physics: Force & Energy"]] },
        { name: "Wed", topics: [["maths","Mode"],["english","Mock Type Qs"],["gk","Physics: Electricity & Magnetism"]] },
        { name: "Thu", topics: [["maths","Graphs"],["english","Mock Type Qs"],["gk","Chemistry: Acids, Bases & Salts"]] },
        { name: "Fri", topics: [["maths","Statistics Practice"],["english","Mock Type Qs"],["gk","Biology: Human Digestive System"]] },
        { name: "Sat", topics: [["maths","Mixed Practice"],["english","Mixed Practice"],["gk","Biology: Human Circulatory System"]] },
        { name: "Sun", revision:true, fullMock:true, topics: [["maths","Full Length CDS Mock Test"],["english","Analysis"]] },
      ]
    },
  ];

  const HABITS = ["Current Affairs", "Vocabulary", "Running", "Newspaper Reading", "Water Intake", "Sleep 7+ Hours"];
  const DOW = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  const QUOTES = [
    "Discipline today, leadership tomorrow.",
    "Hard work beats talent when talent doesn't work hard.",
    "The pain of discipline is far less than the pain of regret.",
    "Every topic you finish today is one less battle tomorrow.",
    "A soldier's first victory is over his own excuses.",
    "Consistency is the real shortcut to selection.",
    "Plan your attack. Attack your plan.",
    "200+ is not a dream, it's a daily habit.",
  ];

  /* ---------------------------------------------------------
     2. STATE MANAGEMENT (localStorage)
  --------------------------------------------------------- */
  const STORE_KEY = "cds_planner_state_v1";

  function loadState() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { console.warn("Could not parse saved state", e); }
    return {
      topics: {},        // key: "w-d-t" -> true/false
      goals: {},          // key: "w-goalIdx" -> true/false
      habits: {},          // key: "habit-day" -> true/false
      notes: { formulas: "", gk: "", vocab: "", mistakes: "" },
      mocks: [],           // {id, number, date, score}
      examDate: "",
      lastStudyDate: null,
      streak: 0,
    };
  }

  let state = loadState();

  function saveState() {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  }

  /* ---------------------------------------------------------
     3. NAVIGATION
  --------------------------------------------------------- */
  const navBtns = document.querySelectorAll(".cmd-nav__btn");
  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      navBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      document.querySelectorAll(".panel").forEach((p) => p.classList.add("is-hidden"));
      document.getElementById(btn.dataset.target).classList.remove("is-hidden");
    });
  });

  /* ---------------------------------------------------------
     4. COUNTDOWN
  --------------------------------------------------------- */
  const examDateInput = document.getElementById("examDateInput");
  const daysLeftEl = document.getElementById("daysLeft");
  const daysLeftMiniEl = document.getElementById("daysLeftMini");
  const sDaysEl = document.getElementById("s_days");

  function defaultExamDate() {
    const d = new Date();
    d.setDate(d.getDate() + 60);
    return d.toISOString().slice(0, 10);
  }

  function renderCountdown() {
    if (!state.examDate) state.examDate = defaultExamDate();
    examDateInput.value = state.examDate;
    const today = new Date();
    today.setHours(0,0,0,0);
    const exam = new Date(state.examDate);
    exam.setHours(0,0,0,0);
    const diff = Math.ceil((exam - today) / 86400000);
    const display = diff >= 0 ? diff : 0;
    daysLeftEl.textContent = display;
    daysLeftMiniEl.textContent = display;
    sDaysEl.textContent = display;
  }

  examDateInput.addEventListener("change", () => {
    state.examDate = examDateInput.value;
    saveState();
    renderCountdown();
  });

  /* ---------------------------------------------------------
     5. CALENDAR PLANNER RENDER
  --------------------------------------------------------- */
  const weeksContainer = document.getElementById("weeksContainer");

  function topicKey(w, d, t) { return `${w}-${d}-${t}`; }

  function buildCalendar() {
    weeksContainer.innerHTML = "";
    WEEKS.forEach((week) => {
      const block = document.createElement("div");
      block.className = "week-block";

      const head = document.createElement("div");
      head.className = "week-block__head";
      head.innerHTML = `
        <div>
          <div class="week-block__title">Week ${week.week}</div>
          <div class="week-block__range">${week.range}</div>
        </div>
        <div class="week-block__progress">
          <div class="progress-track"><div class="progress-fill" id="weekFill-${week.week}" style="background:var(--gold)"></div></div>
          <span class="week-block__pct" id="weekPct-${week.week}">0%</span>
        </div>
      `;
      block.appendChild(head);

      const daysWrap = document.createElement("div");
      daysWrap.className = "week-block__days";

      week.days.forEach((day, dIdx) => {
        const card = document.createElement("div");
        card.className = "day-card" + (day.revision ? " day-card--sun" : "");
        const dayLabel = day.revision ? `${day.name} (Revision)` : day.name;
        card.innerHTML = `<div class="day-card__head"><span class="day-card__name">${dayLabel}</span></div>`;

        day.topics.forEach((t, tIdx) => {
          const [subject, label] = t;
          const key = topicKey(week.week, dIdx, tIdx);
          const checked = !!state.topics[key];
          const item = document.createElement("label");
          item.className = "topic-item";
          item.innerHTML = `
            <input type="checkbox" data-key="${key}" ${checked ? "checked" : ""}>
            <span><span class="topic-tag topic-tag--${subject}"></span>${label}</span>
          `;
          card.appendChild(item);
        });
        daysWrap.appendChild(card);
      });

      block.appendChild(daysWrap);

      // Weekly goals row (separate full-width row)
      const goalsRow = document.createElement("div");
      goalsRow.className = "week-block__days";
      goalsRow.style.gridTemplateColumns = "1fr";
      const goalsCard = document.createElement("div");
      goalsCard.className = "day-card goals-card";
      const goalLabels = ["Topics Completed", "Revision Done", "Mock Test Done", "Notes Updated"];
      goalsCard.innerHTML = `<div class="day-card__head"><span class="day-card__name">Weekly Goals — Week ${week.week}</span></div>`;
      goalLabels.forEach((label, gIdx) => {
        const gKey = `${week.week}-${gIdx}`;
        const checked = !!state.goals[gKey];
        const item = document.createElement("label");
        item.className = "topic-item";
        item.innerHTML = `<input type="checkbox" data-goal="${gKey}" ${checked ? "checked" : ""}><span>${label}</span>`;
        goalsCard.appendChild(item);
      });
      goalsRow.appendChild(goalsCard);
      block.appendChild(goalsRow);

      weeksContainer.appendChild(block);
    });

    // Attach listeners
    weeksContainer.querySelectorAll("input[data-key]").forEach((cb) => {
      cb.addEventListener("change", () => {
        state.topics[cb.dataset.key] = cb.checked;
        registerStudyActivity();
        saveState();
        renderAll();
      });
    });
    weeksContainer.querySelectorAll("input[data-goal]").forEach((cb) => {
      cb.addEventListener("change", () => {
        state.goals[cb.dataset.goal] = cb.checked;
        saveState();
        renderAll();
      });
    });
  }

  /* ---------------------------------------------------------
     6. PROGRESS CALCULATIONS
  --------------------------------------------------------- */
  function computeProgress() {
    let total = 0, done = 0;
    const subjTotals = { maths: 0, english: 0, gk: 0 };
    const subjDone = { maths: 0, english: 0, gk: 0 };
    const weekStats = [];

    WEEKS.forEach((week) => {
      let wTotal = 0, wDone = 0;
      week.days.forEach((day, dIdx) => {
        day.topics.forEach((t, tIdx) => {
          const [subject] = t;
          const key = topicKey(week.week, dIdx, tIdx);
          total++; wTotal++;
          subjTotals[subject]++;
          if (state.topics[key]) {
            done++; wDone++;
            subjDone[subject]++;
          }
        });
      });
      weekStats.push({ week: week.week, total: wTotal, done: wDone, pct: wTotal ? Math.round((wDone/wTotal)*100) : 0 });
    });

    const pct = (n, d) => (d ? Math.round((n/d)*100) : 0);

    return {
      overallPct: pct(done, total),
      overallDone: done,
      overallTotal: total,
      mathsPct: pct(subjDone.maths, subjTotals.maths),
      englishPct: pct(subjDone.english, subjTotals.english),
      gkPct: pct(subjDone.gk, subjTotals.gk),
      weekStats,
    };
  }

  /* ---------------------------------------------------------
     7. STUDY STREAK
  --------------------------------------------------------- */
  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  function registerStudyActivity() {
    const today = todayStr();
    if (state.lastStudyDate === today) return; // already counted today
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().slice(0, 10);
    if (state.lastStudyDate === yStr) {
      state.streak = (state.streak || 0) + 1;
    } else {
      state.streak = 1;
    }
    state.lastStudyDate = today;
  }

  /* ---------------------------------------------------------
     8. RENDER DASHBOARD + STATS
  --------------------------------------------------------- */
  function renderDashboard() {
    const p = computeProgress();

    document.getElementById("overallPct").textContent = p.overallPct + "%";
    document.getElementById("overallFill").style.width = p.overallPct + "%";
    document.getElementById("overallFoot").textContent = `${p.overallDone} / ${p.overallTotal} objectives complete`;

    document.getElementById("mathsPct").textContent = p.mathsPct + "%";
    document.getElementById("mathsFill").style.width = p.mathsPct + "%";
    document.getElementById("englishPct").textContent = p.englishPct + "%";
    document.getElementById("englishFill").style.width = p.englishPct + "%";
    document.getElementById("gkPct").textContent = p.gkPct + "%";
    document.getElementById("gkFill").style.width = p.gkPct + "%";

    document.getElementById("streakNum").textContent = state.streak || 0;

    // Stats section
    document.getElementById("s_overall").textContent = p.overallPct + "%";
    document.getElementById("s_maths").textContent = p.mathsPct + "%";
    document.getElementById("s_english").textContent = p.englishPct + "%";
    document.getElementById("s_gk").textContent = p.gkPct + "%";
    document.getElementById("s_streak").textContent = state.streak || 0;

    // Week progress bars (in calendar)
    p.weekStats.forEach((w) => {
      const fill = document.getElementById(`weekFill-${w.week}`);
      const pctEl = document.getElementById(`weekPct-${w.week}`);
      if (fill) fill.style.width = w.pct + "%";
      if (pctEl) pctEl.textContent = w.pct + "%";
    });

    // Weekly bars in Statistics tab
    const weeklyBars = document.getElementById("weeklyBars");
    weeklyBars.innerHTML = "";
    p.weekStats.forEach((w) => {
      const row = document.createElement("div");
      row.className = "weekly-bar-row";
      row.innerHTML = `
        <span class="weekly-bar-row__label">Week ${w.week}</span>
        <div class="progress-track"><div class="progress-fill" style="width:${w.pct}%; background:var(--maths)"></div></div>
        <span class="weekly-bar-row__pct">${w.pct}%</span>
      `;
      weeklyBars.appendChild(row);
    });
  }

  /* ---------------------------------------------------------
     9. HABIT TRACKER
  --------------------------------------------------------- */
  function buildHabitTable() {
    const table = document.getElementById("habitTable");
    let html = "<thead><tr><th>Habit</th>";
    DOW.forEach((d) => (html += `<th>${d}</th>`));
    html += "</tr></thead><tbody>";
    HABITS.forEach((habit) => {
      html += `<tr><td>${habit}</td>`;
      DOW.forEach((d) => {
        const key = `${habit}-${d}`;
        const checked = !!state.habits[key];
        html += `<td><input type="checkbox" class="habit-checkbox" data-habit="${key}" ${checked ? "checked" : ""}></td>`;
      });
      html += "</tr>";
    });
    html += "</tbody>";
    table.innerHTML = html;

    table.querySelectorAll("input[data-habit]").forEach((cb) => {
      cb.addEventListener("change", () => {
        state.habits[cb.dataset.habit] = cb.checked;
        saveState();
      });
    });
  }

  /* ---------------------------------------------------------
     10. MOCK TEST TRACKER
  --------------------------------------------------------- */
  const mockForm = document.getElementById("mockForm");
  const mockTableBody = document.getElementById("mockTableBody");

  function renderMocks() {
    mockTableBody.innerHTML = "";
    if (!state.mocks.length) {
      mockTableBody.innerHTML = `<tr><td colspan="5" class="mock-empty">No mocks logged yet. Add your first one above.</td></tr>`;
    } else {
      state.mocks
        .slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .forEach((m) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${m.number}</td>
            <td>${m.date}</td>
            <td>${m.score}</td>
            <td>/300</td>
            <td><button class="mock-del" data-id="${m.id}" title="Delete">✕</button></td>
          `;
          mockTableBody.appendChild(tr);
        });
    }

    mockTableBody.querySelectorAll(".mock-del").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.mocks = state.mocks.filter((m) => String(m.id) !== btn.dataset.id);
        saveState();
        renderMocks();
        renderMockStats();
      });
    });
  }

  function renderMockStats() {
    const count = state.mocks.length;
    const scores = state.mocks.map((m) => Number(m.score));
    const best = count ? Math.max(...scores) : null;
    const avg = count ? Math.round(scores.reduce((a, b) => a + b, 0) / count) : null;

    document.getElementById("mockCount").textContent = count;
    document.getElementById("mockBest").textContent = best === null ? "--" : best;
    document.getElementById("mockAvg").textContent = avg === null ? "--" : avg;

    document.getElementById("s_mocks").textContent = count;
    document.getElementById("s_best").textContent = best === null ? "--" : best;
  }

  mockForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const number = document.getElementById("mockNumber").value.trim();
    const date = document.getElementById("mockDate").value;
    const score = document.getElementById("mockScore").value;
    if (!number || !date || score === "") return;

    state.mocks.push({ id: Date.now(), number, date, score: Number(score) });
    saveState();
    mockForm.reset();
    renderMocks();
    renderMockStats();
  });

  /* ---------------------------------------------------------
     11. NOTES (auto-save)
  --------------------------------------------------------- */
  function buildNotes() {
    document.querySelectorAll("textarea[data-note]").forEach((ta) => {
      const key = ta.dataset.note;
      ta.value = state.notes[key] || "";
      let saveTimeout;
      ta.addEventListener("input", () => {
        state.notes[key] = ta.value;
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
          saveState();
          flashSavedBadge();
        }, 500);
      });
    });
  }

  function flashSavedBadge() {
    const badge = document.getElementById("notesSavedBadge");
    badge.classList.add("show");
    clearTimeout(flashSavedBadge._t);
    flashSavedBadge._t = setTimeout(() => badge.classList.remove("show"), 1200);
  }

  /* ---------------------------------------------------------
     12. MOTIVATIONAL QUOTE
  --------------------------------------------------------- */
  function setRandomQuote() {
    const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    document.getElementById("quoteText").textContent = q;
  }
  document.getElementById("newQuoteBtn").addEventListener("click", setRandomQuote);

  /* ---------------------------------------------------------
     13. RESET
  --------------------------------------------------------- */
  document.getElementById("resetBtn").addEventListener("click", () => {
    if (confirm("This will erase all saved progress, notes, mocks, and habits. Continue?")) {
      localStorage.removeItem(STORE_KEY);
      state = loadState();
      initAll();
    }
  });

  /* ---------------------------------------------------------
     14. MASTER RENDER / INIT
  --------------------------------------------------------- */
  function renderAll() {
    renderDashboard();
    renderCountdown();
    renderMockStats();
  }

  function initAll() {
    buildCalendar();
    buildHabitTable();
    buildNotes();
    renderMocks();
    renderAll();
    setRandomQuote();
  }

  initAll();
})();
