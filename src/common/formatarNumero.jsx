import NumberFormat from 'react-number-format';
import React from 'react';

const formatarNumero = (cell, digitos, soloValor) => {
  let retorno;
  if (typeof soloValor === 'undefined' || soloValor === false) {
    retorno = (
      <NumberFormat
        value={cell}
        isNumericString={typeof cell === 'string'}
        thousandSeparator="."
        decimalSeparator=","
        displayType={'text'}
        decimalScale={typeof digitos === 'number' ? digitos : 2}
      />
    );
  } else {
    if (cell) {
      retorno = new Intl.NumberFormat('pt-BR', {
        maximumFractionDigits: typeof digitos === 'number' ? digitos : 2,
      }).format(parseFloat(cell));
    } else {
      retorno = 0;
    }
  }

  return retorno;
};

export default formatarNumero;
