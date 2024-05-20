import jwt from "jsonwebtoken";
// import sequelize from "../util/sequelize";
import sequelize from "../util/sequelize.js";
const protectRoute = async (req, res, next) => {
  // try {
  //   const token = req.cookies.jwt;
  //   if (!token) {
  //     return res.status(401).json({
  //       error: "Unauthorized - token not provided",
  //       jwwt: req.cookies.jwt,
  //     });
  //   }
  //   const decoded = jwt.verify(token, "mySecretKey");
  //   if (!decoded) {
  //     return res.status(401).json({ error: "Unauthorized - Invalid token" });
  //   }
  //   const user = await User.findOne({ where: { email: decoded.email } });
  //   if (!user) {
  //     return res.status(404).json({ error: "User not found" });
  //   }
  //   req.user = user;
  //   next();
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ error });
  // }
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({
        error: "Unauthorized - token not provided",
      });
    }

    const decoded = jwt.verify(token, "secretkey");
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    const [users] = await sequelize.query("SELECT * FROM users WHERE id = ?", {
      replacements: [decoded.id],
      type: sequelize.QueryTypes.SELECT,
    });

    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = users;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export default protectRoute;
