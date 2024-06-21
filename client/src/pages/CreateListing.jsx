import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import Input from "../component/Input.jsx";
import Button from "../component/Button.jsx";
import { useSelector } from "react-redux";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navitage = useNavigate();
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
  const [error, setError] = useState(false);
  const [formUploading, setFormUploading] = useState(false);
  const [files, setFiles] = useState([]);

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

  //for form data state regular update
  const handleOnChange = (e) => {
    if (e.target.name === "sale" || e.target.name == "rent") {
      setFormData((previousData) => ({ ...previousData, type: e.target.name }));
    }

    if (
      e.target.name === "offer" ||
      e.target.name === "parking" ||
      e.target.name == "furnished"
    ) {
      setFormData((previousData) => ({
        ...previousData,
        [e.target.name]: e.target.checked,
      }));
    }

    if (
      e.target.name === "name" ||
      e.target.name === "description" ||
      e.target.name === "address" ||
      e.target.name === "bathrooms" ||
      e.target.name === "bedrooms" ||
      e.target.name === "regularPrice" ||
      e.target.name === "discountPrice"
    ) {
      setFormData((previousData) => ({
        ...previousData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("Please upload at least one image file");

      setFormUploading(true);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });

      const data = await res.json();
      if (data.status == false) {
        setError(data.message);
      }
      setFormUploading(false);
      navitage("/");
    } catch (error) {
      setError(error.message);
      setFormUploading(false);
    }
  };
  return (
    <div className="sm:w-1/2 mx-auto p-2">
      <h1 className=" text-center font-semibold text-3xl">Create a Listing</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-6 pt-7"
      >
        <div className="flex flex-col">
          <Input
            type="text"
            placeholder={"Name"}
            name="name"
            onChange={handleOnChange}
            value={formData.name}
            required
          />
          <textarea
            placeholder="Description"
            name="description"
            className="p-2"
            onChange={handleOnChange}
            value={formData.description}
            required
          />
          <Input
            type="text"
            placeholder={"Address"}
            name="address"
            onChange={handleOnChange}
            required
          />
          <div className="flex flex-row flex-wrap gap-3">
            <div className="flex gap-1">
              <Input
                type="checkbox"
                name="sale"
                onChange={handleOnChange}
                checked={formData.type === "sale"}
              ></Input>
              <span>Sell</span>
            </div>
            <div className="flex gap-1">
              <Input
                type="checkbox"
                name="rent"
                onChange={handleOnChange}
                checked={formData.type === "rent"}
              ></Input>
              <span>Rent</span>
            </div>
            <div className="flex gap-1">
              <Input
                type="checkbox"
                name="parking"
                onChange={handleOnChange}
                checked={formData.parking}
              ></Input>
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-1">
              <Input
                type="checkbox"
                name="furnished"
                onChange={handleOnChange}
                checked={formData.furnished}
              ></Input>
              <span>Furnished</span>
            </div>
            <div className="flex gap-1">
              <Input
                type="checkbox"
                name="offer"
                onChange={handleOnChange}
                checked={formData.offer}
              ></Input>
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-2 py-3">
            <div className="flex gap-3 items-center">
              <Input
                type="Number"
                name="bedrooms"
                className="w-20"
                min="1"
                max="10"
                onChange={handleOnChange}
                value={formData.bedrooms}
              />
              <span>Beds</span>
            </div>
            <div className="flex gap-3 items-center">
              <Input
                type="Number"
                name="bathrooms"
                onChange={handleOnChange}
                value={formData.bathrooms}
                className="w-20"
                min="1"
                max="10"
              />
              <span>Baths</span>
            </div>
            <div className="flex gap-3 items-center">
              <Input
                type="Number"
                name="regularPrice"
                onChange={handleOnChange}
                value={formData.regularPrice}
                className="w-20"
                min="40"
                max="100000"
              />
              <span>Regular price</span>
            </div>
            {formData.offer && (
              <div className="flex gap-3 items-center">
                <Input
                  type="Number"
                  name="discountPrice"
                  onChange={handleOnChange}
                  value={formData.discountPrice}
                  className="w-20"
                  min="1"
                />
                <span>Discount price</span>
              </div>
            )}
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
                <a href={imageUrl} target="_blank">
                  <img
                    src={imageUrl}
                    alt="listing image"
                    className="rounded-lg w-20 h-20 object-cover cursor-pointer"
                  />
                </a>
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
            type="submit"
            text={formUploading ? "UPlOADING" : "CREATE LISTING"}
            className="bg-slate-700 cursor-pointer"
            disabled={formUploading || uploading}
          />
          {error && <p class="text-red-600">{error}</p>}
        </div>
      </form>
    </div>
  );
}
