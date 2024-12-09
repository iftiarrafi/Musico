import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-teal-400 mb-6">About Us</h1>
        <p className="text-gray-300 text-lg leading-relaxed mb-10">
          Welcome to our platform! We are dedicated to connecting music lovers
          and bands, providing a space where artists can showcase their talent
          and fans can engage with their favorite bands. Whether you're looking
          to hire a band, explore upcoming events, or discover new music, we've
          got you covered.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-teal-400 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-300">
              Our mission is to bridge the gap between artists and their fans by
              offering a user-friendly platform that promotes collaboration,
              creativity, and connection in the music industry.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-teal-400 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-300">
              We envision a world where every band can reach their full
              potential, and every fan has access to live music and meaningful
              interactions with their favorite artists.
            </p>
          </div>

          {/* Values */}
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-teal-400 mb-4">
              Our Values
            </h2>
            <p className="text-gray-300">
              At the heart of everything we do are passion, inclusivity, and
              innovation. We strive to create a supportive community for both
              musicians and music enthusiasts.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-semibold text-teal-400 mb-6">
            Why Choose Us?
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-10">
            We are more than just a platform—we're a community. By choosing us,
            you're supporting talented musicians and enriching your love for
            music. Join us on this journey and experience the joy of live
            performances, exclusive events, and seamless connections.
          </p>
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
