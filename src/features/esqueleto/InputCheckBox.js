import React, { Component } from 'react';
import { Switch } from 'pretty-checkbox-react';

export default class InputCheckBox extends Component {
  static propTypes = {};

 render() {
    const {
      input,
      label,
      disabled,
    } = this.props;
    return (
      <div className="esqueleto-input-check-box">
         <Switch 
         shape="fill"  
         plain
         type="checkbox" 
         color="success"
         name={input.name}
         checked={input.value?input.value:false}
         onChange={input.onChange}
         value={input.value?input.value:false}
         disabled={disabled ? 'disabled' : ''}
         
         ><span className="label_switch">{label ? label: null}</span></Switch>
      </div>
    );
  }
}
