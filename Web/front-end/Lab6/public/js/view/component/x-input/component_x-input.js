import React, { useState } from 'react';
import PropTypes from 'prop-types';
import template from './template';

function XInput(props) {
  const [xValue, setXValue] = useState('');

  function handleInput(event) {
    event.stopPropagation();
    setXValue(event.target.value);
  }

  return (
    <div onChange={handleInput}>
      {template(xValue)}
    </div>
  );
}

XInput.propTypes = {
  xValue: PropTypes.string,
};

XInput.defaultProps = {
  xValue: '',
};

export default XInput;
