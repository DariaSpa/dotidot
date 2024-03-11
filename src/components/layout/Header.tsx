import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="h-20 px-10 bg-purple-900 text-white flex justify-between items-center">
      <Link to="/" className="hover:text-purple-300 text-3xl font-bold">Dotidot</Link>
      <nav>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-purple-300">Home</Link></li>
          <li><Link to="/dependencies" className="hover:text-purple-300">Dependencies</Link></li>
        </ul>
      </nav>
    </header>
  );
};


export default Header;
