import React from "react";
import { useSelector } from "react-redux";
import Input from "../component/Input.jsx";
import Button from "../component/Button.jsx";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="sm:w-1/2 mx-auto">
      <h1 className="text-center font-semibold text-3xl my-7 ">Profile</h1>
      <form className="flex flex-col gap-4  justify-center align-centen h-full ">
        <img
          className="rounded-full w-24 h-24 cursor-pointer self-center"
          src={currentUser.avatar}
        />
        <Input
          type="text"
          placeholder="Username"
          name="username"
          defaultValue={currentUser.username}
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          defaultValue={currentUser.email}
        />
        <Input type="password" placeholder="Password" name="password" />
        <Button type="submit" text="Update" className="bg-green-700" />
      </form>
      <div className="flex justify-between mt-5">
        <spna className="text-red-600 cursor-pointer ">Delete Account</spna>
        <spna className="text-red-600 cursor-pointer ">Sign Out</spna>
      </div>
    </div>
  );
}
