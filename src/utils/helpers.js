export const truncateText = (text, length) =>
    text.length > length ? `${text.substring(0, length)}...` : text;
  