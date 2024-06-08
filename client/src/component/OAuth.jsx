import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import React from "react";
import Button from "./Button.jsx";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInFaliure, signInSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const res = await fetch("api/auth/google", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFaliure(data.message));
      } else {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <Button
      onClick={handleGoogleClick}
      type="button"
      text="With Google"
      className="bg-red-700"
    />
  );
}
