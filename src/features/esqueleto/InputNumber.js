import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { FormGroup, Label } from 'reactstrap';

export default class InputNumber extends Component {
  static propTypes = {};

  render() {
    const {
      input,
      label,
      className,
      disabled,
      decimalScale,

      meta: { touched, error, warning },
    } = this.props;
    return (
      <div className="esqueleto-input-number">
        <FormGroup className={touched && error ? 'con_error' : touched ? 'sin_error' : null}>
          {label ? <Label>{label}</Label> : null}
          <NumberFormat
            defaultValue={input.value}
            onValueChange={obj => input.onChange(obj.value)}
            onBlur={(option) => input.onBlur(option.value)}
            thousandSeparator="."
            decimalSeparator=","
            disabled={disabled?'disabled':false}
            decimalScale={decimalScale?decimalScale:0}
            className={className}
          />
          {touched &&
            ((error && <span className="error invalid-feedback">{error}</span>) ||
              (warning && <span className="warning">{warning}</span>))}
        </FormGroup>
      </div>
    );
  }
}