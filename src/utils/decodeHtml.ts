export const decodeHtmlEntities = (text: string): string => {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(text, "text/html")
    .documentElement.textContent;
  return decodedString || "";
};
