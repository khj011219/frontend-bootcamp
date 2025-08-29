// 추가/삭제만 남긴 최소 기능 버전
(function () {
  // 메모리(페이지가 켜져 있는 동안만 유지)
  var items = [];

  function createItem(title, date, memo) {
    return {
      id: Date.now().toString(),
      title: title,
      date: date,
      memo: memo
    };
  }

  function render() {
    var listEl = document.getElementById('todo-list');
    listEl.innerHTML = '';

    items.forEach(function (item) {
      var card = document.createElement('div');
      card.className = 'todo-card';

      var header = document.createElement('div');
      header.className = 'todo-header';

      var title = document.createElement('div');
      title.className = 'todo-title';
      title.textContent = item.title;

      var date = document.createElement('div');
      date.className = 'todo-date';
      date.textContent = item.date;

      var actions = document.createElement('div');

      var delBtn = document.createElement('button');
      delBtn.className = 'btn danger small';
      delBtn.textContent = '삭제';
      delBtn.addEventListener('click', function () {
        deleteItem(item.id);
      });

      actions.appendChild(delBtn);
      header.appendChild(title);
      header.appendChild(date);

      var memo = document.createElement('div');
      memo.className = 'todo-memo';
      memo.textContent = item.memo || '';

      card.appendChild(header);
      card.appendChild(actions);
      card.appendChild(memo);
      listEl.appendChild(card);
    });
  }

  function deleteItem(id) {
    items = items.filter(function (it) { return it.id !== id; });
    render();
  }

  function onSubmit(e) {
    e.preventDefault();
    var form = e.currentTarget;
    var titleEl = document.getElementById('title');
    var dateEl = document.getElementById('date');
    var memoEl = document.getElementById('memo');

    // HTML의 required 속성에 맡겨 간단화
    var title = titleEl.value;
    var date = dateEl.value;
    var memo = memoEl.value;

    items.push(createItem(title, date, memo));

    form.reset();
    render();
  }

  // 페이지가 이미 로드된 시점에 실행되도록 script defer 사용 중
  // 따라서 바로 초기화합니다.
  function init() {
    var form = document.getElementById('todo-form');
    form.addEventListener('submit', onSubmit);
    render();
  }

  init();
})();


