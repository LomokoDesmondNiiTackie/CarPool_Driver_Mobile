/*
 * ─────────────────────────────────────────────────────────────────
 * WHY DIRECT OSM TILES GET BLOCKED
 * ─────────────────────────────────────────────────────────────────
 * tile.openstreetmap.org is run by volunteers. Their policy:
 *   - You MUST send a User-Agent header identifying your app
 *   - You MUST send a valid contact email
 *   - React Native's UrlTile cannot set custom HTTP headers on tile
 *     requests — so you will ALWAYS be blocked on direct OSM tiles.
 *
 * CARTO also got blocked for the same reason in your case — their
 * free tier still proxies through OSM servers which apply the same check.
 *
 * ─────────────────────────────────────────────────────────────────
 * THE ACTUAL FIX — Use a provider that serves its OWN tile CDN
 * ─────────────────────────────────────────────────────────────────
 *
 * Provider          | Signup | Cost  | Notes
 * ──────────────────|────────|───────|──────────────────────────────
 * Jawg Maps         | Yes    | Free  | 250k tiles/month free. Best option.
 * Maptiler          | Yes    | Free  | 100k req/month free tier.
 * Stadia Maps       | Yes    | Free  | 200k tiles/month, great styles.
 * Mapbox            | Yes    | Free  | 50k loads/month free tier.
 *
 * All of the above:
 *  ✅ Serve tiles from their own CDN (not OSM volunteer servers)
 *  ✅ No User-Agent requirement on tile requests
 *  ✅ Work with react-native-maps UrlTile out of the box
 *  ✅ Use OSM map data (free & open)
 *  ✅ Have a free tier more than enough for development
 */

// ── STEP 1: Sign up at https://www.jawg.io (free, takes 2 min) ──
// ── STEP 2: Copy your access token from the dashboard ──
// ── STEP 3: Paste it below ──

const JAWG_TOKEN = "32JCtGS1vTPvAJs049nUopJf8QY8OoJL9HyTEvzzhtnfR0ivrAnQzxpLxcbhHlwX"; // ← replace this

// ── STEP 1: Sign up at https://cloud.maptiler.com (free) ──
const MAPTILER_KEY = "YOUR_MAPTILER_API_KEY"; // ← replace this

// ── STEP 1: Sign up at https://stadiamaps.com (free) ──
const STADIA_KEY = "YOUR_STADIA_API_KEY"; // ← replace this (optional for dev)

export const TILE_PROVIDERS = {

  // ── Jawg Maps (RECOMMENDED — generous free tier, beautiful) ──
  jawg_streets:
    `https://tile.jawg.io/jawg-streets/{z}/{x}/{y}.png?access-token=${JAWG_TOKEN}`,
  jawg_dark:
    `https://tile.jawg.io/jawg-dark/{z}/{x}/{y}.png?access-token=${JAWG_TOKEN}`,
  jawg_terrain:
    `https://tile.jawg.io/jawg-terrain/{z}/{x}/{y}.png?access-token=${JAWG_TOKEN}`,

  // ── Maptiler (also great, 100k/month free) ──
  maptiler_streets:
    `https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,
  maptiler_bright:
    `https://api.maptiler.com/maps/bright-v2/256/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`,

  // ── Stadia Maps (200k/month free, no key needed in dev on localhost) ──
  stadia_smooth:
    `https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png?api_key=${STADIA_KEY}`,
  stadia_dark:
    `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png?api_key=${STADIA_KEY}`,
  stadia_outdoors:
    `https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}.png?api_key=${STADIA_KEY}`,
};

// ── Active tile — swap this one line to change map style ──
export const ACTIVE_TILE = TILE_PROVIDERS.jawg_streets;