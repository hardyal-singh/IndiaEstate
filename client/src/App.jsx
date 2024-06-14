import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  SignIn,
  SignOut,
  About,
  Profile,
  CreateListing,
} from "./pages/index.js";
import Header from "./component/Header.jsx";
import PrivateRouter from "./component/PrivateRouter.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-out" element={<SignOut />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRouter />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
