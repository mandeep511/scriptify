(async () => {
  console.log("DOMContentLoaded");
  console.log(location.href);
  try {
    chrome.storage.local.get([`scriptInfo-${location.href}`], (script) => {
      console.log("afterLoadScript:", script);
      const parsedscript = JSON.parse(Object.values(script));
      console.log("ParsedScript: ", parsedscript);
      if (script) {
        console.log("Executing afterLoadScript...");
        try {
          eval(parsedscript);
        } catch (error) {
          console.error("Error executing afterLoadScript:", error);
        }
      }
    });
  } catch (error) {
    console.error("error while getting", error);
    console.log("No script saved");
  }
})();


chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
  console.log(msg, sender, response);
  // First, validate the message's structure.
  if (msg.from === "popup" && msg.subject === "setLoadScript") {
    console.log("setLoadScript");
    try {
      chrome.storage.local.set(
        { [`scriptInfo-${location.href}`]: JSON.stringify(msg.loadScript) },
        (x) => console.log("callback: ", x)
      );
      eval(msg.loadScript);
      response({ message: "success" });
    } catch (error) {
      response({ message: "error", error });
    }
  }
});
