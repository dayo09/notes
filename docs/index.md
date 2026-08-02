---
hide:
  - navigation
  - toc
---

<section class="concept-hero">
  <p class="concept-eyebrow">Dayo's living AI notes</p>
  <h1>질문이 개념이 되는 곳,<br><span>Concept Loop</span></h1>
  <p class="concept-lead">
    공부하며 나눈 질의응답을 흘려보내지 않고, 최신 개념 본문과
    질문·정정·응용의 흔적으로 함께 쌓아가는 AI 복습노트입니다.
  </p>
  <div class="concept-actions">
    <a class="concept-button concept-button--primary" href="dialogue/task-oriented-dialogue/">첫 노트 읽기</a>
    <button class="concept-button" type="button" data-gipi-action="configure">지피 세션 연결</button>
  </div>
</section>

<div class="loop-strip" aria-label="Concept Loop 학습 순환">
  <div><b>01</b><span>질문</span></div>
  <i aria-hidden="true">→</i>
  <div><b>02</b><span>이해</span></div>
  <i aria-hidden="true">→</i>
  <div><b>03</b><span>정리</span></div>
  <i aria-hidden="true">→</i>
  <div><b>04</b><span>다시 질문</span></div>
</div>

## 지금 읽을 수 있는 노트

<div class="note-grid" markdown>

<a class="note-card" href="dialogue/task-oriented-dialogue/">
  <span class="note-card__index">MODULE 08</span>
  <strong>Task-Oriented Dialogue</strong>
  <p>Intent·Slot·DST에서 현대 Tool Calling, 작은 모델용 Dialogue Manager와 CMF Generation까지.</p>
  <span class="note-card__link">노트 열기 →</span>
</a>

<div class="note-card note-card--soon">
  <span class="note-card__index">NEXT LOOP</span>
  <strong>다음 개념을 기다리는 중</strong>
  <p>새로운 질문이 생기면 관련 페이지의 코멘트가 되고, 충분히 커지면 독립 노트가 됩니다.</p>
</div>

</div>

!!! tip "모바일에서 지피에게 이어서 질문하기"
    먼저 **지피 세션 연결**에서 현재 ChatGPT 대화 주소를 한 번만 저장하세요. 이후 노트를 읽다가 문장을 선택하고 화면 아래의 **질문 복사**를 누르면, 문서·문단·선택 문장이 포함된 질문 초안이 복사됩니다. 세션 주소는 이 기기에만 저장되며 공개 저장소로 전송되지 않습니다.

## 이 노트가 쌓이는 방식

```mermaid
flowchart LR
    Q["새 질문"] --> A["관련 개념 아래 Q&A"]
    A --> C{"기존 이해가 바뀌는가?"}
    C -->|"예"| S["SoT 본문 수정"]
    C -->|"아니오"| M["코멘트로 유지"]
    S --> L["학습 로그"]
    M --> L
```

본문은 언제나 현재의 이해를 보여주고, 접힌 Q&A와 정정 블록은 이해가 자란 과정을 남깁니다.
