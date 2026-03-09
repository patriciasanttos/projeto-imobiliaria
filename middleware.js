// Vercel Edge Middleware – serves OG meta tags to social-media crawlers
// For normal users the SPA is served as usual.

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS9HwFXM91221YFd2SSXmNISzCmYPQB-4uvh-qWAkKf0ESpFZEGSXSkVBxh-MenIHqZ6RIqROo9CBot/pub?output=csv";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzSEn2OIiqn8ATsvdUknoK2v0SUvfTYNfiAzX9Mf0UJS2JWrgqr_TE0Rtur770b9JIf/exec";

// Bot user-agents that need OG tags
const CRAWLER_UA =
  /facebookexternalhit|Facebot|Twitterbot|WhatsApp|TelegramBot|LinkedInBot|Slackbot|Discordbot|Pinterest|Googlebot|bingbot/i;

// --------------- CSV helpers (same logic as the frontend) ---------------

function parseCsvLine(line) {
  const fields = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        fields.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
  }
  fields.push(current.trim());
  return fields;
}

function parseCSV(csv) {
  const rows = [];
  let current = "";
  let inQuotes = false;
  const chars = csv.trim();
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    if (ch === '"') inQuotes = !inQuotes;
    if (!inQuotes && (ch === "\n" || (ch === "\r" && chars[i + 1] === "\n"))) {
      rows.push(current);
      current = "";
      if (ch === "\r") i++;
    } else {
      current += ch;
    }
  }
  if (current) rows.push(current);
  const [headerLine, ...dataLines] = rows;
  const headers = parseCsvLine(headerLine);
  return dataLines.map((line) => {
    const values = parseCsvLine(line);
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] || "";
    });
    return obj;
  });
}

// Extract Google Drive folder ID from a URL
function extractFolderId(url) {
  if (!url) return null;
  const match = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

// --------------- Middleware handler ---------------

export const config = {
  matcher: "/propiedades/:id*",
};

export default async function middleware(request) {
  const ua = request.headers.get("user-agent") || "";

  // Only intercept crawler requests
  if (!CRAWLER_UA.test(ua)) {
    return; // pass through to the SPA
  }

  // Extract property ID from URL
  const url = new URL(request.url);
  const segments = url.pathname.split("/").filter(Boolean);
  // Expected: ["propiedades", "<id>"]
  const propertyId = segments[1];
  if (!propertyId) return;

  try {
    // Fetch property data from the base (Spanish) sheet
    const csvRes = await fetch(SHEET_CSV_URL);
    const csvText = await csvRes.text();
    const rows = parseCSV(csvText);
    const property = rows.find((r) => r.ID === propertyId);

    if (!property) return;

    const title = property.Titulo || "Habbita Negocios Inmobiliarios";
    const price = property.Precio || "";
    const currency = property.Moneda || "";
    const description =
      property["Descripción"] || property.Ubicacion || "";
    const ogTitle = price
      ? `${title} – ${currency} ${price}`
      : title;

    // Try to get the first image from Google Drive
    let imageUrl = "";
    const folderId = extractFolderId(property.Imagenes);
    if (folderId) {
      try {
        const imgRes = await fetch(
          `${APPS_SCRIPT_URL}?folderId=${folderId}`,
          { redirect: "follow" }
        );
        const imgData = await imgRes.json();
        if (imgData.images && imgData.images.length > 0) {
          imageUrl = imgData.images[0].url;
        }
      } catch {
        // Ignore image fetch errors
      }
    }

    const pageUrl = request.url;

    // Return minimal HTML with OG meta tags
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(ogTitle)}</title>
  <meta property="og:title" content="${escapeAttr(ogTitle)}" />
  <meta property="og:description" content="${escapeAttr(description)}" />
  <meta property="og:url" content="${escapeAttr(pageUrl)}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Habbita Negocios Inmobiliarios" />
  ${imageUrl ? `<meta property="og:image" content="${escapeAttr(imageUrl)}" />` : ""}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeAttr(ogTitle)}" />
  <meta name="twitter:description" content="${escapeAttr(description)}" />
  ${imageUrl ? `<meta name="twitter:image" content="${escapeAttr(imageUrl)}" />` : ""}
</head>
<body>
  <h1>${escapeHtml(ogTitle)}</h1>
  <p>${escapeHtml(description)}</p>
  ${imageUrl ? `<img src="${escapeAttr(imageUrl)}" alt="${escapeAttr(title)}" />` : ""}
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (err) {
    // On error, fall through to the SPA
    console.error("Middleware OG error:", err);
    return;
  }
}

// --------------- HTML escaping helpers ---------------

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
