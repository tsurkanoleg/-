import index from "./index.css";

import React, { Component } from "react";
import { getTokenSession, getSession } from "../../script/session";
import BackButton from "../../component/back-button";
import Field from "../../component/field";

export default class SignupConfirmForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      [this.FIELD_NAME.CODE]: "",
      alerts: {
        type: "disabled",
        message: "",
      },
      disabled: true,
    };
  }

  FIELD_NAME = {
    CODE: "code",
  };

  FIELD_ERROR = {
    IS_EMPTY: "Введіть значення в поле",
    IS_BIG: "Дуже довге значення, приберіть зайве",
  };

  validate = (name, value) => {
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY;
    }

    if (String(value).length > 20) {
      return this.FIELD_ERROR.IS_BIG;
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value }, this.checkDisabledState);
  };

  checkDisabledState = () => {
    const { code } = this.state;

    const isDisabled = !code;
    this.setState({ disabled: isDisabled });
  };

  handleSubmit = async () => {
    if (this.state.disabled) {
      this.validateAll();
    } else {
      console.log(this.state);

      this.setAlert("progress", "Завантаження...");

      try {
        const res = await fetch("/signup-confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: this.convertData(),
        });

        const data = await res.json();

        if (res.ok) {
          this.setAlert("success", data.message);
          // saveSession(data.session); // Not sure if you need this since you're using getTokenSession() and getSession()
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
    return JSON.stringify({
      [this.FIELD_NAME.CODE]: Number(this.state[this.FIELD_NAME.CODE]),
      token: getTokenSession(),
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
      <div className="page page--background">
        <header>
          <BackButton />
        </header>

        <form className="page__section">
          <h1 className="page__title">Підтвердження пошти</h1>

          <p className="page__subtitle">
            На вашу пошту надіслано код для підтвердження облікового запису.
            Введіть його сюди
          </p>

          <div className="form">
            <div className="form__item">
              <Field />
              <input
                type="number"
                name={this.FIELD_NAME.CODE}
                placeholder="Ваш код"
                value={this.state[this.FIELD_NAME.CODE]}
                onChange={this.handleInputChange}
              />
              <span name={this.FIELD_NAME.CODE} className="form__error">
                {this.validate(
                  this.FIELD_NAME.CODE,
                  this.state[this.FIELD_NAME.CODE],
                )}
              </span>
            </div>
          </div>

          <button
            onClick={this.handleSubmit}
            className={`button ${disabled ? "button--disabled" : ""}`}
            type="button"
          >
            Підтвердити
          </button>

          <span
            className={`alert ${
              alerts.type === "disabled" ? "alert--disabled" : ""
            }`}
          >
            {alerts.message}
          </span>

          <span className="link__prefix">
            Загубили код?{" "}
            <a href="/signup-confirm" className="link" id="renew">
              Відправити ще раз
            </a>
          </span>
        </form>
      </div>
    );
  }
}
