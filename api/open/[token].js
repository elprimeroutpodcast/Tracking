const { resolveLink, recordEvent, validToken } = require('../_lib/tracking');

const PIXEL = Buffer.from('R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==', 'base64');

module.exports = async function handler(req, res) {
  const token = req.query.token;

  if (validToken(token)) {
    const link = await resolveLink(token);
    if (link) await recordEvent(token, link.email_stage, 'open', req);
  }

  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  return res.status(200).send(PIXEL);
};
