import React from "react";

export const Footer = () => {
  return (
    <div className="bg-slate-800 w-full py-6 px-10 mt-0 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h1 className="font-bold text-lg mb-2">About Us</h1>
          <p>
            We are a team of passionate developers and designers creating the
            best web experiences. Contact us to know more about our services and
            projects.
          </p>
        </div>
        <div>
          <h1 className="font-bold text-lg mb-2">Contact</h1>
          <p>Email: contact@irafi.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Main Street, City, Country</p>
        </div>
        <div>
          <h1 className="font-bold text-lg mb-2">Sponsors</h1>
          <p>Netfliz</p>
          <p>Foggy</p>
          <p>Techy</p>
          <p>StreamGo</p>
        </div>
        <div>
          <h1 className="font-bold text-lg mb-2">Follow Us</h1>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
          <p>LinkedIn</p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
        <p>© 2024 All rights reserved | A irafi production</p>
      </div>
    </div>
  );
};
