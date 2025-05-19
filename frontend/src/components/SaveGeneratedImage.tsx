// SaveGeneratedImage.jsx
import React, { useState } from 'react';

const SaveGeneratedImage = ({ userId }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleDownloadAndSave = async () => {
    try {
      if (!imageUrl) {
        alert('Please paste the generated image URL first.');
        return;
      }

      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'generated-image.png', { type: blob.type });

      const formData = new FormData();
      formData.append('image', file);
      formData.append('user_id', userId);

    //   const uploadResponse = await fetch('http://localhost:3000/image/save?user_id=${userId}', {
    //     method: 'POST',
    //     body: formData,
    //   });
    const uploadResponse = await fetch(`http://localhost:3000/image/save?user_id=${userId}`, {
        method: 'POST',
        body: formData,
      });
      

      const result = await uploadResponse.json();
      alert('✅ Image saved successfully!');
      console.log('Response:', result);
    } catch (err) {
      console.error('❌ Error saving image:', err);
      alert('Error saving image. Check the console.');
    }
  };

  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-md flex flex-col items-center space-y-2">
      <input
        type="text"
        placeholder="Paste generated image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-80 p-2 border rounded"
      />
      <button
        onClick={handleDownloadAndSave}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Download & Save
      </button>
    </div>
  );
};

export default SaveGeneratedImage;
