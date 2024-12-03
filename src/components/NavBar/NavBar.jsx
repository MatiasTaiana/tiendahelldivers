import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';

const NavBar = () => {
  return (
    <nav >
      <Link to="/"><img src="https://preview.redd.it/super-earth-helldivers-svg-logo-v0-0cvbn5nesrvc1.png?width=1024&format=png&auto=webp&s=e3fa0b71beb271bf9164688c4bb23703f7eca352" alt="Helldivers Logo" /></Link>
      <Link to="/terminids"><button className='buttonNav'>Terminids</button></Link>
      <Link to="/automatons"><button className='buttonNav'>Automatons</button></Link>
      <Link to="/weapons"><button className='buttonNav'>Weapons</button></Link>
      <Link to="/stratagems"><button className='buttonNav'>Stratagems</button></Link>
      <button className='buttonNav'></button>
    </nav>
  );
};

export default NavBar;
