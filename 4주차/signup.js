(function () {
  // 아이디 중복확인 + 비밀번호 정상성(길이/공백) 체크만 추가한 간단 버전
  // 저장은 하지 않습니다. (학습용)
  // → 요청에 따라 간단 저장(localStorage)에 아이디만 저장하도록 변경합니다.

  var STORAGE_KEY = "signup_user_ids_v1";

  function getUserIds() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function setUserIds(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function existsUserId(id) {
    var list = getUserIds();
    return list.indexOf(id) !== -1;
  }

  function isValidPassword(pw) {
    // 8자 이상, 공백 없음
    return pw.length >= 8 && !/\s/.test(pw);
  }

  function updatePwTexts() {
    var pw = document.getElementById("password").value || "";
    var pwc = document.getElementById("passwordConfirm").value || "";
    var pwRuleText = document.getElementById("pwRuleText");
    var matchText = document.getElementById("matchText");

    pwRuleText.textContent = isValidPassword(pw)
      ? "사용 가능한 비밀번호입니다."
      : "8자 이상, 공백 없이 입력하세요.";
    if (pw && pwc) {
      matchText.textContent =
        pw === pwc ? "비밀번호가 일치합니다." : "비밀번호가 일치해야 합니다.";
    } else {
      matchText.textContent = "";
    }
  }

  function handleCheckId() {
    var input = document.getElementById("userId");
    var id = (input.value || "").trim();
    var idText = document.getElementById("idCheckText");
    if (!id) {
      idText.textContent = "아이디를 입력하세요.";
      input.focus();
      return;
    }
    var isDup = existsUserId(id);
    idText.textContent = isDup
      ? "이미 사용 중인 아이디입니다."
      : "사용 가능한 아이디입니다.";
  }

  function handleSubmit(e) {
    e.preventDefault();
    var idEl = document.getElementById("userId");
    var pwEl = document.getElementById("password");
    var pwcEl = document.getElementById("passwordConfirm");

    var userId = (idEl.value || "").trim();
    var pw = pwEl.value || "";
    var pwc = pwcEl.value || "";

    if (!userId) {
      alert("아이디를 입력하세요.");
      idEl.focus();
      return;
    }
    if (!isValidPassword(pw)) {
      alert("비밀번호는 8자 이상이고 공백이 없어야 합니다.");
      pwEl.focus();
      return;
    }
    if (pw !== pwc) {
      alert("비밀번호가 일치하지 않습니다.");
      pwcEl.focus();
      return;
    }

    // 아이디 저장(아주 간단하게 아이디 문자열만 저장)
    var list = getUserIds();
    if (list.indexOf(userId) === -1) {
      list.push(userId);
      setUserIds(list);
    }

    alert("가입이 완료되었습니다.");
    e.target.reset();
    document.getElementById("idCheckText").textContent = "";
    document.getElementById("pwRuleText").textContent = "8자 이상, 공백 없음";
    document.getElementById("matchText").textContent = "";
  }

  function init() {
    document
      .getElementById("signup-form")
      .addEventListener("submit", handleSubmit);
    document
      .getElementById("checkIdBtn")
      .addEventListener("click", handleCheckId);
    document
      .getElementById("password")
      .addEventListener("input", updatePwTexts);
    document
      .getElementById("passwordConfirm")
      .addEventListener("input", updatePwTexts);
    updatePwTexts();
  }

  // index.html에서 defer 로드되므로 바로 초기화
  init();
})();
