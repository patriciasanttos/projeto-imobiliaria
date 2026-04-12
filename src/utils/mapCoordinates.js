/**
 * Extract lat/lng coordinates from various Google Maps URL formats.
 *
 * Supported formats:
 *   - @lat,lng              (place URLs)
 *   - /search/lat,+lng      (search URLs with numeric coords)
 *   - /search/lat,lng       (search URLs with numeric coords)
 *   - /@lat,lng             (place URLs)
 *   - ?q=lat,lng            (query param)
 *
 * @param {string} url – a Google Maps URL
 * @returns {{ lat: number, lng: number } | null}
 */
export function extractCoordinates(url) {
  if (!url) return null;

  // Match @lat,lng or /search/lat,+lng (numeric coordinates)
  const coordMatch = url.match(
    /(?:@|\/search\/|\/place\/.+@)(-?\d+\.?\d*),\+?(-?\d+\.?\d*)/,
  );
  if (coordMatch) {
    return { lat: parseFloat(coordMatch[1]), lng: parseFloat(coordMatch[2]) };
  }

  // Match ?q=lat,lng
  try {
    const parsed = new URL(url);
    const q = parsed.searchParams.get("q");
    if (q) {
      const qMatch = q.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/);
      if (qMatch) {
        return { lat: parseFloat(qMatch[1]), lng: parseFloat(qMatch[2]) };
      }
    }
  } catch {
    /* not a valid URL */
  }

  return null;
}

/**
 * Extract the search query from a Google Maps search URL.
 * e.g. "https://www.google.com/maps/search/San+Pedro,+Encarnación"
 *      → "San Pedro, Encarnación"
 *
 * @param {string} url
 * @returns {string | null}
 */
export function extractSearchQuery(url) {
  if (!url) return null;

  // Match /maps/search/<query> or /maps/place/<query>
  const match = url.match(/\/maps\/(?:search|place)\/([^@?/]+)/);
  if (match) {
    return decodeURIComponent(match[1].replace(/\+/g, " ")).trim();
  }

  return null;
}

// In-memory cache to avoid re-fetching the same queries
const geocodeCache = {};

/**
 * Geocode a place name using OpenStreetMap Nominatim (free, no API key).
 *
 * @param {string} query – place name to geocode
 * @returns {Promise<{ lat: number, lng: number } | null>}
 */
// Throttle queue to respect Nominatim 1 req/s limit
let lastGeocodeFetch = 0;
const GEOCODE_DELAY_MS = 1500;

function waitForThrottle() {
  const now = Date.now();
  const elapsed = now - lastGeocodeFetch;
  if (elapsed < GEOCODE_DELAY_MS) {
    return new Promise((r) => setTimeout(r, GEOCODE_DELAY_MS - elapsed));
  }
  return Promise.resolve();
}

const MAX_RETRIES = 3;

export async function geocodeQuery(query) {
  if (!query) return null;

  // Check cache first
  if (geocodeCache[query] !== undefined) {
    return geocodeCache[query];
  }

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    // Wait for throttle
    await waitForThrottle();
    lastGeocodeFetch = Date.now();

    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`);

      // Retry on rate limit
      if (res.status === 429) {
        const backoff = GEOCODE_DELAY_MS * (attempt + 2);
        await new Promise((r) => setTimeout(r, backoff));
        continue;
      }

      const data = await res.json();
      if (data && data.length > 0) {
        const result = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
        geocodeCache[query] = result;
        return result;
      }
      break; // valid response but no data
    } catch {
      break; // network error, don't retry
    }
  }

  geocodeCache[query] = null;
  return null;
}

/**
 * Resolve coordinates from a Google Maps URL.
 * First tries to extract coordinates directly from the URL.
 * If that fails and the URL is a search URL, geocodes the search query.
 *
 * @param {string} url – a Google Maps URL
 * @returns {Promise<{ lat: number, lng: number } | null>}
 */
export async function resolveCoordinates(url) {
  // Try direct extraction first (instant)
  const direct = extractCoordinates(url);
  if (direct) return direct;

  // Try geocoding the search query
  const query = extractSearchQuery(url);
  if (query) {
    return geocodeQuery(query);
  }

  return null;
}
