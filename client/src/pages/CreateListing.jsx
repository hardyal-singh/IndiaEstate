import React, { useState } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import Input from "../component/Input.jsx";
import Button from "../component/Button.jsx";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [uploadImageError, setUploadImageError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  console.log(files);
  console.log(formData);
  const handleFileUpload = (e) => {
    setFiles(e.target.files);
  };

  //to upload images file on firsbase and get download urls
  const storImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (sanpshot) => {
          const progress =
            (sanpshot.bytesTransferred / sanpshot.totalBytes) * 100;
          console.log(`Uploading ${progress}`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadImageUrl) => {
            resolve(downloadImageUrl);
          });
        }
      );
    });
  };

  const handleImageUpload = () => {
    if (files.length > 0 && formData.imageUrls.length + files.length < 7) {
      setUploading(true);
      setUploadImageError(false);

      const promies = [];

      for (let i = 0; i < files.length; i++) {
        promies.push(storImage(files[i]));
      }

      Promise.all(promies)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setUploading(false);
          setUploadImageError(false);
        })
        .catch((error) => {
          setUploading(false);
          setUploadImageError(error);
        });
    } else {
      setUploadImageError("Image should be under 6 files.");
      setUploading(false);
    }
  };

  //for image delete image form formdata...
  const deleteImage = (i) => {
    setFormData((previousData) => ({
      ...previousData,
      imageUrls: previousData.imageUrls.filter((image, index) => index !== i),
    }));
  };
  return (
    <div className="sm:w-1/2 mx-auto p-2">
      <h1 className=" text-center font-semibold text-3xl">Create a Listing</h1>
      <form className="flex flex-col sm:flex-row gap-6 pt-7">
        <div className="flex flex-col">
          <Input type="text" placeholder={"Name"} />
          <textarea
            placeholder="Description"
            name="Description"
            className="p-2"
          />
          <Input type="text" placeholder={"Address"} />
          <div className="flex flex-row flex-wrap gap-3">
            <div className="flex gap-1">
              <Input type="checkbox" name="sell"></Input>
              <span>Sell</span>
            </div>
            <div className="flex gap-1">
              <Input type="checkbox" name="rent"></Input>
              <span>Rent</span>
            </div>
            <div className="flex gap-1">
              <Input type="checkbox" name="parking"></Input>
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-1">
              <Input type="checkbox" name="Furnished"></Input>
              <span>Furnished</span>
            </div>
            <div className="flex gap-1">
              <Input type="checkbox" name="offer"></Input>
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-2 py-3">
            <div className="flex gap-3 items-center">
              <Input type="Number" name="badrooms" className="w-10" />
              <span>Beds</span>
            </div>
            <div className="flex gap-3 items-center">
              <Input type="Number" name="bathrooms" className="w-10" />
              <span>Baths</span>
            </div>
            <div className="flex gap-3 items-center">
              <Input type="Number" name="regular price" className="w-10" />
              <span>Regular price</span>
            </div>
            <div className="flex gap-3 items-center">
              <Input type="Number" name="discout price" className="w-10" />
              <span>Discount price</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-semibold">Image: </span>The first image will
            be cover(max 6)
          </p>
          <Input
            type="file"
            name="imageUrls"
            onChange={handleFileUpload}
            accept="image/*"
            multiple
          />
          {uploadImageError ? (
            <p className="text-red-700 self-start">{`*${uploadImageError}*`}</p>
          ) : null}
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((imageUrl, index) => (
              <div className="flex justify-between border rounded-lg p-1 hover:bg-orange-100">
                <img
                  src={imageUrl}
                  alt="listing image"
                  className="rounded-lg w-20 h-20 object-cover"
                />
                <Button
                  type="button"
                  text="DELETE"
                  textColor="text-red-700"
                  className="font-semibold"
                  onClick={() => deleteImage(index)}
                />
              </div>
            ))}

          <Button
            type="button"
            text={uploading ? "UPLOADING..." : "UPLOAD"}
            disabled={uploading}
            className="bg-green-600"
            onClick={handleImageUpload}
          />
          <Button
            type="Submit"
            text="CREATE LISTING"
            className="bg-slate-700 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}
