import "./index.css";

import React, { useEffect } from "react";
import { saveSession } from "../../script/session";

export default function InitializeApp() {
  useEffect(() => {
    saveSession(null);

    window.location.assign("/");
  }, []);

  return null;
}
