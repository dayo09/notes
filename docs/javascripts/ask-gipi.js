(() => {
  const STORAGE_KEY = "concept-loop-chatgpt-session";
  const VALID_HOSTS = new Set(["chatgpt.com", "chat.openai.com"]);

  const validSessionUrl = (value) => {
    try {
      const url = new URL(value);
      return url.protocol === "https:" && VALID_HOSTS.has(url.hostname) && /\/(c|g)\//.test(url.pathname);
    } catch {
      return false;
    }
  };

  const currentHeading = () => {
    const headings = [...document.querySelectorAll("article h2, article h3")];
    let active = document.querySelector("article h1")?.textContent?.trim() || document.title;
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= 150) active = heading.textContent.trim().replace("¶", "");
    }
    return active;
  };

  const questionTemplate = () => {
    const title = document.querySelector("article h1")?.textContent?.trim() || document.title.split("-")[0].trim();
    const selected = window.getSelection()?.toString().trim();
    const quote = selected ? `\n\n선택한 내용:\n“${selected}”` : "";
    return `[Concept Loop]\n문서: ${title}\n관련 문단: ${currentHeading()}${quote}\n\n이 부분에 대해 질문할게:\n`;
  };

  const toast = (message) => {
    let node = document.querySelector(".gipi-toast");
    if (!node) {
      node = document.createElement("div");
      node.className = "gipi-toast";
      node.setAttribute("role", "status");
      node.setAttribute("aria-live", "polite");
      document.body.appendChild(node);
    }
    node.textContent = message;
    node.classList.add("is-visible");
    window.setTimeout(() => node.classList.remove("is-visible"), 2200);
  };

  const copyQuestion = async () => {
    try {
      await navigator.clipboard.writeText(questionTemplate());
      toast("질문 초안을 복사했어요");
    } catch {
      toast("복사하지 못했어요. 브라우저 권한을 확인해 주세요");
    }
  };

  const openSession = () => {
    const url = localStorage.getItem(STORAGE_KEY);
    if (!url || !validSessionUrl(url)) {
      openDialog();
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openDialog = () => {
    const dialog = document.querySelector("#gipi-session-dialog");
    const input = dialog.querySelector("input");
    input.value = localStorage.getItem(STORAGE_KEY) || "";
    dialog.showModal();
    input.focus();
  };

  const buildUi = () => {
    if (document.querySelector(".gipi-dock")) return;

    const dock = document.createElement("div");
    dock.className = "gipi-dock";
    dock.setAttribute("aria-label", "지피 질문 도구");
    dock.innerHTML = `
      <button type="button" data-gipi-action="copy" aria-label="현재 문단 질문 초안 복사">질문 복사</button>
      <button type="button" data-gipi-action="open" aria-label="연결한 ChatGPT 세션 열기">세션 열기 ↗</button>
    `;

    const dialog = document.createElement("dialog");
    dialog.id = "gipi-session-dialog";
    dialog.className = "gipi-dialog";
    dialog.innerHTML = `
      <form method="dialog">
        <div class="gipi-dialog__head">
          <div><span>PRIVATE SETTING</span><h2>지피 세션 연결</h2></div>
          <button value="cancel" aria-label="닫기">×</button>
        </div>
        <p>현재 ChatGPT 대화의 주소를 붙여 넣으세요. 이 주소는 이 브라우저에만 저장되고 GitHub에는 올라가지 않아요.</p>
        <label>ChatGPT 대화 주소<input type="url" inputmode="url" placeholder="https://chatgpt.com/c/..." autocomplete="off"></label>
        <p class="gipi-dialog__error" role="alert" hidden>ChatGPT의 대화 주소를 확인해 주세요.</p>
        <div class="gipi-dialog__actions">
          <button type="button" data-dialog-action="clear">연결 해제</button>
          <button type="button" class="primary" data-dialog-action="save">이 기기에 저장</button>
        </div>
      </form>
    `;
    document.body.append(dock, dialog);

    dock.querySelector('[data-gipi-action="copy"]').addEventListener("click", copyQuestion);
    dock.querySelector('[data-gipi-action="open"]').addEventListener("click", openSession);
    dialog.querySelector('[data-dialog-action="save"]').addEventListener("click", () => {
      const input = dialog.querySelector("input");
      const error = dialog.querySelector(".gipi-dialog__error");
      if (!validSessionUrl(input.value.trim())) {
        error.hidden = false;
        return;
      }
      localStorage.setItem(STORAGE_KEY, input.value.trim());
      error.hidden = true;
      dialog.close();
      toast("이 기기에 세션 주소를 저장했어요");
    });
    dialog.querySelector('[data-dialog-action="clear"]').addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY);
      dialog.close();
      toast("세션 연결을 해제했어요");
    });
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest('[data-gipi-action="configure"]');
    if (trigger) openDialog();
  });

  document$.subscribe(buildUi);
})();
