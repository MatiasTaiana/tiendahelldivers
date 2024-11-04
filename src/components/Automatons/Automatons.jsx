import React, { useState } from 'react'; // Importa useState
import automatonData from '../../assets/automatons.json';
import Card from '../Card/Card';

const Automatons = () => {
  // Estado para almacenar el id de la tarjeta seleccionada
  const [selectedCardId, setSelectedCardId] = useState(null);

  return (
    <div>
      <div className='classTittle'>Automatons</div>
      <div className="cards-container">
        {automatonData.map((automaton) => (
          <Card
            key={automaton.id}
            id={automaton.id}
            name={automaton.name}
            description={automaton.description}
            image={automaton.image}
            price={automaton.price}
            // Pasamos el id de la tarjeta seleccionada y la función para actualizarlo
            selectedCardId={selectedCardId}
            setSelectedCardId={setSelectedCardId}
          />
        ))}
      </div>
    </div>
  );
};

export default Automatons;
