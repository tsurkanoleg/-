import "./index.css";

import React, { useEffect } from "react";
import Title from "../../component/title";
import Button from "../../component/button";

export default function HomePage() {
  const signUp = () => {
    window.location.href = window.location.origin + "/sign-up";
  };

  const signIn = () => {
    window.location.href = window.location.origin + "/sign-in";
  };

  return (
    <main className="main">
      <div className="body">
        <div className="image">
          <Title title="Hello!" description="Welcome to bank app" />
          <img src="/png/money.png" alt="money" className="money" />
        </div>

        <div className="buttonBlock">
          <div className="buttonUp">
            <Button text="Sign Up" onClick={signUp} />
          </div>
          <div className="buttonIn">
            <Button text="Sign In" onClick={signIn} />
          </div>
        </div>
      </div>
    </main>
  );
}
