import React from 'react';

function About() {
  return (
    <div className="py-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">About Arjun Estate</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center">
          <img src="/images/about_image.jpg" alt="About Arjun Estate" className="rounded-lg shadow-lg" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="mb-6 text-lg text-gray-700 leading-relaxed">
            Arjun Estate is a premier real estate agency dedicated to providing top-notch services in buying, selling, and renting properties. With years of experience and a team of professionals, we strive to meet the diverse needs of our clients and exceed their expectations.
          </p>
          <p className="mb-6 text-lg text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto quod vel repellendus, nostrum, recusandae quam commodi iure quibusdam optio officiis magni? Minima, voluptatibus ratione voluptate non odio eius, maiores quidem.
          </p>
          <p className="mb-6 text-lg text-gray-700 leading-relaxed">
            Our mission is to help individuals and families find their dream homes and investment properties while providing exceptional customer service and guidance throughout the process. Whether you're a first-time buyer or a seasoned investor, we're here to assist you every step of the way.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
