import React from "react";
import Input from "../component/Input.jsx";
import Button from "../component/Button.jsx";
export default function CreateListing() {
  return (
    <div className="sm:w-1/2 mx-auto p-2">
      <h1 className=" text-center font-semibold text-3xl">Create a Listing</h1>
      <form className="flex flex-col sm:flex-row gap-3 py-3">
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
            <span className="font-semibold">Image:</span>The first image will be
            cover(max 6)
          </p>
          <Input type="file" name="imageUrls" />
          <Button type="button" text="UPLOAD" className="bg-green-600" />
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
