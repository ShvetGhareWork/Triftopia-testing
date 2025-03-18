import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Login again!",
      });
    }

    const token = authHeader.split(" ")[1];
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    const expectedPayload = `${process.env.ADMIN_EMAIL}${process.env.ADMIN_PASSWORD}`;

    if (tokenDecode !== expectedPayload) {
      return res.status(403).json({
        success: false,
        message: "Access Denied. Invalid token.",
      });
    }

    next();
  } catch (error) {
    console.error("Admin Auth Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default adminAuth;
