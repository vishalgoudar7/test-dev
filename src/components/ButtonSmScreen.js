import React from 'react';
import '../styles/ButtonSmScreen.css';
import { FaHome } from 'react-icons/fa';

const buttons = [
  { name: 'Home', link: '/', icon: <FaHome /> },
  { name: 'Puja', link: '/puja' },
  { name: 'Prasadam', link: '/prasadam' },
  { name: 'Chadava', link: '/chadhava' },
  { name: 'Events', link: '/events' },
];

const ButtonSmScreen = () => (
  <div className="button-sm-screen-wrapper">
    {buttons.map(btn => (
      <a key={btn.name} href={btn.link} className="button-sm-screen-btn">
        {btn.icon ? <span className="icon">{btn.icon}</span> : btn.name}
        {/* <span className="text">{btn.name}</span> */}
      </a>
    ))}
  </div>
);

export default ButtonSmScreen;