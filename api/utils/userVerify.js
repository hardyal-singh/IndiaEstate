import jwt from "jsonwebtoken";

const userVerify = async (req, res, next) => {
  const { access_token } = req.cookies;
  console.log(access_token);
  if (!access_token)
    return next(errorHandler(404, "Unauthetized access token"));

  const user = await jwt.verify(access_token, process.env.JWT_SECRET);
  req.user = user;
  next();
};

export { userVerify };
