/* Set's the bobble UI loading animation */
function playLoadingAnim() {
  btn.style.display = "none";
  loading.style.display = "inline-block";

  setTimeout(() => {
    btn.style.display = "inline-flex";
    loading.style.display = "none";
  }, 1200);
}

/* UI button action for RPC sort 
  of communication between UI & `content-script` */
function solveAction() {
  playLoadingAnim();

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    channel = chrome.tabs.connect(tabs[0].id, { name: "wordleSolver" });
    channel.postMessage({ action: "solve" });
  });
}

/* Button click listener */
btn.addEventListener("click", solveAction);

(() => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    if (tabs[0].url !== "https://www.powerlanguage.co.uk/wordle/") {
      btn.disabled = true;
      warning.style.display = "block";
      link.style.display = "block";
    }
  });
})();
