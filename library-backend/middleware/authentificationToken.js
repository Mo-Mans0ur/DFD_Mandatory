import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  if (!token)
    return res.status(401).json({ error: "Access denied. Token missing." });

  console.log("Token extracted:", token); // Before jwt.verify
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT verification error:", err); // Log errors if any
      return res.status(403).json({ error: "Invalid token" });
    }
    console.log("Decoded user from JWT:", user); // Log the decoded user
    req.user = user;
    next();
  });
};

export default authenticateToken;
