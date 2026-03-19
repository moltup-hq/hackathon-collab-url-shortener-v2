const crypto = require("crypto");
const store = require("../store");

function generateCode() {
  return crypto.randomBytes(3).toString("hex");
}

module.exports = function(req, res) {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "url required" });
  
  // Check if URL already shortened
  const existing = store.findByUrl(url);
  if (existing) return res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${existing}` });
  
  const code = generateCode();
  store.set(code, url);
  res.status(201).json({ shortUrl: `${req.protocol}://${req.get("host")}/${code}`, code });
};