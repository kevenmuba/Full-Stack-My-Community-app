import React from 'react';
import { Carousel } from 'antd'; // Importing Ant Design Carousel


const images = [
  "https://via.placeholder.com/800x400.png?text=Image+1", // Replace with your image URLs
  "https://via.placeholder.com/800x400.png?text=Image+2",
  "https://via.placeholder.com/800x400.png?text=Image+3",
];

const ImageCarouselWithDescription = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">About Mubarek</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Description Section */}
        <div className="p-4 bg-white shadow-lg rounded-lg flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-2">Hello! I'm Mubarek</h2>
          <p className="text-gray-700">
            I am a passionate developer with a love for creating dynamic and responsive web applications. I enjoy working with modern technologies and continuously learning new skills to enhance my craft.
          </p>
        </div>

        {/* Carousel Section */}
        <div className="p-4">
          <Carousel autoplay dots={true} className="rounded-lg shadow-lg">
            {images.map((image, index) => (
              <div key={index} className="flex justify-center items-center">
                <img src={image} alt={`Slide ${index + 1}`} className="w-full h-auto rounded-lg" />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ImageCarouselWithDescription;