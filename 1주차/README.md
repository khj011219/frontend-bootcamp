# 자기소개 페이지 📝

HTML과 CSS를 사용해서 만든 간단하고 예쁜 자기소개 페이지입니다.

## 📁 파일 구조

```
HTML/
├── index.html      # 메인 HTML 파일
├── style.css       # CSS 스타일 파일
└── README.md       # 프로젝트 설명서
```

## 🎨 주요 특징

- **반응형 디자인**: 모바일과 데스크톱에서 모두 잘 보입니다
- **모던한 디자인**: 그라데이션과 그림자 효과를 사용한 현대적인 디자인
- **초심자 친화적**: 모든 코드에 상세한 주석이 달려있어 학습하기 좋습니다
- **깔끔한 레이아웃**: 섹션별로 구분된 깔끔한 구조

## 🚀 사용 방법

1. `index.html` 파일을 웹 브라우저에서 열기
2. 개인 정보를 수정하여 나만의 자기소개 페이지 만들기

## ✏️ 커스터마이징 방법

### 개인 정보 변경하기

`index.html` 파일에서 다음 부분들을 수정하세요:

```html
<!-- 이름과 직함 변경 -->
<h1 class="name">홍길동</h1>
<p class="title">웹 개발자</p>

<!-- 자기소개 내용 변경 -->
<p class="intro-text">
    저는 웹 개발에 열정을 가진 개발자입니다...
</p>

<!-- 기술 스택 변경 -->
<div class="skills-grid">
    <div class="skill-item">HTML</div>
    <div class="skill-item">CSS</div>
    <!-- 원하는 기술 추가/삭제 -->
</div>

<!-- 경험 사항 변경 -->
<div class="experience-item">
    <h3>회사명 - 직책</h3>
    <p class="period">기간</p>
    <p>담당 업무</p>
</div>

<!-- 연락처 정보 변경 -->
<div class="contact-info">
    <p>📧 이메일: your@email.com</p>
    <p>📱 전화번호: 010-1234-5678</p>
    <p>📍 위치: 서울시 강남구</p>
</div>
```

### 색상 변경하기

`style.css` 파일에서 다음 색상 코드들을 변경하세요:

```css
/* 메인 색상 (보라색 계열) */
color: #667eea;     /* 제목 색상 */
background: #667eea; /* 버튼 배경색 */

/* 다른 색상으로 변경하고 싶다면 */
color: #2c3e50;    /* 진한 파란색 */
color: #e74c3c;    /* 빨간색 */
color: #27ae60;    /* 초록색 */
color: #f39c12;    /* 주황색 */
```

### 프로필 이미지 추가하기

현재는 이모지(👤)가 표시되고 있습니다. 실제 사진을 사용하려면:

```html
<!-- 이 부분을 -->
<div class="placeholder-image">👤</div>

<!-- 이렇게 변경하세요 -->
<img src="your-photo.jpg" alt="프로필 사진" class="profile-image">
```

그리고 CSS에 다음 스타일을 추가하세요:

```css
.profile-image img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}
```

## 📱 반응형 디자인

이 페이지는 다양한 화면 크기에서 잘 작동합니다:

- **데스크톱**: 800px 너비의 중앙 정렬 레이아웃
- **태블릿**: 자동으로 조정되는 그리드 레이아웃
- **모바일**: 2열 그리드와 작은 폰트 크기

## 🎯 학습 포인트

이 프로젝트에서 배울 수 있는 것들:

1. **HTML 구조**: 시맨틱 태그 사용법
2. **CSS 레이아웃**: Flexbox와 Grid 시스템
3. **반응형 디자인**: 미디어 쿼리 사용법
4. **CSS 효과**: 그라데이션, 그림자, 호버 효과
5. **코드 주석**: 이해하기 쉬운 코드 작성법

## 📝 라이선스

이 프로젝트는 자유롭게 사용하고 수정할 수 있습니다.

---

**Happy Coding!** 🎉 