// ================================
// 유틸리티
// ================================
function pad2(n) {
  return String(n).padStart(2, "0");
}

function nowText() {
  const d = new Date();
  return (
    d.getFullYear() +
    "-" +
    pad2(d.getMonth() + 1) +
    "-" +
    pad2(d.getDate()) +
    " " +
    pad2(d.getHours()) +
    ":" +
    pad2(d.getMinutes()) +
    ":" +
    pad2(d.getSeconds())
  );
}

function nowHms() {
  const d = new Date();
  return (
    pad2(d.getHours()) + ":" + pad2(d.getMinutes()) + ":" + pad2(d.getSeconds())
  );
}

// 알람 집합은 상단에서 먼저 초기화해 두어 참조 순서 문제를 방지
const alarms = new Set(); // 'HH:MM:SS' 문자열 집합

// ================================
// 현재 시간 표시 (1초 갱신)
// ================================
function tick() {
  const el = document.getElementById("time");
  if (el) el.textContent = nowText();
  checkAlarms();
}
tick();
setInterval(tick, 1000);

// ================================
// 토스트 메시지
// ================================
function showToast(message, type = "success", ms = 2500) {
  const container = document.getElementById("toastcontainer");
  if (!container) return;
  const box = document.createElement("div");
  box.className = `toast ${type}`;
  box.textContent = message;
  container.appendChild(box);
  setTimeout(() => box.remove(), ms);
}

// ================================
// 배터리 색상/텍스트
// ================================
function updateBatteryColor(level) {
  const el = document.getElementById("battery");
  if (!el) return;
  el.classList.remove("low", "critical");
  if (level < 20) el.classList.add("critical");
  else if (level < 50) el.classList.add("low");
  // 50% 이상은 기본 색 유지
}

let batteryLevelValue = 100; // 현재 배터리 상태(%)

function setBatteryLevel(level) {
  const v = Math.max(0, Math.min(100, Number(level) || 0));
  batteryLevelValue = v;
  const txt = document.getElementById("batteryLevel");
  if (txt) txt.textContent = v + "%";
  updateBatteryColor(v);

  // 배터리 0%일 때 시간 표시 블록 블랙아웃 처리
  const timeBox = document.querySelector(".time-display");
  if (timeBox) {
    if (v === 0) timeBox.classList.add("blackout");
    else timeBox.classList.remove("blackout");
  }
}

setBatteryLevel(100);

// (선택) 클릭으로 랜덤 테스트
const batteryEl = document.getElementById("battery");
if (batteryEl) {
  batteryEl.addEventListener("click", () => {
    const v = Math.floor(Math.random() * 101);
    setBatteryLevel(v);
    showToast(
      `배터리: ${v}%`,
      v < 20 ? "error" : v < 50 ? "warning" : "success"
    );
  });
}

// ================================
// 배터리 자동 감소
// ================================
const BATTERY_DRAIN_INTERVAL_MS = 1000; // 1초
const BATTERY_DRAIN_STEP = 1; // 1% 감소

setInterval(() => {
  if (batteryLevelValue > 0) {
    const next = batteryLevelValue - BATTERY_DRAIN_STEP;
    setBatteryLevel(next);
  }
}, BATTERY_DRAIN_INTERVAL_MS);

// ================================
// 알람: 입력 증감 버튼
// ================================
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function stepInput(id, delta, min, max) {
  const el = document.getElementById(id);
  if (!el) return;
  el.value = clamp((Number(el.value) || 0) + delta, min, max);
}

document
  .getElementById("hourup")
  ?.addEventListener("click", () => stepInput("hourInput", +1, 0, 23));
document
  .getElementById("hourdown")
  ?.addEventListener("click", () => stepInput("hourInput", -1, 0, 23));
document
  .getElementById("minuteup")
  ?.addEventListener("click", () => stepInput("minuteInput", +1, 0, 59));
document
  .getElementById("minutedown")
  ?.addEventListener("click", () => stepInput("minuteInput", -1, 0, 59));
document
  .getElementById("secondup")
  ?.addEventListener("click", () => stepInput("secondInput", +1, 0, 59));
document
  .getElementById("seconddown")
  ?.addEventListener("click", () => stepInput("secondInput", -1, 0, 59));

// ================================
// 알람 리스트 관리
// ================================

function getAlarmListEl() {
  return document.querySelector(".alarm-list");
}

function hmsFromInputs() {
  const h = clamp(
    Number(document.getElementById("hourInput")?.value || 0),
    0,
    23
  );
  const m = clamp(
    Number(document.getElementById("minuteInput")?.value || 0),
    0,
    59
  );
  const s = clamp(
    Number(document.getElementById("secondInput")?.value || 0),
    0,
    59
  );
  return `${pad2(h)}:${pad2(m)}:${pad2(s)}`;
}

function renderAlarmItem(hms) {
  const list = getAlarmListEl();
  if (!list) return;

  const item = document.createElement("div");
  item.className = "alarm-item";

  const timeSpan = document.createElement("span");
  timeSpan.className = "alarm-time";
  timeSpan.textContent = hms;

  const delBtn = document.createElement("button");
  delBtn.className = "delete-btn";
  delBtn.textContent = "×";
  delBtn.addEventListener("click", () => {
    alarms.delete(hms);
    item.remove();
    showToast(`알람 삭제: ${hms}`, "warning");
  });

  item.appendChild(timeSpan);
  item.appendChild(delBtn);
  list.appendChild(item);
}

function addAlarm() {
  const hms = hmsFromInputs();
  if (alarms.has(hms)) {
    showToast("이미 같은 알람이 있습니다.", "warning");
    return;
  }
  if (alarms.size >= 3) {
    showToast("알람은 최대 3개까지 설정할 수 있습니다.", "error");
    return;
  }
  alarms.add(hms);
  renderAlarmItem(hms);
  showToast(`알람 설정: ${hms}`, "success");
}

document.getElementById("addAlarm")?.addEventListener("click", addAlarm);

function checkAlarms() {
  if (alarms.size === 0) return;
  const now = nowHms();
  if (alarms.has(now)) {
    showToast(`알람! ${now}`, "success");
    // 트리거된 알람 제거
    alarms.delete(now);
    // DOM에서 동일한 아이템 제거
    const list = getAlarmListEl();
    if (list) {
      list.querySelectorAll(".alarm-item .alarm-time").forEach((span) => {
        if (span.textContent === now) {
          span.parentElement?.remove();
        }
      });
    }
  }
}
