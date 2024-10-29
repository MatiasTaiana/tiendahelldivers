import React, { useState } from 'react'
import Card from '../Card/Card'
import weaponData from '../../assets/weapons.json'
const Weapons = () => {
  const [selectedCardId, setSelectedCardId] = useState(null);
  return (
    <div>
    <div>Weapons</div>
    <div className="cards-container">
      {weaponData.map((weapon) => (
        <Card
          key={weapon.id}
          id={weapon.id}
          name={weapon.name}
          description={weapon.description}
          image={weapon.image}
          price={weapon.price}
          selectedCardId={selectedCardId}
            setSelectedCardId={setSelectedCardId}
        />
      ))}
    </div>
    </div>
  )
}

export default Weapons