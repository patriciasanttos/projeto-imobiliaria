/**
 * Vercel Serverless Function – Geocode proxy for Nominatim.
 *
 * Calls OpenStreetMap Nominatim server-side so the browser never hits CORS
 * restrictions. This replaces the previous corsproxy.io approach which
 * returned 403 in production.
 *
 * Usage:  GET /api/geocode?q=San+Pedro,+Encarnación
 * Returns: [{ lat, lon, display_name, ... }]   (Nominatim JSON format)
 */
export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing 'q' query parameter" });
  }

  try {
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1`;

    const response = await fetch(nominatimUrl, {
      headers: {
        // Nominatim requires a valid User-Agent (not a generic browser UA)
        "User-Agent": "HabbitaInmobiliarios/1.0 (https://www.habbitainmobiliarios.com)",
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `Nominatim returned ${response.status}` });
    }

    const data = await response.json();

    // Cache for 1 day – geocode results rarely change
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
    return res.status(200).json(data);
  } catch (error) {
    console.error("Geocode proxy error:", error);
    return res.status(500).json({ error: "Geocoding failed" });
  }
}
