import React from 'react';
import { Heart, Share2, MessageCircle } from 'lucide-react';

const SocialGallery = () => {
  const designs = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      user: "Sophie Anderson",
      likes: 245,
      comments: 18,
      description: "Summer vibes collection 🌞"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b",
      user: "Mark Chen",
      likes: 189,
      comments: 12,
      description: "Urban streetwear fusion"
    },
    // Add more designs as needed
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-purple-600">
        Trending Designs
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {designs.map((design) => (
          <div key={design.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105">
            <img
              src={design.image}
              alt={`Design by ${design.user}`}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{design.user}</h3>
              <p className="text-gray-600 mt-1">{design.description}</p>
              
              <div className="flex items-center justify-between mt-4">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500">
                  <Heart className="h-5 w-5" />
                  <span>{design.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
                  <MessageCircle className="h-5 w-5" />
                  <span>{design.comments}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialGallery;