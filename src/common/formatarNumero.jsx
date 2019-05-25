import NumberFormat from 'react-number-format';
import React from 'react';

const formatarNumero = (cell) => {
  return (
    <NumberFormat
      value={cell}
      thousandSeparator="."
      decimalSeparator=","
      displayType={'text'}
    />
  );
};

export default formatarNumero;
