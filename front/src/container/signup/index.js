import  "./index.css";

import React, { Component } from "react";
import { REG_EXP_EMAIL, REG_EXP_PASSWORD } from "../../script/form";
import { saveSession } from "../../script/session";
import BackButton from "../../component/back-button";
import Field from "../../component/field";
import FieldPassword from "../../component/field-password";
import Title from "../../component/title-black";

export default class SignupForm extends Component {

	
  FIELD_NAME = {
    EMAIL: "email",
    PASSWORD: "password",
  };
	
  constructor(props) {
    super(props);

    this.state = {
      [this.FIELD_NAME.EMAIL]: "",
      [this.FIELD_NAME.PASSWORD]: "",
      [this.FIELD_NAME.PASSWORD_AGAIN]: "",
      [this.FIELD_NAME.IS_CONFIRM]: false,
      alerts: {
        type: "disabled",
        message: "A user with the same name is already exist",
      },
      disabled: true,
    };
  }


  FIELD_ERROR = {
    IS_EMPTY: "Введіть значення в поле",
    IS_BIG: "Дуже довге значення, приберіть зайве",
    EMAIL: "Введіть коректне значення e-mail адреси",
    PASSWORD:
      "Пароль повинен складатися з не менше ніж 8 символів, включаючи хоча б одну цифру, малу та велику літеру",
  };

  validate = (name, value) => {
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY;
    }

    if (String(value).length > 20) {
      return this.FIELD_ERROR.IS_BIG;
    }

    if (name === this.FIELD_NAME.EMAIL) {
      if (!REG_EXP_EMAIL.test(String(value))) {
        return this.FIELD_ERROR.EMAIL;
      }
    }

    if (name === this.FIELD_NAME.PASSWORD) {
      if (!REG_EXP_PASSWORD.test(String(value))) {
        return this.FIELD_ERROR.PASSWORD;
      }
    }
  };

  handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;

    this.setState({ [name]: fieldValue }, this.checkDisabledState);
  };

  checkDisabledState = () => {
    const { email, password } = this.state;

    const isDisabled = !email || !password ;
    this.setState({ disabled: isDisabled });
  };

	validateAll = () => {
    Object.values(this.FIELD_NAME).forEach((name) => {
      const error = this.validate(name, this.state[name]);

      if (error) {
        this.setError(name, error);
      }
    });
	}

  handleSubmit = async () => {
    if (this.state.disabled) {
      this.validateAll(); 
    } else {
      console.log(this.state);

      this.setAlert("progress", "Loaded...");

      try {
        const res = await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: this.convertData(),
        });

        const data = await res.json();

        if (res.ok) {
          this.setAlert("success", data.message);
          saveSession(data.session);
          window.location.assign("/");
        } else {
          this.setAlert("error", data.message);
        }
      } catch (error) {
        this.setAlert("error", error.message);
      }
    }
  };

  convertData = () => {
    const { email, password } = this.state;

    return JSON.stringify({
      [this.FIELD_NAME.EMAIL]: email,
      [this.FIELD_NAME.PASSWORD]: password,
    });
  };

  setAlert = (type, message) => {
    this.setState({
      alerts: {
        type,
        message,
      },
    });
  };

  render() {
    const { alerts, disabled } = this.state;

    return (
      <div className="page">
        <header>
          <BackButton />
        </header>

        <form className="page__section">

					<Title
						title="Sign up"
						description="Choose a registration method"
					/>


          <div className="form">

            <div className="form__item" > 
              <Field
								label="Email"
								type="Email"
								placeholder="Email"
							/>
              
              <span name={this.FIELD_NAME.EMAIL} className="form__error">
                {this.validate(
                  this.FIELD_NAME.EMAIL,
                  this.state[this.FIELD_NAME.EMAIL],
                )}
              </span>
            </div>

            <div className="form__item">
              <FieldPassword 
							label="Password"
							type="password"
							placeholder="Password"
							/>
             
              <span name={this.FIELD_NAME.PASSWORD} className="form__error">
                {this.validate(
                  this.FIELD_NAME.PASSWORD,
                  this.state[this.FIELD_NAME.PASSWORD],
                )}
              </span>
            </div>
         
          </div>

          <button
            onClick={this.handleSubmit}
            className={`button ${disabled ? "button--disabled" : ""}`}
            type="button"
          >
            Continue
          </button>

          <span
            className={`alert ${
              alerts.type === "disabled" ? "alert--disabled" : ""
            }`}
          >
            {alerts.message}
          </span>

          <span className="link__prefix">
					Already have an account?{" "}
            <a href="/signin" className="link">
						Sign In
            </a>
          </span>
        </form>
      </div>
    );
  }
}
