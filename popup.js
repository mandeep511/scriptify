const sendToContentScript = async (tabId, scriptInputValue) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(
      tabId,
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
  console.log(tabs);
  const scriptInputValue = document.querySelector("#scriptInput").value;
  try {
    await sendToContentScript(tabs[0].id, scriptInputValue);
  } catch (error) {
    console.error("Error executing loadScript:", error);
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

window.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.storage.local.get([`scriptInfo-${tabs[0].url}`], (script) => {
      console.log("afterLoadScript:", script);
      const parsedscript = JSON.parse(Object.values(script));
      console.log("ParsedScript: ", parsedscript);
      if (script) {
        document.querySelector("#scriptInput").value = parsedscript;
      }
    });
  });
});

