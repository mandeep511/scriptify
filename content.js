// console.log("DOMContentLoaded");
// const script = localStorage.getItem("afterLoadScript");
// console.log("afterLoadScript:", script);
// if (script) {
//   console.log("Executing afterLoadScript...");
//   try {
//     eval(script);
//   } catch (error) {
//     console.error("Error executing afterLoadScript:", error);
//   }
// }

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  console.log(msg, sender, response);
  // First, validate the message's structure.
  if (msg.from === "popup" && msg.subject === "setLoadScript") {
    console.log("setLoadScript");
    try {
      eval(msg.loadScript);
      response({ message: "success" });
    } catch (error) {
      response({ message: "error", error });
    }
  }
});
