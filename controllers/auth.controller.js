const verify = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Token verified",
    user: req.user,
  });
};

module.exports = {
  verify,
};
