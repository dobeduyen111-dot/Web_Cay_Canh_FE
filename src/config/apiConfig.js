const DEFAULT_API_ORIGIN =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : window.location.origin;

const normalizeUrl = (url) => url.replace(/\/+$/, '');

const appendApiPath = (url) => {
  const normalizedUrl = normalizeUrl(url);
  return /\/api$/i.test(normalizedUrl) ? normalizedUrl : `${normalizedUrl}/api`;
};

const runtimeConfig =
  typeof window !== 'undefined' ? window.__APP_CONFIG__ || {} : {};

export const API_ORIGIN = normalizeUrl(
    process.env.REACT_APP_API_BASE_URL?.toString?.().replace(/\/api\/?$/i, '') ||
    process.env.REACT_APP_API_ORIGIN?.toString?.() ||
    runtimeConfig.API_BASE_URL?.toString?.().replace(/\/api\/?$/i, '') ||
    runtimeConfig.API_ORIGIN?.toString?.() ||
    DEFAULT_API_ORIGIN
);

// export const API_BASE_URL = appendApiPath(
//   process.env.REACT_APP_API_BASE_URL?.toString?.() ||
//     runtimeConfig.API_BASE_URL?.toString?.() ||
//     DEFAULT_API_BASE_URL
// );
export const API_BASE_URL = appendApiPath(
  process.env.REACT_APP_API_BASE_URL?.toString?.() ||
    runtimeConfig.API_BASE_URL?.toString?.() ||
    DEFAULT_API_ORIGIN
);