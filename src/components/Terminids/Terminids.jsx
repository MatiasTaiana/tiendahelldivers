import React, { useState } from 'react';
import terminidsData from '../../assets/terminids.json';
import Card from '../Card/Card';

const Terminids = () => {
  // Estado para almacenar el id de la tarjeta seleccionada
  const [selectedCardId, setSelectedCardId] = useState(null);

  return (
    <div>
      <div className='classTittle'>Terminids</div>
      <div className="cards-container">
        {terminidsData.map((terminid) => (
          <Card
            key={terminid.id}
            id={terminid.id}
            name={terminid.name}
            description={terminid.description}
            image={terminid.image}
            price={terminid.price}
            // Pasamos el id de la tarjeta seleccionada y la función para actualizarlo
            selectedCardId={selectedCardId}
            setSelectedCardId={setSelectedCardId}
          />
        ))}
      </div>
    </div>
  );
};

export default Terminids;
