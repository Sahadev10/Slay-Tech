// const NGROK_URL = 'https://35b2-210-212-162-140.ngrok-free.app'; // Replace with your backend

// function extractUserIdFromTabUrl(url) {
//   try {
//     const params = new URLSearchParams(new URL(url).search);
//     return params.get('user_id');
//   } catch (e) {
//     console.error("Invalid tab URL:", url);
//     return null;
//   }
// }

// // Intercept image loads
// browser.webRequest.onCompleted.addListener(
//   async (details) => {
//     const url = details.url;

//     // Only target Hugging Face /file= URLs
//     if (!url.includes('/file=')) return;

//     const tab = await browser.tabs.get(details.tabId);
//     const userId = extractUserIdFromTabUrl(tab.url);

//     if (!userId) {
//       console.warn("user_id not found in tab URL");
//       return;
//     }

//     console.log("🎯 Image Detected:", url);

//     // POST image URL to your backend
//     try {
//       const res = await fetch(`${NGROK_URL}/image/save/url?user_id=${userId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ imageUrl: url })
//       });

//       if (res.ok) {
//         const data = await res.json();
//         console.log("✅ Image URL sent successfully:", data);
//       } else {
//         console.error("❌ Failed to send image:", res.status);
//       }
//     } catch (err) {
//       console.error("❌ Network error:", err);
//     }
//   },
//   { urls: ["<all_urls>"], types: ["image"] }
// );
