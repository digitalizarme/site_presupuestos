import React, { Component } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
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
      disabled,
      permiteCrear,
      meta: { touched, error, warning },
    } = this.props;

    return (
      <div className="esqueleto-super-select">
        <FormGroup className={touched && error ? 'con_error' : touched ? 'sin_error' : null}>
          {label ? <Label>{label}</Label> : null}
          {!permiteCrear ? (
            <Select
              value={options && options.find(option => option.value === input.value)}
              onChange={option => input.onChange(option.value)}
              onBlur={option => input.onBlur(option.value)}
              autoFocus={autoFocus}
              name={input.name}
              options={options}
              isDisabled={disabled}
              placeholder={placeholder}
              classNamePrefix="react-select"
            />
          ) : (
            <CreatableSelect
              isClearable
              value={options && options.find(option => option.value === input.value)}
              onChange={option => input.onChange(option?option.value:'')}
              onBlur={option => input.onBlur(option?option.value:'')}
              autoFocus={autoFocus}
              name={input.name}
              options={options}
              isDisabled={disabled}
              placeholder={placeholder}
              classNamePrefix="react-select"
            />
          )}
          {touched &&
            ((error && <span className="error invalid-feedback">{error}</span>) ||
              (warning && <span className="warning">{warning}</span>))}
        </FormGroup>
      </div>
    );
  }
}
