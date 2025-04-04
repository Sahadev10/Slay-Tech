// import React, { useState } from 'react';
// import { Camera, Heart, MessageCircle, Share2, Upload, User, Menu, Search, Bell } from 'lucide-react';

// function Socio() {
//   const [showUpload, setShowUpload] = useState(false);

//   const posts = [
//     {
//       id: 1,
//       user: 'Sarah Chen',
//       avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
//       image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920',
//       likes: 1234,
//       caption: 'Finding beauty in urban landscapes 📸',
//       timeAgo: '2 hours ago'
//     },
//     {
//       id: 2,
//       user: 'Alex Rivera',
//       avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
//       image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
//       likes: 856,
//       caption: 'Light and shadows play 🌟',
//       timeAgo: '4 hours ago'
//     },
//     {
//       id: 3,
//       user: 'Maya Patel',
//       avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
//       image: 'https://images.unsplash.com/photo-1693761935441-fde70c3bc521',
//       likes: 2103,
//       caption: 'Chasing sunsets and dreams ✨',
//       timeAgo: '6 hours ago'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation */}
//       <nav className="bg-white border-b fixed w-full top-0 z-50">
//         <div className="max-w-5xl mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               <Camera className="h-8 w-8 text-purple-600" />
//               <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
//                 SLAYgram
//               </span>
//             </div>
            
//             <div className="hidden md:flex items-center space-x-4">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all"
//                 />
//                 <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setShowUpload(true)}
//                 className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full p-2 hover:opacity-90 transition-opacity"
//               >
//                 <Upload className="h-5 w-5" />
//               </button>
//               <Bell className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
//               <Menu className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer md:hidden" />
//               <img
//                 src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
//                 alt="Profile"
//                 className="h-8 w-8 rounded-full object-cover cursor-pointer hidden md:block"
//               />
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="max-w-2xl mx-auto pt-20 px-4">
//         {/* Stories */}
//         <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
//           <div className="flex space-x-4 overflow-x-auto pb-2">
//             {Array.from({ length: 6 }).map((_, i) => (
//               <div key={i} className="flex-shrink-0 text-center">
//                 <div className="w-16 h-16 rounded-full ring-2 ring-purple-600 p-1 mb-1">
//                   <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-full">
//                     <User className="w-full h-full text-white p-3" />
//                   </div>
//                 </div>
//                 <span className="text-xs text-gray-600">User {i + 1}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Posts */}
//         {posts.map(post => (
//           <article key={post.id} className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
//             <div className="p-4 flex items-center">
//               <img
//                 src={post.avatar}
//                 alt={post.user}
//                 className="h-10 w-10 rounded-full object-cover"
//               />
//               <span className="ml-3 font-semibold">{post.user}</span>
//             </div>
            
//             <div className="relative">
//               <img
//                 src={post.image}
//                 alt="Post"
//                 className="w-full aspect-square object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity">
//                 <div className="absolute bottom-4 left-4 text-white flex items-center">
//                   <Camera className="h-5 w-5 mr-2" />
//                   <span className="text-sm font-medium">View Details</span>
//                 </div>
//               </div>
//             </div>

//             <div className="p-4">
//               <div className="flex items-center space-x-4 mb-4">
//                 <button className="hover:text-red-500 transition-colors">
//                   <Heart className="h-6 w-6" />
//                 </button>
//                 <button className="hover:text-blue-500 transition-colors">
//                   <MessageCircle className="h-6 w-6" />
//                 </button>
//                 <button className="hover:text-green-500 transition-colors">
//                   <Share2 className="h-6 w-6" />
//                 </button>
//               </div>
//               <div className="font-semibold mb-1">{post.likes.toLocaleString()} likes</div>
//               <p className="text-sm">
//                 <span className="font-semibold mr-2">{post.user}</span>
//                 {post.caption}
//               </p>
//               <p className="text-xs text-gray-500 mt-1">{post.timeAgo}</p>
//             </div>
//           </article>
//         ))}
//       </main>

//       {/* Upload Modal */}
//       {showUpload && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//             <h2 className="text-2xl font-bold mb-4">Upload Photo</h2>
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
//               <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
//               <p className="text-gray-600">Drag and drop your photo here, or click to select</p>
//               <input type="file" className="hidden" accept="image/*" />
//             </div>
//             <div className="flex space-x-3">
//               <button
//                 onClick={() => setShowUpload(false)}
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity">
//                 Upload
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Socio;



// import React, { useState, useEffect } from 'react';
// import { Camera, Heart, MessageCircle, Share2, Upload, User, Menu, Search, Bell } from 'lucide-react';

// function Socio() {
//   const [showUpload, setShowUpload] = useState(false);
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
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation */}
//       <nav className="bg-white border-b fixed w-full top-0 z-50">
//         <div className="max-w-5xl mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               <Camera className="h-8 w-8 text-purple-600" />
//               <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
//                 SLAYgram
//               </span>
//             </div>
            
//             <div className="hidden md:flex items-center space-x-4">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all"
//                 />
//                 <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setShowUpload(true)}
//                 className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full p-2 hover:opacity-90 transition-opacity"
//               >
//                 <Upload className="h-5 w-5" />
//               </button>
//               <Bell className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
//               <Menu className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer md:hidden" />
//               <img
//                 src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
//                 alt="Profile"
//                 className="h-8 w-8 rounded-full object-cover cursor-pointer hidden md:block"
//               />
//               {decoded && <button onClick={handleLogout} className="text-gray-600 hover:text-gray-900">Logout</button>}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="max-w-2xl mx-auto pt-20 px-4">
//         {/* Posts */}
//         {gallery.map(post => (
//           <article key={post.id} className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
//             <div className="p-4 flex items-center">
//               <img
//                 // src={post.user.avatar}
//                 // alt={post.user.username}
//                 className="h-10 w-10 rounded-full object-cover"
//               />
//               <span className="ml-3 font-semibold">{post.user.username}</span>
//             </div>
            
//             <div className="relative">
//               <img
//                 src={post.imageUrl}
//                 alt="Post"
//                 className="w-full aspect-square object-cover"
//               />
//             </div>

//             <div className="p-4">
//               <div className="flex items-center space-x-4 mb-4">
//                 <button onClick={() => handleLike(post.id)} className="hover:text-red-500 transition-colors">
//                   <Heart className="h-6 w-6" />
//                 </button>
//                 <button className="hover:text-blue-500 transition-colors">
//                   <MessageCircle className="h-6 w-6" />
//                 </button>
//                 <button className="hover:text-green-500 transition-colors">
//                   <Share2 className="h-6 w-6" />
//                 </button>
//               </div>
//               <div className="font-semibold mb-1">{post.likes.length} likes</div>
//               <p className="text-sm">
//                 <span className="font-semibold mr-2">{post.user.username}</span>
//                 {post.caption}
//               </p>
//               <div className="mt-2">
//                 <input
//                   type="text"
//                   value={commentText[post.id] || ""}
//                   onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
//                   placeholder="Add a comment..."
//                   className="border rounded-lg p-2 w-full"
//                 />
//                 <button onClick={() => handleComment(post.id)} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg px-4 py-1 mt-2">Comment</button>
//               </div>
//               <div className="mt-2">
//                 {post.comments.map((c, index) => (
//                   <p key={index} className="text-xs text-gray-500">
//                     {c.comment} - <strong>{c.user?.username || "Anonymous"}</strong>
//                   </p>
//                 ))}
//               </div>
//             </div>
//           </article>
//         ))}
//       </main>

//       {/* Upload Modal */}
//       {showUpload && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//             <h2 className="text-2xl font-bold mb-4">Upload Photo</h2>
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
//               <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
//               <p className="text-gray-600">Drag and drop your photo here, or click to select</p>
//               <input type="file" className="hidden" accept="image/*" />
//             </div>
//             <div className="flex space-x-3">
//               <button
//                 onClick={() => setShowUpload(false)}
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity">
//                 Upload
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Socio;
















// import React, { useState, useEffect } from 'react';
// import { Camera, Heart, MessageCircle, Share2, Upload, User, Menu, Search, Bell } from 'lucide-react';

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
//   const token = localStorage.getItem('token'); // Retrieve token from localStorage

//   let decoded: any = null;
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

//   const handleLike = async (postId: number) => {
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
//     localStorage.removeItem('token'); // Clear token
//     window.location.reload(); // Reload page to log out
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation */}
//       <nav className="bg-white border-b fixed w-full top-0 z-50">
//         <div className="max-w-5xl mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               <Camera className="h-8 w-8 text-purple-600" />
//               <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
//                 SLAYgram
//               </span>
//             </div>
            
//             <div className="hidden md:flex items-center space-x-4">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all"
//                 />
//                 <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setShowUpload(true)}
//                 className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full p-2 hover:opacity-90 transition-opacity"
//               >
//                 <Upload className="h-5 w-5" />
//               </button>
//               <Bell className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
//               <Menu className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer md:hidden" />
//               <img
//                 src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
//                 alt="Profile"
//                 className="h-8 w-8 rounded-full object-cover cursor-pointer hidden md:block"
//               />
//               {decoded && <button onClick={handleLogout} className="text-gray-600 hover:text-gray-900">Logout</button>}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="max-w-2xl mx-auto pt-20 px-4">
//         {/* Posts */}
//         {gallery.map(post => (
//           <article key={post.id} className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
//             <div className="p-4 flex items-center">
//               <img
//                 // src={post.user.avatar}
//                 // alt={post.user.username}
//                 className="h-10 w-10 rounded-full object-cover"
//               />
//               <span className="ml-3 font-semibold">{post.user.username}</span>
//             </div>
            
//             <div className="relative">
//               <img
//                 src={post.imageUrl}
//                 alt="Post"
//                 className="w-full aspect-square object-cover"
//               />
//             </div>

//             <div className="p-4">
//               <div className="flex items-center space-x-4 mb-4">
//                 {/* <button onClick={() => handleLike(post.id)} className={`transition-colors ${likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-600'}`}>
//                   <Heart className="h-6 w-6" />
//                 </button> */}
//                 <button 
//   onClick={() => handleLike(post.id)} 
//   className="transition-colors"
// >
//   <Heart 
//     className="h-6 w-6" 
//     fill={likedPosts.has(post.id) ? "red" : "none"} 
//     stroke={likedPosts.has(post.id) ? "red" : "black"} 
//   />
// </button>
//                 <button onClick={() => setShowCommentInput(prev => ({ ...prev, [post.id]: !prev[post.id] }))} className="hover:text-blue-500 transition-colors">
//                   <MessageCircle className="h-6 w-6" />
//                 </button>
//                 <button className="hover:text-green-500 transition-colors">
//                   <Share2 className="h-6 w-6" />
//                 </button>
//               </div>
//               <div className="font-semibold mb-1">{post.likes.length} likes</div>
//               <p className="text-sm">
//                 <span className="font-semibold mr-2">{post.user.username}</span>
//                 {post.caption}
//               </p>
//               {showCommentInput[post.id] && (
//                 <div className="mt-2">
//                   <input
//                     type="text"
//                     value={commentText[post.id] || ""}
//                     onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
//                     placeholder="Add a comment..."
//                     className="border rounded-lg p-2 w-full"
//                   />
//                   <button onClick={() => handleComment(post.id)} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg px-4 py-1 mt-2">Post</button>
//                   <div className="mt-2">
//                     {post.comments.slice(0, showMoreComments[post.id] ? post.comments.length : 6).map((c, index) => (
//                       <p key={index} className="text-xs text-gray-500">
//                         {c.comment} - <strong>{c.user?.username || "Anonymous"}</strong>
//                       </p>
//                     ))}
//                     {post.comments.length > 6 && (
//                       <button
//                         onClick={() => setShowMoreComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
//                         className="text-blue-500 hover:underline"
//                       >
//                         {showMoreComments[post.id] ? 'View Less' : 'View More'}
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </article>
//         ))}
//       </main>

//       {/* Upload Modal */}
//       {showUpload && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//             <h2 className="text-2xl font-bold mb-4">Upload Photo</h2>
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
//               <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
//               <p className="text-gray-600">Drag and drop your photo here, or click to select</p>
//               <input type="file" className="hidden" accept="image/*" />
//             </div>
//             <div className="flex space-x-3">
//               <button
//                 onClick={() => setShowUpload(false)}
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity">
//                 Upload
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Socio;



import React, { useState, useEffect } from 'react';
import { Camera, Heart, MessageCircle, Share2, Upload, User, Menu, Search, Bell } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b fixed w-full top-16 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-12">
            {/* Logo/Title */}
            <div className="flex items-center">
              <Camera className="h-5 w-5 text-purple-600" />
              <span className="ml-2 text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                SLAYgram
              </span>
            </div>

            {/* Search (Desktop Only) */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-100 rounded-full py-1 px-3 pl-8 text-sm focus:outline-none focus:ring-1 focus:ring-purple-600 focus:bg-white"
                />
                <Search className="absolute left-2 top-1.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowUpload(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-1 rounded-full hover:opacity-90"
              >
                <Upload className="h-4 w-4" />
              </button>
              <Bell className="h-5 w-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
              <Menu className="h-5 w-5 text-gray-600 hover:text-gray-900 cursor-pointer md:hidden" />
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                alt="Profile"
                className="h-6 w-6 rounded-full object-cover hidden md:block"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto pt-20 px-4">
        {/* Posts */}
        {gallery.map(post => (
          <article key={post.id} className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
            <div className="p-4 flex items-center">
              <img
                // src={post.user.avatar}
                // alt={post.user.username}
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="ml-3 font-semibold">{post.user.username}</span>
            </div>
            
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
            </div>
          </article>
        ))}
      </main>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Upload Photo</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Drag and drop your photo here, or click to select</p>
              <input type="file" className="hidden" accept="image/*" />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowUpload(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Socio;