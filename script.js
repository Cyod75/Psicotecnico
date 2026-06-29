/* ============================================================
   script.js — Lógica de la aplicación
   Simulador Psicotécnico · Tropa y Marinería
   ============================================================ */

(function () {
  "use strict";

  /* ── Estado global ───────────────────────────────────── */
  const state = {
    currentScreen: "home",
    mode: "exam",           // "exam" | "practice"
    currentTestId: null,
    currentTest: null,       // copia del test activo (con preguntas, posiblemente mezcladas)
    currentIndex: 0,
    answers: [],             // array de índices seleccionados (null = sin responder)
    timerInterval: null,
    timeRemaining: 0,        // en segundos
    memoryTimerInterval: null,
    testInProgress: false,
    mapVisible: false,
    practiceRevealed: []     // track de preguntas reveladas en modo práctica
  };

  /* ── Elementos DOM ───────────────────────────────────── */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const els = {
    // Screens
    screenHome:    $("#screenHome"),
    screenMemory:  $("#screenMemory"),
    screenTest:    $("#screenTest"),
    screenResults: $("#screenResults"),
    screenReview:  $("#screenReview"),

    // Header
    headerLogo:   $("#headerLogo"),
    themeToggle:  $("#themeToggle"),

    // Home
    lastScore:      $("#lastScore"),
    lastScoreValue: $("#lastScoreValue"),
    lastScoreTest:  $("#lastScoreTest"),
    moduleGrid:     $("#moduleGrid"),
    modeExam:       $("#modeExam"),
    modePractice:   $("#modePractice"),
    testList:       $("#testList"),

    // Memory
    memoryTitle:    $("#memoryTitle"),
    memoryText:     $("#memoryText"),
    memoryTimer:    $("#memoryTimer"),
    memorySkipBtn:  $("#memorySkipBtn"),

    // Test
    currentModule:    $("#currentModule"),
    moduleIcon:       $("#moduleIcon"),
    moduleName:       $("#moduleName"),
    timerDisplay:     $("#timerDisplay"),
    timerValue:       $("#timerValue"),
    progressFill:     $("#progressFill"),
    currentQuestionNum: $("#currentQuestionNum"),
    totalQuestions:   $("#totalQuestions"),
    questionCard:     $("#questionCard"),
    questionLabel:    $("#questionLabel"),
    questionText:     $("#questionText"),
    optionsList:      $("#optionsList"),
    explanation:      $("#explanation"),
    explanationText:  $("#explanationText"),
    prevBtn:          $("#prevBtn"),
    nextBtn:          $("#nextBtn"),
    finishBtn:        $("#finishBtn"),
    mapToggleBtn:     $("#mapToggleBtn"),
    questionMap:      $("#questionMap"),
    mapGrid:          $("#mapGrid"),

    // Results
    resultsIcon:     $("#resultsIcon"),
    resultsTitle:    $("#resultsTitle"),
    scorePercent:    $("#scorePercent"),
    statCorrect:     $("#statCorrect"),
    statIncorrect:   $("#statIncorrect"),
    statBlank:       $("#statBlank"),
    finalScore:      $("#finalScore"),
    moduleBreakdown: $("#moduleBreakdown"),
    reviewBtn:       $("#reviewBtn"),
    retryBtn:        $("#retryBtn"),
    homeBtn:         $("#homeBtn"),

    // Review
    reviewList:        $("#reviewList"),
    backToResultsBtn:  $("#backToResultsBtn"),
    backToResultsBtn2: $("#backToResultsBtn2"),

    // Modal
    modalOverlay: $("#modalOverlay"),
    modalIcon:    $("#modalIcon"),
    modalTitle:   $("#modalTitle"),
    modalText:    $("#modalText"),
    modalConfirm: $("#modalConfirm"),
    modalCancel:  $("#modalCancel")
  };


  /* ════════════════════════════════════════════════════════
     STORAGE — localStorage wrapper
     ════════════════════════════════════════════════════════ */
  const Storage = {
    _key: "psicotecnico_v1",

    load() {
      try {
        const raw = localStorage.getItem(this._key);
        return raw ? JSON.parse(raw) : {};
      } catch { return {}; }
    },

    save(data) {
      try {
        const current = this.load();
        localStorage.setItem(this._key, JSON.stringify({ ...current, ...data }));
      } catch { /* silent fail */ }
    },

    getLastScore() {
      const d = this.load();
      return d.lastScore || null;
    },

    saveScore(testId, testName, score) {
      const d = this.load();
      const history = d.history || [];
      const entry = {
        testId,
        testName,
        score,
        date: new Date().toISOString()
      };
      history.push(entry);

      // Guardar mejor puntuación por test
      const bests = d.bests || {};
      if (!bests[testId] || score.percent > bests[testId]) {
        bests[testId] = score.percent;
      }

      this.save({ lastScore: entry, history, bests });
    },

    getBest(testId) {
      const d = this.load();
      return d.bests ? d.bests[testId] : null;
    },

    saveTestState(testState) {
      this.save({ savedTest: testState });
    },

    getSavedTest() {
      const d = this.load();
      return d.savedTest || null;
    },

    clearSavedTest() {
      this.save({ savedTest: null });
    },

    getTheme() {
      const d = this.load();
      return d.theme || null;
    },

    saveTheme(theme) {
      this.save({ theme });
    },

    getMode() {
      const d = this.load();
      return d.mode || "exam";
    },

    saveMode(mode) {
      this.save({ mode });
    }
  };


  /* ════════════════════════════════════════════════════════
     THEME — Siempre Oscuro
     ════════════════════════════════════════════════════════ */
  const Theme = {
    init() {
      // Tema oscuro por defecto (sin toggle)
    }
  };


  /* ════════════════════════════════════════════════════════
     ROUTER — Navegación entre pantallas
     ════════════════════════════════════════════════════════ */
  function showScreen(screenId) {
    $$(".screen").forEach(s => s.classList.remove("active"));
    const target = $(`#screen${screenId.charAt(0).toUpperCase() + screenId.slice(1)}`);
    if (target) {
      target.classList.add("active");
      state.currentScreen = screenId;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }


  /* ════════════════════════════════════════════════════════
     HOME — Pantalla principal
     ════════════════════════════════════════════════════════ */
  function renderHome() {
    renderModuleGrid();
    renderTestList();
    renderLastScore();
    renderStatsStrip();
    restoreMode();
  }

  function renderModuleGrid() {
    const order = APP_DATA.moduleOrder;
    els.moduleGrid.innerHTML = order.map(key => {
      const m = APP_DATA.modules[key];
      return `
        <div class="module-chip" role="listitem">
          <span class="module-chip__icon material-symbols-rounded" style="color: ${m.color}">${m.icon}</span>
          <span class="module-chip__name">${m.name}</span>
        </div>`;
    }).join("");
  }

  function renderTestList() {
    const tests = APP_DATA.tests;
    let html = "";

    tests.forEach(test => {
      const best = Storage.getBest(test.id);
      const badgeClass = test.difficultyLevel >= 3 ? "alto" : test.difficultyLevel === 2 ? "medio" : "variable";
      html += `
        <article class="test-card" role="listitem" tabindex="0" data-test-id="${test.id}" aria-label="${test.name}">
          <div class="test-card__header">
            <h3 class="test-card__name">${test.name} <small style="font-weight:400;color:var(--color-text-muted)">· ${test.subtitle}</small></h3>
            <span class="test-card__badge test-card__badge--${badgeClass}">${test.difficulty}</span>
          </div>
          <p class="test-card__desc">${test.description}</p>
          <div class="test-card__meta">
            <span class="test-card__meta-item"><span class="material-symbols-rounded" style="font-size: 16px;">edit_document</span> ${test.questions.length} preguntas</span>
            <span class="test-card__meta-item"><span class="material-symbols-rounded" style="font-size: 16px;">timer</span> ${test.timeMinutes} min</span>
            <span class="test-card__meta-item"><span class="material-symbols-rounded" style="font-size: 16px;">analytics</span> 7 módulos</span>
          </div>
          ${best !== null ? `<div class="test-card__best"><span class="material-symbols-rounded" style="font-size: 16px; vertical-align: text-bottom;">emoji_events</span> Mejor: ${best}%</div>` : ""}
        </article>`;
    });

    // Test aleatorio
    const rc = APP_DATA.randomTestConfig;
    const bestRandom = Storage.getBest("test-random");
    html += `
      <article class="test-card" role="listitem" tabindex="0" data-test-id="test-random" aria-label="${rc.name}">
        <div class="test-card__header">
          <h3 class="test-card__name">${rc.name} <small style="font-weight:400;color:var(--color-text-muted)">· ${rc.subtitle}</small></h3>
          <span class="test-card__badge test-card__badge--variable">${rc.difficulty}</span>
        </div>
        <p class="test-card__desc">${rc.description}</p>
        <div class="test-card__meta">
          <span class="test-card__meta-item"><span class="material-symbols-rounded" style="font-size: 16px;">edit_document</span> 35 preguntas</span>
          <span class="test-card__meta-item"><span class="material-symbols-rounded" style="font-size: 16px;">timer</span> ${rc.timeMinutes} min</span>
          <span class="test-card__meta-item"><span class="material-symbols-rounded" style="font-size: 16px;">casino</span> Aleatorio</span>
        </div>
        ${bestRandom !== null ? `<div class="test-card__best"><span class="material-symbols-rounded" style="font-size: 16px; vertical-align: text-bottom;">emoji_events</span> Mejor: ${bestRandom}%</div>` : ""}
      </article>`;

    els.testList.innerHTML = html;

    // Event listeners
    $$(".test-card").forEach(card => {
      card.addEventListener("click", () => startTest(card.dataset.testId));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          startTest(card.dataset.testId);
        }
      });
    });
  }

  function renderLastScore() {
    const last = Storage.getLastScore();
    if (last) {
      els.lastScore.classList.add("visible");
      els.lastScoreValue.textContent = `${last.score.percent}%`;
      els.lastScoreTest.textContent = `${last.testName}\n${new Date(last.date).toLocaleDateString("es-ES")}`;
    } else {
      els.lastScore.classList.remove("visible");
    }
  }

  function renderStatsStrip() {
    const history = Storage.load().history || [];
    const totalTests = history.length;
    
    let best = 0;
    let sum = 0;
    history.forEach(h => {
      if (h.score && h.score.percent > best) best = h.score.percent;
      if (h.score && h.score.percent) sum += h.score.percent;
    });
    const avg = totalTests > 0 ? Math.round(sum / totalTests) : 0;

    const elTotal = document.getElementById("statTotalTests");
    const elBest = document.getElementById("statBestScore");
    const elAvg = document.getElementById("statAvgScore");

    if(elTotal) elTotal.textContent = totalTests;
    if(elBest) elBest.textContent = totalTests > 0 ? best + "%" : "—";
    if(elAvg) elAvg.textContent = totalTests > 0 ? avg + "%" : "—";
  }

  function restoreMode() {
    const mode = Storage.getMode();
    state.mode = mode;
    if (mode === "practice") {
      els.modeExam.classList.remove("active");
      els.modeExam.setAttribute("aria-checked", "false");
      els.modePractice.classList.add("active");
      els.modePractice.setAttribute("aria-checked", "true");
    } else {
      els.modeExam.classList.add("active");
      els.modeExam.setAttribute("aria-checked", "true");
      els.modePractice.classList.remove("active");
      els.modePractice.setAttribute("aria-checked", "false");
    }
  }


  /* ════════════════════════════════════════════════════════
     TEST ENGINE — Lógica del test
     ════════════════════════════════════════════════════════ */

  function startTest(testId) {
    let test;

    if (testId === "test-random") {
      test = generateRandomTest();
    } else {
      test = APP_DATA.tests.find(t => t.id === testId);
    }

    if (!test) return;

    state.currentTestId = testId;
    state.currentTest = JSON.parse(JSON.stringify(test)); // deep copy
    state.currentIndex = 0;
    state.answers = new Array(test.questions.length).fill(null);
    state.practiceRevealed = new Array(test.questions.length).fill(false);
    state.testInProgress = true;
    state.mapVisible = false;

    // Comprobar si hay fase de memoria
    if (state.currentTest.memoryContext && state.mode === "exam") {
      startMemoryPhase();
    } else {
      beginTestScreen();
    }
  }

  function generateRandomTest() {
    const rc = APP_DATA.randomTestConfig;

    // Para el test aleatorio, usar preguntas del pool para memoria
    // (son autocontenidas y no dependen de un memoryContext).
    // Para el resto de módulos, mezclar preguntas de todos los tests + pool.
    const allQuestions = [];
    APP_DATA.tests.forEach(t => {
      t.questions.forEach(q => allQuestions.push({ ...q, _source: t.id }));
    });
    APP_DATA.questionPool.forEach(q => allQuestions.push({ ...q, _source: "pool" }));

    // Agrupar por módulo
    const byModule = {};
    APP_DATA.moduleOrder.forEach(mod => { byModule[mod] = []; });
    allQuestions.forEach(q => {
      if (byModule[q.module]) byModule[q.module].push(q);
    });

    // Para memoria, preferir preguntas del pool (autocontenidas)
    const memPool = byModule["memoria"].filter(q => q._source === "pool");
    const memOther = byModule["memoria"].filter(q => q._source !== "pool");
    // Si hay suficientes del pool, usar esas; si no, completar con otras
    shuffle(memPool);
    shuffle(memOther);
    byModule["memoria"] = [...memPool, ...memOther];

    // Elegir 5 aleatorias de cada módulo
    const selected = [];
    APP_DATA.moduleOrder.forEach(mod => {
      const pool = byModule[mod];
      if (mod !== "memoria") shuffle(pool);
      const pick = pool.slice(0, rc.questionsPerModule);
      pick.forEach((q, i) => {
        q.id = selected.length + i + 1;
        delete q._source;
      });
      selected.push(...pick);
    });

    // No incluir memoryContext en test aleatorio
    // (las preguntas de memoria del pool son autocontenidas)
    return {
      id: "test-random",
      name: rc.name,
      subtitle: rc.subtitle,
      description: rc.description,
      difficulty: rc.difficulty,
      timeMinutes: rc.timeMinutes,
      memoryContext: null,
      questions: selected
    };
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  /* ── Fase de Memorización ────────────────────────────── */
  function startMemoryPhase() {
    const mem = state.currentTest.memoryContext;
    els.memoryTitle.textContent = mem.title;
    els.memoryText.textContent = mem.text;

    let timeLeft = mem.duration;
    els.memoryTimer.textContent = timeLeft;
    els.memoryTimer.classList.remove("warning");

    showScreen("memory");

    state.memoryTimerInterval = setInterval(() => {
      timeLeft--;
      els.memoryTimer.textContent = timeLeft;

      if (timeLeft <= 10) {
        els.memoryTimer.classList.add("warning");
      }

      if (timeLeft <= 0) {
        clearInterval(state.memoryTimerInterval);
        beginTestScreen();
      }
    }, 1000);
  }

  function skipMemory() {
    clearInterval(state.memoryTimerInterval);
    beginTestScreen();
  }

  /* ── Iniciar pantalla de test ────────────────────────── */
  function beginTestScreen() {
    const test = state.currentTest;

    // Timer
    state.timeRemaining = test.timeMinutes * 60;
    updateTimerDisplay();

    // Ocultar/mostrar timer según modo
    if (state.mode === "practice") {
      els.timerDisplay.style.display = "none";
    } else {
      els.timerDisplay.style.display = "flex";
      startTimer();
    }

    els.totalQuestions.textContent = test.questions.length;

    // Mapa de preguntas
    renderMap();

    // Mostrar pantalla
    showScreen("test");
    renderQuestion();

    // Guardar estado
    saveTestState();
  }

  /* ── Timer ───────────────────────────────────────────── */
  function startTimer() {
    clearInterval(state.timerInterval);
    state.timerInterval = setInterval(() => {
      state.timeRemaining--;
      updateTimerDisplay();

      if (state.timeRemaining <= 0) {
        clearInterval(state.timerInterval);
        finishTest();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const mins = Math.floor(state.timeRemaining / 60);
    const secs = state.timeRemaining % 60;
    els.timerValue.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    // Clases de alerta
    els.timerDisplay.classList.remove("warning", "danger");
    if (state.timeRemaining <= 60) {
      els.timerDisplay.classList.add("danger");
    } else if (state.timeRemaining <= 300) {
      els.timerDisplay.classList.add("warning");
    }
  }

  /* ── Renderizar pregunta ─────────────────────────────── */
  function renderQuestion() {
    const test = state.currentTest;
    const idx = state.currentIndex;
    const q = test.questions[idx];
    const mod = APP_DATA.modules[q.module];

    // Módulo actual
    els.moduleIcon.textContent = mod.icon;
    els.moduleName.textContent = mod.name;
    els.currentModule.style.borderColor = mod.color;

    // Progreso
    const progress = ((idx + 1) / test.questions.length) * 100;
    els.progressFill.style.width = `${progress}%`;
    els.currentQuestionNum.textContent = idx + 1;

    // Etiqueta
    els.questionLabel.textContent = `Pregunta ${idx + 1} · ${mod.name}`;

    // Texto
    els.questionText.textContent = q.text;

    // Opciones
    const letters = ["A", "B", "C", "D"];
    const answered = state.answers[idx];
    const revealed = state.practiceRevealed[idx];

    let optHtml = "";
    q.options.forEach((opt, i) => {
      let classes = "option-btn";
      if (answered === i) classes += " selected";

      if (state.mode === "practice" && revealed) {
        if (i === q.correct) classes += " correct";
        else if (answered === i) classes += " incorrect";
        classes += " disabled";
      }

      optHtml += `
        <button class="${classes}" data-index="${i}" role="radio" aria-checked="${answered === i}">
          <span class="option-btn__letter">${letters[i]}</span>
          <span>${opt}</span>
        </button>`;
    });
    els.optionsList.innerHTML = optHtml;

    // Explicación (práctica)
    if (state.mode === "practice" && revealed) {
      els.explanationText.textContent = q.explanation;
      els.explanation.classList.add("visible");
    } else {
      els.explanation.classList.remove("visible");
    }

    // Botones de navegación
    els.prevBtn.disabled = idx === 0;

    const isLast = idx === test.questions.length - 1;
    els.nextBtn.style.display = isLast ? "none" : "flex";
    els.finishBtn.style.display = isLast ? "flex" : "none";

    // Actualizar mapa
    updateMap();

    // Event listeners para opciones
    $$(".option-btn").forEach(btn => {
      btn.addEventListener("click", () => selectOption(parseInt(btn.dataset.index)));
    });
  }

  /* ── Seleccionar opción ──────────────────────────────── */
  function selectOption(optionIndex) {
    const idx = state.currentIndex;

    // En práctica, si ya se reveló, no hacer nada
    if (state.mode === "practice" && state.practiceRevealed[idx]) return;

    state.answers[idx] = optionIndex;

    // En modo práctica, revelar inmediatamente
    if (state.mode === "practice") {
      state.practiceRevealed[idx] = true;
    }

    renderQuestion();
    saveTestState();
  }

  /* ── Navegación ──────────────────────────────────────── */
  function goNext() {
    if (state.currentIndex < state.currentTest.questions.length - 1) {
      state.currentIndex++;
      renderQuestion();
    }
  }

  function goPrev() {
    if (state.currentIndex > 0) {
      state.currentIndex--;
      renderQuestion();
    }
  }

  function goToQuestion(idx) {
    state.currentIndex = idx;
    renderQuestion();
    // Cerrar mapa en móvil
    state.mapVisible = false;
    els.questionMap.classList.remove("visible");
    els.mapToggleBtn.setAttribute("aria-expanded", "false");
  }

  /* ── Mapa de preguntas ───────────────────────────────── */
  function renderMap() {
    const total = state.currentTest.questions.length;
    let html = "";
    for (let i = 0; i < total; i++) {
      html += `<button class="map-dot" data-qi="${i}" role="listitem" aria-label="Ir a pregunta ${i + 1}">${i + 1}</button>`;
    }
    els.mapGrid.innerHTML = html;

    $$(".map-dot").forEach(dot => {
      dot.addEventListener("click", () => goToQuestion(parseInt(dot.dataset.qi)));
    });
  }

  function updateMap() {
    $$(".map-dot").forEach((dot, i) => {
      dot.classList.remove("answered", "current");
      if (i === state.currentIndex) dot.classList.add("current");
      else if (state.answers[i] !== null) dot.classList.add("answered");
    });
  }

  function toggleMap() {
    state.mapVisible = !state.mapVisible;
    els.questionMap.classList.toggle("visible", state.mapVisible);
    els.mapToggleBtn.setAttribute("aria-expanded", state.mapVisible);
    els.mapToggleBtn.textContent = state.mapVisible ? "✕ Cerrar mapa" : "📋 Ver mapa de preguntas";
  }

  /* ── Finalizar test ──────────────────────────────────── */
  function requestFinish() {
    const unanswered = state.answers.filter(a => a === null).length;

    if (unanswered > 0) {
      els.modalIcon.classList.add("material-symbols-rounded");
      els.modalIcon.textContent = "warning";
      els.modalTitle.textContent = "¿Finalizar test?";
      els.modalText.textContent = `Tienes ${unanswered} pregunta${unanswered > 1 ? "s" : ""} sin responder. ¿Estás seguro de que quieres terminar?`;
      els.modalOverlay.classList.add("visible");
    } else {
      finishTest();
    }
  }

  function finishTest() {
    clearInterval(state.timerInterval);
    state.testInProgress = false;
    els.modalOverlay.classList.remove("visible");

    const results = calculateResults();
    Storage.saveScore(state.currentTestId, state.currentTest.name, results);
    Storage.clearSavedTest();

    renderResults(results);
    showScreen("results");
  }


  /* ════════════════════════════════════════════════════════
     SCORER — Cálculo de puntuaciones
     ════════════════════════════════════════════════════════ */
  function calculateResults() {
    const test = state.currentTest;
    const scoring = APP_DATA.scoring;

    let correct = 0, incorrect = 0, blank = 0;
    let rawScore = 0;

    // Desglose por módulo
    const moduleStats = {};
    APP_DATA.moduleOrder.forEach(mod => {
      moduleStats[mod] = { correct: 0, incorrect: 0, blank: 0, total: 0 };
    });

    test.questions.forEach((q, i) => {
      const answer = state.answers[i];
      const ms = moduleStats[q.module];
      ms.total++;

      if (answer === null) {
        blank++;
        ms.blank++;
        rawScore += scoring.blank;
      } else if (answer === q.correct) {
        correct++;
        ms.correct++;
        rawScore += scoring.correct;
      } else {
        incorrect++;
        ms.incorrect++;
        rawScore += scoring.incorrect;
      }
    });

    const total = test.questions.length;
    const percent = Math.max(0, Math.round((correct / total) * 100));
    rawScore = Math.round(rawScore * 100) / 100;

    return { correct, incorrect, blank, total, percent, rawScore, moduleStats };
  }


  /* ════════════════════════════════════════════════════════
     RESULTS — Pantalla de resultados
     ════════════════════════════════════════════════════════ */
  function renderResults(results) {
    els.resultsIcon.classList.add("material-symbols-rounded");
    
    const ring = document.getElementById("scoreRingFill");
    if(ring) {
      ring.classList.remove("score-ring__fill--excellent", "score-ring__fill--good", "score-ring__fill--average", "score-ring__fill--poor");
    }

    // Icono según resultado
    if (results.percent >= 80) {
      els.resultsIcon.textContent = "military_tech";
      els.resultsTitle.textContent = "¡Excelente resultado!";
      if(ring) ring.classList.add("score-ring__fill--excellent");
    } else if (results.percent >= 60) {
      els.resultsIcon.textContent = "thumb_up";
      els.resultsTitle.textContent = "¡Buen trabajo!";
      if(ring) ring.classList.add("score-ring__fill--good");
    } else if (results.percent >= 40) {
      els.resultsIcon.textContent = "trending_up";
      els.resultsTitle.textContent = "Sigue practicando";
      if(ring) ring.classList.add("score-ring__fill--average");
    } else {
      els.resultsIcon.textContent = "fitness_center";
      els.resultsTitle.textContent = "No te rindas";
      if(ring) ring.classList.add("score-ring__fill--poor");
    }

    if(ring) {
      // Calcular offset (Circunferencia = 2 * PI * 52 = 326.7, css = 327)
      const offset = 327 - (327 * results.percent) / 100;
      setTimeout(() => {
        ring.style.strokeDashoffset = offset;
      }, 100);
    }

    // Animación de porcentaje
    animateNumber(els.scorePercent, results.percent, 800);
    animateNumber(els.statCorrect, results.correct, 500);
    animateNumber(els.statIncorrect, results.incorrect, 500);
    animateNumber(els.statBlank, results.blank, 500);

    // Nota final
    els.finalScore.textContent = `${results.rawScore} / ${results.total}`;

    // Desglose por módulos
    let breakdownHtml = "";
    APP_DATA.moduleOrder.forEach(mod => {
      const m = APP_DATA.modules[mod];
      const ms = results.moduleStats[mod];
      if (ms.total === 0) return;

      const pct = Math.round((ms.correct / ms.total) * 100);

      breakdownHtml += `
        <div class="module-bar">
          <span class="module-bar__icon material-symbols-rounded" style="color: ${m.color}">${m.icon}</span>
          <span class="module-bar__name">${m.name}</span>
          <div class="module-bar__track">
            <div class="module-bar__fill" style="width: 0%; background: ${m.color};" data-target="${pct}"></div>
          </div>
          <span class="module-bar__score">${ms.correct}/${ms.total}</span>
        </div>`;
    });
    els.moduleBreakdown.innerHTML = breakdownHtml;

    // Animar barras después de renderizar
    requestAnimationFrame(() => {
      setTimeout(() => {
        $$(".module-bar__fill").forEach(bar => {
          bar.style.width = bar.dataset.target + "%";
        });
      }, 100);
    });
  }

  function animateNumber(el, target, duration) {
    const start = performance.now();
    const initial = 0;

    function step(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(initial + (target - initial) * eased);
      el.textContent = current;

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }


  /* ════════════════════════════════════════════════════════
     REVIEW — Revisión de respuestas
     ════════════════════════════════════════════════════════ */
  function renderReview(filter = "all") {
    const test = state.currentTest;
    const letters = ["A", "B", "C", "D"];
    let html = "";

    test.questions.forEach((q, i) => {
      const answer = state.answers[i];
      const mod = APP_DATA.modules[q.module];
      let status, statusClass, itemClass;

      if (answer === null) {
        status = "En blanco";
        statusClass = "blank";
        itemClass = "blank";
      } else if (answer === q.correct) {
        status = "<span class='material-symbols-rounded' style='font-size: 16px; vertical-align: text-bottom;'>check</span> Correcta";
        statusClass = "correct";
        itemClass = "correct";
      } else {
        status = "<span class='material-symbols-rounded' style='font-size: 16px; vertical-align: text-bottom;'>close</span> Incorrecta";
        statusClass = "incorrect";
        itemClass = "incorrect";
      }

      // Filtrar
      if (filter !== "all" && filter !== statusClass) return;

      html += `
        <article class="review-item review-item--${itemClass}">
          <div class="review-item__header">
            <span class="review-item__module" style="color:${mod.color}"><span class="material-symbols-rounded" style="font-size: 18px; vertical-align: middle;">${mod.icon}</span> ${mod.name}</span>
            <span class="review-item__status review-item__status--${statusClass}">${status}</span>
          </div>
          <p class="review-item__question">${i + 1}. ${q.text}</p>
          <div class="review-item__answers">
            ${answer !== null && answer !== q.correct
              ? `<div class="review-item__answer review-item__answer--user"><span class="material-symbols-rounded" style="font-size: 16px; vertical-align: text-bottom;">close</span> Tu respuesta: ${letters[answer]}) ${q.options[answer]}</div>`
              : ""}
            <div class="review-item__answer review-item__answer--correct"><span class="material-symbols-rounded" style="font-size: 16px; vertical-align: text-bottom;">check</span> Correcta: ${letters[q.correct]}) ${q.options[q.correct]}</div>
          </div>
          <div class="review-item__explanation">${q.explanation}</div>
        </article>`;
    });

    if (!html) {
      html = `<p style="text-align:center;color:var(--color-text-muted);padding:var(--space-xl);">No hay preguntas con este filtro.</p>`;
    }

    els.reviewList.innerHTML = html;
  }

  function setReviewFilter(filter) {
    $$(".filter-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.filter === filter);
      btn.setAttribute("aria-selected", btn.dataset.filter === filter);
    });
    renderReview(filter);
  }


  /* ════════════════════════════════════════════════════════
     STATE PERSISTENCE — Guardar/restaurar test
     ════════════════════════════════════════════════════════ */
  function saveTestState() {
    if (!state.testInProgress) return;
    Storage.saveTestState({
      testId: state.currentTestId,
      test: state.currentTest,
      index: state.currentIndex,
      answers: state.answers,
      practiceRevealed: state.practiceRevealed,
      timeRemaining: state.timeRemaining,
      mode: state.mode,
      timestamp: Date.now()
    });
  }

  function checkSavedTest() {
    const saved = Storage.getSavedTest();
    if (!saved) return false;

    // Si tiene más de 2 horas, descartarlo
    if (Date.now() - saved.timestamp > 2 * 60 * 60 * 1000) {
      Storage.clearSavedTest();
      return false;
    }

    // Restaurar
    els.modalIcon.classList.add("material-symbols-rounded");
    els.modalIcon.textContent = "edit_document";
    els.modalTitle.textContent = "Test en progreso";
    els.modalText.textContent = `Tienes un test sin terminar (${saved.test.name}). ¿Quieres continuarlo?`;
    els.modalConfirm.textContent = "Continuar test";
    els.modalCancel.textContent = "Descartar";

    els.modalOverlay.classList.add("visible");

    // Guardamos referencia para manejar el click
    state._savedTestToRestore = saved;
    state._modalAction = "restore";

    return true;
  }

  function restoreSavedTest(saved) {
    state.currentTestId = saved.testId;
    state.currentTest = saved.test;
    state.currentIndex = saved.index;
    state.answers = saved.answers;
    state.practiceRevealed = saved.practiceRevealed || new Array(saved.answers.length).fill(false);
    state.timeRemaining = saved.timeRemaining;
    state.mode = saved.mode;
    state.testInProgress = true;
    state.mapVisible = false;

    updateTimerDisplay();

    if (state.mode === "practice") {
      els.timerDisplay.style.display = "none";
    } else {
      els.timerDisplay.style.display = "flex";
      startTimer();
    }

    els.totalQuestions.textContent = state.currentTest.questions.length;
    renderMap();
    showScreen("test");
    renderQuestion();
  }


  /* ════════════════════════════════════════════════════════
     MODAL — Gestión de confirmaciones
     Usa state._modalAction para distinguir el contexto:
       "finish"  → confirmar finalización de test
       "restore" → restaurar test guardado
       "goHome"  → salir del test al menú
     ════════════════════════════════════════════════════════ */
  function handleModalConfirm() {
    const action = state._modalAction || "finish";
    els.modalOverlay.classList.remove("visible");
    resetModalDefaults();

    switch (action) {
      case "restore": {
        const saved = state._savedTestToRestore;
        state._savedTestToRestore = null;
        restoreSavedTest(saved);
        break;
      }
      case "goHome":
        clearInterval(state.timerInterval);
        state.testInProgress = false;
        saveTestState();
        renderHome();
        showScreen("home");
        break;
      case "finish":
      default:
        finishTest();
        break;
    }
    state._modalAction = null;
  }

  function handleModalCancel() {
    if (state._modalAction === "restore") {
      state._savedTestToRestore = null;
      Storage.clearSavedTest();
    }
    state._modalAction = null;
    els.modalOverlay.classList.remove("visible");
    resetModalDefaults();
  }

  function resetModalDefaults() {
    els.modalConfirm.textContent = "Sí, finalizar";
    els.modalCancel.textContent = "Seguir con el test";
  }


  /* ════════════════════════════════════════════════════════
     BEFOREUNLOAD — Prevenir salida accidental
     ════════════════════════════════════════════════════════ */
  window.addEventListener("beforeunload", (e) => {
    if (state.testInProgress) {
      saveTestState();
      e.preventDefault();
      e.returnValue = "";
    }
  });


  /* ════════════════════════════════════════════════════════
     EVENT LISTENERS
     ════════════════════════════════════════════════════════ */
  function initEventListeners() {
    // Header
    els.headerLogo.addEventListener("click", goHome);
    els.headerLogo.addEventListener("keydown", (e) => {
      if (e.key === "Enter") goHome();
    });

    // Mode selector
    els.modeExam.addEventListener("click", () => setMode("exam"));
    els.modePractice.addEventListener("click", () => setMode("practice"));

    // Memory
    els.memorySkipBtn.addEventListener("click", skipMemory);

    // Test navigation
    els.prevBtn.addEventListener("click", goPrev);
    els.nextBtn.addEventListener("click", goNext);
    els.finishBtn.addEventListener("click", requestFinish);
    els.mapToggleBtn.addEventListener("click", toggleMap);

    // Results
    els.reviewBtn.addEventListener("click", () => {
      renderReview("all");
      showScreen("review");
    });
    els.retryBtn.addEventListener("click", () => {
      startTest(state.currentTestId);
    });
    els.homeBtn.addEventListener("click", goHome);

    // Review
    els.backToResultsBtn.addEventListener("click", () => showScreen("results"));
    els.backToResultsBtn2.addEventListener("click", () => showScreen("results"));

    $$(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => setReviewFilter(btn.dataset.filter));
    });

    // Modal
    els.modalConfirm.addEventListener("click", handleModalConfirm);
    els.modalCancel.addEventListener("click", handleModalCancel);
    els.modalOverlay.addEventListener("click", (e) => {
      if (e.target === els.modalOverlay) handleModalCancel();
    });

    // Teclado
    document.addEventListener("keydown", (e) => {
      if (state.currentScreen !== "test") return;

      if (e.key === "ArrowRight" || e.key === "d") goNext();
      if (e.key === "ArrowLeft" || e.key === "a") goPrev();
      if (e.key >= "1" && e.key <= "4") selectOption(parseInt(e.key) - 1);
    });
  }

  function setMode(mode) {
    state.mode = mode;
    Storage.saveMode(mode);

    els.modeExam.classList.toggle("active", mode === "exam");
    els.modeExam.setAttribute("aria-checked", mode === "exam");
    els.modePractice.classList.toggle("active", mode === "practice");
    els.modePractice.setAttribute("aria-checked", mode === "practice");
  }

  function goHome() {
    if (state.testInProgress) {
      state._modalAction = "goHome";
      els.modalIcon.classList.add("material-symbols-rounded");
      els.modalIcon.textContent = "home";
      els.modalTitle.textContent = "¿Salir del test?";
      els.modalText.textContent = "Tu progreso se guardará y podrás continuar más tarde.";
      els.modalConfirm.textContent = "Salir";
      els.modalCancel.textContent = "Continuar test";
      els.modalOverlay.classList.add("visible");
      return;
    }

    renderHome();
    showScreen("home");
  }


  /* ════════════════════════════════════════════════════════
     INIT — Inicialización
     ════════════════════════════════════════════════════════ */
  function init() {
    Theme.init();
    initEventListeners();
    initAI();
    renderHome();

    // Comprobar si hay un test guardado
    checkSavedTest();
  }

  // Arrancar cuando el DOM esté listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }


  /* ════════════════════════════════════════════════════════
     AI GENERATOR — Generación de tests con Gemini
     ════════════════════════════════════════════════════════ */

  // Estado local de la pantalla AI
  const aiState = {
    difficulty: "media-alta",
    loading: false,
  };

  // Mensajes de progreso mientras carga
  const AI_PROGRESS_MESSAGES = [
    "Conectando con Gemini…",
    "Analizando módulos psicotécnicos…",
    "Construyendo el módulo Verbal…",
    "Construyendo el módulo Numérico…",
    "Construyendo el módulo Espacial…",
    "Construyendo el módulo Mecánico…",
    "Construyendo el módulo de Memoria…",
    "Construyendo el módulo Abstracto…",
    "Construyendo el módulo de Percepción…",
    "Revisando la dificultad de las preguntas…",
    "Validando las respuestas correctas…",
    "Preparando el test final…",
    "Casi listo…",
  ];

  function initAI() {
    // Listener tarjeta IA en home
    const aiCard = document.getElementById("aiTestCard");
    if (aiCard) {
      aiCard.addEventListener("click", navigateToAI);
      aiCard.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigateToAI();
        }
      });
    }

    // Back button en pantalla AI
    const aiBackBtn = document.getElementById("aiBackBtn");
    if (aiBackBtn) {
      aiBackBtn.addEventListener("click", () => showScreen("home"));
    }

    // Chips de dificultad
    document.querySelectorAll("#aiConfig .ai-chips").forEach((group) => {
      const groupLabel = group.getAttribute("aria-label") || "";
      group.querySelectorAll(".ai-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
          group.querySelectorAll(".ai-chip").forEach((c) => {
            c.classList.remove("active");
            c.setAttribute("aria-checked", "false");
          });
          chip.classList.add("active");
          chip.setAttribute("aria-checked", "true");

          if (groupLabel.includes("dificultad")) {
            aiState.difficulty = chip.dataset.value;
          }
          updateAIInfoBox();
        });
      });
    });

    // Botón generar
    const aiGenerateBtn = document.getElementById("aiGenerateBtn");
    if (aiGenerateBtn) {
      aiGenerateBtn.addEventListener("click", generateAITest);
    }

    // Botón reintentar
    const aiRetryBtn = document.getElementById("aiRetryBtn");
    if (aiRetryBtn) {
      aiRetryBtn.addEventListener("click", generateAITest);
    }

    updateAIInfoBox();
  }

  function navigateToAI() {
    // Resetear estado visual
    setAILoadingState(false);
    setAIErrorState(false);
    showScreen("aI");
  }

  function updateAIInfoBox() {
    const diff = aiState.difficulty;
    const diffLabel = { media: "media", "media-alta": "media-alta", alta: "alta" }[diff] || "media-alta";
    const infoText = document.getElementById("aiInfoText");
    if (infoText) {
      infoText.textContent = `35 preguntas · ~20 minutos · 7 módulos · dificultad ${diffLabel}`;
    }
  }

  function setAILoadingState(isLoading) {
    const loading = document.getElementById("aiLoading");
    const config  = document.getElementById("aiConfig");
    const btn     = document.getElementById("aiGenerateBtn");

    if (!loading || !config || !btn) return;

    aiState.loading = isLoading;

    if (isLoading) {
      loading.style.display = "flex";
      btn.disabled    = true;
      btn.style.display = "none";
    } else {
      loading.style.display = "none";
      btn.disabled    = false;
      btn.style.display = "";
    }
  }

  function setAIErrorState(hasError, message = "") {
    const errorEl   = document.getElementById("aiError");
    const errorMsg  = document.getElementById("aiErrorMsg");
    const btn       = document.getElementById("aiGenerateBtn");

    if (!errorEl) return;

    if (hasError) {
      errorEl.style.display = "flex";
      if (errorMsg && message) errorMsg.textContent = message;
      if (btn) btn.style.display = "none";
    } else {
      errorEl.style.display = "none";
      if (btn) btn.style.display = "";
    }
  }

  function startAIProgressMessages() {
    const msgEl = document.getElementById("aiProgressMsg");
    if (!msgEl) return;

    let i = 0;
    msgEl.textContent = AI_PROGRESS_MESSAGES[0];

    return setInterval(() => {
      if (!aiState.loading) return;
      i = (i + 1) % AI_PROGRESS_MESSAGES.length;
      msgEl.style.opacity = "0";
      setTimeout(() => {
        if (msgEl) {
          msgEl.textContent = AI_PROGRESS_MESSAGES[i];
          msgEl.style.opacity = "1";
        }
      }, 300);
    }, 2500);
  }

  async function generateAITest() {
    if (aiState.loading) return;

    // Ocultar errores previos y mostrar loading
    setAIErrorState(false);
    setAILoadingState(true);

    const progressInterval = startAIProgressMessages();

    try {
      const response = await fetch("/api/generate-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          difficulty: aiState.difficulty,
          questionsPerModule: 5,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Error del servidor (${response.status})`);
      }

      if (!data.questions || data.questions.length === 0) {
        throw new Error("El test generado está vacío. Inténtalo de nuevo.");
      }

      // Detener mensajes de progreso
      clearInterval(progressInterval);
      setAILoadingState(false);

      // El test ya viene formateado desde la serverless function.
      // Lo lanzamos directamente usando el motor existente.
      state.currentTestId = data.id;
      state.currentTest   = data;
      state.currentIndex  = 0;
      state.answers       = new Array(data.questions.length).fill(null);
      state.practiceRevealed = new Array(data.questions.length).fill(false);
      state.testInProgress = true;
      state.mapVisible    = false;

      // Fase de memoria si existe y estamos en modo examen
      state.mode = "practice"; // Forzar modo práctica siempre en tests de IA
      
      if (data.memoryContext && state.mode === "exam") {
        startMemoryPhase();
      } else {
        beginTestScreen();
      }

    } catch (err) {
      clearInterval(progressInterval);
      setAILoadingState(false);
      setAIErrorState(true, err.message || "Error de conexión. Comprueba tu conexión a Internet.");
      console.error("AI test generation error:", err);
    }
  }

})();

