/* Get's the right word and parses it to auto-type */
function wordleSolver() {
  [...JSON.parse(localStorage.getItem("gameState")).solution].map((key) =>
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key,
      })
    )
  );
}

/* Set's a queued task for hitting 
  ENTER after main thread is finished */
function hitEnter() {
  setTimeout(
    () =>
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Enter",
        })
      ),
    0
  );
}

/* Call SOLVER & ENTER functions */
function solve() {
  wordleSolver();
  hitEnter();
}

/* Chrome's sort of RPC call for the plugin
  popup window communicate with the `content-script` */
chrome.runtime.onConnect.addListener(function (channel) {
  if (channel.name == "wordleSolver") {
    channel.onMessage.addListener(
      ({ action }) => action === "solve" && solve()
    );
  }
});
