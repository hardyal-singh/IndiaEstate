import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

const createListing = async (req, res, next) => {
  try {
    const newListing = await Listing.create({ ...req.body });
    return res.status(201).json(newListing);
  } catch (error) {
    next(error);
  }
};

const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params._id);
  if (!listing) return next(errorHandler(404, "Listing not found"));

  if (req.user.id !== listing.userRef)
    return next(errorHandler(401, "You can delete your own listing."));

  const result = await Listing.findByIdAndDelete(req.params._id);
  console.log(result);

  if (!result) return next(errorHandler(500, "failed to delete listing"));
  return res.status(200).json({ message: "Listing deleted successfully." });
};

const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params._id);

    if (!listing) return next(errorHandler(404, "Listing not found"));

    if (listing.userRef !== req.user.id)
      return next(errorHandler(404, "You can only update you own listing"));

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true }
    );

    return res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params._id);
    if (!listing) return next(errorHandler(404, "Listing not found"));
    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
export { createListing, deleteListing, updateListing, getListing };
