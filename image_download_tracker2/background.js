chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "trackImage",
    title: "Track and Save Image",
    contexts: ["image"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "trackImage") {
    fetch("http://localhost:5000/store-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: info.srcUrl })
    }).then(response => response.json())
      .then(data => console.log("Saved:", data))
      .catch(err => console.error("Error:", err));
  }
});
