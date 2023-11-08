import "./index.css";

import { saveSession } from "../../script/session";
import BackButton from "../../component/back-button";
import Field from "../../component/field-form";
import FieldPassword from "../../component/field-password";
import Title from "../../component/title-black"

import { Form, REG_EXP_EMAIL, REG_EXP_PASSWORD } from "../../script/form";

export default function RecoveryConfirmForm() {
  const FIELD_NAME = {
    CODE: "code",
    PASSWORD: "password",
    PASSWORD_AGAIN: "passwordAgain",
  };

  const FIELD_ERROR = {
    IS_EMPTY: "Введіть значення в поле",
    IS_BIG: "Дуже довге значення, приберіть зайве",
    PASSWORD:
      "Пароль повинен складатися з не менше ніж 8 символів, включаючи хоча б одну цифру, малу та велику літеру",
    PASSWORD_AGAIN: "Ваш другий пароль не збігається з першим",
  };

  const validate = (name, value) => {
    if (String(value).length < 1) {
      return FIELD_ERROR.IS_EMPTY;
    }

    if (String(value).length > 20) {
      return FIELD_ERROR.IS_BIG;
    }

    if (name === FIELD_NAME.PASSWORD) {
      if (!REG_EXP_PASSWORD.test(String(value))) {
        return FIELD_ERROR.PASSWORD;
      }
    }

    if (name === FIELD_NAME.PASSWORD_AGAIN) {
      if (String(value) !== value[FIELD_NAME.PASSWORD]) {
        return FIELD_ERROR.PASSWORD_AGAIN;
      }
    }
  };

  const submit = async () => {
    if (this.disabled === true) {
      this.validateAll();
    } else {
      console.log(this.value);

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

  return (
    <div className="page page--background">
      <header>
        <BackButton />
      </header>

      <form className="page__section">

				<Title
					title="Confirm account"
					description="Write the code you received"
				/>

        <div className="form">
          <div className="form__item">
            <Field
              action="recoveryConfirmForm.change"
              label="Код"
              type="number"
              name="code"
              placeholder="Ваш код"
            />
            <span name="code" className="form__error">
              Error
            </span>
          </div>
          
        </div>

        <button
          onClick={submit}
          className={`button button--disabled`}
          type="button"
        >
          Confirm
        </button>

        <span className={`alert alert--disabled`}>Error!</span>
      </form>
    </div>
  );
}
