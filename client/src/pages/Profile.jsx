import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import Input from "../component/Input.jsx";
import Button from "../component/Button.jsx";
import { useRef } from "react";
import { app } from "../firebase.js";
import {
  userUpdateFaliure,
  userUpdateStart,
  userUpdateSuccess,
  userDeleteFaliure,
  userDeleteStart,
  userDeleteSuccess,
} from "../redux/user/userSlice.js";
import { Link } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

export default function Profile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [fileUploadPresentage, setFileUploadPresentage] = useState(null);
  const [fileUplaodError, setFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [upadatedSuccessfully, setUpdateSuccessfully] = useState(false);
  const [getUserListingsError, setGetuserListingsError] = useState(false);
  const [getUserListings, setGetUserListings] = useState([]);
  console.log(getUserListings);

  //important: this is for firbase functionality
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

  // for form data state regular update
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  //for update user data with avatar
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(userUpdateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (data.status === false) {
        dispatch(userUpdateFaliure(data.message));
      } else {
        dispatch(userUpdateSuccess(data));
        setUpdateSuccessfully(true);
      }
    } catch (error) {
      dispatch(userUpdateFaliure(error.message));
    }
  };

  //delete user
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      if (data.status === false) {
        dispatch(userUpdateFaliure(data.message));
        return;
        1;
      }
      dispatch(userDeleteSuccess(data.message));
    } catch (error) {
      dispatch(userDeleteFaliure(error.message));
    }
  };

  //signout user
  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      console.log(data);
      if (data.status === false) {
        dispatch(userDeleteFaliure(data.message));
        return;
      }
      dispatch(userDeleteSuccess(data.message));
    } catch (error) {
      console.log(error);
      dispatch(userDeleteFaliure(error.message));
    }
  };

  //getUserListing
  const handleGetUserListings = async (e) => {
    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.status === false) return setGetuserListingsError(data.message);

      setGetUserListings(data);
    } catch (error) {
      setGetuserListingsError(error.message);
    }
  };


//deleteUserListing 
const handleDeleteUserListing= async (listingId) =>{
  try {
    const res= await fetch(`/api/listing/delete/${listingId}`,{
      method:"DELETE"
    })

    if(res.status !==false) {
      const data=await res.json();
      console.log(data);
      setGetUserListings((pre)=>(
        pre.filter((listing)=>listing._id !==listingId)
      ))
    }
  } catch (error) {
    console.log(error.message)
  }
}
  // below we use useEffect functions-------------------------
  //for upload image on firebase and get download url
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  //using this is funtion we can convert useState in intial value
  useEffect(() => {
    const timeout = setTimeout(() => {
      setUpdateSuccessfully(false);
      if (fileUploadPresentage == 100) {
        setFileUploadPresentage(null);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [upadatedSuccessfully, fileUploadPresentage]);

  return (
    <div className="sm:w-1/2 mx-auto">
      <h1 className="text-center font-semibold text-3xl my-7 ">Profile</h1>
      <form
        onSubmit={handleUpdate}
        className="flex flex-col gap-4  justify-center align-centen h-full "
      >
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
          onChange={handleChange}
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          text={loading ? "Loading" : "Update"}
          className="bg-green-700"
        />
        <Link
          to={"/create-listing"}
          className="uppercase text-center bg-slate-700 p-3 rounded-xl text-white"
        >
          Create List
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <spna className="text-red-600 cursor-pointer" onClick={handleDelete}>
          Delete Account
        </spna>
        <spna className="text-red-600 cursor-pointer " onClick={handleSignout}>
          Sign Out
        </spna>
      </div>
      {upadatedSuccessfully ? (
        <p className="text-green-700">User update successfully</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        ""
      )}
      <button onClick={handleGetUserListings} className="text-green-500 ">
        Show all listings
      </button>
      <h1 className="text-3xl text-center font-bold">Your Listings</h1>
      {getUserListings.length > 0 ? (
        getUserListings.map((listing) => (
          <div className="flex felx-row justify-between border rounded-md p-1 items-center mt-3 last:mb-5">
            <div className="flex flex-row gap-3 items-center">
              <Link to={`/listing/${listing._id}`}>
                <img
                  className="w-20 h-20"
                  src={listing.imageUrls[0]}
                  alt="image"
                ></img>
              </Link>
              <Link to={`/listing/${listing._id}`}>
                <h1>{listing.name}</h1>
              </Link>
            </div>
            <div className="flex flex-col">
              <button type="button" className="font-semibold text-green-600">
                Edit
              </button>
              <button type="button" className="font-semibold text-red-700" onClick={()=>handleDeleteUserListing(listing._id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>{getUserListingsError}</p>
      )}
    </div>
  );
}
