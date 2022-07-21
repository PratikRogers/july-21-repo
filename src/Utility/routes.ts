/* eslint-disable */
export function routeToURL(urlPath:any) {

  let hostname = window && window.location && window.location.host;

  let isLocalHost = false;

  if (hostname === 'localhost:3000') {
    isLocalHost = true;
  }
  let prefix = ':';

  let port = 443;

  // hostname = "https://ehdpde101.dev.dmt.rogers.com";
  let baseUrl = 'https://' + hostname + prefix + port + urlPath;

  if (isLocalHost) {
    baseUrl = 'https://' + hostname + urlPath;
  }
  window.open(baseUrl, '_self');
}
