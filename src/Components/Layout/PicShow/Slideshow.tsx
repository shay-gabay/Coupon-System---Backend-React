import './Slideshow.css'; 
import React, { useState, useEffect } from 'react';

interface SlideshowProps {
  images: string[];
}

const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slideshow-container">
      <div
        className="slideshow-images"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((imageUrl, index) => (
          <div key={index} className="slide">
            <img src={imageUrl} alt={`Slide ${index}`} />
            <div className="slide-text">
              {getImageName(imageUrl)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function getImageName(imageUrl: string): string {
  const parts = imageUrl.split('/');
  const fileNameWithExtension = parts.pop() || '';
  return fileNameWithExtension.replace('.jpg', '');
}

export default Slideshow;
