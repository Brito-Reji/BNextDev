import express from "express";
import {
  getHomePage,
  getDomainsPage,
  getSubdomainPage,
  getTopicsPage,
  getSuggestTopicPage
} from "../controllers/pagesController.js";

const router = express.Router();

router.get("/", getHomePage);
router.get("/domains", getDomainsPage);
router.get("/domains/:domainId", getSubdomainPage);
router.get("/domains/:domainId/:subdomainId", getTopicsPage);
router.get("/domains/:domainId/:subdomainId/add", getSuggestTopicPage);

export default router;
