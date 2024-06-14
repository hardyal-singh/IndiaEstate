import express from "express";
import { createListing } from "../controllers/listing.controller.js";
import { userVerify } from "../utils/userVerify.js";

const listingRouter = express.Router();

listingRouter.post("/create", userVerify, createListing);

export default listingRouter;
