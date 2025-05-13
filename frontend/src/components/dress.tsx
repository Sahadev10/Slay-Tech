
// import React, { useState } from 'react';
// import { Wand2, ShirtIcon, Sparkles, ArrowRight } from 'lucide-react';

// function Dress() {
//   const [hoveredOption, setHoveredOption] = useState<string | null>(null);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
//       <div className="container mx-auto px-4 py-12">
//         <div className="text-center mb-16">
//           <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
//             Make Your Own dresses without Any knowledge of Fashion Designing
//           </h1>
//           <p className="text-gray-600 text-xl">
//             Generate unique clothing designs or try them on virtually
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//           {/* Generate Clothing Option */}
//           <div
//             className={`relative group cursor-pointer transform transition-all duration-300 ${
//               hoveredOption === 'generate' ? 'scale-105' : ''
//             }`}
//             onMouseEnter={() => setHoveredOption('generate')}
//             onMouseLeave={() => setHoveredOption(null)}
//           >
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//               <div className="relative">
//                 <img
//                   src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
//                   alt="Fashion Design"
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//               </div>
//               <div className="p-6">
//                 <div className="flex items-center mb-4">
//                   <Wand2 className="w-8 h-8 text-purple-600 mr-3" />
//                   <h2 className="text-2xl font-bold text-gray-800">Generate Clothing</h2>
//                 </div>
//                 <p className="text-gray-600 mb-4">
//                   Create unique fashion designs using AI. Transform your ideas into stunning garments.
//                 </p>
//                 <button className="flex items-center justify-center w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors group">
//                   Start Generating
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </div>
//             </div>
//             <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl -z-10 blur opacity-30 group-hover:opacity-50 transition-opacity" />
//           </div>

//           {/* Virtual Try-On Option */}
//           <div
//             className={`relative group cursor-pointer transform transition-all duration-300 ${
//               hoveredOption === 'tryon' ? 'scale-105' : ''
//             }`}
//             onMouseEnter={() => setHoveredOption('tryon')}
//             onMouseLeave={() => setHoveredOption(null)}
//           >
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//               <div className="relative">
//                 <img
//                   src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04"
//                   alt="Virtual Try-On"
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//               </div>
//               <div className="p-6">
//                 <div className="flex items-center mb-4">
//                   <ShirtIcon className="w-8 h-8 text-pink-600 mr-3" />
//                   <h2 className="text-2xl font-bold text-gray-800">FUSION</h2>
//                 </div>
//                 <p className="text-gray-600 mb-4">
//                   Fuse your clothes
//                 </p>
//                 <button className="flex items-center justify-center w-full bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-pink-700 transition-colors group">
//                   Try Now
//                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </div>
//             </div>
//             <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl -z-10 blur opacity-30 group-hover:opacity-50 transition-opacity" />
//           </div>
//         </div>

//         {/* Floating Elements */}
//         <div className="fixed bottom-8 right-8 animate-bounce">
//           <Sparkles className="w-8 h-8 text-purple-600" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dress;


import React, { useState } from 'react';
import { Wand2, ShirtIcon, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 🆕

function Dress() {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const navigate = useNavigate(); // 🆕


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Make Your Own dresses without Any knowledge of Fashion Designing
          </h1>
          <p className="text-gray-600 text-xl">
            Generate unique clothing designs or try them on virtually
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Generate Clothing Option */}
          <div
            className={`relative group cursor-pointer transform transition-all duration-300 ${
              hoveredOption === 'generate' ? 'scale-105' : ''
            }`}
            onMouseEnter={() => setHoveredOption('generate')}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
                  alt="Fashion Design"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Wand2 className="w-8 h-8 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">Generate Clothing</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Create unique fashion designs using AI. Transform your ideas into stunning garments.
                </p>

                <button
                  onClick={() => navigate('/gendress')} // ✅ Navigate to /sm
                  className="flex items-center justify-center w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors group"
                >

                  Start Generating
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl -z-10 blur opacity-30 group-hover:opacity-50 transition-opacity" />
          </div>

          {/* Virtual Try-On Option */}
          <div
            className={`relative group cursor-pointer transform transition-all duration-300 ${
              hoveredOption === 'tryon' ? 'scale-105' : ''
            }`}
            onMouseEnter={() => setHoveredOption('tryon')}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04"
                  alt="Virtual Try-On"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <ShirtIcon className="w-8 h-8 text-pink-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">FUSION</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Fuse your clothes
                </p>

                <button
                  onClick={() => navigate('/sm')} // ✅ Navigate to /vr
                  className="flex items-center justify-center w-full bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-pink-700 transition-colors group"
                >

                  Try Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl -z-10 blur opacity-30 group-hover:opacity-50 transition-opacity" />
          </div>
        </div>

        {/* Floating Elements */}
        <div className="fixed bottom-8 right-8 animate-bounce">
          <Sparkles className="w-8 h-8 text-purple-600" />
        </div>
      </div>
    </div>
  );
}

export default Dress;

