/**
 * Formats a value as PYG currency (e.g., 1.000.000)
 * @param {string|number} value 
 * @returns {string}
 */
export const formatPYG = (value) => {
    if (value === null || value === undefined || value === "") return "";

    // Remove non-digit characters
    const number = value.toString().replace(/\D/g, "");

    if (number === "") return "";

    // Format with points as thousands separator
    return new Intl.NumberFormat("es-PY", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number);
};

/**
 * Unformats a PYG currency string to a numeric string (e.g., 1.000.000 -> 1000000)
 * @param {string} value 
 * @returns {string}
 */
export const unformatPYG = (value) => {
    if (!value) return "";
    return value.toString().replace(/\D/g, "");
};
