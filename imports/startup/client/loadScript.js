export default function loadScript(url, callback) {
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  // tbind the event to the callback function 
  // there are several events for cross browser compatibility
  script.onreadystatechange = callback;
  script.onload = callback;

  // fire the loading
  head.appendChild(script);
}
