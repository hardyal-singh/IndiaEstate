import React from "react";

export default function Input({ type, placeholder, className, ...ref }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      {...ref}
      className={`border p-3 rounded-lg ${className}`}
    />
  );
}
