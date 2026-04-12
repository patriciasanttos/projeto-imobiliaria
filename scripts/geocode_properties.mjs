/**
 * One-time script to geocode all property search queries
 * and add Lat/Lng fields to properties_base.json.
 *
 * Usage: node scripts/geocode_properties.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_PATH = join(__dirname, "..", "src", "data", "properties_base.json");

function extractSearchQuery(url) {
  if (!url) return null;
  const match = url.match(/\/maps\/(?:search|place)\/([^@?/]+)/);
  if (match) {
    return decodeURIComponent(match[1].replace(/\+/g, " ")).trim();
  }
  return null;
}

async function geocode(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
  const res = await fetch(url, {
    headers: { "User-Agent": "portfolio-imobiliaria-geocoder/1.0" },
  });
  const data = await res.json();
  if (data && data.length > 0) {
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  }
  return null;
}

async function main() {
  const properties = JSON.parse(readFileSync(DATA_PATH, "utf-8"));

  for (const prop of properties) {
    const query = extractSearchQuery(prop.Maps);
    if (query) {
      console.log(`Geocoding "${query}" (ID: ${prop.ID})...`);
      const coords = await geocode(query);
      if (coords) {
        prop.Lat = coords.lat.toString();
        prop.Lng = coords.lng.toString();
        console.log(`  → ${coords.lat}, ${coords.lng}`);
      } else {
        console.log(`  → NOT FOUND`);
      }
      // Respect Nominatim 1 req/s rate limit
      await new Promise((r) => setTimeout(r, 1500));
    }
  }

  writeFileSync(DATA_PATH, JSON.stringify(properties, null, 2) + "\n", "utf-8");
  console.log("\nDone! Updated properties_base.json with Lat/Lng fields.");
}

main();
