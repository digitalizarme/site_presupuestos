import React, { Component } from 'react';
import { FormGroup, Input, Label, FormFeedback } from 'reactstrap';

export default class InputText extends Component {
  static propTypes = {};

  render() {
    const {
      input,
      placeholder,
      type,
      label,
      autoFocus,
      className,
      options,
      disabled,
      bsSize,
      meta: { touched, error },
      min,
      max,
      readOnly,
      styleDiv,
    } = this.props;

    return (
      <div className="esqueleto-input-text" style={styleDiv ? styleDiv : null}>
        <FormGroup>
          {label ? <Label>{label}</Label> : null}
          <Input
            {...input}
            type={type}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className={className}
            bsSize={bsSize}
            disabled={disabled ? 'disabled' : ''}
            invalid={touched && !!error}
            valid={touched && !error}
            min={min}
            max={max}
            readOnly={readOnly}
          >
            {type === 'select' && !!options
              ? options.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : null}
          </Input>
          {touched && error ? error.map(e => <FormFeedback key={e}>{e}</FormFeedback>) : null}
        </FormGroup>
      </div>
    );
  }
}
