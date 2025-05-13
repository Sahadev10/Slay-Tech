

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

// // Define the type for each image object
// interface Image {
//   image_id: string;
//   image_url: string;
//   auth?: any;
// }

// const Urpic: React.FC = () => {
//   const [images, setImages] = useState<Image[]>([]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         console.error("No token found");
//         return;
//       }

//       let userId;
//       try {
//         const decoded: { sub: number } = jwtDecode(token);
//         userId = decoded.sub;
//       } catch (err) {
//         console.error("Invalid token", err);
//         return;
//       }

//       try {
//         const response = await axios.get<Image[]>(`http://localhost:3000/images/user/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setImages(response.data);
//       } catch (err) {
//         console.error("Error fetching images", err);
//       }
//     };

//     fetchImages();
//   }, []);

//   const handleAddToGallery = async (imageUrl: string) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       console.error("No token found");
//       return;
//     }

//     let userId;
//     try {
//       const decoded: { sub: number } = jwtDecode(token);
//       userId = decoded.sub;
//     } catch (err) {
//       console.error("Invalid token", err);
//       return;
//     }

//     try {
//       await axios.post(
//         `http://localhost:3000/gallery/${userId}/add`,
//         { imageUrl },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert("Image added to social gallery!");
//     } catch (err) {
//       console.error("Failed to add image to gallery", err);
//       alert("Failed to add image.");
//     }
//   };

//   return (
//     <div>
//       {images.length > 0 ? (
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//           {images.map((img) => (
//             <div key={img.image_id} style={{ textAlign: 'center' }}>
//               <img
//                 src={img.image_url}
//                 alt="Clothing"
//                 style={{ width: '300px', borderRadius: '8px' }}
//               />
//               <button
//                 onClick={() => handleAddToGallery(img.image_id)}
//                 style={{
//                   marginTop: '8px',
//                   padding: '6px 12px',
//                   backgroundColor: '#4CAF50',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '4px',
//                   cursor: 'pointer',
//                 }}
//               >
//                 Add to Social Gallery
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Loading images...</p>
//       )}
//     </div>
//   );
// };

// export default Urpic;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Define the type for each image object
interface Image {
  image_id: string;
  image_url: string;
}

const Urpic: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      let userId;
      try {
        const decoded: { sub: number } = jwtDecode(token);
        userId = decoded.sub;
      } catch (err) {
        console.error("Invalid token", err);
        return;
      }

      try {
        const response = await axios.get<Image[]>(`http://localhost:3000/images/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setImages(response.data);
      } catch (err) {
        console.error("Error fetching images", err);
      }
    };

    fetchImages();
  }, []);

  const handleAddToGallery = async (imageUrl: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    let userId;
    try {
      const decoded: { sub: number } = jwtDecode(token);
      userId = decoded.sub;
    } catch (err) {
      console.error("Invalid token", err);
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/gallery/${userId}/add`,
        {
          imageUrl: imageUrl,
          caption: "Generated image", // You can make this dynamic if needed
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Image added to social gallery!");
    } catch (err) {
      console.error("Failed to add image to gallery", err);
      alert("Failed to add image.");
    }
  };

  return (
    <div>
      {images.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {images.map((img) => (
            <div key={img.image_id} style={{ textAlign: 'center' }}>
              <img
                src={img.image_url}
                alt="Clothing"
                style={{ width: '300px', borderRadius: '8px' }}
              />
              <button
                onClick={() => handleAddToGallery(img.image_url)}
                style={{
                  marginTop: '8px',
                  padding: '6px 12px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Add to Social Gallery
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
};

export default Urpic;
