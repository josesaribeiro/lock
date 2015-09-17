import React from 'react';
import InputWrap from './input_wrap';
import Icon from '../icon/icon';
import { requestGravatar } from '../gravatar/actions';

export default class EmailInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isValid, onChange, gravatar, ...props } = this.props;
    const { focused } = this.state;

    return (
      <InputWrap name="email" isValid={isValid} icon={<Icon name="email" />} focused={focused}>
        <input type="text"
          name="email"
          className="auth0-lock-input"
          placeholder="yours@example.com"
          onChange={::this.handleOnChange}
          {...props}/>
      </InputWrap>
    );
  }

  handleOnChange(e) {
    if (this.props.gravatar) {
      requestGravatar(e.target.value);
    }

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  handleFocus() {
    this.setState({focused: true});
  }

  handleBlur() {
    this.setState({focused: false});
  }
}

// TODO: specify propTypes