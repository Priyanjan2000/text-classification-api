const axios = require("axios");

module.exports = async function (text) {
  let result;

  try {
    result = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct", // FREE model
        messages: [
          {
            role: "user",
            content:
              "Classify this text as Complaint, Query, Feedback or Other. Reply with only one word.\n" +
              text
          }
        ]
      },
      {
        headers: {
          "Authorization": "Bearer " + process.env.OPENROUTER_API_KEY,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost",
          "X-Title": "text-classifier-assignment"
        }
      }
    );
  } catch (err) {
    console.log("OpenRouter request failed");
    throw err;
  }

  let category = "Other";

  try {
    category = result.data.choices[0].message.content.trim();
    category = category
  .replace(/<s>|<\/s>/g, "")
  .replace(/\n/g, "")
  .trim();
  if (!["Complaint", "Query", "Feedback", "Other"].includes(category)) {
  category = "Other";
}

  } catch (e) {
    category = "Other";
  }

  // simple confidence logic
  let confidence = 0.55;

  if (category === "Complaint") confidence = 0.8;
  else if (category === "Query") confidence = 0.75;
  else if (category === "Feedback") confidence = 0.7;

  return {
    category,
    confidence
  };
};
