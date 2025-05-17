import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface Image {
  image_id: string;
  image_url: string;
}

const Urpic: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const navigate = useNavigate();

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
          caption: "Generated image",
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

  //func handle for tailo
  const handleContactTailor = (image: Image) => {
    navigate("/select-tailor", { state: { image } });
  };

  return (
   <div
  style={{
    backgroundColor: 'black',
    minHeight: '100vh',
    paddingTop: '80px', // increase this if the pictures are geeting overshadowed by nav
  }}
>
  {images.length > 0 ? (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {images.map((img) => (
        <div
          key={img.image_id}
          style={{
            textAlign: 'center',
            backgroundColor: '#f9f9f9',
            padding: '12px',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            width: '320px',
          }}
        >
          <img
            src={img.image_url}
            alt="Clothing"
            style={{
              width: '100%',
              height: '300px',
              borderRadius: '8px',
              objectFit: 'cover',
            }}
          />

          <div style={{ marginTop: '12px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={() => handleAddToGallery(img.image_url)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Add to Gallery
            </button>

            <button
              onClick={() => handleContactTailor(img)}
              style={{
                padding: '8px 12px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Contact a Tailor
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p style={{ color: 'white', textAlign: 'center' }}>Loading images...</p>
  )}
</div>

  );
};

export default Urpic;
