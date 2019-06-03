import NumberFormat from 'react-number-format';
import React from 'react';

const formatarNumero = (cell,digitos) => {
  return (
    <NumberFormat
      value={cell}
      thousandSeparator="."
      decimalSeparator=","
      displayType={'text'}
      decimalScale={typeof digitos === "number"?digitos:2}

    />
  );
};

export default formatarNumero;
