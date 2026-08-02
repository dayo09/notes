document$.subscribe(() => {
  if (typeof mermaid === "undefined") return;
  mermaid.initialize({
    startOnLoad: false,
    theme: document.body.getAttribute("data-md-color-scheme") === "slate" ? "dark" : "neutral",
    securityLevel: "loose",
    fontFamily: "Pretendard, system-ui, sans-serif"
  });
  mermaid.run({ querySelector: ".mermaid" });
});
