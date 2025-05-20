// const backendUrl = 'http://127.0.0.1:3000/image/save';

// let latestImage = null;

// // Create and style a single "Save" button
// const saveBtn = document.createElement('button');
// saveBtn.innerText = 'Save';
// Object.assign(saveBtn.style, {
//   position: 'fixed',
//   bottom: '20px',
//   right: '20px',
//   padding: '10px 20px',
//   backgroundColor: '#007BFF',
//   color: 'white',
//   border: 'none',
//   borderRadius: '5px',
//   cursor: 'pointer',
//   zIndex: 9999,
//   display: 'none',
// });
// document.body.appendChild(saveBtn);

// // On click, send the latest detected image
// saveBtn.addEventListener('click', () => {
//   if (latestImage) {
//     console.log('💾 [SaveButton] Saving image:', latestImage.src);
//     sendImageToBackend(latestImage);
//   } else {
//     console.warn('⚠️ [SaveButton] No image available to save.');
//   }
// });

// function sendImageToBackend(imageElement) {
//   const canvas = document.createElement('canvas');
//   canvas.width = imageElement.naturalWidth;
//   canvas.height = imageElement.naturalHeight;
//   const ctx = canvas.getContext('2d');

//   try {
//     ctx.drawImage(imageElement, 0, 0);
//     canvas.toBlob((blob) => {
//       if (!blob) return console.error('❌ Blob creation failed');

//       const formData = new FormData();
//       formData.append('image', blob, 'image.png');

//       fetch(backendUrl, {
//         method: 'POST',
//         body: formData,
//       })
//         .then((res) => {
//           if (!res.ok) throw new Error(`HTTP ${res.status}`);
//           return res.json();
//         })
//         .then((data) => console.log('✅ Upload successful:', data))
//         .catch((err) => console.error('❌ Upload failed:', err));
//     }, 'image/png');
//   } catch (err) {
//     console.error('❌ Canvas error:', err);
//   }
// }

// // Handle images with /file= in src
// function handleImage(img) {
//   if (!img.src.includes('/file=')) return;

//   latestImage = img;
//   console.log('🖼️ [ImageDetected] Ready to save:', img.src);
//   saveBtn.style.display = 'block';
// }

// // Observe for new images in DOM
// const observer = new MutationObserver((mutations) => {
//   for (const mutation of mutations) {
//     for (const node of mutation.addedNodes) {
//       if (node.tagName === 'IMG') {
//         handleImage(node);
//       } else if (node.querySelectorAll) {
//         node.querySelectorAll('img').forEach(handleImage);
//       }
//     }
//   }
// });

// observer.observe(document.body, { childList: true, subtree: true });

// // Check already existing images
// document.querySelectorAll('img').forEach(handleImage);




const NGROK_URL = 'https://4efa-2409-4042-6e81-a0d3-822d-7bbd-66a1-d13b.ngrok-free.app'; // Replace if this changes

let latestImage = null;

// Create "Save" button   
const saveBtn = document.createElement('button');
saveBtn.innerText = 'Save';
Object.assign(saveBtn.style, {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  padding: '10px 20px',
  backgroundColor: '#007BFF',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  zIndex: 9999,
  display: 'none',
});
document.body.appendChild(saveBtn);

// Handle save click
saveBtn.addEventListener('click', () => {
  if (latestImage) {
    console.log('💾 [SaveButton] Saving image:', latestImage.src);
    sendImageToBackend(latestImage);
  } else {
    console.warn('⚠️ [SaveButton] No image available to save.');
  }
});

function getUserIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('user_id');
  console.log('🔍 Extracted user_id from URL:', userId);
  return userId;
}

function sendImageToBackend(imageElement) {
  const userId = getUserIdFromUrl();
  if (!userId) {
    console.error('❌ No user_id found in URL!');
    return;
  }

  const backendUrl = `${NGROK_URL}/image/save?user_id=${userId}`;
  console.log('🚀 Sending image to:', backendUrl);

  const canvas = document.createElement('canvas');
  canvas.width = imageElement.naturalWidth;
  canvas.height = imageElement.naturalHeight;
  const ctx = canvas.getContext('2d');

  try {
    ctx.drawImage(imageElement, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) {
        console.error('❌ Blob conversion failed');
        return;
      }

      console.log('🧪 Blob:', blob);

      const formData = new FormData();
      formData.append('image', blob, 'image.png');

      console.log('📦 FormData ready to send...');

      fetch(backendUrl, {
        method: 'POST',
        body: formData,
        headers: {
          // 'Content-Type' intentionally omitted for multipart/form-data
        },
      })
        .then((res) => {
          console.log('📡 Server response:', res);
          if (!res.ok) {
            throw new Error(`Server error: HTTP ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log('✅ Upload successful:', data);
          alert(`✅ Image uploaded: ${data.filename}`);
        })
        .catch((err) => {
          console.error('❌ Upload failed:', err);
          alert(`❌ Upload failed: ${err.message}`);
        });

    }, 'image/png');
  } catch (err) {
    console.error('❌ Exception during canvas-to-blob:', err);
  }
}

// Watch for image load
function handleImage(img) {
  if (!img.src.includes('/file=')) return;

  latestImage = img;
  console.log('🖼️ [ImageDetected] Ready to save:', img.src);
  saveBtn.style.display = 'block';
}

// Observe new images added to DOM
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.tagName === 'IMG') {
        handleImage(node);
      } else if (node.querySelectorAll) {
        node.querySelectorAll('img').forEach(handleImage);
      }
    }
  }
});
observer.observe(document.body, { childList: true, subtree: true });

// Detect existing images on load
document.querySelectorAll('img').forEach(handleImage);



// const NGROK_URL = 'https://4efa-2409-4042-6e81-a0d3-822d-7bbd-66a1-d13b.ngrok-free.app';

// function getUserIdFromParent() {
//   try {
//     const parentUrl = new URL(document.referrer);
//     const params = new URLSearchParams(parentUrl.search);
//     const userId = params.get('user_id');
//     console.log('[EXT] Extracted user_id:', userId);
//     return userId;
//   } catch (err) {
//     console.error('[EXT] Error reading user_id from parent URL:', err);
//     return null;
//   }
// }

// function sendImageToBackend(imgEl, userId) {
//   const canvas = document.createElement('canvas');
//   canvas.width = imgEl.naturalWidth;
//   canvas.height = imgEl.naturalHeight;
//   const ctx = canvas.getContext('2d');
//   ctx.drawImage(imgEl, 0, 0);

//   canvas.toBlob((blob) => {
//     if (!blob) return;

//     const formData = new FormData();
//     formData.append('image', blob, 'output.png');

//     const endpoint = `${NGROK_URL}/image/save?user_id=${userId}`;
//     console.log('[EXT] Uploading image to:', endpoint);

//     fetch(endpoint, {
//       method: 'POST',
//       body: formData,
//     })
//       .then(res => res.json())
//       .then(data => {
//         console.log('[EXT] Success:', data);
//       })
//       .catch(err => {
//         console.error('[EXT] Upload failed:', err);
//       });
//   }, 'image/png');
// }

// function monitorGeneratedImage() {
//   const observer = new MutationObserver(mutations => {
//     for (const mutation of mutations) {
//       mutation.addedNodes.forEach(node => {
//         if (node.tagName === 'IMG' && node.src.includes('/file=')) {
//           const userId = getUserIdFromParent();
//           if (userId) sendImageToBackend(node, userId);
//         }
//       });
//     }
//   });

//   observer.observe(document.body, { childList: true, subtree: true });

//   // Check for existing images on load
//   document.querySelectorAll('img').forEach(img => {
//     if (img.src.includes('/file=')) {
//       const userId = getUserIdFromParent();
//       if (userId) sendImageToBackend(img, userId);
//     }
//   });
// }

// monitorGeneratedImage();

