// import React, { useState, useEffect } from 'react';
// import {
//   User, MapPin, ShoppingBag, Image as ImageIcon, LogOut, Instagram, Twitter, Facebook, X, Heart, MessageCircle, Share2
// } from 'lucide-react';

// function SCGallery() {
//   const [isGalleryOpen, setIsGalleryOpen] = useState(false);
//   const [gallery, setGallery] = useState([]);
  
//   useEffect(() => {
//     fetchGallery();
//   }, []);

//   const fetchGallery = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/gallery');
//       const data = await response.json();
//       setGallery(data);
//     } catch (error) {
//       console.error("Error fetching gallery:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="flex justify-between items-center">
//             <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
//             <button onClick={() => alert('Logout clicked')} className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700">
//               <LogOut className="w-4 h-4 mr-2" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Gallery */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="bg-white rounded-lg shadow">
//           <div className="p-6">
//             <h3 className="text-lg font-semibold flex items-center">
//               <ImageIcon className="w-5 h-5 mr-2" />
//               Social Gallery
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
//               {gallery.map((post) => (
//                 <div key={post.id} className="relative aspect-square bg-gray-200 rounded-lg shadow-lg">
//                   <img src={post.imageUrl} alt={post.caption} className="absolute inset-0 w-full h-full object-cover rounded-lg" />
//                   <div className="p-2 text-white bg-black bg-opacity-50 absolute bottom-0 left-0 right-0">
//                     <p>{post.caption}</p>
//                     <div className="flex justify-between text-sm">
//                       <span><Heart className="inline-block w-4 h-4 mr-1" /> {post.likes}</span>
//                       <span><MessageCircle className="inline-block w-4 h-4 mr-1" /> {post.comments}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

// export default SCGallery;



// import React, { useState, useEffect } from 'react';
// import {
//   LogOut,
//   Image as ImageIcon,
//   Heart,
//   MessageCircle,
// } from 'lucide-react';

// function SCGallery() {
//   const [gallery, setGallery] = useState([]);
//   const [commentText, setCommentText] = useState(""); // State to hold comment input

//   useEffect(() => {
//     fetchGallery();
//   }, []);

//   // Fetch gallery data including likes and comments
//   const fetchGallery = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/gallery');
//       const data = await response.json();

//       // Fetch likes and comments for each post
//       const updatedGallery = await Promise.all(
//         data.map(async (post) => {
//           const likesRes = await fetch(`http://localhost:3000/gallery/${post.id}/likes`);
//           const commentsRes = await fetch(`http://localhost:3000/gallery/${post.id}/comments`);
//           const likes = await likesRes.json();
//           const comments = await commentsRes.json();

//           return { ...post, likes, comments };
//         })
//       );

//       setGallery(updatedGallery);
//     } catch (error) {
//       console.error("Error fetching gallery:", error);
//     }
//   };

//   // Handle like button click
//   const handleLike = async (postId) => {
//     try {
//       const response = await fetch('http://localhost:3000/gallery/like', {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId: 1, galleryId: postId }), // Replace with actual userId
//       });

//       const result = await response.json();
//       console.log(result);
//       fetchGallery(); // Refresh data
//     } catch (error) {
//       console.error("Error liking post:", error);
//     }
//   };

//   // Handle comment submission
//   const handleComment = async (postId) => {
//     if (!commentText.trim()) return; // Prevent empty comments

//     try {
//       const response = await fetch('http://localhost:3000/gallery/comment', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId: 1, galleryId: postId, text: commentText }), // Replace with actual userId
//       });

//       const result = await response.json();
//       console.log(result);
//       setCommentText(""); // Clear the comment input
//       fetchGallery(); // Refresh data
//     } catch (error) {
//       console.error("Error adding comment:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="flex justify-between items-center">
//             <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
//             <button onClick={() => alert('Logout clicked')} className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700">
//               <LogOut className="w-4 h-4 mr-2" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Gallery */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="bg-white rounded-lg shadow">
//           <div className="p-6">
//             <h3 className="text-lg font-semibold flex items-center">
//               <ImageIcon className="w-5 h-5 mr-2" />
//               Social Gallery
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
//               {gallery.map((post) => (
//                 <div key={post.id} className="relative aspect-square bg-gray-200 rounded-lg shadow-lg">
//                   <img src={post.imageUrl} alt={post.caption} className="absolute inset-0 w-full h-full object-cover rounded-lg" />
//                   <div className="p-2 text-white bg-black bg-opacity-50 absolute bottom-0 left-0 right-0">
//                     <p>{post.caption}</p>
//                     <div className="flex justify-between text-sm">
//                       <button onClick={() => handleLike(post.id)} className="flex items-center">
//                         <Heart className="inline-block w-4 h-4 mr-1" /> {post.likes}
//                       </button>
//                       <button className="flex items-center">
//                         <MessageCircle className="inline-block w-4 h-4 mr-1" /> {post.comments.length}
//                       </button>
//                     </div>
//                     {/* Comment Input */}
//                     <input
//                       type="text"
//                       value={commentText}
//                       onChange={(e) => setCommentText(e.target.value)}
//                       placeholder="Add a comment..."
//                       className="w-full p-1 text-black rounded mt-2"
//                     />
//                     <button
//                       onClick={() => handleComment(post.id)}
//                       className="mt-1 text-white bg-blue-500 hover:bg-blue-600 rounded p-1"
//                     >
//                       Comment
//                     </button>
//                     <div className="mt-2 text-gray-300 text-sm">
//                       {post.comments.map((comment, index) => (
//                         <p key={index}>- {comment.comment}</p>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SCGallery;





// import React, { useState, useEffect } from 'react';

// function SCGallery() {
//   const [gallery, setGallery] = useState([]);
//   const [commentText, setCommentText] = useState({});
//   const token = localStorage.getItem('token'); // Retrieve token from localStorage

//   let decoded = null;
//   if (token) {
//     try {
//       decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
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

//   const handleLike = async (postId) => {
//     try {
//       await fetch('http://localhost:3000/gallery/like', {
//         method: 'PATCH',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ galleryId: postId }),
//       });
//       fetchGallery();
//     } catch (error) {
//       console.error("Error liking post:", error);
//     }
//   };

//   const handleComment = async (postId) => {
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
//     localStorage.removeItem('token'); // Clear token
//     window.location.reload(); // Reload page to log out
//   };

//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
//         <h2>Gallery</h2>
//         {decoded && <button onClick={handleLogout}>Logout</button>}
//       </div>
      
//       {gallery.map((post) => (
//         <div key={post.id}>
//           <img src={post.imageUrl} alt={post.caption} />
//           <p>{post.caption}</p>
//           <button onClick={() => handleLike(post.id)}>❤️ {post.likes.length}</button>
//           <input
//             type="text"
//             value={commentText[post.id] || ""}
//             onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
//           />
//           <button onClick={() => handleComment(post.id)}>Comment</button>
//           <div>
//             {post.comments.map((c, index) => (
//               <p key={index}>
//                 {console.log("Debug:", c.user?.username)} 
//                 {c.comment} - <strong>{c.user?.username || "Anonymous"}</strong>
//               </p>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default SCGallery;





import React, { useState, useEffect } from 'react';

function SCGallery() {
  const [gallery, setGallery] = useState([]);
  const [commentText, setCommentText] = useState({});
  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  let decoded = null;
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

  const handleLike = async (postId) => {
    try {
      await fetch('http://localhost:3000/gallery/like', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ galleryId: postId }),
      });
      fetchGallery();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async (postId) => {
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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <h2>Gallery</h2>
        {decoded && <button onClick={handleLogout}>Logout</button>}
      </div>
      
      {gallery.map((post) => (
        <div key={post.id}>
          <img src={post.imageUrl} alt={post.caption} />
          <p>{post.caption}</p>
          <button onClick={() => handleLike(post.id)}>❤️ {post.likes.length}</button>
          <input
            type="text"
            value={commentText[post.id] || ""}
            onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
          />
          <button onClick={() => handleComment(post.id)}>Comment</button>
          <div>
            {post.comments.map((c, index) => (
              <p key={index}>
                {console.log("Debug:", c.user?.username)} 
                {c.comment} - <strong>{c.user?.username || "Anonymous"}</strong>
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SCGallery;