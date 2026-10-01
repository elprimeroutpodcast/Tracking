const SUPABASE_URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_PUBLISHABLE_KEY;

module.exports = async function handler(req, res) {
  const token = 'TESTEPO20261001ABC123';
  const response = await fetch(SUPABASE_URL + '/rest/v1/rpc/epo_resolve_tracking_link', {
    method: 'POST',
    headers: {
      apikey: KEY,
      Authorization: 'Bearer ' + KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ p_tracking_token: token })
  });
  const body = (await response.text()).slice(0, 1000);
  return res.status(200).json({
    env: { url: !!SUPABASE_URL, key: !!KEY },
    supabase_status: response.status,
    supabase_ok: response.ok,
    supabase_body: body
  });
};
