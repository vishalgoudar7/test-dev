import React from 'react';
import './ButtonSmScreen.css';

const buttons = [
  { name: 'Puja', link: '/puja' },
  { name: 'Prasadam', link: '/prasadam' },
  { name: 'Chadava', link: '/chadhava' },
  { name: 'Events', link: '/events' },
];

const ButtonSmScreen = () => (
  <div className="button-sm-screen-wrapper">
    {buttons.map(btn => (
      <a key={btn.name} href={btn.link} className="button-sm-screen-btn">
        {btn.name}
      </a>
    ))}
  </div>
);

export default ButtonSmScreen;
