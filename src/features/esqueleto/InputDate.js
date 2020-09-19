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
  }

  setDate() {
    return typeof this.props.input.value === 'string'
      ? Date.parse(`${this.props.input.value}T23:00:00`)
      : this.props.input.value;
  }

  handleChange(data) {
    this.props.input.onChange(moment(data).format('YYYY-MM-DD'));
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
            onBlur={() => input.onBlur(moment(input.value).format('YYYY-MM-DD'))}
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
