import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";
import Input from "../component/Input.jsx";
import Button from "../component/Button.jsx";
import { useRef } from "react";
import { app } from "../firebase.js";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [fileUploadPresentage, setFileUploadPresentage] = useState(null);
  const [fileUplaodError, setFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  console.log(formData);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadPresentage(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        switch (error.code) {
          case "storage/unauthorized":
            console.log("User doesn't have permission to access the object");
            setFileUploadError(
              "User doesn't have permission to access the object"
            );
            break;
          case "storage/canceled":
            console.log("User canceled the upload");
            setFileUploadError("User canceled the upload");
            break;
          case "storage/unknown":
            console.log("Unknown error occurred, inspect error.serverResponse");
            setFileUploadError("Unknown error occurred , inspect error");
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setFormData((pre) => ({ ...pre, avatar: downloadURL }));
        });
      }
    );
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  return (
    <div className="sm:w-1/2 mx-auto">
      <h1 className="text-center font-semibold text-3xl my-7 ">Profile</h1>
      <form className="flex flex-col gap-4  justify-center align-centen h-full ">
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*"
          hidden
        ></input>
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full w-24 h-24 cursor-pointer self-center"
          src={formData.avatar || currentUser.avatar}
        />
        {fileUploadPresentage ? (
          fileUploadPresentage < 100 ? (
            <p className="text-green-600 self-center">{`File uploaded ${fileUploadPresentage}%`}</p>
          ) : (
            <p className="text-green-700 self-center">
              Photo uplaoded successfully
            </p>
          )
        ) : (
          <p className="text-red-700 self-center">{fileUplaodError}</p>
        )}
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
