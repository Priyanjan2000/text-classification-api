const runAI = require("./ai");

module.exports = async function (req, res) {
  let text = req.body ? req.body.text : null;

  if (!text) {
    return res.status(400).send({ error: "text missing" });
  }

  if (text.length < 3) {
    return res.send({
      category: "Other",
      confidence: 0.4
    });
  }

  try {
    const result = await runAI(text);
    res.send(result);
  } catch (e) {
    console.log("error while classifying", e.message);
    res.status(500).send({ error: "classification failed" });
  }
};
