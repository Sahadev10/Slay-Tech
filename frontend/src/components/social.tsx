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
     <nav className="bg-white py-1 px-4 shadow-xl fixed w-full top-16 z-40">
  <div className="max-w-5xl mx-auto px-4">
    <div className="flex items-center justify-between h-20">
      {/* Logo/Title */}
      <div className="flex items-center">
        <Camera className="h-6 w-6 text-purple-600" />
        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent transform transition-transform group-hover:scale-105">
            SlayGram
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
      <main className="max-w-6xl mx-auto pt-[144px] px-6">

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {/* Posts */}
    {gallery.map(post => (
      <article 
        key={post.id} 
        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden text-black flex flex-col"
      >
        <div className="relative">
          <img
            src={post.imageUrl}
            alt="Post"
            className="w-full aspect-square object-cover"
          />
        </div>

        <div className="p-5 flex flex-col flex-grow">
          {/* Action Buttons */}
          <div className="flex items-center space-x-6 mb-5">
            <button 
              onClick={() => handleLike(post.id)} 
              className="transition-colors hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
              aria-label="Like post"
            >
              <Heart 
                className="h-6 w-6" 
                fill={likedPosts.has(post.id) ? "red" : "none"} 
                stroke={likedPosts.has(post.id) ? "red" : "black"} 
              />
            </button>
            <button 
              onClick={() => setShowCommentInput(prev => ({ ...prev, [post.id]: !prev[post.id] }))} 
              className="hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
              aria-label="Toggle comments"
            >
              <MessageCircle className="h-6 w-6" />
            </button>
            <button 
              className="hover:text-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
              aria-label="Share post"
            >
              <Share2 className="h-6 w-6" />
            </button>
          </div>

          {/* Likes count */}
          <div className="font-semibold mb-3 text-gray-800">{post.likes.length.toLocaleString()} likes</div>

          {/* Caption */}
          <p className="text-sm text-gray-700 mb-4">
            <span className="font-semibold mr-2">{post.user.username}</span>
            {post.caption}
          </p>

          {/* Comments Section */}
          {showCommentInput[post.id] && (
            <div className="mt-auto">
              <input
                type="text"
                value={commentText[post.id] || ""}
                onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                placeholder="Add a comment..."
                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <button 
                onClick={() => handleComment(post.id)} 
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg px-5 py-2 mt-3 w-full hover:from-purple-700 hover:to-pink-700 transition-colors"
              >
                Post
              </button>

              <div className="mt-4 max-h-48 overflow-y-auto space-y-2">
                {post.comments.slice(0, showMoreComments[post.id] ? post.comments.length : 6).map((c, index) => (
                  <p key={index} className="text-xs text-gray-500">
                    {c.comment} <span className="font-semibold">- {c.user?.username || "Anonymous"}</span>
                  </p>
                ))}
                {post.comments.length > 6 && (
                  <button
                    onClick={() => setShowMoreComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                    className="text-blue-600 hover:underline text-xs mt-1"
                  >
                    {showMoreComments[post.id] ? 'View Less' : 'View More'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Contact Tailor Button */}
          <div className="mt-6">
            <button
              onClick={() => navigate('/select-tailor')}
              className="
                bg-blue-600 
                text-white 
                px-6 
                py-3 
                rounded-lg 
                shadow-md 
                hover:bg-blue-700 
                hover:shadow-lg 
                transform 
                transition 
                duration-300 
                ease-in-out 
                active:scale-95
                focus:outline-none 
                focus:ring-4 
                focus:ring-blue-400
                w-full
                font-semibold
                text-lg
              "
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



// import React, { useState, useEffect } from 'react';
// import { Camera, Heart, MessageCircle, Share2, Search } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// interface User {
//   username: string;
//   avatar: string;
// }

// interface Comment {
//   comment: string;
//   user?: User;
// }

// interface Post {
//   id: number;
//   user: User;
//   imageUrl: string;
//   caption: string;
//   likes: string[];
//   comments: Comment[];
// }

// const Socio: React.FC = () => {
//   const [showUpload, setShowUpload] = useState<boolean>(false);
//   const [gallery, setGallery] = useState<Post[]>([]);
//   const [commentText, setCommentText] = useState<{ [key: number]: string }>({});
//   const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
//   const [showCommentInput, setShowCommentInput] = useState<{ [key: number]: boolean }>({});
//   const [showMoreComments, setShowMoreComments] = useState<{ [key: number]: boolean }>({});
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   let decoded: any = null;
//   if (token) {
//     try {
//       decoded = JSON.parse(atob(token.split('.')[1]));
//     } catch (error) {
//       console.error("Error decoding token:", error);
//     }
//   }

//   useEffect(() => {
//     fetchGallery();
//   }, []);

//   const fetchGallery = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/gallery', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       setGallery(data);
//     } catch (error) {
//       console.error("Error fetching gallery:", error);
//     }
//   };

//   const handleLike = async (postId: number) => {
//     if (!token) {
//       alert("You need to be logged in to like a post.");
//       return;
//     }

//     try {
//       await fetch('http://localhost:3000/gallery/like', {
//         method: 'PATCH',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ galleryId: postId }),
//       });
//       setLikedPosts(prev => {
//         const newLikedPosts = new Set(prev);
//         if (newLikedPosts.has(postId)) {
//           newLikedPosts.delete(postId);
//         } else {
//           newLikedPosts.add(postId);
//         }
//         return newLikedPosts;
//       });
//       fetchGallery();
//     } catch (error) {
//       console.error("Error liking post:", error);
//     }
//   };

//   const handleComment = async (postId: number) => {
//     try {
//       await fetch('http://localhost:3000/gallery/comment', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ galleryId: postId, text: commentText[postId] || "" }),
//       });
//       setCommentText({ ...commentText, [postId]: "" });
//       fetchGallery();
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     window.location.reload();
//   };

//   return (
//     <div className="bg-black text-white min-h-screen">
//       {/* Navigation */}
//       <nav className="bg-white py-1 px-4 shadow-xl fixed w-full top-16 z-40">
//         <div className="max-w-5xl mx-auto px-4">
//           <div className="flex items-center justify-between h-20">
//             <div className="flex items-center">
//               <Camera className="h-6 w-6 text-purple-600" />
//               <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent transform transition-transform group-hover:scale-105">
//                 SlayGram
//               </span>
//             </div>

//             <div className="hidden md:flex items-center space-x-3">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="bg-white border border-gray-300 rounded-full py-1 px-3 pl-8 text-sm focus:outline-none focus:ring-1 focus:ring-purple-600 text-black"
//                 />
//                 <Search className="absolute left-2 top-1.5 h-4 w-4 text-gray-400" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="max-w-6xl mx-auto pt-[144px] px-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {gallery.map(post => (
//             <article 
//               key={post.id} 
//               className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden text-black flex flex-col"
//             >
//               <div className="relative">
//                 <img
//                   src={post.imageUrl}
//                   alt="Post"
//                   className="w-full aspect-square object-cover"
//                 />
//               </div>

//               <div className="p-5 flex flex-col flex-grow">
//                 {/* Action Buttons */}
//                 <div className="flex items-center space-x-6 mb-5">
//                   <button 
//                     onClick={() => handleLike(post.id)} 
//                     className="transition-colors hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
//                     aria-label="Like post"
//                   >
//                     <Heart 
//                       className="h-6 w-6" 
//                       fill={likedPosts.has(post.id) ? "red" : "none"} 
//                       stroke={likedPosts.has(post.id) ? "red" : "black"} 
//                     />
//                   </button>
//                   <button 
//                     onClick={() => setShowCommentInput(prev => ({ ...prev, [post.id]: !prev[post.id] }))} 
//                     className="hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
//                     aria-label="Toggle comments"
//                   >
//                     <MessageCircle className="h-6 w-6" />
//                   </button>
//                   <button 
//                     className="hover:text-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
//                     aria-label="Share post"
//                   >
//                     <Share2 className="h-6 w-6" />
//                   </button>
//                 </div>

//                 {/* Likes count */}
//                 <div className="font-semibold mb-3 text-gray-800">{post.likes.length.toLocaleString()} likes</div>

//                 {/* Caption */}
//                 <p className="text-sm text-gray-700 mb-4">
//                   <span className="font-semibold mr-2">{post.user.username}</span>
//                   {post.caption}
//                 </p>

//                 {/* Comments Section */}
//                 {showCommentInput[post.id] && (
//                   <div className="mt-auto">
//                     <input
//                       type="text"
//                       value={commentText[post.id] || ""}
//                       onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
//                       placeholder="Add a comment..."
//                       className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-purple-500 focus:outline-none"
//                     />
//                     <button 
//                       onClick={() => handleComment(post.id)} 
//                       className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg px-5 py-2 mt-3 w-full hover:from-purple-700 hover:to-pink-700 transition-colors"
//                     >
//                       Post
//                     </button>

//                     <div className="mt-4 max-h-48 overflow-y-auto space-y-2">
//                       {post.comments.slice(0, showMoreComments[post.id] ? post.comments.length : 6).map((c, index) => (
//                         <p key={index} className="text-xs text-gray-500">
//                           {c.comment} <span className="font-semibold">- {c.user?.username || "Anonymous"}</span>
//                         </p>
//                       ))}
//                       {post.comments.length > 6 && (
//                         <button
//                           onClick={() => setShowMoreComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
//                           className="text-blue-600 hover:underline text-xs mt-1"
//                         >
//                           {showMoreComments[post.id] ? 'View Less' : 'View More'}
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Buttons */}
//                 <div className="mt-6 flex flex-col gap-3">
//                   <button
//                     onClick={() => navigate('/select-tailor')}
//                     className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-400 w-full font-semibold text-lg"
//                   >
//                     Contact a Tailor
//                   </button>
//                   <button
//                     onClick={() => navigate('/vr', { state: { imageUrl: post.imageUrl } })}
//                     className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg transition active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-400 w-full font-semibold text-lg"
//                   >
//                     Virtual Try-On
//                   </button>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Socio;
