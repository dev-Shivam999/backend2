"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
// Rate limiter configuration
const otpLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000, // 5 minutes
    max: 3, // Limit each IP to 3 OTP requests per windowMs
    message: 'Too many requests, please try again after 1 minutes',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const passwordResetLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 password reset requests per windowMs
    message: 'Too many password reset attempts, please try again after 1 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});
// Store OTPs in a simple in-memory object
const otpStore = {};
// Endpoint to generate and log OTP with rate limiting
app.post('/generate-otp', otpLimiter, (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generates a 6-digit OTP
    otpStore[email] = otp;
    console.log(`OTP for ${email}: ${otp}`); // Log the OTP to the console
    res.status(200).json({ message: "OTP generated and logged" });
});
// Endpoint to reset password with rate limiting
app.post('/reset-password', passwordResetLimiter, (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "Email, OTP, and new password are required" });
    }
    if (Number(otpStore[email]) === Number(otp)) {
        console.log(`Password for ${email} has been reset to: ${newPassword}`);
        delete otpStore[email]; // Clear the OTP after use
        res.status(200).json({ message: "Password has been reset successfully" });
    }
    else {
        res.status(401).json({ message: "Invalid OTP" });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
