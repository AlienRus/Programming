import React, { useState } from 'react';

function XInput() {
  const [xValue, setXValue] = useState('');

  const handleInputChange = (event) => {
    event.stopPropagation();
    setXValue(event.target.value);
  };

  return (
    <div>
      <input type='text' value={xValue} onChange={handleInputChange} />
    </div>
  );
}

export default XInput;
