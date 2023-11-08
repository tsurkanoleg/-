import "./index.css";

import React, { useState, Component } from "react";



export default class FieldPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPasswordVisible: false,
    };
  }

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }));
  };

  render() {
    const { label, name, value, placeholder } = this.props;
    const { isPasswordVisible } = this.state;

    return (
      <div className="field field--password">
        <label htmlFor={name} className="field__label">
          {label}
        </label>

        <div className="field__wrapper">
          <input
            onInput={(e) => this.props.action(name, e.target.value)}
            type={isPasswordVisible ? 'text' : 'password'}
            className="field__input validation"
            name={name}
            value={value}
            placeholder={placeholder}
          />
          <span
            onClick={this.togglePasswordVisibility}
            className="field__icon"
          >
            {/* {isPasswordVisible ? 'Hide' : 'Show'} */}
          </span>
        </div>
      </div>
    );
  }
}



// export default function FieldPassword({
//   name,
//   label,
//   action,
//   value,
//   placeholder,
// }) {
//   const [showPassword, setShowPassword] = useState(false);
//   const inputType = showPassword ? "text" : "password";

//   const handleTogglePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   return (

// 		<div className="field">
// 			<label htmlFor={name} className="field__label">
// 				{label}
// 			</label>

// 			<div className="field ">						
// 				<input
// 					onInput={(e) => action(e.target.name, e.target.value)}
// 					type={inputType}
// 					className="field__input"
// 					name={name}
// 					value={value}
// 					placeholder={placeholder}
// 				/>
// 				<span onClick={handleTogglePassword} className="field__icon" />													
				
// 			</div>		



// 		</div>
// 		);
// }
