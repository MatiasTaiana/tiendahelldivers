import React, { useState } from 'react';

const ItemCount = ({ stock, initial, onAdd }) => {
  const [count, setCount] = useState(initial);

  const handleAdd = () => {
    onAdd(count);
  };

  return (
    <div>
      <button onClick={() => setCount(count > 1 ? count - 1 : 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={handleAdd}>Add to cart</button>
    </div>
  );
};

export default ItemCount;