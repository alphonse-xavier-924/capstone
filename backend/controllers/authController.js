const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const sendEmail = require("../utils/sendEmail");

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = crypto

      .createHash("sha256")

      .update(resetToken)

      .digest("hex");

    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes

    await user.save();

    const resetUrl = `http://localhost:4000/reset-password/${resetToken}`;

    const message = `

      <h1>You have requested a password reset</h1>

      <p>Please go to this link to reset your password:</p>

      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

    `;

    try {
      await sendEmail({
        to: user.email,

        subject: "Password Reset Request",

        text: message,
      });

      res.status(200).json({ message: "Email sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;

      user.resetPasswordExpire = undefined;

      await user.save();

      res.status(500).json({ message: "Email could not be sent" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  console.log("Received token:", req.params.token);
  console.log("Received payload:", req.body);

  // Hash the token from the URL
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  console.log("Hashed token:", resetPasswordToken);

  try {
    // Find the user by the hashed token and check if it's not expired
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }, // Check if the token is still valid
    });

    if (!user) {
      console.log("Invalid or expired token");
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    console.log("User found:", user.email);
    console.log("Token expiration time in DB:", user.resetPasswordExpire);

    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;

    // Clear the reset token and expiration
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // Save the updated user
    await user.save();

    console.log("Password has been reset successfully for user:", user.email);
    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Server error during password reset:", error);
    res.status(500).json({ message: "Server error" });
  }
};
