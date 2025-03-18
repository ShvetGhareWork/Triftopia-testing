import express from "express";
import { manageCart } from "../controllers/CartController.js";
import AuthUser from "../middleware/Auth.js";

const CartRouter = express.Router();

CartRouter.post("/add", AuthUser, (req, res) => manageCart(req, res, "add"));
CartRouter.post("/update", AuthUser, (req, res) =>
  manageCart(req, res, "update")
);
CartRouter.post("/getcart", AuthUser, (req, res) =>
  manageCart(req, res, "fetch")
);
CartRouter.delete("/remove", AuthUser, (req, res) =>
  manageCart(req, res, "remove")
);

export default CartRouter;
