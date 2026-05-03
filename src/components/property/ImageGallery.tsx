import React from "react";

type ImageGalleryProps = {
  images: string[]; // Array of image URLs
  alt: string;    // Alt text for the entire gallery (used for accessibility)
  style?: React.CSSProperties; // Optional style prop for custom styling
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt, style }) => {

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
    
  return (
    <div
      id="carouselExample"
      className="carousel slide"
      data-bs-ride="carousel"  // Auto initialize the carousel
    >
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            className={`carousel-item ${index === currentIndex ? "active" : ""}`}
            key={image}
          >
            <img
              src={image}
              className="d-block w-100"
              alt={alt[index]} // Use the specific alt text for each image
              style={style}
            />
          </div>
        ))}
      </div>

      {/* Carousel Controls with aria-label for better accessibility */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
        aria-label="Previous slide"
        onClick={handlePrev}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
        aria-label="Next slide"
        onClick={handleNext}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default ImageGallery;