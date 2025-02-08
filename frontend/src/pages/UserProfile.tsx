import React, { useState, useEffect } from 'react';
import { Settings, Image } from 'lucide-react';

const UserProfile = () => {
  const userDesigns = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      date: "2024-02-20"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8",
      date: "2024-02-19"
    },
    // Add more designs as needed
  ];

  const [image, setImage] = useState(null);

  const handleImageUpload = async (event) => {
    const uploadedImage = event.target.files[0];
    if (uploadedImage) {
      const formData = new FormData();
      formData.append('image', uploadedImage);

      // Send image to the backend
      try {
        const response = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        if (response.ok) {
          alert("Image uploaded successfully!");
          console.log(result);
        } else {
          alert("Image upload failed.");
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-purple-100 flex items-center justify-center">
              <Image className="h-10 w-10 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Sophie Anderson</h1>
              <p className="text-gray-600">Fashion Designer</p>
            </div>
          </div>
          <button className="btn-secondary flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Edit Profile</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="text-2xl font-bold text-purple-600">42</h3>
            <p className="text-gray-600">Designs</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="text-2xl font-bold text-purple-600">1.2k</h3>
            <p className="text-gray-600">Followers</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="text-2xl font-bold text-purple-600">890</h3>
            <p className="text-gray-600">Following</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">My Designs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userDesigns.map((design) => (
            <div key={design.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={design.image}
                alt={`Design ${design.id}`}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-600">Created on {design.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Button for image upload */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upload a Design</h2>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          className="file-input" 
        />
      </div>
    </div>
  );
};

export default UserProfile;
