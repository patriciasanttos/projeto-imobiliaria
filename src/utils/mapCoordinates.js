/**
 * Extract lat/lng coordinates from various Google Maps URL formats.
 *
 * Supported formats:
 *   - @lat,lng              (place URLs)
 *   - /search/lat,+lng      (search URLs)
 *   - /search/lat,lng       (search URLs)
 *   - /@lat,lng             (place URLs)
 *   - ?q=lat,lng            (query param)
 *
 * @param {string} url – a Google Maps URL
 * @returns {{ lat: number, lng: number } | null}
 */
export function extractCoordinates(url) {
  if (!url) return null;

  // Match @lat,lng or /search/lat,+lng
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
