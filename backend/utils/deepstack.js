const axios = require("axios");

const detectFaceEncoding = async (base64Image) => {
  try {
    const res = await axios.post(
      "http://localhost:80/v1/vision/face/recognize",
      { image: base64Image }
    );
    if (res.data.success && res.data.predictions.length > 0) {
      return res.data.predictions[0].embedding;
    }
    return null;
  } catch (err) {
    console.error("Error from DeepStack:", err.response?.data || err.message);
    return null;
  }
};

const calculateEuclideanDistance = (vec1, vec2) => {
  return Math.sqrt(vec1.reduce((sum, v, i) => sum + (v - vec2[i]) ** 2, 0));
};

module.exports = { detectFaceEncoding, calculateEuclideanDistance };
