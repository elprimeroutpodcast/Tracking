const { resolveLink, recordEvent, validToken } = require('../_lib/tracking');

module.exports = async function handler(req, res) {
  const token = req.query.token;
  if (!validToken(token)) return res.status(400).send('Invalid tracking link');

  const link = await resolveLink(token);
  if (!link || !link.target_url) return res.status(404).send('Tracking link not found');

  await recordEvent(token, link.email_stage, 'click_media_kit', req);

  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  return res.redirect(302, link.target_url);
};
