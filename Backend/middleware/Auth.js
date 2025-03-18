import jwt from "jsonwebtoken";

const AuthUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Login Again!",
      });
    }

    const token = authHeader.split(" ")[1];
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = tokenDecode.id;
    next();
  } catch (error) {
    console.error("User Auth Error:", error);
    res.status(403).json({ success: false, message: "Invalid Token" });
  }
};

export default AuthUser;
