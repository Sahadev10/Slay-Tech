const backendUrl = "http://127.0.0.1:3000/image/save";

function sendImageToBackend(imageElement) {
  console.log("📤 Sending image blob to backend");

  fetch(imageElement.src)
    .then((res) => res.blob())
    .then((blob) => {
      const formData = new FormData();
      formData.append("image", blob, "image.png");

      return fetch(backendUrl, {
        method: "POST",
        body: formData,
      });
    })
    .then((res) => res.json())
    .then((data) => console.log("✅ Saved:", data))
    .catch((err) => console.error("❌ Backend error:", err));
}

function handleImage(img) {
  if (!img.src.includes("/file=") || img.dataset.sent) return;

  const send = () => {
    if (!img.dataset.sent) {
      sendImageToBackend(img);
      img.dataset.sent = "true"; // Prevent sending again
    }
  };

  if (img.complete) {
    send();
  } else {
    img.onload = send;
  }
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.tagName === "IMG") {
        handleImage(node);
      } else if (node.querySelectorAll) {
        node.querySelectorAll("img").forEach(handleImage);
      }
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

document.querySelectorAll("img").forEach(handleImage);
