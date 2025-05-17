import React, { useState, useEffect } from 'react';
import { Camera, Heart, MessageCircle, Share2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  avatar: string;
}

interface Comment {
  comment: string;
  user?: User;
}

interface Post {
  id: number;
  user: User;
  imageUrl: string;
  caption: string;
  likes: string[];
  comments: Comment[];
}

const Socio: React.FC = () => {
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [gallery, setGallery] = useState<Post[]>([]);
  const [commentText, setCommentText] = useState<{ [key: number]: string }>({});
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [showCommentInput, setShowCommentInput] = useState<{ [key: number]: boolean }>({});
  const [showMoreComments, setShowMoreComments] = useState<{ [key: number]: boolean }>({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  let decoded: any = null;
  if (token) {
    try {
      decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch('http://localhost:3000/gallery', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setGallery(data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
  };

  const handleLike = async (postId: number) => {
    if (!token) {
      alert("You need to be logged in to like a post."); // Alert user to log in
      return;
    }

    try {
      await fetch('http://localhost:3000/gallery/like', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ galleryId: postId }),
      });
      setLikedPosts(prev => {
        const newLikedPosts = new Set(prev);
        if (newLikedPosts.has(postId)) {
          newLikedPosts.delete(postId);
        } else {
          newLikedPosts.add(postId);
        }
        return newLikedPosts;
      });
      fetchGallery();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async (postId: number) => {
    try {
      await fetch('http://localhost:3000/gallery/comment', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ galleryId: postId, text: commentText[postId] || "" }),
      });
      setCommentText({ ...commentText, [postId]: "" });
      fetchGallery();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    window.location.reload(); // Reload page to log out
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation */}
     <nav className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 shadow-xl fixed w-full top-16 z-40">
  <div className="max-w-5xl mx-auto px-4">
    <div className="flex items-center justify-between h-20">
      {/* Logo/Title */}
      <div className="flex items-center">
        <Camera className="h-6 w-6 text-purple-600" />
        <span className="ml-2 text-lg font-semibold text-white">
          SLAYgram
        </span>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center space-x-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-white border border-gray-300 rounded-full py-1 px-3 pl-8 text-sm focus:outline-none focus:ring-1 focus:ring-purple-600 text-black"
          />
          <Search className="absolute left-2 top-1.5 h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  </div>
</nav>


      {/* Main Content */}
      <main className="max-w-6xl mx-auto pt-20 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Posts */}
          {gallery.map(post => (
            <article key={post.id} className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden text-black">
              <div className="relative">
                <img
                  src={post.imageUrl}
                  alt="Post"
                  className="w-full aspect-square object-cover"
                />
              </div>

              <div className="p-4">
                <div className="flex items-center space-x-4 mb-4">
                  <button 
                    onClick={() => handleLike(post.id)} 
                    className="transition-colors"
                  >
                    <Heart 
                      className="h-6 w-6" 
                      fill={likedPosts.has(post.id) ? "red" : "none"} 
                      stroke={likedPosts.has(post.id) ? "red" : "black"} 
                    />
                  </button>
                  <button onClick={() => setShowCommentInput(prev => ({ ...prev, [post.id]: !prev[post.id] }))} className="hover:text-blue-500 transition-colors">
                    <MessageCircle className="h-6 w-6" />
                  </button>
                  <button className="hover:text-green-500 transition-colors">
                    <Share2 className="h-6 w-6" />
                  </button>
                </div>
                <div className="font-semibold mb-1">{post.likes.length} likes</div>
                <p className="text-sm">
                  <span className="font-semibold mr-2">{post.user.username}</span>
                  {post.caption}
                </p>
                {showCommentInput[post.id] && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={commentText[post.id] || ""}
                      onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                      placeholder="Add a comment..."
                      className="border rounded-lg p-2 w-full"
                    />
                    <button onClick={() => handleComment(post.id)} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg px-4 py-1 mt-2">Post</button>
                    <div className="mt-2">
                      {post.comments.slice(0, showMoreComments[post.id] ? post.comments.length : 6).map((c, index) => (
                        <p key={index} className="text-xs text-gray-500">
                          {c.comment} - <strong>{c.user?.username || "Anonymous"}</strong>
                        </p>
                      ))}
                      {post.comments.length > 6 && (
                        <button
                          onClick={() => setShowMoreComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                          className="text-blue-500 hover:underline"
                        >
                          {showMoreComments[post.id] ? 'View Less' : 'View More'}
                        </button>
                      )}
                    </div>
                  </div>
                )}
                <div className="mt-4">
                  <button
                    onClick={() => navigate('/select-tailor')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Contact a Tailor
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Socio;
