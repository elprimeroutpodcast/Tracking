# EPO Email Engagement Tracking

Tracking service for El Primer Out.

Routes:
- /mk/:token records a Media Kit click and redirects to the official Media Kit.
- /open/:token records a detected email-open signal and returns a transparent 1x1 GIF.

Stages: initial, fup1, fup2.
Events: click_media_kit, open.

Required Vercel environment variables:
- SUPABASE_URL
- SUPABASE_PUBLISHABLE_KEY

The public runtime only uses the publishable Supabase key. RLS prevents public reads.
