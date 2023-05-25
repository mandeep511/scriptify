const sendToContentScript = async (tabs, scriptInputValue) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        from: "popup",
        subject: "setLoadScript",
        loadScript: scriptInputValue,
      },
      (response) => {
        if (response.message === "error") {
          reject(response.error);
        }
        resolve(response);
      }
    );
  });
};

const applyAndSaveScript = async (tabs) => {
  const scriptInputValue = document.querySelector("#scriptInput").value;
  try {
    await sendToContentScript(tabs, scriptInputValue);
    localStorage.setItem(`scriptInfo-${tabs[0].url}`, JSON.stringify(scriptInputValue));
  } catch (error) {
    console.error("Error executing loadScript:", res.error);
  }
};

document.getElementById("saveScripts").addEventListener("click", async () => {
  const scriptInputValue = document.querySelector("#scriptInput").value;
  if (!scriptInputValue || scriptInputValue === "") {
    console.log("scriptInputValue is empty");
    return;
  }
  // Apply script if not empty.
  chrome.tabs.query({ active: true, currentWindow: true }, applyAndSaveScript);
});

// document.getElementById("clearScripts").addEventListener("click", () => {
