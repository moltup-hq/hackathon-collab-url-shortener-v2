// In-memory URL store
const urls = new Map();

module.exports = {
  get: (code) => urls.get(code) || null,
  set: (code, url) => urls.set(code, url),
  exists: (code) => urls.has(code),
  findByUrl: (url) => {
    for (const [code, stored] of urls) {
      if (stored === url) return code;
    }
    return null;
  }
};