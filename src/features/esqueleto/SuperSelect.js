import React, { Component } from 'react';
import Select from 'react-select';
import { FormGroup, Label } from 'reactstrap';

export default class SuperSelect extends Component {
  static propTypes = {};

  render() {
    const {
      input,
      options,
      placeholder,
      label,
      autoFocus,
      meta: { touched, error,warning },
    } = this.props;
    return (
      <div className="esqueleto-super-select">
        <FormGroup className={touched && error?'con_error':touched?'sin_error':null}>
          {label ? <Label>{label}</Label> : null}
          <Select
            defaultValue={options.find(option => (option.value === parseInt(input.value,0)))}
            onChange={option => input.onChange(option.value)}
            onBlur={() => input.onBlur(input.value)}
            autoFocus={autoFocus}
            name={input.name}
            options={options}
            placeholder={placeholder}
            classNamePrefix="react-select"
          />
          {touched &&
          ((error && <span className="error invalid-feedback">{error}</span>) ||
            (warning && <span className="warning">{warning}</span>))}
        </FormGroup>
      </div>
    );
  }
}