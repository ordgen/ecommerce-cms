export const trim = (msg, noChars = 300) => {
  if (!msg) {
    return '';
  }
  if (msg.length < noChars) {
    return msg;
  }
  return `${msg.slice(0, noChars)}...`;
};

export function resize(url, size) {
  const fileName = url.substring((url.lastIndexOf('/') + 1));
  return `http://wallville-live.s3-website-us-east-1.amazonaws.com/${size}/${fileName}`;
}
