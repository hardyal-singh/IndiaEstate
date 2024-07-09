import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../component/ImageSlider.jsx";
import ShareButton from "../component/ShareButton.jsx";
import { useSelector } from "react-redux";
import {
  FaBath,
  FaBed,
  FaMapMarkerAlt,
  FaParking,
  FaChair,
} from "react-icons/fa";
import Contact from "../component/Contact.jsx";

const ListingDetail = ({ icon, detail }) => (
  <li className="flex flex-wrap items-center gap-1">
    {icon}
    <p>{detail}</p>
  </li>
);

const Listing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/listing/get/${listingId}`);
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        setListing(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [listingId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error}</p>;
  if (!listing) return null;

  return (
    <main>
      <ImageSlider listing={listing} />
      <ShareButton />
      <div className="flex flex-col mx-auto mx-w-4xl w-2/3 p-3 my-7 gap-2">
        <p className="text-2xl font-semibold flex">
          {listing.name}-{" "}
          <p className="text-green-800">
            {" "}
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && "/month"}
          </p>
        </p>
        <p className="flex flex-row items-center gap-2 text-semibold">
          <FaMapMarkerAlt className="text-green-700" />
          {listing.address}
        </p>
        <div className="flex flex-col gap-1 sm:gap-4">
          <button className="bg-red-900 text-white rounded-md p-1 w-full max-w-[200px]">
            {listing.type === "rent" ? "For rent" : "For sell"}
          </button>
          {listing.offer && (
            <button className="bg-green-900 text-white rounded-md p-1 w-full max-w-[200px]">
              ${+listing.regularPrice - +listing.discountPrice}
            </button>
          )}
        </div>
        <p>
          <span className="text-md font-semibold">Discription-</span>
          {listing.description}
        </p>
        <ul className="flex gap-3">
          <ListingDetail
            icon={<FaBed className="text-green-800" />}
            detail={
              listing.bedrooms > 1
                ? `${listing.bedrooms} Beds`
                : `${listing.bedrooms} Bed`
            }
          />
          <ListingDetail
            icon={<FaBath className="text-green-800" />}
            detail={
              listing.bathrooms > 1
                ? `${listing.bathrooms} Baths`
                : `${listing.bathrooms} Bath`
            }
          />
          <ListingDetail
            icon={<FaParking className="text-green-800" />}
            detail={listing.parking ? "Parking Spot " : "No parking"}
          />
          <ListingDetail
            icon={<FaChair className="text-green-800" />}
            detail={listing.furnished ? "Furniture" : "No furniture"}
          />
        </ul>
        {currentUser && currentUser._id !== listing.userRef && !contact && (
          <button
            className="text-white bg-slate-700 p-3 w-full text-center rounded-sm mt-6 uppercase"
            onClick={() => setContact(true)}
          >
            Contact Landlord
          </button>
        )}

        {contact && (
          <Contact userRef={listing.userRef} listingName={listing.name} />
        )}
      </div>
    </main>
  );
};

export default Listing;
