import React, { Component } from 'react';
import { FormGroup, Label, FormFeedback } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import moment from 'moment';

registerLocale('es', es);

export default class InputDate extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = { startDate: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  setDate() {
    return typeof this.props.input.value === 'string'
      ? Date.parse(`${this.props.input.value}T23:00:00`)
      : this.props.input.value;
  }

  handleChange(value) {
    const newValue = value && moment(value).isValid() ? moment(value).format('YYYY-MM-DD') : null;
    this.props.input.onChange(newValue);
  }

  handleBlur({ target: { value } }) {
    const newValue = value && moment(value).isValid() ? moment(value).format('YYYY-MM-DD') : null;
    this.props.input.onBlur(newValue);
  }

  render() {
    const {
      input,
      placeholder,
      label,
      autoFocus,
      className,
      disabled,
      meta: { touched, error },
      readOnly,
    } = this.props;
    return (
      <div className="esqueleto-date-picker">
        <FormGroup className={touched && error ? 'con_error' : touched ? 'sin_error' : null}>
          {label ? <Label>{label}</Label> : null}
          <DatePicker
            placeholder={placeholder}
            autoFocus={autoFocus}
            locale="es"
            name={input.name}
            className={className}
            dateFormat={'dd/MM/yyyy'}
            selected={this.setDate()}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            disabled={disabled ? 'disabled' : ''}
            autoComplete="off"
            readOnly={readOnly}
          />
          {/* {touched && error ? error.map(e => <FormFeedback key={e}>{e}</FormFeedback>) : null} */}
          {touched && typeof error === 'string' ? (
            <FormFeedback>{error}</FormFeedback>
          ) : typeof error === 'object' ? (
            error.map(e => <FormFeedback key={e}>{e}</FormFeedback>)
          ) : null}
          {/* {touched && error ? <FormFeedback>{error}</FormFeedback> : null} */}
        </FormGroup>
      </div>
    );
  }
}
