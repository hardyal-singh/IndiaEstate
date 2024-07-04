import express from "express";
import { createListing, deleteListing} from "../controllers/listing.controller.js";
import { userVerify } from "../utils/userVerify.js";

const listingRouter = express.Router();

listingRouter.post("/create", userVerify, createListing);
listingRouter.delete("/delete/:_id", userVerify, deleteListing);

export default listingRouter;
