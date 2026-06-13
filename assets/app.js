const $ = (id) => document.getElementById(id);

let currentQuizId = null;
let currentQuiz = null;
let currentQuestionIndex = 0;
let selectedAnswers = [];
let finalResult = null;

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[c]));
}

function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const quizIdParam = urlParams.get('quiz');
  
  if (quizIdParam && window.quizzes[quizIdParam]) {
    loadQuiz(quizIdParam);
  } else {
    renderLandingPage();
  }
  
  // Bind global navigation
  $("homeBtn").addEventListener("click", () => {
    window.location.href = window.location.pathname;
  });
  $("copyBtn").addEventListener("click", copyResultText);
  $("shareBtn").addEventListener("click", shareResult);
}

function show(screenId) {
  ["landingScreen", "startScreen", "quizScreen", "tieScreen", "resultScreen"].forEach(id => {
    if ($(id)) $(id).classList.add("hidden");
  });
  if ($(screenId)) {
    $(screenId).classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function renderLandingPage() {
  show("landingScreen");
  $("headerChip").textContent = "Select a Quiz";
  const list = $("quizList");
  list.innerHTML = "";
  
  Object.values(window.quizzes).forEach(q => {
    const card = document.createElement("div");
    card.className = "quiz-card";
    card.innerHTML = `
      <h2>${q.icon} ${escapeHtml(q.title)}</h2>
      <p>${escapeHtml(q.description)}</p>
      <div style="margin-top: auto; display: flex; gap: 10px;">
        <button class="btn accent" onclick="window.location.href='?quiz=${q.id}'">Start quiz</button>
      </div>
    `;
    list.appendChild(card);
  });
}

function loadQuiz(quizId) {
  currentQuizId = quizId;
  currentQuiz = window.quizzes[quizId];
  currentQuestionIndex = 0;
  selectedAnswers = Array(currentQuiz.questions.length).fill(null);
  finalResult = null;
  
  $("headerChip").textContent = currentQuiz.title;
  
  // Render Intro
  $("startTitle").textContent = currentQuiz.title;
  $("startSubtitle").textContent = currentQuiz.subtitle;
  
  // Bird strip logic - only if we want to show it, could generalize
  const strip = $("startStrip");
  strip.innerHTML = "";
  Object.values(currentQuiz.outcomes).forEach(outcome => {
    const pill = document.createElement("div");
    pill.className = "bird-pill";
    pill.textContent = `${outcome.icon} ${outcome.shortName}`;
    strip.appendChild(pill);
  });
  
  $("startBtn").onclick = renderQuestion;
  show("startScreen");
}

function renderQuestion() {
  show("quizScreen");
  const q = currentQuiz.questions[currentQuestionIndex];
  
  $("questionText").textContent = q.text;
  $("progressText").textContent = `Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}`;
  $("progressBar").style.width = `${(currentQuestionIndex / currentQuiz.questions.length) * 100}%`;
  
  $("prevBtn").disabled = currentQuestionIndex === 0;
  $("prevBtn").onclick = goBack;
  $("restartBtn").onclick = () => loadQuiz(currentQuizId);
  
  const box = $("answers");
  box.innerHTML = "";
  
  q.answers.forEach((ans, idx) => {
    const btn = document.createElement("button");
    btn.className = "answer" + (selectedAnswers[currentQuestionIndex] === idx ? " selected" : "");
    btn.innerHTML = `<span class="letter">${ans.letter}</span>${escapeHtml(ans.text)}`;
    btn.onclick = () => selectAnswer(idx);
    box.appendChild(btn);
  });
}

function selectAnswer(idx) {
  selectedAnswers[currentQuestionIndex] = idx;
  if (currentQuestionIndex < currentQuiz.questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    $("progressBar").style.width = "100%";
    finishQuiz();
  }
}

function goBack() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
}

function calculateScores() {
  const scores = {};
  const appearances = {};
  
  Object.keys(currentQuiz.outcomes).forEach(code => {
    scores[code] = 0;
    appearances[code] = 0;
  });
  
  selectedAnswers.forEach((ansIdx, qIdx) => {
    if (ansIdx == null) return;
    const answer = currentQuiz.questions[qIdx].answers[ansIdx];
    Object.entries(answer.points).forEach(([code, value]) => {
      scores[code] += value;
      if (value > 0) {
        appearances[code] += 1;
      }
    });
  });
  return { scores, appearances };
}

function finishQuiz(tieChoice = null) {
  const { scores, appearances } = calculateScores();
  let result;
  
  if (currentQuiz.classify.length === 3) {
    // Bird quiz requires tieChoice
    result = currentQuiz.classify(scores, appearances, tieChoice);
  } else {
    result = currentQuiz.classify(scores, appearances);
  }
  
  if (result.needsTie) {
    showTieScreen();
  } else {
    renderResult(result.code, result.rule, scores, appearances);
  }
}

function showTieScreen() {
  show("tieScreen");
  const tie = currentQuiz.tieBreaker;
  $("tieText").textContent = tie.text;
  
  const box = $("tieAnswers");
  box.innerHTML = "";
  tie.answers.forEach(ans => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.innerHTML = `<span class="letter">${ans.letter}</span>${escapeHtml(ans.text)}`;
    btn.onclick = () => finishQuiz(ans.tieValue);
    box.appendChild(btn);
  });
  
  $("tieBackBtn").onclick = () => {
    currentQuestionIndex = currentQuiz.questions.length - 1;
    renderQuestion();
  };
}

function renderResult(resultCode, ruleText, scores, appearances) {
  finalResult = resultCode;
  const outcome = currentQuiz.outcomes[resultCode];
  
  $("resultIcon").textContent = outcome.icon;
  $("resultName").textContent = outcome.name;
  $("resultTag").textContent = outcome.tag;
  $("resultOneLine").textContent = outcome.description;
  
  const sections = $("resultSections");
  sections.innerHTML = "";
  if (outcome.policy) {
    sections.innerHTML += `<div class="result-section"><h3>Policy style</h3><p>${escapeHtml(outcome.policy)}</p></div>`;
  }
  if (outcome.strength) {
    sections.innerHTML += `<div class="result-section"><h3>Strength</h3><p>${escapeHtml(outcome.strength)}</p></div>`;
  }
  if (outcome.weakness) {
    sections.innerHTML += `<div class="result-section"><h3>Weakness</h3><p>${escapeHtml(outcome.weakness)}</p></div>`;
  }
  
  // Rule
  sections.innerHTML += `<div class="result-section"><h3>Why you got this result</h3><p>${escapeHtml(ruleText)}</p></div>`;
  
  // Scoreboard
  const board = $("scoreboard");
  board.innerHTML = "";
  const maxScore = Math.max(...Object.values(scores), 1);
  const sortedCodes = Object.keys(scores).sort((a,b) => scores[b] - scores[a]);
  
  sortedCodes.forEach(code => {
    const cName = currentQuiz.outcomes[code].shortName;
    const s = scores[code];
    const row = document.createElement("div");
    row.className = "score-row";
    row.innerHTML = `
      <div class="name"><strong>${escapeHtml(cName)}</strong></div>
      <div class="bar"><div style="width:${(s / maxScore) * 100}%"></div></div>
      <div>${s}</div>
    `;
    board.appendChild(row);
  });
  
  $("copyNote").textContent = "";
  
  if (navigator.share) {
    $("shareBtn").classList.remove("hidden");
  } else {
    $("shareBtn").classList.add("hidden");
  }
  
  $("againBtn").onclick = () => loadQuiz(currentQuizId);
  
  show("resultScreen");
}

function getShareText() {
  if (!finalResult) return "";
  const outcome = currentQuiz.outcomes[finalResult];
  return `I got “${outcome.name}” on ${currentQuiz.title}.\n${outcome.description}`;
}

function shareResult() {
  if (navigator.share) {
    navigator.share({
      title: currentQuiz.title,
      text: getShareText(),
      url: window.location.href
    }).catch(console.error);
  }
}

function copyResultText() {
  const text = getShareText() + `\n\nPlay here: ${window.location.href}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      $("copyNote").textContent = "Result copied!";
    }).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const area = document.createElement("textarea");
  area.value = text;
  document.body.appendChild(area);
  area.select();
  try {
    document.execCommand("copy");
    $("copyNote").textContent = "Result copied!";
  } catch (e) {
    $("copyNote").textContent = "Failed to copy.";
  }
  document.body.removeChild(area);
}

document.addEventListener("DOMContentLoaded", init);
