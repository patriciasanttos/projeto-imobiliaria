/**
 * Google Drive utility functions for fetching images from shared folders
 */

// Apps Script Web App URL - User needs to deploy their own and update this
const APPS_SCRIPT_URL = null; // Set after deploying Google Apps Script

/**
 * Extract folder ID from a Google Drive folder URL
 * @param {string} url - Google Drive folder URL
 * @returns {string|null} - Folder ID or null if not found
 */
export function extractFolderId(url) {
    if (!url) return null;
    const match = url.match(/folders\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
}

/**
 * Get direct viewable URL for a Google Drive file
 * @param {string} fileId - Google Drive file ID
 * @returns {string} - Direct image URL
 */
export function getDriveImageUrl(fileId) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

/**
 * Fetch images from a Google Drive folder using Apps Script proxy
 * @param {string} folderUrl - Google Drive folder URL
 * @param {string} scriptUrl - Apps Script web app URL (optional, uses default)
 * @returns {Promise<Array>} - Array of image objects with id, name, url
 */
export async function fetchDriveFolderImages(folderUrl, scriptUrl = APPS_SCRIPT_URL) {
    if (!scriptUrl) {
        console.warn('Google Apps Script URL not configured. See googleDrive.js.');
        return [];
    }

    const folderId = extractFolderId(folderUrl);
    if (!folderId) return [];

    try {
        const response = await fetch(`${scriptUrl}?folderId=${folderId}`);
        if (!response.ok) throw new Error('Failed to fetch folder images');
        const data = await response.json();
        return data.images || [];
    } catch (error) {
        console.error('Error fetching Drive folder images:', error);
        return [];
    }
}

/**
 * Get the first image URL from a Google Drive folder
 * Returns a thumbnail URL that works without API key for public files
 * @param {string} folderUrl - Google Drive folder URL  
 * @returns {string|null} - First image URL or null
 */
export function getFirstImageFromFolderUrl(folderUrl) {
    // For now, we'll use a workaround: if the user provides the folder URL,
    // we can try to get thumbnail via lh3.googleusercontent.com
    const folderId = extractFolderId(folderUrl);
    if (!folderId) return null;

    // This is a placeholder - the Apps Script will provide actual image URLs
    return null;
}
