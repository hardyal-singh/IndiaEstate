import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ userRef, listingName }) {
  const [landlord, setLandlord] = useState(false);
  const [message, setMessage] = useState();

  useEffect(() => {
    const getLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${userRef}`);
        if (!res.ok) {
          throw new Error("Something went wrong fetching user");
        }
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getLandlord();
  }, []);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(
      `mailto:${landlord.email}?subject=Regarding ${listingName}&body=${message}`,
      "_parent"
    );
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-4">
      <p>
        Contact <span className="font-semibold">{landlord.username}</span> for{" "}
        <span className="font-semibold">{listingName}</span>
      </p>
      <textarea
        className="border p-3 rounded-md "
        row={3}
        placeholder="Enter your message here"
        name="email"
        value={message}
        onChange={onChange}
        required
      />

      <button
        type="submit"
        className="uppercase bg-slate-700 text-white w-full p-3 rounded-sm mt-2
        text-center"
      >
        Send Message
      </button>
    </form>
  );
}
