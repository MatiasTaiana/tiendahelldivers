import React, { useState } from 'react'
import Card from '../Card/Card'
import stratagemData from '../../assets/stratagems.json'
const Stratagems = () => {
  const [selectedCardId, setSelectedCardId] = useState(null);
  return (
    <div>
    <div className='classTittle'>Stratagems</div>
    <div className="cards-container">
      {stratagemData.map((stratagem) => (
        <Card
          key={stratagem.id}
          id={stratagem.id}
          name={stratagem.name}
          description={stratagem.description}
          image={stratagem.image}
          price={stratagem.price}
          selectedCardId={selectedCardId}
            setSelectedCardId={setSelectedCardId}
        />
      ))}
    </div>
    </div>
  )
}

export default Stratagems