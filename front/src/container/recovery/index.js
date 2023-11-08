import "./index.css";

import React, { useRef } from "react";
import { Form, REG_EXP_EMAIL } from "../../script/form";
import Title from "../../component/title-black"

import BackButton from "../../component/back-button";
import Field from "../../component/field";

class RecoveryForm extends Form {
  FIELD_NAME = {
    EMAIL: "email",
  };

  FIELD_ERROR = {
    IS_EMPTY: "Введіть значення в поле",
    IS_BIG: "Дуже довге значення, приберіть зайве",
    EMAIL: "Введіть коректне значення e-mail адреси",
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
  };

  submit = async () => {
    if (this.disabled === true) {
      this.validateAll();
    } else {
      this.setAlert("progress", "Завантаження...");

      try {
        const res = await fetch("/recovery", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: this.convertData(),
        });

        const data = await res.json();

        if (res.ok) {
          this.setAlert("success", data.message);
          window.location.assign("/recovery-confirm");
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
      [this.FIELD_NAME.EMAIL]: this.value[this.FIELD_NAME.EMAIL],
    });
  };
}

export default function RecoveryFormComponent() {
  const recoveryFormRef = useRef(null);

  const handleFormSubmit = () => {
    if (recoveryFormRef.current) {
      recoveryFormRef.current.submit();
    }
  };

  return (
    <div className="page page--background">
      <header>
        <BackButton />
      </header>

      <form className="page__section">
        
				<Title
					title="Recover password"	
					description="Choose a recovery method"		
				/>

        <div className="form">
          <div className="form__item">
            <Field
              action="recoveryForm.change"
              label="Email"
              type="email"
              name="email"
              placeholder="Email"
            />
            <span name="email" className="form__error">
              Помилка
            </span>
          </div>
        </div>

        <button
          onClick={handleFormSubmit}
          className={`button button--disabled`}
          type="button"
        >
          Send code
        </button>

        <span className={`alert alert--disabled`}>Увага! Помилка!</span>
      </form>
    </div>
  );
}

window.recoveryForm = new RecoveryForm();
