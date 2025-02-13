const crypto = require("crypto");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { challengeCode, verificationToken, endpointURL } = body;
    if (!challengeCode || !verificationToken || !endpointURL) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
        headers: { "Content-Type": "application/json" },
      };
    }

    const textToHash = challengeCode + verificationToken + endpointURL;

    const hash = crypto
      .createHash("sha256")
      .update(textToHash, "utf8")
      .digest("hex");

    return {
      statusCode: 200,
      body: JSON.stringify({ hash }),
      headers: { "Content-Type": "application/json" },
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
      headers: { "Content-Type": "application/json" },
    };
  }
};
