import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';

const NavBar = () => {
  return (
    <nav>
      <Link to="/"><img src="src/assets/super-earth-helldivers-svg-logo-v0-0cvbn5nesrvc1.webp" alt="Helldivers Logo" /></Link>
      <Link to="/terminids"><button>Terminids</button></Link>
      <Link to="/automatons"><button>Automatons</button></Link>
      <Link to="/weapons"><button>Weapons</button></Link>
      <Link to="/stratagems"><button>Stratagems</button></Link>
      <CartWidget />
    </nav>
  );
};

export default NavBar;
