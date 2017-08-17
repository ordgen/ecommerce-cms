export const trim = (msg, noChars = 300) => {
  if (!msg) {
    return '';
  }
  if (msg.length < noChars) {
    return msg;
  }
  return `${msg.slice(0, noChars)}...`;
};

