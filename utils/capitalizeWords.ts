/**
 * Capitalizes the first letter of each word in a given text.
 *
 * @param {string} text - The input text to be processed.
 * @return {string} - The modified text with the first letter of each word capitalized.
 */
function capitalizeWords(text: string) {
  const capitalizedWords =
    String(text).trim().split(" ")
      .map((word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())

  return capitalizedWords.join(" ")
}

export default capitalizeWords
