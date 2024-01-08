function extractLastWord(text: string) {
  const splitted_text = text.split("-")
  return splitted_text[splitted_text.length - 1];
}

export default extractLastWord
