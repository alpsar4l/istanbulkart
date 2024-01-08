/**
 * Extracts the last word from a given text separated by hyphens.
 * @param {string} text - The input text containing words separated by hyphens.
 * @returns {string} - The last word extracted from the input text.
 */
function extractLastWord(text: string): string {
  // Split the text into an array using hyphen as the delimiter
  const splitted_text = text.split("-");

  // Return the last element from the array, which represents the last word
  return splitted_text[splitted_text.length - 1];
}

// Export the function as the default export
export default extractLastWord;