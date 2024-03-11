import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
      <p className="mb-8">Hello, I'm Daria Shpak, a passionate frontend developer. I'm excited to present my task for your review.</p>
      <Link
        to="/dependencies"
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        View Task
      </Link>
    </div>
  );
};

export default Home;
