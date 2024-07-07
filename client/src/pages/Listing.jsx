import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../component/ImageSlider.jsx";

export default function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(false);
  console.log(listing);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true);
    try {
      async function fatchData() {
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        if (!res.ok) {
          setError("something went wrong");
        }
        const data = await res.json();
        setListing(data);
        setLoading(false);
        setError(false);
      }

      fatchData();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, []);
  return (
    <>
      <p>{loading && "Loading..."}</p>
      <p>{error && "Someting went wrong"}</p>

      {listing && !loading && !error && (
        <div>
          <ImageSlider listing={listing} />
        </div>
      )}
    </>
  );
}
