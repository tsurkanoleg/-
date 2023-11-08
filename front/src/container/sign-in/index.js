import "./index.css";

import React, { Component } from "react";

import { REG_EXP_EMAIL } from "../../script/form";

import { saveSession } from "../../script/session";

import BackButton from "../../component/back-button";
import Field from "../../component/field";
import FieldPassword from "../../component/field-password";
import TitleBlack from "../../component/title-black";

class SignupForm extends Component {
  FIELD_NAME = {
    EMAIL: "email",
    PASSWORD: "password",
  };

  FIELD_ERROR = {
    IS_EMPTY: "Введіть значення в поле",
    IS_BIG: "Дуже довге значення, приберіть зайве",
    EMAIL: "Введіть коректне значення e-mail адреси",
  };

  constructor() {
    super();
    this.state = {
      value: {
        [this.FIELD_NAME.EMAIL]: "",
        [this.FIELD_NAME.PASSWORD]: "",
      },
      alert: {
        type: "disabled",
        message: "",
      },
      disabled: true,
    };
  }

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
  };

  handleChange = (name, value) => {
    this.setState((prevState) => ({
      value: {
        ...prevState.value,
        [name]: value,
      },
    }));
  };

  setAlert = (type, message) => {
    this.setState({
      alert: {
        type,
        message,
      },
    });
  };

  convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.EMAIL]: this.state.value[this.FIELD_NAME.EMAIL],
      [this.FIELD_NAME.PASSWORD]: this.state.value[this.FIELD_NAME.PASSWORD],
    });
  };

  submit = async () => {
    if (this.state.disabled === true) {
      this.validateAll();
    } else {
      console.log(this.state.value);

      this.setAlert("progress", "Завантаження...");

      try {
        const res = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: this.convertData(),
        });

        const data = await res.json();

        if (res.ok) {
          console.log(data.session);
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

  render() {
    return (
      <div className="page page--background">
        <header>
          <BackButton />
        </header>

        <div>
          <TitleBlack title="Sign In" description="Select login method" />
        </div>

        <form className="page__section">
          <div className="form">
            <div className="form__item">
              <Field
                action="signupForm.change"
                label="Ел. адреса"
                type="email"
                name="email"
                placeholder="E-mail"
              />
              <span name="email" className="form__error">
                Sorry, the email is too simple
              </span>
            </div>
						
            <div className="form__item">
              <FieldPassword
                action="signupForm.change"
                label="Пароль"
                name="password"
                placeholder="Password"
              />
              <span name="password" className="form__error">
                Sorry, the password is too simple
              </span>
            </div>
          </div>

					<span className="link__prefix">
					Forgot your password?
            <a href="/recovery" className="link">
						Restore
            </a>
          </span>

          <button
            onClick={this.submit}
            className={`button ${
              this.state.disabled ? "button--disabled" : ""
            }`}
            type="button"
          >
            Continnue
          </button>

          <span className={`alert ${this.state.alert.type}`}>
            {this.state.alert.message}
          </span>

          
        </form>
      </div>
    );
  }
}

export default SignupForm;
