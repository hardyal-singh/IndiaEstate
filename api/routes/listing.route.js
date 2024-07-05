import express from "express";
import { createListing, deleteListing, updateListing} from "../controllers/listing.controller.js";
import { userVerify } from "../utils/userVerify.js";

const listingRouter = express.Router();

listingRouter.post("/create", userVerify, createListing);
listingRouter.delete("/delete/:_id", userVerify, deleteListing);
listingRouter.post("/update/:_id", userVerify, updateListing);


export default listingRouter;
