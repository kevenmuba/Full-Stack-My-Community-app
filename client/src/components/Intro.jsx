import React from 'react';

const Intro = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">About Mubarek</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Description Section */}
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Hello! I'm Mubarek</h2>
          <p className="text-gray-700">
            I am a passionate developer with a love for creating dynamic and responsive web applications. I enjoy working with modern technologies and continuously learning new skills to enhance my craft.
          </p>
        </div>

        {/* Image Section */}
        <div className="p-4 flex justify-center items-center bg-white shadow-lg rounded-lg">
          <img 
            alt="Mubarek" 
            src="https://via.placeholder.com/600x400" // Replace with your actual image URL
            className="rounded-lg max-w-full h-auto" // Ensures the image is responsive
          />
        </div>
      </div>
    </div>
  );
};

export default Intro;