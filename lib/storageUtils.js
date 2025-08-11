import { supabase } from "./supabaseClient.js";

/**
 * Get the public URL for a file in Supabase Storage
 * @param {string} bucketName - The name of the storage bucket
 * @param {string} filePath - The path to the file in the bucket
 * @returns {string} The public URL of the file
 */
export function getPublicUrl(bucketName, filePath) {
  if (!filePath) return null;

  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

  return data.publicUrl;
}

/**
 * Get the public URL for a quiz question image
 * @param {string} imagePath - The path to the image in the signs bucket
 * @returns {string} The public URL of the image
 */
export function getQuizImageUrl(imagePath) {
  return getPublicUrl("signs", imagePath);
}
