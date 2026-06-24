const copyBtn = document.getElementById("copyEmailBtn");
const copiedLabel = copyBtn.querySelector(".CopyEmail");
const copyText = copyBtn.querySelector("a").textContent;

copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(copyText);

  // Restart animation every click
  copiedLabel.classList.remove("show");

  // Force reflow
  void copiedLabel.offsetWidth;

  copiedLabel.classList.add("show");
});