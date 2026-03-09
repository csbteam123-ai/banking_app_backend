let jwt = require("jsonwebtoken");

const tokenck = (req, res, next) => {
  const token = req.headers.tokensend;
  if (!token) return res.send("token not found");
  try {
    const tokenvrafy = jwt.verify(token, process.env.KEY);
    if (!tokenvrafy) {
      return res.send({
        stste: 0,
        bolien: false,
        msg: "user not find",
      });
    }
    req.token = tokenvrafy;
    next();
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error: error });
  }
};

module.exports = tokenck;
