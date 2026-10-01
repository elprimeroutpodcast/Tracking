const { resolveLink, validToken } = require('./_lib/tracking');

module.exports = async function handler(req, res) {
  const token = 'TESTEPO20261001ABC123';
  const link = await resolveLink(token);
  return res.status(link ? 200 : 503).json({
    ok: !!link,
    env: {
      SUPABASE_URL: !!process.env.SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY: !!process.env.SUPABASE_PUBLISHABLE_KEY
    },
    rpc: link ? 'reachable' : 'unreachable'
  });
};
