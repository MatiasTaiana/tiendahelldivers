import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';

const NavBar = () => {
  return (
    <nav>
      <Link to="/"><img src="../assets/super-earth-helldivers-svg-logo-v0-0cvbn5nesrvc1.webp" alt="Helldivers Logo" /></Link>
      <Link to="/terminids"><button className='buttonNav'>Terminids</button></Link>
      <Link to="/automatons"><button className='buttonNav'>Automatons</button></Link>
      <Link to="/weapons"><button className='buttonNav'>Weapons</button></Link>
      <Link to="/stratagems"><button className='buttonNav'>Stratagems</button></Link>
      <CartWidget />
    </nav>
  );
};

export default NavBar;
