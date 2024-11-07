import express from "express";
import { getallReviews, createReview } from "../controllers/reviewController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router= express.Router({mergeParams:true});

router.route('/')
    .get(getallReviews)
    .post(authenticate, restrict(['patient']), createReview);

export default router; 