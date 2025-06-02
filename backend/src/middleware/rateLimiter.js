import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {

    const { success } = await ratelimit.limit("my-rate-limit"); // ✅ use limit(ip)

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }

    next(); // ✅ allow the request to proceed
  } catch (error) {
    console.log("Rate limit error:", error);
    next(error); // ✅ call next with the error
  }
};

export default rateLimiter;
