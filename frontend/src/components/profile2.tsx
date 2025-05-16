import React, { useState } from 'react';
import {
  User,
  MapPin,
  ShoppingBag,
  Image as ImageIcon,
  LogOut,
  Instagram,
  Twitter,
  Facebook,
  Mail,
  X,
  Heart,
  MessageCircle,
  Share2
} from 'lucide-react';
import Urpic from "./pic";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const navigate = useNavigate();

  // Mock user data
  const user = {
    name: "Sarah Anderson",
    email: "sarah.anderson@example.com",
    address: "123 Tech Lane, Silicon Valley, CA",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
    previousOrders: [
      { id: 1, date: "2024-03-15", items: "Designer T-shirt", total: "₹500" },
      { id: 2, date: "2024-03-10", items: "Summer Dress", total: "₹300" },
      { id: 3, date: "2024-03-05", items: "Crop Top", total: "₹700" },
    ],
    socialGallery: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
        likes: 234,
        comments: 12,
        caption: "Feeling confident in this designer tee! 💫"
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1623609163859-ca93c959b98a?auto=format&fit=crop&q=80&w=600",
        likes: 456,
        comments: 28,
        caption: "Summer vibes in my new dress 🌸"
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=600",
        likes: 789,
        comments: 45,
        caption: "Crop top season is here! 🌟"
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600",
        likes: 567,
        comments: 34,
        caption: "Weekend ready! ✨"
      },
      {
        id: 5,
        image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=600",
        likes: 432,
        comments: 23,
        caption: "Street style mood 🖤"
      },
      {
        id: 6,
        image: "https://images.unsplash.com/photo-1618721405821-80ebc4b63d26?auto=format&fit=crop&q=80&w=600",
        likes: 678,
        comments: 39,
        caption: "Fashion is my passion 💃"
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=300",
      "https://images.unsplash.com/photo-1623609163859-ca93c959b98a?auto=format&fit=crop&q=80&w=300",
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=300",
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <button
              onClick={() => alert('Logout clicked')}
              className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col items-center">
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-500 flex items-center mt-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  {user.address}
                </p>
                <button
                  onClick={() => navigate("/picture")} // Navigate on click
                  className="mt-4 flex items-center px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  YOUR CREATIONS
                </button>
                <div className="flex space-x-4 mt-6">
                  <a href="#" className="text-gray-400 hover:text-blue-500">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-pink-500">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            {/* Orders */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="p-6">
                <h3 className="text-lg font-semibold flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Previous Orders
                </h3>
                <div className="mt-4">
                  {user.previousOrders.map(order => (
                    <div key={order.id} className="border-b border-gray-100 py-4 last:border-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{order.items}</p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <p className="font-semibold text-green-600">{order.total}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Gallery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  {user.gallery.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">Social Gallery</h2>
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.socialGallery.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.02]"
                  >
                    <div className="relative aspect-square">
                      <img
                        src={post.image}
                        alt={`Gallery post ${post.id}`}
                        className="absolute inset-0 w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-semibold">{post.caption}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-gray-600 space-x-2">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center text-gray-600 space-x-2">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </div>
                        <div className="flex items-center text-gray-600 space-x-2">
                          <Share2 className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
