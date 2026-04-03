/**
 * Apply property filters to a list of cards.
 *
 * @param {Array} list      – full card list
 * @param {Object} filters  – filter state object
 * @returns {Array}           filtered (and optionally sorted) list
 */
export function filterProperties(list, filters) {
  if (!list) return [];

  const filtered = list.filter((card) => {
    let ok = true;

    if (filters?.operationType) {
      ok =
        ok &&
        card.operationType?.toLowerCase() ===
          filters.operationType.toLowerCase();
    }

    if (filters?.bedrooms) {
      const bedrooms = parseInt(card.bedrooms);
      const target = parseInt(filters.bedrooms);
      ok = target === 4 ? ok && bedrooms >= 4 : ok && bedrooms === target;
    }

    if (filters?.propertyType) {
      ok =
        ok &&
        card.propertyType?.toLowerCase() ===
          filters.propertyType.toLowerCase();
    }

    if (filters?.districto) {
      ok =
        ok &&
        card.districto?.toLowerCase() === filters.districto.toLowerCase();
    }

    if (filters?.barrio) {
      ok = ok && card.barrio?.toLowerCase() === filters.barrio.toLowerCase();
    }

    if (filters?.minPrice && card.price) {
      const price = parseInt(card.price.replace(/\./g, "").replace(/,/g, ""));
      ok = ok && price >= filters.minPrice;
    }

    if (filters?.maxPrice && card.price) {
      const price = parseInt(card.price.replace(/\./g, "").replace(/,/g, ""));
      ok = ok && price <= filters.maxPrice;
    }

    return ok;
  });

  if (filters?.sortOrder === "desc" || filters?.sortOrder === "asc") {
    filtered.sort((a, b) => {
      const parsePrice = (card) =>
        card.price
          ? parseInt(card.price.replace(/\./g, "").replace(/,/g, ""))
          : 0;
      const diff = parsePrice(a) - parsePrice(b);
      return filters.sortOrder === "asc" ? diff : -diff;
    });
  }

  return filtered;
}
