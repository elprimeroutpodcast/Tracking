const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;

function validToken(token) {
  return typeof token === 'string' && /^[A-Za-z0-9_-]{16,128}$/.test(token);
}

async function resolveLink(token) {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY || !validToken(token)) return null;
  const response = await fetch(SUPABASE_URL + '/rest/v1/rpc/epo_resolve_tracking_link', {
    method: 'POST',
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: 'Bearer ' + SUPABASE_PUBLISHABLE_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ p_tracking_token: token })
  });
  if (!response.ok) {
    console.error('Tracking resolve failed', response.status);
    return null;
  }
  const data = await response.json();
  return Array.isArray(data) ? (data[0] || null) : data;
}

async function recordEvent(token, stage, eventType, req) {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY || !validToken(token) || !['initial', 'fup1', 'fup2'].includes(stage)) return;
  const response = await fetch(SUPABASE_URL + '/rest/v1/epo_tracking_events', {
    method: 'POST',
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: 'Bearer ' + SUPABASE_PUBLISHABLE_KEY,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    },
    body: JSON.stringify({
      tracking_token: token,
      email_stage: stage,
      event_type: eventType,
      user_agent: String(req.headers['user-agent'] || '').slice(0, 512),
      referer: String(req.headers.referer || '').slice(0, 1024)
    })
  });
  if (!response.ok) console.error('Tracking event insert failed', response.status);
}

module.exports = { resolveLink, recordEvent, validToken };
