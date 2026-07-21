// Extracts a short 2-3 line summary from the full markdown description,
const getShortDescription = (description, maxLength = 250) => {
  if (!description) return "";

  const withoutHeadings = description
    .split("\n")
    .filter((line) => !line.trim().startsWith("#"))
    .join(" ");

  const plainText = withoutHeadings
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/-\s+/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (plainText.length <= maxLength) return plainText;

  return plainText.slice(0, maxLength).replace(/\s+\S*$/, "") + "…";
};

export default getShortDescription;
