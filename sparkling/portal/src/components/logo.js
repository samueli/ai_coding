import React from 'react';
import logoImage from '../assets/icons/logo.png';

export const Logo = ({ className }) => (
  <img src={logoImage} alt="Smart Memo Logo" className={className} />
);
