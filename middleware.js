export default function middleware(request) {
  const userAgent = request.headers.get('User-Agent');

  // Liste des User Agents connus des bots pour le rendu côté serveur
  const botUserAgents = [
    'googlebot',
    'bingbot',
    'yandex',
    'baiduspider',
    'duckduckbot',
    'slurp',
    'facebot',
    'linkedinbot',
    'twitterbot',
    'rogerbot',
    'embedly',
    'quora link preview',
    'showyoubot',
    'outbrain',
    'pinterest/0.',
    'developers.google.com/+/web/snippet',
  ];

  if (
    userAgent &&
    botUserAgents.some(bot => userAgent.toLowerCase().includes(bot))
  ) {
    return fetch('https://service.prerender.io' + request.url, {
      headers: {
        'X-Prerender-Token': '8VDyQuiEprEKqmlFHY2u',
      },
    });
  }

  return fetch(request);
}
