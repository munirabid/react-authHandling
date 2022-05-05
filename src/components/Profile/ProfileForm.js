import React, { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInoutRef = useRef("");
  const authCtx = useContext(AuthContext);

  const submitForm = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInoutRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA-3pr7z2-ytTjTYrGj1PTqR2GcO7ITwKQ",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      //in case succede
      history.replace("/");
    });
  };

  return (
    <form className={classes.form} onSubmit={submitForm}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          min="7"
          ref={newPasswordInoutRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
