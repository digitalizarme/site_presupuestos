import NumberFormat from 'react-number-format';
import React from 'react';

const formatarNumero = (cell, digitos, soloValor) => {
  return (
    typeof soloValor === "undefined" ? <NumberFormat
      value={cell}
      isNumericString={typeof cell === "string"}
      thousandSeparator="."
      decimalSeparator=","
      displayType={'text'}
      decimalScale={typeof digitos === "number" ? digitos : 2}

    /> :
      cell?cell.toLocaleString(navigator.language, { maximumFractionDigits: typeof digitos === "number" ? digitos : 2 }):0
  );
};

export default formatarNumero;
